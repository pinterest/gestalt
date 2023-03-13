import type { Node } from 'react';
import 'react';
export declare type ActionDataType = {
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
declare type Props = {
  /**
   * Adds a dismiss button to Callout. See the [Dismissible variant](https://gestalt.pinterest.systems/web/callout#Dismissible) for more info.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/callout#Accessibility).
   */
  dismissButton?: {
    accessibilityLabel: string;
    onDismiss: () => void;
  };
  /**
   * Label to describe the icon’s purpose. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/callout#Accessibility) for details on proper usage.
   */
  iconAccessibilityLabel: string;
  /**
   * Main content of Callout. Content should be [localized](https://gestalt.pinterest.systems/web/callout#Localization).
   *
   * See [Best Practices](https://gestalt.pinterest.systems/web/callout#Best-practices) for more info.
   */
  message: string;
  /**
   * Main action for users to take on Callout. If `href` is supplied, the action will serve as a link. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/callout#Accessibility).
   */
  primaryAction?: {
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
  /**
   * Secondary action for users to take on Callout. If `href` is supplied, the action will serve as a link. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/callout#Accessibility).
   */
  secondaryAction?: {
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
  /**
   * The category of Callout. See [Variants](https://gestalt.pinterest.systems/web/callout#Variants) to learn more.
   */
  type: 'error' | 'info' | 'recommendation' | 'success' | 'warning';
  /**
   * Brief title summarizing Callout. Content should be [localized](https://gestalt.pinterest.systems/web/callout#Localization).
   */
  title?: string;
};
/**
 * [Callout](https://gestalt.pinterest.systems/web/callout) is a banner displaying short messages with helpful information for a task on the page, or something that requires the user’s attention.
 *
 * ![Callout light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Callout.spec.mjs-snapshots/Callout-chromium-darwin.png)
 * ![Callout dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Callout-dark.spec.mjs-snapshots/Callout-dark-chromium-darwin.png)
 *
 */
export default function Callout({
  dismissButton,
  iconAccessibilityLabel,
  message,
  primaryAction,
  secondaryAction,
  type,
  title,
}: Props): Node;
export {};
