// @flow strict
import { type Node } from 'react';
import SideNavigationTopItem from './SideNavigationTopItem.js';

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
   * Label for the item.
   */
  label: string,
  /**
   * Callback when the user selects an item using the mouse or keyboard.
   */
  onClick?: ({|
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  |}) => void,
|};

/**
 * Use [SideNavigation.NestedItem](https://gestalt.pinterest.systems/sidenavigation#SideNavigation.NestedItem)
 */
export default function SideNavigationNestedItem({ active, href, label, onClick }: Props): Node {
  return <SideNavigationTopItem active={active} href={href} label={label} onClick={onClick} />;
}

SideNavigationNestedItem.displayName = 'SideNavigation.NestedItem';
