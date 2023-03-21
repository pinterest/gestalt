import type { Element, Node } from 'react';
import Text from './Text';
type DismissButtonType = {
  accessibilityLabel: string;
  onDismiss: () => void;
};
type HelperLinkType = {
  accessibilityLabel: string;
  href: string;
  onClick?: (arg0: {
    event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  target?: null | 'self' | 'blank';
  text: string;
};
type PrimaryActionType = {
  accessibilityLabel: string;
  disabled?: boolean;
  href?: string;
  label: string;
  onClick?: (arg0: {
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  rel?: 'none' | 'nofollow';
  target?: null | 'self' | 'blank';
};
type Props = {
  /**
   * Adds a dismiss button to SlimBanner. See the [Dismissible variant](https://gestalt.pinterest.systems/web/slimbanner#Dismissible) for more info.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/slimbanner#Accessibility).
   *
   * Note that compact ("___Bare" type) SlimBanners are not dismissable.
   */
  dismissButton?: DismissButtonType;
  /**
   * Helper [Link](https://gestalt.pinterest.systems/web/link) to be placed after the message. See the [Message variant](https://gestalt.pinterest.systems/web/slimbanner#Message) to learn more.
   */
  helperLink?: HelperLinkType;
  /**
   * Label to describe the status icon’s purpose. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/slimbanner#Accessibility) for details on proper usage.
   */
  iconAccessibilityLabel?: string;
  /**
   * Main content of SlimBanner. Content should be [localized](https://gestalt.pinterest.systems/web/slimbanner#Localization). See the [Message variant](https://gestalt.pinterest.systems/web/slimbanner#Message) to learn more.
   *
   */
  message: string | Element<typeof Text>;
  /**
   * Main action for users to take on SlimBanner. If `href` is supplied, the action will serve as a link. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/slimbanner#Accessibility).
   * See the [Primary action](https://gestalt.pinterest.systems/web/slimbanner#Primary-action) variant to learn more.
   *
   * Note that actions are not available on compact ("___Bare" type) SlimBanners.
   */
  primaryAction?: PrimaryActionType;
  /**
   * The type of SlimBanner. See the [variants](https://gestalt.pinterest.systems/web/slimbanner#Variants) to learn more.
   */
  type?:
    | 'neutral'
    | 'error'
    | 'info'
    | 'warning'
    | 'success'
    | 'recommendation'
    | 'errorBare'
    | 'infoBare'
    | 'warningBare'
    | 'successBare'
    | 'recommendationBare';
};
/**
 * [SlimBanner](https://gestalt.pinterest.systems/web/slimbanner) conveys brief information related to a specific section of a page. The message can relay success, warning, error or general information. Since they are about a specific section of a page or surface, SlimBanner sits inside of a container, and not at the top of the page. For alerts that apply to the whole page, use [Callout](https://gestalt.pinterest.systems/web/callout).
 *
 * ![SlimBanner light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SlimBanner.spec.mjs-snapshots/SlimBanner-chromium-darwin.png)
 * ![SlimBanner dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SlimBanner-dark.spec.mjs-snapshots/SlimBanner-dark-chromium-darwin.png)
 *
 */
export default function SlimBanner({
  dismissButton,
  helperLink,
  iconAccessibilityLabel,
  message,
  primaryAction,
  type,
}: Props): Node;
export {};
