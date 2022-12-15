// @flow strict
import { cloneElement, Fragment, Children, type Node } from 'react';

const ALLOWED_CHILDREN_BY_PARENT = {
  List: ['List.Item'],
  NestedList: ['List.Item'],
  ListItem: ['List.Item', 'List.NestedList'],
};

const getChildrenToArray = ({
  children,
  filterLevel,
}: {|
  children: Node,
  filterLevel: 'List' | 'NestedList' | 'ListItem',
  // $FlowFixMe[unclear-type] ALBERTO TO FIX FLOW TYPE HERE
|}): $ReadOnlyArray<any> => {
  const navigationChildren = [];
  let recursionLevel = 0;

  const getChildren = ({ nodeChildren }) => {
    return Children.toArray(nodeChildren).forEach((child) => {
      // We need to check for Fragment first, so we can check for display namevalid
      if (child?.type === Fragment) {
        recursionLevel += 1;
        if (recursionLevel < 2) {
          return getChildren({ nodeChildren: child.props.children });
        }
      }

      // Detect incorrect nested component usage
      if (!ALLOWED_CHILDREN_BY_PARENT[filterLevel].includes(child.type.displayName)) {
        throw new Error(
          `Gestalt ${child.type.displayName} cannot be used within Gestalt ${filterLevel}`,
        );
      }

      if (ALLOWED_CHILDREN_BY_PARENT[filterLevel].includes(child.type.displayName)) {
        if (['List', 'NestedList'].includes(filterLevel)) {
          return navigationChildren.push(child);
        }

        if (filterLevel === 'ListItem' && child.type.displayName === 'List.NestedList') {
          return navigationChildren.push(child);
        }

        if (filterLevel === 'ListItem' && child.type.displayName === 'List.Item') {
          return navigationChildren.push(child);
        }
      }

      throw new Error(`${child.type.displayName} cannot be used with Gestalt List`);
    });
  };

  getChildren({ nodeChildren: children });

  return navigationChildren.map((child, idx) => cloneElement(child, { key: idx }));
};

export default getChildrenToArray;
