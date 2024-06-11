import { forwardRef, ReactElement } from 'react';
import SideNavigationTopItem from './SideNavigationTopItem';
import { Indexable } from './zIndex';

type Props = {
  /**
   * When set to 'page' or 'section', it displays the item in "active" state. See the [Accessibility](https://gestalt.pinterest.systems/web/sidenavigation#Accessibility) guidelines to learn more.
   */
  active?: 'page' | 'section';
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more.
   */
  counter?: {
    number: string;
    accessibilityLabel: string;
  };
  /**
   * Directs users to the url when item is selected.
   */
  href: string;
  /**
   * Label for the item.
   */
  label: string;
  /**
   * Callback when the user selects an item using the mouse or keyboard.
   */
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * The primary action for each item. See the [primary action variant](https://gestalt.pinterest.systems/web/sidenavigation#Primary-action) to learn more.
   */
  primaryAction?: {
    icon?: 'ellipsis' | 'edit' | 'trash-can';
    onClick?: (arg1: {
      event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
    }) => void;
    tooltip: {
      accessibilityLabel?: string;
      text: string;
      zIndex?: Indexable;
    };
    dropdownItems?: ReadonlyArray<ReactElement>;
  };
  /**
   * Ref that is forwarded to the underlying `li` element.
   */
  ref?: HTMLLIElement; // eslint-disable-line react/no-unused-prop-types
};

/**
 * Use [SideNavigation.NestedItem](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.NestedItem) to redirect the user to a different page or section. SideNavigation.NestedItem must be used in second and third nested levels.
 */
const SideNavigationNestedItemWithForwardRef = forwardRef<HTMLLIElement, Props>(
  function SideNavigationNestedItem(
    { active, counter, href, label, onClick, primaryAction }: Props,
    ref,
  ) {
    return (
      <SideNavigationTopItem
        ref={ref}
        active={active}
        counter={counter}
        href={href}
        label={label}
        onClick={onClick}
        primaryAction={primaryAction}
      />
    );
  },
);

SideNavigationNestedItemWithForwardRef.displayName = 'SideNavigation.NestedItem';

export default SideNavigationNestedItemWithForwardRef;
