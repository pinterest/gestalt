// @flow strict
import { Children, cloneElement, Fragment, type Node } from 'react';

const ALLOWED_CHILDREN = ['TableOfContents.Item'];

const getChildrenToArray = ({
  children,
}: {|
  children: Node,
  // $FlowFixMe[unclear-type] ALBERTO TO FIX FLOW TYPE HERE
|}): $ReadOnlyArray<any> => {
  const childrenArray = [];
  let recursionLevel = 0;

  const getChildren: ({| nodeChildren: Node |}) => void = ({ nodeChildren }) =>
    // $FlowFixMe[underconstrained-implicit-instantiation]
    Children.toArray(nodeChildren).forEach((child) => {
      // We need to check for Fragment first, so we can check for display namevalid
      if (child?.type === Fragment) {
        recursionLevel += 1;
        if (recursionLevel < 2) {
          return getChildren({ nodeChildren: child.props.children });
        }
      }

      if (ALLOWED_CHILDREN.includes(child.type.displayName)) {
        return childrenArray.push(child);
      }

      throw new Error(`${child.type.displayName} cannot be used with Gestalt TableOfContents`);
    });

  getChildren({ nodeChildren: children });

  return childrenArray.map((child, idx) => cloneElement(child, { key: idx }));
};

export default getChildrenToArray;
