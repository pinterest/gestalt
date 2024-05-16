import {Children, Fragment, ReactNode} from 'react';
import { ALLOWED_CHILDREN_MAP } from './navigationChildrenUtils';
import { ReactChildArray } from '../utils/flattenChildren';

/** @deprecated */
const getChildrenToArray = (
  {
    children,
    filterLevel,
  }: {
    children: ReactNode,
    filterLevel: "main" | "nested"
  },
): ReactChildArray => {
  const navigationChildren = [];

  let recursionLevel = 0;
  const getChildren: (
    arg1: {
      nodeChildren: ReactNode
    },
  ) => void = ({ nodeChildren }) =>
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
