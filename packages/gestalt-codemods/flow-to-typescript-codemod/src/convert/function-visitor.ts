import * as t from "@babel/types";
import { NodePath } from "@babel/traverse";
import {
  FunctionDeclaration,
  FunctionExpression,
  ArrowFunctionExpression,
  ClassMethod,
} from "@babel/types";
import MigrationReporter from "../runner/migration-reporter";
import { State } from "../runner/state";
import { annotateParamsWithFlowTypeAtPos } from "./flow/annotate-params";
import { handleAsyncReturnType } from "./utils/handle-async-function-return-type";
import { getLoc } from "./utils/common";

type FunctionVisitorProps = {
  awaitPromises: Array<Promise<unknown>>;
  reporter: MigrationReporter;
  state: State;
};

export const functionVisitor = <
  TNodeType extends
    | FunctionExpression
    | FunctionDeclaration
    | ArrowFunctionExpression
    | ClassMethod
>({
  awaitPromises,
  reporter,
  state,
}: FunctionVisitorProps) => ({
  enter(path: NodePath<TNodeType>) {
    // Add Flow’s inferred type for all unannotated function parameters...

    // `function f(x, y, z)` → `function f(x: any, y: any, z: any)`
    //
    // TypeScript can’t infer unannotated function parameters unlike Flow. We accept lower
    // levels of soundness in type files. We’ll manually annotate non-test files.
    if (state.config.isTestFile) {
      for (const param of path.node.params) {
        if (!(param as t.Identifier).typeAnnotation) {
          (param as t.Identifier).typeAnnotation = t.tsTypeAnnotation(
            t.tsAnyKeyword()
          );
        }
      }
      return;
    }

    // In Flow, class constructors can have a return type (usually void).
    // This is an error in TS.
    if (
      path.node.type === "ClassMethod" &&
      t.isIdentifier(path.node.key) &&
      path.node.key.name === "constructor"
    ) {
      delete path.node.returnType;
    }

    // In Flow, if a class has type parameters (class Foo<T>), then static methods can use those
    // types in their declaration. In TypeScript, the static method needs those same parameters declared
    // static foo<T>(bar: T)
    // in order to use them. When we see a static method, we check if the class has parameters and apply them.
    if (path.node.type === "ClassMethod" && path.node.static) {
      if (path.parentPath.type === "ClassBody") {
        const classDeclaration = path.parentPath.parentPath?.node;
        if (classDeclaration && classDeclaration.type === "ClassDeclaration") {
          if (
            classDeclaration.typeParameters &&
            classDeclaration.typeParameters.type ===
              "TypeParameterDeclaration" &&
            classDeclaration.typeParameters.params.length > 0
          ) {
            // The class has type parameters, if the static function doesn't declare them we need to declare them
            if (!path.node.typeParameters) {
              path.node.typeParameters = classDeclaration.typeParameters;
            }
          }
        }
      }
    }

    // If parent is a CallExpression, we are passing a function into a function. TS typically
    // can infer accurate arguments that will cause fewer issues than types inferred by Flow,
    // as well as maintain the original intention of the author
    if (path.parentPath.node.type !== "CallExpression") {
      awaitPromises.push(
        annotateParamsWithFlowTypeAtPos(reporter, state, path.node.params, path)
      );
    }

    if (path.node.async) {
      handleAsyncReturnType(
        path.node,
        reporter,
        state.config.filePath,
        getLoc(path.node)
      );
    }
  },
  exit(path: NodePath<TNodeType>) {
    let optional = true;
    // `function f(a?: T, b: U)` → `function f(a: T | undefined, b: U)`
    for (const param of path.node.params.slice().reverse()) {
      let paramIsOptional = false;

      if (param.type === "AssignmentPattern") {
        paramIsOptional = true;
        if (param.left.type === "Identifier" && param.left.optional) {
          param.left.optional = false;
        } else if (
          t.isObjectExpression(param.right) &&
          t.isObjectPattern(param.left)
        ) {
          if (param.right.properties.length === 0) {
            // If we are assigning a param to an empty object: function f({stuff}: {stuff: Type} = {})
            // check if the type annotation assigned to the left is an object type annotation
            if (
              t.isTypeAnnotation(param.left.typeAnnotation) &&
              t.isObjectTypeAnnotation(param.left.typeAnnotation.typeAnnotation)
            ) {
              // if it is go through each property and check if any aren't optional
              for (const prop of param.left.typeAnnotation.typeAnnotation
                .properties) {
                // for each required property report a warning
                if (t.isObjectTypeProperty(prop) && !prop.optional) {
                  reporter.requiredPropInOptionalAssignment(
                    state.config.filePath,
                    param.loc!
                  );
                }
              }
            }
          }
        }
      }
      // This next block is somewhat complicated, but basically inspects the parameters to
      // determine what combination of optional / null / undefined they should be.
      // Flow and TypeScript handle optional parameters differently, and in TS we need to make sure
      // an optional parameter is not followed by a non-optional one since in TS optional can be omitted.
      if (param.type === "Identifier" && param.typeAnnotation) {
        const isNullable =
          param.typeAnnotation.type === "TypeAnnotation" &&
          param.typeAnnotation.typeAnnotation.type === "NullableTypeAnnotation";
        const hasVoid =
          param.typeAnnotation.type === "TypeAnnotation" &&
          param.typeAnnotation.typeAnnotation.type === "UnionTypeAnnotation" &&
          param.typeAnnotation.typeAnnotation.types.some(
            (unionType) => unionType.type === "VoidTypeAnnotation"
          );
        paramIsOptional = param.optional || isNullable || hasVoid;
      }

      if (!paramIsOptional) {
        optional = false;
      } else if (!optional) {
        const identifier: Partial<t.Identifier> = (
          param.type === "AssignmentPattern" ? param.left : param
        ) as t.Identifier;
        delete identifier.optional;

        if (
          identifier.typeAnnotation &&
          identifier.typeAnnotation.type === "TSTypeAnnotation"
        ) {
          if (identifier.typeAnnotation.typeAnnotation.type === "TSUnionType") {
            identifier.typeAnnotation.typeAnnotation.types.push(
              t.tsUndefinedKeyword()
            );
          } else {
            identifier.typeAnnotation.typeAnnotation = t.tsUnionType([
              identifier.typeAnnotation.typeAnnotation,
              t.tsUndefinedKeyword(),
            ]);
          }
        } else if (
          identifier.typeAnnotation &&
          identifier.typeAnnotation.type === "TypeAnnotation"
        ) {
          if (
            identifier.typeAnnotation.typeAnnotation.type ===
            "NullableTypeAnnotation"
          ) {
            identifier.typeAnnotation.typeAnnotation = t.unionTypeAnnotation([
              identifier.typeAnnotation.typeAnnotation.typeAnnotation,
              t.nullLiteralTypeAnnotation(),
              t.genericTypeAnnotation(t.identifier("undefined")),
            ]);
          } else if (
            identifier.typeAnnotation.typeAnnotation.type ===
            "UnionTypeAnnotation"
          ) {
            identifier.typeAnnotation.typeAnnotation.types =
              identifier.typeAnnotation.typeAnnotation.types.filter(
                (unionType) => unionType.type !== "VoidTypeAnnotation"
              );
            identifier.typeAnnotation.typeAnnotation = t.unionTypeAnnotation([
              identifier.typeAnnotation.typeAnnotation,
              t.genericTypeAnnotation(t.identifier("undefined")),
            ]);
          } else {
            identifier.typeAnnotation.typeAnnotation = t.unionTypeAnnotation([
              identifier.typeAnnotation.typeAnnotation,
              t.nullLiteralTypeAnnotation(),
              t.genericTypeAnnotation(t.identifier("undefined")),
            ]);
          }
        }
      }
    }

    // let us fix return types for functions that return objects
    if (
      (t.isObjectExpression(path.node.body) &&
        (path.node.returnType || path.node.typeParameters)) ||
      (path.node.extra?.parenthesized && t.isExpression(path.node.body))
    ) {
      path.node.extra = { ...path.node.extra, parenthesized: false };
      path.node.body = t.parenthesizedExpression(path.node.body);
    }
  },
});
