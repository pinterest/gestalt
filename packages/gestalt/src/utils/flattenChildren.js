// @flow strict
import { Children, cloneElement, Fragment, isValidElement, type Node as ReactNode } from 'react';

export type ReactChildArray = ReturnType<typeof Children.toArray>;

// Function is copied from "react-keyed-flatten-children" and modified for simplicity
// https://github.com/grrowl/react-keyed-flatten-children/blob/master/index.ts
export function flattenChildrenWithKeys(
  children: ReactNode,
  depth: number = 0,
  keys: $ReadOnlyArray<string | number> = [],
): ReactChildArray {
  // $FlowFixMe[underconstrained-implicit-instantiation]
  return Children.toArray(children).reduce((acc, node, nodeIndex) => {
    if (node.type === Fragment) {
      acc.push(
        ...flattenChildrenWithKeys(
          node.props.children,
          depth + 1,
          keys.concat(node.key || nodeIndex),
        ),
      );
    } else if (isValidElement(node)) {
      acc.push(
        cloneElement(node, {
          key: keys.concat(String(node.key)).join('.'),
        }),
      );
    } else if (typeof node === 'string' || typeof node === 'number') {
      // $FlowFixMe[incompatible-call]
      acc.push(node);
    }

    return acc;
  }, []);
}

export default function flattenChildren(children: ReactNode): ReactChildArray {
  // $FlowFixMe[underconstrained-implicit-instantiation]
  return Children.toArray(children).reduce((acc, child) => {
    if (child.type !== Fragment) return acc.concat(child);

    return acc.concat(flattenChildren(child.props.children));
  }, []);
}
