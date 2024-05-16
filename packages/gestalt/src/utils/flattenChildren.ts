import { Children, cloneElement, Fragment, isValidElement, ReactNode } from 'react';

export type ReactChildArray = ReturnType<typeof Children.toArray>;

// Function is copied from "react-keyed-flatten-children" and modified for simplicity
// https://github.com/grrowl/react-keyed-flatten-children/blob/master/index.ts
export function flattenChildrenWithKeys(
  children: ReactNode,
  depth: number = 0,
  keys: ReadonlyArray<string | number> = [],
): ReactChildArray {
  return Children.toArray(children).reduce<Array<any>>((acc, node, nodeIndex) => {
    // @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
    if (node.type === Fragment) {
      acc.push(
        ...flattenChildrenWithKeys(
          // @ts-expect-error - TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
          node.props.children,
          depth + 1,
          // @ts-expect-error - TS2339 - Property 'key' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
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
    // @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
    if (child.type !== Fragment) return acc.concat(child);

    // @ts-expect-error - TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
    return acc.concat(flattenChildren(child.props.children));
  }, []);
}
