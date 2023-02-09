import * as t from "@babel/types";
import * as recast from "recast";
import * as recastFlowParser from "recast/parsers/flow";
import { executeFlowTypeAtPos } from "./execute-type-at-pos";
import { State } from "../../runner/state";
import MigrationReporter from "../../runner/migration-reporter";
import { transformPrivateTypes } from "../private-types";
/**
 * Runs Flow to get the inferred type at a given position. Uses the Flow server so once the Flow
 * server is running this should be pretty fast. We use this to add explicit annotations where Flow
 * needs some help.
 *
 * Queued so that we don’t overload the Flow server.
 */
export function flowTypeAtPos(
  state: State,
  location: t.SourceLocation,
  migrationReporter: MigrationReporter
): Promise<t.FlowType | null> {
  let resolve: (value: string) => void;
  let reject: (error: unknown) => void;

  const promise = new Promise<string>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  flowTypeAtPosQueue.push({
    filePath: state.config.filePath,
    location,
    migrationReporter,
    resolve: resolve!,
    reject: reject!,
  });

  if (processingFlowTypeAtPosQueue === false) {
    processFlowTypeAtPosQueue();
  }

  return promise
    .then((stdOut) =>
      processFlowTypeAtPosStdout(stdOut, migrationReporter, state, location)
    )
    .catch(() => {
      return null;
    });
}

/**
 * Are we currently processing `flowTypeAtPosQueue`? If so then don’t call
 * `processFlowTypeAtPosQueue()` a second time.
 */
let processingFlowTypeAtPosQueue = false;

/**
 * Holds all the pending `flowTypeAtPos()` calls.
 */
const flowTypeAtPosQueue: Array<{
  filePath: string;
  location: t.SourceLocation;
  migrationReporter: MigrationReporter;
  resolve: (value: string) => void;
  reject: (error: unknown) => void;
}> = [];

/**
 * Continually process all the entries in `flowTypeAtPosQueue`.
 */
function processFlowTypeAtPosQueue() {
  processingFlowTypeAtPosQueue = true;

  const entry = flowTypeAtPosQueue.shift();

  if (!entry) {
    processingFlowTypeAtPosQueue = false;
    return;
  }

  executeFlowTypeAtPos(entry.filePath, entry.location).then(
    (value) => {
      // Start the next asynchronous `flow type-at-pos` request before resolving the entry!
      // When we resolve the entry some synchronous work will be done to parse the result.
      // We can do that work concurrently while `flow type-at-pos` works.
      processFlowTypeAtPosQueue();
      entry.resolve(value);
    },
    (value) => {
      processFlowTypeAtPosQueue();
      entry.migrationReporter.flowFailToParse(
        entry.filePath,
        entry.location,
        value as Error
      );
      entry.reject(value);
    }
  );
}

/**
 * Processes the standard output of `flow type-at-pos`.
 */
function processFlowTypeAtPosStdout(
  stdout: string,
  migrationReporter: MigrationReporter,
  state: State,
  location: t.SourceLocation
): t.FlowType | null {
  // Sanitize stdout...
  // `any(implicit)` -> `any`
  let { type } = JSON.parse(stdout) as { type: string };
  const isExplicit = type.includes("(explicit)");
  type = type.replace("(explicit)", "");
  type = type.replace("(implicit)", "");

  // Flow does not know the type at this location.
  if (type === "unknown") {
    migrationReporter.unknownFlowType(state.config.filePath, location);
    return null;
  }

  if (type === "any" && !isExplicit) {
    migrationReporter.anyFlowType(state.config.filePath, location);
    return null;
  }

  // The inferred Flow type is really big, a human probably would not have written it. Don’t
  // return the type.
  if (type.length >= 100) {
    migrationReporter.complexFlowType(state.config.filePath, location, type);
    return null;
  }

  try {
    // Parse the Flow type and return it!
    const flowType: t.File = recast.parse(`type T = ${type};`, {
      parser: recastFlowParser,
    });

    // Run our pre-processing step on the types
    transformPrivateTypes({
      file: flowType,
      reporter: migrationReporter,
      state,
    });

    const node = (flowType.program.body[0] as t.TypeAlias).right;

    // `function f(x: string | any)`
    if (
      node.type === "UnionTypeAnnotation" &&
      node.types.some((unionType) => unionType.type === "AnyTypeAnnotation")
    ) {
      migrationReporter.anyFlowType(state.config.filePath, location);
      return null;
    }

    return node;
  } catch (e) {
    migrationReporter.flowFailToParse(
      state.config.filePath,
      location,
      e as Error
    );
    return null;
  }
}
