import {Children, cloneElement, Fragment, ReactNode} from 'react';

const ALLOWED_CHILDREN_BY_PARENT = {
  List: ['List.Item'],
  ListItem: ['List', 'InternalList', 'List.Item'],
} as const;

const getChildrenToArray = (
  {
    children,
    filterLevel,
  }: {
    children: ReactNode,
    filterLevel: "List" | "ListItem"
  },
): ReadonlyArray<any> => {
  const navigationChildren = [];
  let recursionLevel = 0;

  const getChildren: (
    arg1: {
      nodeChildren: ReactNode
    },
  ) => void = ({ nodeChildren }) =>
    Children.toArray(nodeChildren).forEach((child) => {
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
        if (filterLevel === 'List') {
          return navigationChildren.push(child);
        }

        if (
          filterLevel === 'ListItem' &&
          ['List', 'InternalList'].includes(child.type.displayName)
        ) {
          return navigationChildren.push(child);
        }

        if (filterLevel === 'ListItem' && child.type.displayName === 'List.Item') {
          return navigationChildren.push(child);
        }
      }

      throw new Error(`${child.type.displayName} cannot be used with Gestalt List`);
    });

  getChildren({ nodeChildren: children });

  return navigationChildren.map((child, idx) => cloneElement(child, { key: idx }));
};

export default getChildrenToArray;
