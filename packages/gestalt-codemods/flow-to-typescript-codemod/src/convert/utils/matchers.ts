import * as t from "@babel/types";

export function isIdentifierNamed(name: string) {
  return (node: t.TSEntityName) => t.isIdentifier(node) && node.name === name;
}

/**
 * Utility for quickly checking qualifed type like React.Node
 * @param leftName - Left side of the type, e.g. React
 * @param rightName - Right side of the type
 */
export function matchesFullyQualifiedName(leftName: string, rightName: string) {
  const leftMatcher = isIdentifierNamed(leftName);
  const rightMatcher = isIdentifierNamed(rightName);
  return (node: t.Identifier | t.TSQualifiedName) =>
    t.isTSQualifiedName(node) &&
    leftMatcher(node.left) &&
    rightMatcher(node.right);
}
