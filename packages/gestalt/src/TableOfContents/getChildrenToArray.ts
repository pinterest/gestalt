import { Children, cloneElement, Fragment, ReactNode } from 'react';

const ALLOWED_CHILDREN = ['TableOfContents.Item'];

const getChildrenToArray = ({ children }: { children: ReactNode }): ReadonlyArray<any> => {
// @ts-expect-error - TS7034 - Variable 'childrenArray' implicitly has type 'any[]' in some locations where its type cannot be determined.
  const childrenArray = [];
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

// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
      if (ALLOWED_CHILDREN.includes(child.type.displayName)) {
        return childrenArray.push(child);
      }

// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
      throw new Error(`${child.type.displayName} cannot be used with Gestalt TableOfContents`);
    });

  getChildren({ nodeChildren: children });

// @ts-expect-error - TS7005 - Variable 'childrenArray' implicitly has an 'any[]' type.
  return childrenArray.map((child, idx) => cloneElement(child, { key: idx }));
};

export default getChildrenToArray;
