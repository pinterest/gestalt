import * as t from "@babel/types";
import MigrationReporter from "../../runner/migration-reporter";
import { inheritLocAndComments } from "../utils/common";
import { migrateType } from "./type";
import { State } from "../../runner/state";
import { MetaData } from "./metadata";

export function migrateTypeParameterDeclaration(
  reporter: MigrationReporter,
  state: State,
  flowTypeParameters: t.TypeParameterDeclaration
): t.TSTypeParameterDeclaration {
  const params = flowTypeParameters.params.map((flowTypeParameter) => {
    // ReadOnlyMap<K, +V>
    // https://flow.org/en/docs/lang/variance/
    if (flowTypeParameter.variance !== null) {
      reporter.typeParameterWithVariance(
        state.config.filePath,
        flowTypeParameter.loc!
      );
    }
    const tsTypeParameter = t.tsTypeParameter(
      flowTypeParameter.bound
        ? migrateType(reporter, state, flowTypeParameter.bound.typeAnnotation)
        : null,
      flowTypeParameter.default
        ? migrateType(reporter, state, flowTypeParameter.default, {
            isTypeParameter: true,
          })
        : null,
      flowTypeParameter.name
    );
    tsTypeParameter.name = flowTypeParameter.name;
    inheritLocAndComments(flowTypeParameter, tsTypeParameter);
    return tsTypeParameter;
  });
  const tsTypeParameters = t.tsTypeParameterDeclaration(params);
  inheritLocAndComments(flowTypeParameters, tsTypeParameters);
  return tsTypeParameters;
}

export function migrateTypeParameterInstantiation(
  reporter: MigrationReporter,
  state: State,
  flowTypeParameters: t.TypeParameterInstantiation,
  metaData?: MetaData
): t.TSTypeParameterInstantiation {
  const params = flowTypeParameters.params.map((flowTypeParameter) => {
    return migrateType(reporter, state, flowTypeParameter, metaData);
  });
  const tsTypeParameters = t.tsTypeParameterInstantiation(params);
  inheritLocAndComments(flowTypeParameters, tsTypeParameters);
  return tsTypeParameters;
}
