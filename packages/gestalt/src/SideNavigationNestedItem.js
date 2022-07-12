// @flow strict
import { type Node } from 'react';
import SideNavigationItem from './SideNavigationItem.js';

type Props = {|
  /**
   * When set to 'page' or 'section', it displays the item in "active" state. See the [Accessibility](https://gestalt.pinterest.systems/SideNavigation#Accessibility) guidelines to learn more.
   */
  active?: 'page' | 'section',
  /**
   * Directs users to the url when item is selected.
   */
  href: string,
  /**
   * Object detailing the label and value for this item.
   */
  item: {| label: string, value: string |},
  /**
   * Callback when the user selects an item using the mouse or keyboard.
   */
  onSelect: ({|
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
    item: {|
      label: string,
      value: string,
    |},
  |}) => void,
|};

/**
 * Use [SideNavigation.NestedItem](https://gestalt.pinterest.systems/sidenavigation#SideNavigation.NestedItem)
 */
export default function SideNavigationNestedItem({ active, href, item, onSelect }: Props): Node {
  return <SideNavigationItem active={active} href={href} item={item} onSelect={onSelect} />;
}

SideNavigationNestedItem.displayName = 'SideNavigation.NestedItem';
