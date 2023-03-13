import type { Node } from 'react';
declare type OnChangeHandler = (arg0: {
  event:
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>
    | React.MouseEvent<HTMLDivElement>
    | React.KeyboardEvent<HTMLDivElement>;
  readonly activeTabIndex: number;
  dangerouslyDisableOnNavigation: () => void;
}) => void;
declare type BgColor = 'default' | 'transparent';
declare type Props = {
  /**
   * The index of the active tab.
   */
  activeTabIndex: number;
  /**
   * If Tabs is displayed in a container with a colored background, use this prop to remove the white tab background. See the [background color example](https://gestalt.pinterest.systems/web/tabs#Background-color) to learn more.
   */
  bgColor?: BgColor;
  /**
   * If your app requires client navigation, be sure to use [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) and/or `onChange` to navigate instead of getting a full page refresh just using `href`.
   */
  onChange: OnChangeHandler;
  /**
   * The array of tabs to be displayed. The active tab (as indicated by `activeTabIndex`) will be underlined. Use the optional `indicator` field to show a notification of new items on the tab — see the [indicator variant](https://gestalt.pinterest.systems/web/tabs#Indicator) to learn more. Though `text` currently accepts a React.Node, this is deprecated and will be replaced by a simple `string` type soon.
   */
  tabs: ReadonlyArray<{
    href: string;
    id?: string;
    indicator?: 'dot' | number;
    ref?: {
      current: HTMLElement | null | undefined;
    };
    text: Node;
  }>;
  /**
   * By default, tabs will all try to fit onto one line. Use this prop to allow the items to wrap onto multiple lines, from top to bottom.
   */
  wrap?: boolean;
};
/**
 * [Tabs](https://gestalt.pinterest.systems/web/tabs) may be used navigate between multiple URLs. Tabs are intended as page-level navigation - if you're looking at just switching panels of content, please use [SegmentedControl](https://gestalt.pinterest.systems/web/segmentedcontrol).
 *
 * ![Tabs light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tabs.spec.mjs-snapshots/Tabs-chromium-darwin.png)
 * ![Tabs dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Tabs-dark.spec.mjs-snapshots/Tabs-dark-chromium-darwin.png)
 *
 */
export default function Tabs({ activeTabIndex, bgColor, onChange, tabs, wrap }: Props): Node;
export {};
