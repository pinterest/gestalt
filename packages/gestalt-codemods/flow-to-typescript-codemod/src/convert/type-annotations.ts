import * as t from "@babel/types";
import traverse from "@babel/traverse";
import { replaceWith, inheritLocAndComments } from "./utils/common";
import { migrateType } from "./migrate/type";
import { migrateTypeParameterDeclaration } from "./migrate/type-parameter";
import { TransformerInput } from "./transformer";
import { MetaData } from "./migrate/metadata";

/**
 * Convert type annotations for variables and parameters
 */
export function transformTypeAnnotations({
  reporter,
  state,
  file,
}: TransformerInput) {
  traverse(file, {
    TypeAnnotation(path) {
      const metaData: MetaData = { path };
      // Flow automatically makes function parameters that accept `void` not required.
      // However, TypeScript requires a parameter even if it is marked as void. So make all
      // parameters that accept `void` optional.
      if (
        path.parent.type === "Identifier" &&
        path.parentPath.parent.type !== "VariableDeclarator"
      ) {
        // `function f(x: ?T)` → `function f(x?: T | null)`
        if (path.node.typeAnnotation.type === "NullableTypeAnnotation") {
          path.parent.optional = true;

          const nullableType = t.unionTypeAnnotation([
            path.node.typeAnnotation.typeAnnotation,
            t.nullLiteralTypeAnnotation(),
          ]);
          inheritLocAndComments(path.node.typeAnnotation, nullableType);
          path.node.typeAnnotation = nullableType;
        }

        // `function f(x: T | void)` → `function f(x?: T)`
        if (
          path.node.typeAnnotation.type === "UnionTypeAnnotation" &&
          path.node.typeAnnotation.types.some(
            (unionType) => unionType.type === "VoidTypeAnnotation"
          )
        ) {
          path.parent.optional = true;
          path.node.typeAnnotation.types =
            path.node.typeAnnotation.types.filter(
              (unionType) => unionType.type !== "VoidTypeAnnotation"
            );
        }
      }

      // Return types might be transformed differently to detect functional components
      if (
        path.parentPath.type === "ArrowFunctionExpression" ||
        path.parentPath.type === "FunctionDeclaration" ||
        path.parentPath.type === "ClassMethod"
      ) {
        metaData.returnType = true;
      }

      replaceWith(
        path,
        t.tsTypeAnnotation(
          migrateType(reporter, state, path.node.typeAnnotation, metaData)
        ),
        state.config.filePath,
        reporter
      );
    },

    TypeParameterDeclaration(path) {
      replaceWith(
        path,
        migrateTypeParameterDeclaration(reporter, state, path.node),
        state.config.filePath,
        reporter
      );
    },
  });
}
