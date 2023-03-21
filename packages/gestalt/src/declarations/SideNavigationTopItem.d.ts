import { $Keys } from 'utility-types';
import type { Element, Node } from 'react';
import Dropdown from './Dropdown';
import icons from './icons/index';
export declare const NESTING_MARGIN_START_MAP: {
  '0': string;
  '1': string;
  '2': string;
};
interface Indexable {
  index(): number;
}
type Props = {
  /**
   * When set to 'page' or 'section', it displays the item in "active" state. See the [Accessibility](https://gestalt.pinterest.systems/web/sidenavigation#Accessibility) guidelines to learn more.
   */
  active?: 'page' | 'section';
  /**
   * When supplied, will display a [Badge](https://gestalt.pinterest.systems/web/badge) next to the item's label. See the [Badges](https://gestalt.pinterest.systems/web/sidenavigation#Badge) variant to learn more.
   */
  badge?: {
    text: string;
    type?: 'info' | 'error' | 'warning' | 'success' | 'neutral';
  };
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
   * When supplied, will display Icon. See the [Icon](https://gestalt.pinterest.systems/web/sidenavigation#Icon) variant to learn more.
   */
  icon?:
    | $Keys<typeof icons>
    | {
        __path: string;
      };
  /**
   *  When supplied, will display a notification dot. See the [Notification](https://gestalt.pinterest.systems/web/sidenavigation#Notification) variant to learn more.
   */
  notificationAccessibilityLabel?: string;
  /**
   * Callback when the user selects an item using the mouse or keyboard.
   */
  onClick?: (arg0: {
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * Label for the item.
   */
  label: string;
  /**
   * The primary action for each item. See the [primary action variant](https://gestalt.pinterest.systems/web/sidenavigation#Primary-action) to learn more.
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
 * Use [SideNavigation.TopItem](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.TopItem) to redirect the user to a different page or section. SideNavigation.TopItem must be used at the top level of SideNavigation. It supports badges, icons, counters, and notifications.
 */
declare function SideNavigationTopItem({
  active,
  href,
  badge,
  counter,
  icon,
  label,
  primaryAction,
  notificationAccessibilityLabel,
  onClick,
}: Props): Node;
declare namespace SideNavigationTopItem {
  var displayName: string;
}
export default SideNavigationTopItem;
