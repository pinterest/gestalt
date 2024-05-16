import { Children, Fragment, ReactNode } from 'react';

function getChildrenCount(children: ReactNode): number {
  const topChildren = Children.toArray(children);
  let nestedChildrenCount = 0;

  topChildren.forEach((child) => {
    // We need to check for Fragment first, so we can check for nested Table.Cell that don't get counted in Children.toArray
    // @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
    if (child?.type === Fragment) {
      // @ts-expect-error - TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
      const nestedChildren = child.props.children.reduce(
        // @ts-expect-error - TS7006 - Parameter 'accumulator' implicitly has an 'any' type. | TS7006 - Parameter 'currentValue' implicitly has an 'any' type.
        (accumulator, currentValue) =>
          currentValue?.type?.displayName === 'Table.Cell' ? 1 + accumulator : accumulator,
        -1,
      );
      nestedChildrenCount += nestedChildren;
    }
  });

  return topChildren.length + nestedChildrenCount;
}

export default getChildrenCount;
