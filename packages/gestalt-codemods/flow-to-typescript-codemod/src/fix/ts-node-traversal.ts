import { Node, ts } from "ts-morph";

export function getParentUntil<S extends ts.Node>(
  node: Node<ts.Node> | undefined,
  isKind: (node: ts.Node) => node is S
): Node<S> | undefined {
  if (!node) {
    return;
  }

  if (isKind(node.compilerNode)) {
    return node as Node<S>;
  }

  return getParentUntil(node.getParent(), isKind);
}
