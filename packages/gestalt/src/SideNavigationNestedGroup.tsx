import { type ReactElement, type ReactNode } from 'react';
import SideNavigationGroup from './SideNavigationGroup';
import { type Indexable } from './zIndex';

type Props = {
  /**
   * When set to 'page' or 'section', it displays the item in "active" state. Available only when `href` prop is present. See the [Accessibility](https://gestalt.pinterest.systems/web/sidenavigation#Accessibility) guidelines to learn more.
   */
  active?: 'page' | 'section';
  /**
   * Content of the group. See [nested directory](#Nested-directory) variant for more information.
   */
  children: ReactNode;
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more.
   */
  counter?: {
    number: string;
    accessibilityLabel: string;
  };
  /**
   * Nested directories can be static or expandable.  See the [group display variant](https://gestalt.pinterest.systems/web/sidenavigation#Group-display) to learn more.
   */
  display?: 'expandable' | 'static';
  /**
   * When passed SideNavigation.Group becomes a controlled component. If not passed, it stays uncontrolled. See the [controlled group display variant](https://gestalt.pinterest.systems/web/sidenavigation#Group-display) to learn more. This functionality is not supported in mobile.
   */
  expanded?: boolean;
  /**
   * Directs users to the url when item is selected. Available only for Desktop.
   */
  href?: string;
  /**
   * Label for the group. See [nested directory](#Nested-directory) variant for more information.
   */
  label: string;
  /**
   * Callback when the user selects an item using the mouse or keyboard. Available only when `href` prop is present.
   */
  onClick?: (arg1: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * Callback fired when the expand button component is clicked and the component is controlled. This functionality is not supported in mobile.
   */
  onExpand?: (arg1: { expanded: boolean }) => void;
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
};

/**
 * Use [SideNavigation.NestedGroup](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.NestedGroup) to hold SideNavigation.NestedItem in the second nested level of Pageheader.
 */
export default function SideNavigationNestedGroup({
  active,
  children,
  counter,
  display = 'expandable',
  expanded,
  label,
  primaryAction,
  href,
  onClick,
  onExpand,
}: Props) {
  return (
    <SideNavigationGroup
      active={active}
      counter={counter}
      display={display}
      expanded={expanded}
      href={href}
      label={label}
      onClick={onClick}
      onExpand={onExpand}
      primaryAction={primaryAction}
    >
      {children}
    </SideNavigationGroup>
  );
}

SideNavigationNestedGroup.displayName = 'SideNavigation.NestedGroup';
