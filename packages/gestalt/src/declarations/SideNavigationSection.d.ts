import type { Node } from 'react';
import 'react';
type Props = {
  /**
   * Any [SideNavigation.TopItem](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.TopItem) to be rendered
   */
  children: Node;
  /**
   * Label for the section. See the [Sections](https://gestalt.pinterest.systems/web/sidenavigation#Sections) variant for more info.
   */
  label: string;
};
/**
 * Use [SideNavigation.Section](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.Section) to categorize navigation menu items into groups and also avoid redundant language in labels.
 */
declare function SideNavigationSection({ children, label }: Props): Node;
declare namespace SideNavigationSection {
  var displayName: string;
}
export default SideNavigationSection;
