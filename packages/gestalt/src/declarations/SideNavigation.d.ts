import type { Node } from 'react';
import SideNavigationGroup from './SideNavigationGroup';
import SideNavigationNestedGroup from './SideNavigationNestedGroup';
import SideNavigationNestedItem from './SideNavigationNestedItem';
import SideNavigationSection from './SideNavigationSection';
import SideNavigationTopItem from './SideNavigationTopItem';
export type Props = {
  /**
   * String that clients such as VoiceOver will read to describe the element.
   */
  accessibilityLabel: string;
  /**
   * The content shown in SideNavigation. See [subcomponents](https://gestalt.pinterest.systems/web/sidenavigation#Subcomponents).
   */
  children: Node;
  /**
   * Content to display at the bottom of SideNavigation. Open slot available to display other functionality required in the page. See the [Footer variant](https://gestalt.pinterest.systems/web/sidenavigation#Header) to learn more.
   */
  footer?: Node;
  /**
   * Content to display at the top of SideNavigation. Open slot used for controlling the display of navigation items. See the [Header variant](https://gestalt.pinterest.systems/web/sidenavigation#Header) to learn more.
   */
  header?: Node;
  /**
   * Callback fired when SideNavigation requests to be closed in mobile devices. Must be used to control SideNavigation´s on/off display state. The accessibilityLabel should follow the Accessibility guidelines.
   */
  dismissButton?: {
    accessibilityLabel?: string;
    onDismiss: () => void;
  };
  /**
    /**
     * Displays a border in SideNavigation. See the [Border](https://gestalt.pinterest.systems/web/sidenavigation#Border) variant for more info.
     */
  showBorder?: boolean;
  /**
   * Title for mobile navigation.
   */
  title?: string;
};
/**
 * [SideNavigation](https://gestalt.pinterest.systems/web/sidenavigation) is start-aligned and arranged vertically. It is used to navigate between page urls or sections when you have too many menu items to fit in horizontal [Tabs](https://gestalt.pinterest.systems/web/tabs).
 *
 * **NOTE**This component is on alpha phase, still under developoment. The component will support three levels and keyboard navigation. The component will change behavior and the API might also change in future component version releases.**NOTE**
 *
 * ![SideNavigation light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SideNavigation.spec.mjs-snapshots/SideNavigation-chromium-darwin.png)
 * ![SideNavigation dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SideNavigation-dark.spec.mjs-snapshots/SideNavigation-dark-chromium-darwin.png)
 *
 */
declare function SideNavigation({
  accessibilityLabel,
  children,
  dismissButton,
  footer,
  header,
  showBorder,
  title,
}: Props): Node;
declare namespace SideNavigation {
  var Section: typeof SideNavigationSection;
  var TopItem: typeof SideNavigationTopItem;
  var NestedItem: typeof SideNavigationNestedItem;
  var Group: typeof SideNavigationGroup;
  var NestedGroup: typeof SideNavigationNestedGroup;
}
export default SideNavigation;
