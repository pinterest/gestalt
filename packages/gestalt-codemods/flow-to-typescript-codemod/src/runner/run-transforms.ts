import * as t from "@babel/types";
import { Transformer } from "../convert/transformer";
import MigrationReporter from "./migration-reporter";
import { State } from "./state";

/**
 * Run all transforms in order, given a chain of transforms
 */
export async function runTransforms(
  reporter: MigrationReporter,
  state: State,
  file: t.File,
  transforms: readonly Transformer[]
): Promise<void> {
  for (const transform of transforms) {
    // eslint-disable-next-line no-await-in-loop
    await transform({ reporter, state, file });
  }
}
