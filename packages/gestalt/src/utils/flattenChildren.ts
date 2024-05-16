import {Children, cloneElement, Fragment, isValidElement, ReactNode} from 'react';

export type ReactChildArray = ReturnType<typeof Children.toArray>;

// Function is copied from "react-keyed-flatten-children" and modified for simplicity
// https://github.com/grrowl/react-keyed-flatten-children/blob/master/index.ts
export function flattenChildrenWithKeys(
  children: ReactNode,
  depth: number = 0,
  keys: ReadonlyArray<string | number> = [],
): ReactChildArray {
  return Children.toArray(children).reduce<Array<any>>((acc, node, nodeIndex) => {
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
      acc.push(node);
    }

    return acc;
  }, []);
}

/**
 * Do not use if the children need to be rendered.
 * Use `flattenChildrenWithKeys` to render
 * as it assigns keys to the children without keys.
 * */
export default function flattenChildren(children: ReactNode): ReactChildArray {
  return Children.toArray(children).reduce<Array<any>>((acc, child) => {
    if (child.type !== Fragment) return acc.concat(child);

    return acc.concat(flattenChildren(child.props.children));
  }, []);
}
