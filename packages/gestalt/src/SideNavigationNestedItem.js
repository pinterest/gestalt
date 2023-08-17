// @flow strict
import { type AbstractComponent, forwardRef, type Node } from 'react';
import SideNavigationTopItem from './SideNavigationTopItem.js';

type Props = {|
  /**
   * When set to 'page' or 'section', it displays the item in "active" state. See the [Accessibility](https://gestalt.pinterest.systems/web/sidenavigation#Accessibility) guidelines to learn more.
   */
  active?: 'page' | 'section',
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more.
   */
  counter?: {| number: string, accessibilityLabel: string |},
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
  /**
   * Ref that is forwarded to the underlying `li` element.
   */
  ref?: HTMLLIElement, // eslint-disable-line react/no-unused-prop-types
|};

/**
 * Use [SideNavigation.NestedItem](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.NestedItem) to redirect the user to a different page or section. SideNavigation.NestedItem must be used in second and third nested levels.
 */
const SideNavigationNestedItemWithForwardRef: AbstractComponent<Props, HTMLLIElement> = forwardRef<
  Props,
  HTMLLIElement,
>(function SideNavigationNestedItem({ active, counter, href, label, onClick }: Props, ref): Node {
  return (
    <SideNavigationTopItem
      active={active}
      counter={counter}
      href={href}
      label={label}
      onClick={onClick}
      ref={ref}
    />
  );
});

SideNavigationNestedItemWithForwardRef.displayName = 'SideNavigation.NestedItem';

export default SideNavigationNestedItemWithForwardRef;
