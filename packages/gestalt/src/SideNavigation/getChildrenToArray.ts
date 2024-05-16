import { Children, Fragment, ReactNode } from 'react';
import { ALLOWED_CHILDREN_MAP } from './navigationChildrenUtils';
import { ReactChildArray } from '../utils/flattenChildren';

/** @deprecated */
const getChildrenToArray = ({
  children,
  filterLevel,
}: {
  children: ReactNode;
  filterLevel: 'main' | 'nested';
}): ReactChildArray => {
// @ts-expect-error - TS7034 - Variable 'navigationChildren' implicitly has type 'any[]' in some locations where its type cannot be determined.
  const navigationChildren = [];

  let recursionLevel = 0;
  const getChildren: (arg1: { nodeChildren: ReactNode }) => void = ({ nodeChildren }) =>
    Children.toArray(nodeChildren).forEach((child) => {
      // Detect incorrect subcomponent usage at the main level
// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
      if (filterLevel === 'main' && ALLOWED_CHILDREN_MAP.nested.includes(child.type.displayName)) {
// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
        throw new Error(`Gestalt ${child.type.displayName} cannot be used at the top level`);
      }

      // Detect incorrect subcomponent usage at the nested level
// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
      if (filterLevel === 'nested' && ALLOWED_CHILDREN_MAP.main.includes(child.type.displayName)) {
// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
        throw new Error(`Gestalt ${child.type.displayName} cannot be used in a nested level`);
      }

      // Get and return valid children
// @ts-expect-error - TS2345 - Argument of type 'any' is not assignable to parameter of type 'never'. | TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
      if (ALLOWED_CHILDREN_MAP[filterLevel].includes(child.type.displayName)) {
        navigationChildren.push(child);
// @ts-expect-error - TS2339 - Property 'type' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
      } else if (child?.type === Fragment) {
        recursionLevel += 1;
        if (recursionLevel < 2) {
// @ts-expect-error - TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
          getChildren({ nodeChildren: child.props.children });
        }
      }
    });

  getChildren({ nodeChildren: children });

// @ts-expect-error - TS7005 - Variable 'navigationChildren' implicitly has an 'any[]' type.
  return navigationChildren;
};

export default getChildrenToArray;
