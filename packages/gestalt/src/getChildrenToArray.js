// @flow strict
import { cloneElement, Children, type Node } from 'react';

const getChildrenToArray = ({ children }: {| children: Node |}): Array<Node> => {
  let hasFirstNavigationItem = false;

  const navigationChildren = [];

  const getChildren = ({ nodeChildren }) =>
    Children.toArray(nodeChildren).forEach((child) => {
      if (child.type.displayName === 'SideNavigation.Section') {
        if (!hasFirstNavigationItem) {
          hasFirstNavigationItem = true;
          navigationChildren.push(child);
        } else {
          navigationChildren.push(cloneElement(child, { _hasMarginTop: true }));
        }
      } else if (child.type.displayName === 'SideNavigation.Item') {
        if (!hasFirstNavigationItem) {
          hasFirstNavigationItem = true;
        }
        navigationChildren.push(child);
      } else if (!child?.type?.displayName?.startsWith('SideNavigation')) {
        getChildren({ nodeChildren: child });
      }
    });

  getChildren({ nodeChildren: children });

  return navigationChildren;
};

export default getChildrenToArray;
