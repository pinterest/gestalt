import type { Node } from 'react';
import 'react';
type Props = {
  /**
   * Content of the group. See [nested directory](#Nested-directory) variant for more information.
   */
  children: Node;
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more.
   */
  counter?: {
    number: string;
    accessibilityLabel: string;
  };
  /**
   * Nested directories can be static or expandable. See [nested directory](#Nested-directory) variant for more information.
   */
  display?: 'expandable' | 'static';
  /**
   * Label for the group. See [nested directory](#Nested-directory) variant for more information.
   */
  label: string;
};
/**
 * Use [SideNavigation.NestedGroup](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.NestedGroup) to hold SideNavigation.NestedItem in the second nested level of Pageheader.
 */
declare function SideNavigationNestedGroup({ children, counter, display, label }: Props): Node;
declare namespace SideNavigationNestedGroup {
  var displayName: string;
}
export default SideNavigationNestedGroup;
