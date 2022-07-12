// @flow strict
import { type Node } from 'react';
import SideNavigationExpandableItem from './SideNavigationExpandableItem.js';

type Props = {|
  /**
   *
   */
  children: Node,
  /**
   * Object detailing the label and value for this item.
   */
  item: {| label: string, value: string |},
|};

/**
 * Use [SideNavigation.ExpandableNestedItem](https://gestalt.pinterest.systems/sidenavigation#SideNavigation.ExpandableNestedItem).
 */
export default function SideNavigationExpandableNestedItem({ children, item }: Props): Node {
  return <SideNavigationExpandableItem item={item}>{children}</SideNavigationExpandableItem>;
}

SideNavigationExpandableNestedItem.displayName = 'SideNavigation.ExpandableNestedItem';
