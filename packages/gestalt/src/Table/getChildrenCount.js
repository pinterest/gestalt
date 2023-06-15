// @flow strict
import { Children, Fragment, type Node } from 'react';

function getChildrenCount(children: Node): number {
  // $FlowFixMe[underconstrained-implicit-instantiation]
  const topChildren = Children.toArray(children);
  let nestedChildrenCount = 0;

  topChildren.forEach((child) => {
    // We need to check for Fragment first, so we can check for nested Table.Cell that don't get counted in Children.toArray
    if (child?.type === Fragment) {
      const nestedChildren = child.props.children.reduce(
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
