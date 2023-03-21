import type { Node } from 'react';
import 'react';
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
  onClick?: (arg0: {
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
};
/**
 * Use [SideNavigation.NestedItem](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.NestedItem) to redirect the user to a different page or section. SideNavigation.NestedItem must be used in second and third nested levels.
 */
declare function SideNavigationNestedItem({ active, counter, href, label, onClick }: Props): Node;
declare namespace SideNavigationNestedItem {
  var displayName: string;
}
export default SideNavigationNestedItem;
