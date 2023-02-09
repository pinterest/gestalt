import * as t from "@babel/types";
import MigrationReporter from "../../runner/migration-reporter";
import { State } from "../../runner/state";
import { inheritLocAndComments, buildTSIdentifier } from "../utils/common";
import { migrateFunctionParameters } from "./function-parameter";
import { migrateType } from "./type";
import { migrateTypeParameterDeclaration } from "./type-parameter";

export function migrateObjectMember(
  reporter: MigrationReporter,
  state: State,
  flowMember:
    | t.ObjectTypeProperty
    | t.ObjectTypeIndexer
    | t.ObjectTypeCallProperty
    | t.ObjectTypeInternalSlot
): t.TSTypeElement {
  const tsMember = actuallyMigrateObjectMember(reporter, state, flowMember);
  inheritLocAndComments(flowMember, tsMember);
  return tsMember;
}

function actuallyMigrateObjectMember(
  reporter: MigrationReporter,
  state: State,
  flowMember:
    | t.ObjectTypeProperty
    | t.ObjectTypeIndexer
    | t.ObjectTypeCallProperty
    | t.ObjectTypeInternalSlot
): t.TSTypeElement {
  switch (flowMember.type) {
    case "ObjectTypeProperty": {
      // type Test = { $Key: string };
      if (
        flowMember.key.type === "Identifier" &&
        flowMember.key.name.startsWith("$")
      ) {
        reporter.objectPropertyWithInternalName(
          state.config.filePath,
          flowMember.loc!
        );
      }

      // { -test: boolean }
      if (flowMember.variance && flowMember.variance.kind !== "plus") {
        reporter.objectPropertyWithMinusVariance(
          state.config.filePath,
          flowMember.loc!
        );
      }

      if (!(flowMember.kind || flowMember.kind === "init")) {
        throw new Error(
          `Unsupported object type property kind: ${JSON.stringify(
            flowMember.kind
          )}`
        );
      }
      if (flowMember.proto) {
        throw new Error(
          "Did not expect any Flow properties with `proto` set to true."
        );
      }
      if (flowMember.static) {
        throw new Error(
          "Did not expect any Flow properties with `static` set to true."
        );
      }

      const tsValue = migrateType(reporter, state, flowMember.value);

      if (!flowMember.method) {
        const tsPropertySignature = t.tsPropertySignature(
          flowMember.key,
          t.tsTypeAnnotation(tsValue)
        );

        tsPropertySignature.computed = flowMember.key.type !== "Identifier";
        tsPropertySignature.optional = !!flowMember.optional;
        tsPropertySignature.readonly = flowMember.variance
          ? flowMember.variance.kind === "plus"
          : null;

        return tsPropertySignature;
      } else {
        if (tsValue.type !== "TSFunctionType") {
          throw new Error(
            `Unexpected AST node: ${JSON.stringify(tsValue.type)}`
          );
        }

        const tsMethodSignature = t.tsMethodSignature(
          flowMember.key,
          tsValue.typeParameters,
          tsValue.parameters,
          tsValue.typeAnnotation
        );

        tsMethodSignature.computed = flowMember.key.type !== "Identifier";
        tsMethodSignature.optional = !!flowMember.optional;

        return tsMethodSignature;
      }
    }

    case "ObjectTypeIndexer": {
      if (flowMember.variance && flowMember.variance.kind !== "plus")
        reporter.objectPropertyWithMinusVariance(
          state.config.filePath,
          flowMember.loc!
        );

      if (flowMember.static)
        throw new Error(
          "Did not expect any Flow properties with `static` set to true."
        );

      const tsIndexSignature = t.tsIndexSignature(
        [
          buildTSIdentifier(
            flowMember.id ? flowMember.id.name : "key",
            null,
            t.tsTypeAnnotation(migrateType(reporter, state, flowMember.key))
          ),
        ],
        t.tsTypeAnnotation(migrateType(reporter, state, flowMember.value))
      );
      tsIndexSignature.readonly = flowMember.variance
        ? flowMember.variance.kind === "plus"
        : null;
      return tsIndexSignature;
    }

    case "ObjectTypeCallProperty":
      const flowType = flowMember.value;
      if (flowType.type !== "FunctionTypeAnnotation") {
        const currentParams = t.restElement(t.identifier("args"));
        currentParams.typeAnnotation = t.tsTypeAnnotation(t.tsUnknownKeyword());
        const callSignature = t.tsCallSignatureDeclaration(
          null,
          [currentParams],
          t.tsTypeAnnotation(t.tsUnknownKeyword())
        );
        // Add the comment here, so it will get copied over at the end of this block.
        // @ts-expect-error comments type differs between recast and babel
        flowMember.comments.push({
          type: "CommentBlock",
          value:
            "The flowtype for this callable object was not able to be migrated to TypeScript. Please update these types.",
          leading: true,
          trailing: false,
          loc: null,
        });
        return callSignature;
      }
      const typeParams = flowType.typeParameters
        ? migrateTypeParameterDeclaration(
            reporter,
            state,
            flowType.typeParameters
          )
        : null;
      const functionParams = migrateFunctionParameters(
        reporter,
        state,
        flowType
      );

      return t.tsCallSignatureDeclaration(
        typeParams,
        functionParams,
        t.tsTypeAnnotation(
          migrateType(reporter, state, flowType.returnType, {
            returnType: true,
          })
        )
      );

    case "ObjectTypeInternalSlot":
      throw new Error(
        `Unsupported AST node: ${JSON.stringify(flowMember.type)}`
      );

    default: {
      const never: { type: string } = flowMember;
      throw new Error(`Unrecognized AST node: ${JSON.stringify(never.type)}`);
    }
  }
}
