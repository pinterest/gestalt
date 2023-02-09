import * as t from "@babel/types";
import traverse, { NodePath, Scope } from "@babel/traverse";
import { types } from "recast";
import { TransformerInput } from "../transformer";
import MigrationReporter from "../../runner/migration-reporter";
import { logger } from "../../runner/logger";

/**
 * Determine whether the file contains any JSX
 * @param file : File source to check
 */
export function hasJSX({ file }: TransformerInput): boolean {
  let found = false;
  traverse(file, {
    JSXElement() {
      found = true;
    },
    JSXFragment() {
      found = true;
    },
  });

  return found;
}

/**
 * Determine whether function block returns null
 * Helpful when typing React functional components
 */
export function hasNullReturn(
  body: t.BlockStatement,
  scope: Scope | undefined,
  parentPath: NodePath<t.Node> | null | undefined
): boolean {
  let found = false;
  traverse(
    body,
    {
      ReturnStatement(path) {
        if (path.node.argument?.type === "NullLiteral") {
          found = true;
        }
      },
    },
    scope,
    parentPath
  );

  return found;
}

/**
 * Determine whether the file contains any type declarations
 * @param file : File source to check
 */
export function hasDeclaration(file: t.File): boolean {
  let found = false;
  traverse(file, {
    DeclareModule() {
      found = true;
    },
    DeclareExportDeclaration() {
      found = true;
    },
    DeclareClass() {
      found = true;
    },
  });

  return found;
}

/**
 * Construct a TS type identifier.
 * @param name
 * @param optional
 * @param typeAnnotation
 * @returns
 */
export function buildTSIdentifier(
  name: string,
  optional?: boolean | null,
  typeAnnotation?: t.TSTypeAnnotation | null
): t.Identifier {
  const identifier = t.identifier(name);
  if (optional != null) identifier.optional = optional;
  if (typeAnnotation != null) identifier.typeAnnotation = typeAnnotation;
  return identifier;
}

/**
 * Is this a literal expression? Includes literal objects and functions.
 */
export function isComplexLiteral(expression: t.Expression): boolean {
  if (t.isLiteral(expression)) {
    return true;
  }
  if (expression.type === "Identifier" && expression.name === "undefined") {
    return true;
  }

  if (expression.type === "ArrayExpression") {
    for (const element of expression.elements) {
      if (element === null) {
        continue;
      }
      if (element.type === "SpreadElement") {
        if (!isComplexLiteral(element.argument)) {
          return false;
        } else {
          continue;
        }
      }
      if (!isComplexLiteral(element)) {
        return false;
      }
    }
    return true;
  }

  if (expression.type === "ObjectExpression") {
    for (const property of expression.properties) {
      if (property.type === "ObjectMethod") {
        return false;
      } else if (property.type === "SpreadElement") {
        return false;
      } else {
        if (property.computed && !isComplexLiteral(property.key)) {
          return false;
        }
        if (
          t.isExpression(property.value) &&
          !isComplexLiteral(property.value)
        ) {
          return false;
        }
      }
    }
    return true;
  }

  return false;
}

/**
 * Are we inside `createReactClass()`?
 */
export function isInsideCreateReactClass(path: NodePath<t.Node>): boolean {
  if (
    path.node.type === "CallExpression" &&
    path.node.callee.type === "Identifier" &&
    path.node.callee.name === "createReactClass"
  ) {
    return true;
  }

  if (path.parentPath) {
    return isInsideCreateReactClass(path.parentPath);
  }

  return false;
}

/**
 * Copies the location and comments of one node to a new node.
 */
export function inheritLocAndComments(oldNode: t.Node, newNode: t.Node) {
  newNode.loc = oldNode.loc;

  // Recast uses a different format for comments then Babel.
  if ("comments" in oldNode) {
    // @ts-expect-error comments doesn't exist on babel type
    newNode.comments = oldNode.comments;
    delete oldNode.comments;
  }
}

export function addCommentsAtHeadOfNode(
  rootNode: types.namedTypes.Node | undefined,
  comments: (types.namedTypes.CommentBlock | types.namedTypes.CommentLine)[]
) {
  if (rootNode !== undefined) {
    rootNode.comments = rootNode.comments || [];
    rootNode.comments.unshift(...comments);
  } else {
    logger.warn(`Cannot add comments ${comments} to empty node!`);
  }
}

export function addEmptyLineInProgramPath(path: NodePath<t.Program>) {
  path.unshiftContainer("body", t.noop());
}

/**
 * Recast uses a different format for comments. We need to manually copy them over to the new node.
 * We also attach the old location so that Recast prints it at the same place.
 *
 * https://github.com/benjamn/recast/issues/572
 */
export function replaceWith(
  path: NodePath<t.Node>,
  node: t.Node,
  filePath: string,
  reporter: MigrationReporter
) {
  inheritLocAndComments(path.node, node);
  try {
    path.replaceWith(node);
  } catch (e) {
    // Catch the error so conversion of the file can continue.
    reporter.error(filePath, e);
  }
}

/**
 * Tries to return the nearest LOC, and returns a default if not found.
 */
export function getLoc<TNodeType extends t.Node>(
  node: TNodeType
): t.SourceLocation {
  return (
    node.loc ??
    (node as t.FunctionDeclaration).body?.loc ?? {
      start: {
        line: 0,
        column: 0,
      },
      end: {
        line: 0,
        column: 0,
      },
    }
  );
}

export const GlobalTypes = {
  TimeoutID: "number",
  IntervalID: "number",
  ImmediateID: "number",
  immediateID: "number",
  AnimationFrameID: "number",
  RequestOptions: "RequestInit",
} as const;

export const LiteralTypes = {
  String: "string",
  Number: "number",
  Boolean: "boolean",
  Symbol: "symbol",
} as const;

export const JEST_MOCK_METHODS = ["mock", "requireActual"];
