import { $Keys } from 'utility-types';
import type { Element, Node } from 'react';
import Dropdown from './Dropdown';
import icons from './icons/index';
interface Indexable {
  index(): number;
}
type IconType =
  | $Keys<typeof icons>
  | {
      __path: string;
    };
type Display = 'expandable' | 'static';
type BadgeType = {
  text: string;
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral';
};
type Counter = {
  number: string;
  accessibilityLabel: string;
};
export type Props = {
  /**
   * When supplied, will display a [Badge](https://gestalt.pinterest.systems/web/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/web/sidenavigation#Badge) variant to learn more.
   */
  badge?: BadgeType;
  /**
   * Content of the group. See [nested directory](https://gestalt.pinterest.systems/web/sidenavigation#Nested-directory) variant for more information.
   */
  children: Node;
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more.
   */
  counter?: Counter;
  /**
   * Nested directories can be static or expandable. See [nested directory](https://gestalt.pinterest.systems/web/sidenavigation#Nested-directory) variant for more information.
   */
  display?: Display;
  /**
   * When supplied, will display Icon. See the [Icon](https://gestalt.pinterest.systems/web/sidenavigation#Icon) variant to learn more.
   */
  icon?: IconType;
  /**
   * Label for the group. See [nested directory](https://gestalt.pinterest.systems/web/sidenavigation#Nested-directory) variant for more information.
   */
  label: string;
  /**
   *  When supplied, will display a notification dot. See the [Notification](https://gestalt.pinterest.systems/web/sidenavigation#Notification) variant to learn more.
   */
  notificationAccessibilityLabel?: string;
  /**
   * The primary action for each group. See the [primary action variant](https://gestalt.pinterest.systems/web/sidenavigation#Primary-action) to learn more.
   */
  primaryAction?: {
    icon?: 'ellipsis' | 'edit' | 'trash-can';
    onClick?: (arg0: {
      event:
        | React.MouseEvent<HTMLDivElement>
        | React.KeyboardEvent<HTMLDivElement>
        | React.MouseEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLAnchorElement>;
    }) => void;
    tooltip: {
      accessibilityLabel?: string;
      text: string;
      zIndex?: Indexable;
    };
    dropdownItems?: ReadonlyArray<Element<typeof Dropdown.Item>>;
  };
};
/**
 * Use [SideNavigation.Group](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.Group) to hold SideNavigation.NestedItem and SideNavigation.NestedGroup at the top level of SideNavigation. It supports badges, icons, counters, and notifications.
 */
declare function SideNavigationGroup({
  badge,
  children,
  counter,
  display,
  icon,
  notificationAccessibilityLabel,
  label,
  primaryAction,
}: Props): Node;
declare namespace SideNavigationGroup {
  var displayName: string;
}
export default SideNavigationGroup;
