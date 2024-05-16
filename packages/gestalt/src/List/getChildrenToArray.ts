import { Children, cloneElement, Fragment, ReactNode } from 'react';

const ALLOWED_CHILDREN_BY_PARENT = {
  List: ['List.Item'],
  ListItem: ['List', 'InternalList', 'List.Item'],
} as const;

const getChildrenToArray = ({
  children,
  filterLevel,
}: {
  children: ReactNode;
  filterLevel: 'List' | 'ListItem';
}): ReadonlyArray<any> => {
// @ts-expect-error - TS7034 - Variable 'navigationChildren' implicitly has type 'any[]' in some locations where its type cannot be determined.
  const navigationChildren = [];
  let recursionLevel = 0;

  const getChildren: (arg1: { nodeChildren: ReactNode }) => void = ({ nodeChildren }) =>
    Children.toArray(nodeChildren).forEach((child) => {
      // We need to check for Fragment first, so we can check for display namevalid
// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
      if (child?.type === Fragment) {
        recursionLevel += 1;
        if (recursionLevel < 2) {
// @ts-expect-error - TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
          return getChildren({ nodeChildren: child.props.children });
        }
      }

      // Detect incorrect nested component usage
// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
      if (!ALLOWED_CHILDREN_BY_PARENT[filterLevel].includes(child.type.displayName)) {
        throw new Error(
// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
          `Gestalt ${child.type.displayName} cannot be used within Gestalt ${filterLevel}`,
        );
      }

// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
      if (ALLOWED_CHILDREN_BY_PARENT[filterLevel].includes(child.type.displayName)) {
        if (filterLevel === 'List') {
          return navigationChildren.push(child);
        }

        if (
          filterLevel === 'ListItem' &&
// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
          ['List', 'InternalList'].includes(child.type.displayName)
        ) {
          return navigationChildren.push(child);
        }

// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
        if (filterLevel === 'ListItem' && child.type.displayName === 'List.Item') {
          return navigationChildren.push(child);
        }
      }

// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
      throw new Error(`${child.type.displayName} cannot be used with Gestalt List`);
    });

  getChildren({ nodeChildren: children });

// @ts-expect-error - TS7005 - Variable 'navigationChildren' implicitly has an 'any[]' type.
  return navigationChildren.map((child, idx) => cloneElement(child, { key: idx }));
};

export default getChildrenToArray;
