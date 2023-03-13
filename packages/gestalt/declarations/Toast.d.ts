import { $ElementType } from 'utility-types';
import type { Element, Node, ElementConfig } from 'react';
import Icon from './Icon';
import Link from './Link';
import Button from './Button';
import Text from './Text';
import Image from './Image';
import Avatar from './Avatar';
declare type Props = {
  /**
   * Allows to insert a custom button for user interaction. Do not use except for allowed cases where primaryAction doesn't support functionality required in it.
   */
  _dangerouslySetPrimaryAction?: Node;
  /**
   * Allows to insert a custom thumbnail. Do not use except for allowed cases where thumbnail doesn't support functionality required in it or legacy code.
   */
  _dangerouslySetThumbnail?: Node;
  /**
   * Adds a dismiss button to Toast. See the [Dismissible variant](https://gestalt.pinterest.systems/web/toast#Dismissible) for more info.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/toast#Accessibility).
   *
   */
  dismissButton?: {
    accessibilityLabel?: string;
    onDismiss: () => void;
  };
  /**
   * Helper [Link](https://gestalt.pinterest.systems/web/link) to be placed after the subtext. See the [helper link variant](https://gestalt.pinterest.systems/web/toast#helperLink) to learn more.
   */
  helperLink?: {
    text: string;
    accessibilityLabel: string;
    href: string;
    onClick?: (arg0: {
      event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
      dangerouslyDisableOnNavigation: () => void;
    }) => void;
  };
  /**
   * Adds an optional button for user interaction. Generally not recommended given the ephemeral nature of Toasts.
   */
  primaryAction?: {
    accessibilityLabel: string;
    href?: string;
    label: string;
    onClick?: $ElementType<ElementConfig<typeof Button>, 'onClick'>;
    rel?: $ElementType<ElementConfig<typeof Link>, 'rel'>;
    size?: $ElementType<ElementConfig<typeof Button>, 'size'>;
    target?: $ElementType<ElementConfig<typeof Link>, 'target'>;
  };
  /**
   * Main content of Toast. Content should be [localized](https://gestalt.pinterest.systems/web/toast#Localization). See the [Text variant](https://gestalt.pinterest.systems/web/toast#Text) to learn more.
   */
  text: string | Element<typeof Text>;
  /**
   * An optional thumbnail to display next to the text.
   */
  thumbnail?:
    | {
        image: Element<typeof Image>;
      }
    | {
        avatar: Element<typeof Avatar>;
      }
    | {
        icon: Element<typeof Icon>;
      };
  /**
   * See the [type variant](https://gestalt.pinterest.systems/web/toast#Type) to learn more.
   */
  type?: 'default' | 'success' | 'error' | 'progress';
};
/**
 * [Toasts](https://gestalt.pinterest.systems/web/toast) are brief and small messages that overlay content, but do not block the user’s flow, as they are out of the way and ephemeral.
 *
 * Toasts do not require user action and primarily acknowledge that a user has performed an action or completed a task.
 *
 * ![Toast light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Toast.spec.mjs-snapshots/Toast-chromium-darwin.png)
 */
export default function Toast({
  _dangerouslySetPrimaryAction,
  _dangerouslySetThumbnail,
  dismissButton,
  helperLink,
  primaryAction,
  text,
  thumbnail,
  type,
}: Props): Node;
export {};
