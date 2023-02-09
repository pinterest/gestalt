import * as t from "@babel/types";
import { NodePath } from "@babel/traverse";
import MigrationReporter from "../../runner/migration-reporter";
import { State } from "../../runner/state";
import { flowTypeAtPos } from "./type-at-pos";
import { migrateType } from "../migrate/type";

/**
 * There are some cases where it's fine if variables or parameters don't have a type
 * These are often cases where the parent of the node provides a type
 * In these cases we want to avoid annotating a type from Flow, which is often different
 * and just ends up causing more errors. Flow is also slow to query so this helps
 * reduce calls.
 */
function parentProvidesImplicitType(path: NodePath<t.Node>): boolean {
  const parent = path.parentPath;
  switch (parent?.node.type) {
    case "VariableDeclarator":
      return (
        t.isIdentifier(parent.node.id) && parent.node.id.typeAnnotation != null
      );
    case "CallExpression":
      return (
        t.isIdentifier(parent.node.callee) &&
        parent.node.callee.typeAnnotation != null
      );
    case "AssignmentExpression":
      return (
        t.isIdentifier(parent.node.left) &&
        parent.node.left.typeAnnotation != null
      );
    case "TSAsExpression":
    case "TypeCastExpression":
    case "ObjectProperty":
    case "JSXExpressionContainer":
      return true;
    case "ClassProperty":
    case "ClassPrivateProperty":
      return parent.node.typeAnnotation != null;
    case "ArrowFunctionExpression":
      return parent.node.returnType != null;

    // Currently we don’t support type annotations in object properties
    // case 'ObjectProperty':
    // case 'ObjectExpression':
    //   return parentProvidesImplicitType(parent);
  }

  return false;
}

/**
 * Adds a type annotation to all unannotated function parameters.
 */
export function annotateParamsWithFlowTypeAtPos(
  reporter: MigrationReporter,
  state: State,
  params: t.ClassMethod["params"],
  path: NodePath,
  isInsideCreateReactClass?: boolean
): Promise<unknown> {
  if (!isInsideCreateReactClass && parentProvidesImplicitType(path)) {
    return Promise.resolve();
  }

  if (state.config.disableFlow) {
    for (const param of params) {
      if (param.type === "Identifier" && !param.typeAnnotation) {
        param.typeAnnotation = t.tsTypeAnnotation(t.tsUnknownKeyword());
        reporter.disableFlowCheck(state.config.filePath, param.loc!);
      }
    }

    return Promise.resolve();
  }

  const awaitPromises: Array<Promise<void>> = [];

  for (const param of params) {
    if (param.type === "Identifier" && !param.typeAnnotation) {
      awaitPromises.push(
        (async () => {
          // Get the type Flow is inferring for this unannotated function parameter.
          const flowType = await flowTypeAtPos(state, param.loc!, reporter);
          if (flowType === null) return;

          // If Flow inferred `empty` then that means there were no calls to the
          // function and therefore no “lower type bounds” for the parameter. This
          // means you can do anything with the type effectively making it any. So
          // treat it as such.
          const tsType =
            flowType.type === "EmptyTypeAnnotation"
              ? t.tsAnyKeyword()
              : migrateType(reporter, state, flowType);

          // Add the type annotation! Yaay.
          param.typeAnnotation = t.tsTypeAnnotation(tsType);
        })()
      );
    }
  }

  return Promise.all(awaitPromises);
}
