import * as t from "@babel/types";
import MigrationReporter from "../../runner/migration-reporter";
import { State } from "../../runner/state";
import { buildTSIdentifier, inheritLocAndComments } from "../utils/common";
import { migrateType } from "./type";

/**
 * Scan through function parameters and convert them
 * Optional parameters behave differently between the systems
 */
export function migrateFunctionParameters(
  reporter: MigrationReporter,
  state: State,
  flowType: t.FunctionTypeAnnotation
) {
  function isOptional(param: t.FunctionTypeParam) {
    return (
      param.optional ||
      param.typeAnnotation.type === "NullableTypeAnnotation" ||
      param.typeAnnotation.type === "AnyTypeAnnotation"
    );
  }
  const params = flowType.params.map<t.Identifier | t.RestElement>(
    (flowParam, i) => {
      const tsParam = buildTSIdentifier(
        // If a Flow function type argument doesn’t have a name we call it `argN`. This
        // matches the JavaScript convention of calling function inputs “arguments”.
        flowParam.name ? flowParam.name.name : `arg${i + 1}`,
        !flowType.params.some(
          (p, j) =>
            // if the remaining array has any non-optional parameters, then do no mark as optional
            j > i && !isOptional(p)
        ) && isOptional(flowParam),
        t.tsTypeAnnotation(
          migrateType(reporter, state, flowParam.typeAnnotation)
        )
      );
      inheritLocAndComments(flowParam, tsParam);
      return tsParam;
    }
  );
  if (flowType.rest) {
    // If a Flow rest element doesn’t have a name we call it `rest`.
    const tsRestParam = t.restElement(
      flowType.rest.name || t.identifier("rest")
    );
    tsRestParam.typeAnnotation = t.tsTypeAnnotation(
      migrateType(reporter, state, flowType.rest.typeAnnotation)
    );
    inheritLocAndComments(flowType.rest, tsRestParam);
    params.push(tsRestParam);

    // Technically, Flow rest parameters can be optional (`(...rest?: T[]) => void`),
    // but what does that even mean? We choose to ignore that.
  }

  return params;
}
