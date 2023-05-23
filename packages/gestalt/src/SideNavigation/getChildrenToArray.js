// @flow strict
import { Fragment, Children, type Node } from 'react';

const ALLOWED_CHILDREN_MAP = {
  'main': ['SideNavigation.Section', 'SideNavigation.TopItem', 'SideNavigation.Group'],
  'nested': ['SideNavigation.NestedItem', 'SideNavigation.NestedGroup'],
};

const getChildrenToArray = ({
  children,
  filterLevel,
}: {|
  children: Node,
  filterLevel: 'main' | 'nested',
  // $FlowFixMe[unclear-type] ALBERTO TO FIX FLOW TYPE HERE
|}): $ReadOnlyArray<any> => {
  const navigationChildren = [];

  let recursionLevel = 0;
  const getChildren: ({| nodeChildren: Node |}) => void = ({ nodeChildren }) =>
    // $FlowFixMe[underconstrained-implicit-instantiation]
    Children.toArray(nodeChildren).forEach((child) => {
      // Detect incorrect subcomponent usage at the main level
      if (filterLevel === 'main' && ALLOWED_CHILDREN_MAP.nested.includes(child.type.displayName)) {
        throw new Error(`Gestalt ${child.type.displayName} cannot be used at the top level`);
      }

      // Detect incorrect subcomponent usage at the nested level
      if (filterLevel === 'nested' && ALLOWED_CHILDREN_MAP.main.includes(child.type.displayName)) {
        throw new Error(`Gestalt ${child.type.displayName} cannot be used in a nested level`);
      }

      // Get and return valid children
      if (ALLOWED_CHILDREN_MAP[filterLevel].includes(child.type.displayName)) {
        navigationChildren.push(child);
      } else if (child?.type === Fragment) {
        recursionLevel += 1;
        if (recursionLevel < 2) {
          getChildren({ nodeChildren: child.props.children });
        }
      }
    });

  getChildren({ nodeChildren: children });

  return navigationChildren;
};

export default getChildrenToArray;
