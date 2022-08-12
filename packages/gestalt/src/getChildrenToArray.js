// @flow strict
import { cloneElement, Children, type Node } from 'react';

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
  let foundFirstNavigationItem = false;

  const navigationChildren = [];

  let recursionLevel = 0;

  const getChildren = ({ nodeChildren }) =>
    Children.toArray(nodeChildren).forEach((child) => {
      // Detect incorrect subcomponent usage
      if (filterLevel === 'nested' && ALLOWED_CHILDREN_MAP.main.includes(child.type.displayName)) {
        throw new Error(`Gestalt ${child.type.displayName} cannot be used in a nested level`);
      }

      if (filterLevel === 'main' && ALLOWED_CHILDREN_MAP.nested.includes(child.type.displayName)) {
        throw new Error(`Gestalt ${child.type.displayName} cannot be used at the top level`);
      }

      // Get and return valid children
      if (filterLevel === 'main' && child.type.displayName === 'SideNavigation.Section') {
        if (!foundFirstNavigationItem) {
          foundFirstNavigationItem = true;
          navigationChildren.push(child);
        } else {
          navigationChildren.push(cloneElement(child, { _hasMarginTop: true }));
        }
      } else if (ALLOWED_CHILDREN_MAP[filterLevel].includes(child.type.displayName)) {
        if (!foundFirstNavigationItem) {
          foundFirstNavigationItem = true;
        }
        navigationChildren.push(child);
      } else if (!child?.type?.displayName?.startsWith('SideNavigation')) {
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
