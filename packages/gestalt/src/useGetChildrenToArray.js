// @flow strict
import { cloneElement, Children, type Node } from 'react';

const ALLOWED_CHILDREN_MAP = {
  'main': ['SideNavigation.Section', 'SideNavigation.Item', 'SideNavigation.ExpandableItem'],
  'nested': ['SideNavigation.NestedItem', 'SideNavigation.ExpandableNestedItem'],
};

const useGetChildrenToArray = ({
  children,
  filterLevel,
}: {|
  children: Node,
  filterLevel: 'main' | 'nested',
|}): $ReadOnlyArray<Node> => {
  let hasFirstNavigationItem = false;

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
        if (!hasFirstNavigationItem) {
          hasFirstNavigationItem = true;
          navigationChildren.push(child);
        } else {
          navigationChildren.push(cloneElement(child, { _hasMarginTop: true }));
        }
      } else if (ALLOWED_CHILDREN_MAP[filterLevel].includes(child.type.displayName)) {
        if (!hasFirstNavigationItem) {
          hasFirstNavigationItem = true;
        }
        navigationChildren.push(child);
      } else if (!child?.type?.displayName?.startsWith('SideNavigation')) {
        recursionLevel += 1;
        if (recursionLevel < 2) {
          return getChildren({ nodeChildren: child.props.children });
        }
      }
      return;
    });

  getChildren({ nodeChildren: children });

  return navigationChildren;
};

export default useGetChildrenToArray;
