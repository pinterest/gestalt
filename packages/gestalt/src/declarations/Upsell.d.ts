import type { Element, Node } from 'react';
import Icon from './Icon';
import Image from './Image';
import Text from './Text';
import UpsellForm from './UpsellForm';
export type ActionDataType = {
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
   * To create forms within Upsell, pass Upsell.Form as children.
   */
  children?: Element<typeof UpsellForm>;
  /**
   * Adds a dismiss button to the Upsell. The \`accessibilityLabel\` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/upsell#Accessibility).
   */
  dismissButton?: {
    accessibilityLabel: string;
    onDismiss: () => void;
  };
  /**
   * Either an [Icon](https://gestalt.pinterest.systems/web/icon) or an [Image](https://gestalt.pinterest.systems/web/image) to render at the start of the banner. Width is not used with Icon. Image width defaults to 128px. See the [Icon](https://gestalt.pinterest.systems/web/upsell#Icon) and [Image](https://gestalt.pinterest.systems/web/upsell#Image) variants for more info.
   */
  imageData?: {
    component: Element<typeof Image | typeof Icon>;
    mask?: {
      rounding?: 'circle' | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
      wash?: boolean;
    };
    width?: number;
  };
  /**
   * Main content of Upsell, explains what is being offered or recommended. Content should be [localized](https://gestalt.pinterest.systems/web/upsell#Localization). See the [Message variant](https://gestalt.pinterest.systems/web/upsell#Message) to learn more.
   */
  message: string | Element<typeof Text>;
  /**
   * Main action for people to take on Upsell. If \`href\` is supplied, the action will serve as a link. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) to learn more about link navigation.'
   * If no \`href\` is supplied, the action will be a button.
   * The \`accessibilityLabel\` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/upsell#Accessibility).
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
   * Secondary action for people to take on Upsell. If \`href\` is supplied, the action will serve as a link. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) to learn more about link navigation.'
   * If no \`href\` is supplied, the action will be a button.
   * The \`accessibilityLabel\` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/upsell#Accessibility).
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
   * Brief title summarizing the Upsell. Content should be [localized](https://gestalt.pinterest.systems/web/upsell#Localization).
   */
  title?: string;
};
/**
 * [Upsells](https://gestalt.pinterest.systems/web/upsell) are banners that display short messages that focus on promoting an action or upgrading something the user already has.
 *
 *
 * ![Upsell light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Upsell.spec.mjs-snapshots/Upsell-chromium-darwin.png)
 * ![Upsell dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Upsell-dark.spec.mjs-snapshots/Upsell-dark-chromium-darwin.png)
 */
declare function Upsell({
  children,
  dismissButton,
  imageData,
  message,
  primaryAction,
  secondaryAction,
  title,
}: Props): Node;
declare namespace Upsell {
  var Form: typeof UpsellForm;
}
export default Upsell;
