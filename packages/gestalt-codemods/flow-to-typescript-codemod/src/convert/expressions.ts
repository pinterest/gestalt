import * as t from "@babel/types";
import traverse, { NodePath } from "@babel/traverse";
import {
  replaceWith,
  isInsideCreateReactClass,
  isComplexLiteral,
  JEST_MOCK_METHODS,
} from "./utils/common";
import { migrateType } from "./migrate/type";
import { migrateTypeParameterInstantiation } from "./migrate/type-parameter";
import { TransformerInput } from "./transformer";
import MigrationReporter from "../runner/migration-reporter";
import { State } from "../runner/state";

/**
 * Transform expression nodes and type assertions
 */
export function transformExpressions({
  reporter,
  state,
  file,
}: TransformerInput) {
  traverse(file, {
    TypeCastExpression(path) {
      if (
        // `((x: any): T)` → `(x as T)`
        // `((x: Object): T)` → `(x as T)`
        // `((x: Function): T)` → `(x as T)`

        path.node.expression.type === "TypeCastExpression" &&
        (path.node.expression.typeAnnotation.typeAnnotation.type ===
          "AnyTypeAnnotation" ||
          (path.node.expression.typeAnnotation.typeAnnotation.type ===
            "GenericTypeAnnotation" &&
            path.node.expression.typeAnnotation.typeAnnotation.typeParameters &&
            path.node.expression.typeAnnotation.typeAnnotation.id.type ===
              "Identifier" &&
            (path.node.expression.typeAnnotation.typeAnnotation.id.name ===
              "Object" ||
              path.node.expression.typeAnnotation.typeAnnotation.id.name ===
                "Function")))
      ) {
        // If we are a `createReactClass()` instance property then transform
        // into `((x as any) as T)`.
        if (
          path.parent.type === "ObjectProperty" &&
          isInsideCreateReactClass(path)
        ) {
          replaceWith(
            path,
            t.tsAsExpression(
              t.parenthesizedExpression(
                t.tsAsExpression(
                  path.node.expression.expression,
                  migrateType(
                    reporter,
                    state,
                    path.node.expression.typeAnnotation.typeAnnotation
                  )
                )
              ),
              migrateType(
                reporter,
                state,
                path.node.typeAnnotation.typeAnnotation
              )
            ),
            state.config.filePath,
            reporter
          );
        } else {
          replaceWith(
            path,
            t.tsAsExpression(
              path.node.expression.expression,
              migrateType(
                reporter,
                state,
                path.node.typeAnnotation.typeAnnotation
              )
            ),
            state.config.filePath,
            reporter
          );
        }
      } else if (
        // `(x: any)` → `(x as any)`

        path.node.typeAnnotation.typeAnnotation.type === "AnyTypeAnnotation"
      ) {
        replaceWith(
          path,
          t.tsAsExpression(
            path.node.expression,
            migrateType(
              reporter,
              state,
              path.node.typeAnnotation.typeAnnotation
            )
          ),
          state.config.filePath,
          reporter
        );
      } else if (
        // `('foo': 'foo')` → `('foo' as const)`
        // `(42: 42)` → `(42 as const)`

        (path.node.expression.type === "StringLiteral" &&
          path.node.typeAnnotation.typeAnnotation.type ===
            "StringLiteralTypeAnnotation" &&
          path.node.expression.value ===
            path.node.typeAnnotation.typeAnnotation.value) ||
        (path.node.expression.type === "NumericLiteral" &&
          path.node.typeAnnotation.typeAnnotation.type ===
            "NumberLiteralTypeAnnotation" &&
          path.node.expression.value ===
            path.node.typeAnnotation.typeAnnotation.value)
      ) {
        replaceWith(
          path,
          t.tsAsExpression(
            path.node.expression,
            t.tsTypeReference(t.identifier("const"))
          ),
          state.config.filePath,
          reporter
        );
      } else if (isComplexLiteral(path.node.expression)) {
        // `(x: T)` → `(x as T)`
        //
        // When `x` is a literal like `[]` or `null`.

        replaceWith(
          path,
          t.tsAsExpression(
            path.node.expression,
            migrateType(
              reporter,
              state,
              path.node.typeAnnotation.typeAnnotation
            )
          ),
          state.config.filePath,
          reporter
        );
      } else {
        // If you want to see all type casts which aren’t handled by the above:
        //
        // ```ts
        // reporter.unsupportedTypeCast(state, path.node.expression.loc!);
        // ```

        replaceWith(
          path,
          t.tsAsExpression(
            path.node.expression,
            migrateType(
              reporter,
              state,
              path.node.typeAnnotation.typeAnnotation,
              {
                path,
              }
            )
          ),
          state.config.filePath,
          reporter
        );
      }
    },
    ArrowFunctionExpression(path) {
      // Arrow functions with a generic type parameter (<T>() => {}) often don't typecheck in tsx files
      // since they can be parsed as a JSX tag. To solve this the type parameters usually extend unknown,
      // which gives TS enough context to parse it as a type.
      if (
        (state.hasJsx || state.config.forceTSX) &&
        path.node.typeParameters &&
        path.node.typeParameters.type === "TypeParameterDeclaration" &&
        path.node.typeParameters.params
      ) {
        for (let i = 0; i < path.node.typeParameters.params.length; ++i) {
          if (!path.node.typeParameters.params[i].bound) {
            path.node.typeParameters.params[i].name += " extends unknown";
          }
        }
      }
    },
    CallExpression(path) {
      migrateArgumentsToParameters(path, reporter, state);

      if (
        t.isMemberExpression(path.node.callee) &&
        t.isIdentifier(path.node.callee.property) &&
        path.node.callee.property.name === "reduce"
      ) {
        // x.reduce(fn, []) → x.reduce<Array<any>>(fn, []);
        // if the reduce is not typed and the last argument is not a type assertion
        if (
          !path.node.typeParameters &&
          path.node.arguments.length === 2 &&
          !t.isTypeCastExpression(path.node.arguments[1])
        ) {
          reporter.untypedReduce(state.config.filePath, path.node.loc!);
          // if the last argument is an array literal, we can infer the type
          if (
            t.isArrayExpression(path.node.arguments[1]) &&
            path.node.arguments[1].elements.length === 0
          ) {
            path.node.typeParameters = t.tsTypeParameterInstantiation([
              t.tsTypeReference(
                t.identifier("Array"),
                t.tsTypeParameterInstantiation([t.tsAnyKeyword()])
              ),
            ]);
          } else if (
            t.isObjectExpression(path.node.arguments[1]) &&
            path.node.arguments[1].properties.length === 0
          ) {
            path.node.typeParameters = t.tsTypeParameterInstantiation([
              t.tsTypeReference(
                t.identifier("Record"),
                t.tsTypeParameterInstantiation([
                  t.tsStringKeyword(),
                  t.tsAnyKeyword(),
                ])
              ),
            ]);
          }
        }
      } else if (
        t.isMemberExpression(path.node.callee) &&
        t.isIdentifier(path.node.callee.property) &&
        JEST_MOCK_METHODS.includes(path.node.callee.property.name) &&
        t.isIdentifier(path.node.callee.object) &&
        path.node.callee.object.name === "jest"
      ) {
        // remove the extension from jest.mock calls:
        // jest.mock('path/to/file.js') -> jest.mock('path/to/file')
        const firstArgument = path.node.arguments[0];
        if (t.isStringLiteral(firstArgument)) {
          firstArgument.value = firstArgument.value.replace(/\.jsx?$/, "");
        }
      }
    },
    NewExpression(path) {
      migrateArgumentsToParameters(path, reporter, state);
    },
    // return class extends React.Component<{}>
    ClassExpression(path) {
      const { node } = path;
      if (node.superClass && node.superTypeParameters) {
        node.superTypeParameters = migrateTypeParameterInstantiation(
          reporter,
          state,
          node.superTypeParameters as t.TypeParameterInstantiation
        );
      }
    },
  });
}

function migrateArgumentsToParameters(
  path: NodePath<t.NewExpression> | NodePath<t.CallExpression>,
  reporter: MigrationReporter,
  state: State
) {
  if (path.node && path.node.typeArguments) {
    const newCall = path.node;
    newCall.typeParameters = migrateTypeParameterInstantiation(
      reporter,
      state,
      path.node.typeArguments
    );
    newCall.typeArguments = null;
    replaceWith(path, newCall, state.config.filePath, reporter);
  }
}
