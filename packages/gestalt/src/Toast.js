// @flow strict
import { Children, isValidElement, type Element, type Node, type ElementConfig } from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import Flex from './Flex.js';
import Link from './Link.js';
import Button from './Button.js';
import Text from './Text.js';
import Image from './Image.js';
import Avatar from './Avatar.js';
import styles from './Toast.css';
import useResponsiveMinWidth from './useResponsiveMinWidth.js';
import PrimaryAction from './Toast/PrimaryAction.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import {
  ToastImageThumbnail,
  ToastIconThumbnail,
  ToastAvatarThumbnail,
  ToastTypeThumbnail,
  ToastMessage,
} from './Toast/subcomponents.js';
import InternalDismissButton from './InternalDismissButton.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';

const DEFAULT_COLORS = {
  containerColor: 'inverse',
  textColor: 'inverse',
  iconColor: 'white',
};

const COLORS_BY_TYPE = Object.freeze({
  default: DEFAULT_COLORS,
  success: DEFAULT_COLORS,
  error: { ...DEFAULT_COLORS, containerColor: 'errorBase' },
  progress: {
    containerColor: 'secondary',
    textColor: 'default',
    iconColor: 'darkGray',
  },
});

type Props = {|
  /**
   * Allows to insert a custom button for user interaction. Do not use except for allowed cases where primaryAction doesn't support functionality required in it.
   */
  _dangerouslySetPrimaryAction?: Node,
  /**
   * Allows to insert a custom thumbnail. Do not use except for allowed cases where thumbnail doesn't support functionality required in it or legacy code.
   */
  _dangerouslySetThumbnail?: Node,
  /**
   * Adds a dismiss button to Toast. See the [Dismissible variant](https://gestalt.pinterest.systems/web/toast#Dismissible) for more info.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/toast#Accessibility).
   *
   */
  dismissButton?: {|
    accessibilityLabel?: string,
    onDismiss: () => void,
  |},
  /**
   * Helper [Link](https://gestalt.pinterest.systems/web/link) to be placed after the subtext. See the [helper link variant](https://gestalt.pinterest.systems/web/toast#helperLink) to learn more.
   */
  helperLink?: {|
    text: string,
    accessibilityLabel: string,
    href: string,
    onClick?: ({|
      event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
      dangerouslyDisableOnNavigation: () => void,
    |}) => void,
  |},
  /**
   * Adds an optional button for user interaction. Generally not recommended given the ephemeral nature of Toasts.
   */
  primaryAction?: {|
    accessibilityLabel: string,
    href?: string,
    label: string,
    onClick?: $ElementType<ElementConfig<typeof Button>, 'onClick'>,
    rel?: $ElementType<ElementConfig<typeof Link>, 'rel'>,
    size?: $ElementType<ElementConfig<typeof Button>, 'size'>,
    target?: $ElementType<ElementConfig<typeof Link>, 'target'>,
  |},

  /**
   * Main content of Toast. Content should be [localized](https://gestalt.pinterest.systems/web/toast#Localization). See the [Text variant](https://gestalt.pinterest.systems/web/toast#Text) to learn more.
   */
  text: string | Element<typeof Text>,
  /**
   * An optional thumbnail to display next to the text.
   */
  thumbnail?:
    | {| image: Element<typeof Image> |}
    | {| avatar: Element<typeof Avatar> |}
    | {| icon: Element<typeof Icon> |},
  /**
   * See the [type variant](https://gestalt.pinterest.systems/web/toast#Type) to learn more.
   */
  type?: 'default' | 'success' | 'error' | 'progress',
|};

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
  type = 'default',
}: Props): Node {
  const { name: colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  const responsiveMinWidth = useResponsiveMinWidth();
  const isMobileWidth = responsiveMinWidth === 'xs';

  let textElement: Element<'span'> | string;

  if (typeof text === 'string') {
    textElement = text;
  }

  // If `text` is a Text component, we need to override any text colors within to ensure they all match
  const isTextNode = typeof text !== 'string' && Children.only(text).type.displayName === 'Text';

  if (isTextNode) {
    let textColorOverrideStyles = isDarkMode
      ? styles.textColorOverrideDark
      : styles.textColorOverrideLight;

    if (type === 'error') {
      // Error type enforces bold weight
      textColorOverrideStyles = styles.textErrorColorOverrideLight;
    }

    textElement = <span className={textColorOverrideStyles}>{text}</span>;
  }

  const { accessibilityDismissButtonLabel: accessibilityDismissButtonLabelDefault } =
    useDefaultLabelContext('Toast');

  const { containerColor, textColor, iconColor } = COLORS_BY_TYPE[type];

  const isDefaultToast = type === 'default';
  const isNotDefaultToast = ['success', 'error', 'progress'].includes(type);

  return (
    <div className={styles.toast} role="status">
      <Box color={containerColor} paddingX={4} paddingY={3} width="100%" rounding={4}>
        <Flex alignItems="center" gap={4}>
          {isDefaultToast && _dangerouslySetThumbnail ? (
            <Flex.Item flex="none">{_dangerouslySetThumbnail}</Flex.Item>
          ) : null}

          {isDefaultToast &&
          !_dangerouslySetThumbnail &&
          !!thumbnail?.image &&
          Children.only(thumbnail.image).type.displayName === 'Image' ? (
            <Flex.Item flex="none">
              <ToastImageThumbnail thumbnail={thumbnail.image} />
            </Flex.Item>
          ) : null}

          {isDefaultToast &&
          !_dangerouslySetThumbnail &&
          !!thumbnail?.icon &&
          Children.only(thumbnail.icon).type.displayName === 'Icon' ? (
            <Flex.Item flex="none">
              <ToastIconThumbnail thumbnail={thumbnail.icon} />
            </Flex.Item>
          ) : null}

          {isDefaultToast &&
          !_dangerouslySetThumbnail &&
          !!thumbnail?.avatar &&
          Children.only(thumbnail.avatar).type.displayName === 'Avatar' ? (
            <Flex.Item flex="none">
              <ToastAvatarThumbnail thumbnail={thumbnail.avatar} />
            </Flex.Item>
          ) : null}

          {isNotDefaultToast ? (
            <Flex.Item flex="none">
              <ToastTypeThumbnail type={type} />
            </Flex.Item>
          ) : null}

          <Flex.Item flex="grow">
            <ToastMessage
              text={isTextNode ? undefined : textElement}
              textElement={isTextNode ? textElement : undefined}
              helperLink={helperLink}
              textColor={textColor}
              type={type}
            />
          </Flex.Item>

          {primaryAction || _dangerouslySetPrimaryAction ? (
            // Allow button text to wrap on mobile
            <Flex.Item flex={isMobileWidth ? 'shrink' : 'none'}>
              {isValidElement(_dangerouslySetPrimaryAction) ? _dangerouslySetPrimaryAction : null}
              {!_dangerouslySetPrimaryAction &&
              primaryAction?.accessibilityLabel &&
              primaryAction?.label ? (
                <PrimaryAction
                  accessibilityLabel={primaryAction.accessibilityLabel}
                  href={primaryAction.href}
                  rel={primaryAction?.rel}
                  size="sm"
                  target={primaryAction?.target}
                  label={primaryAction.label}
                  onClick={primaryAction.onClick}
                />
              ) : null}
            </Flex.Item>
          ) : null}

          {dismissButton ? (
            <Flex.Item flex="none">
              <InternalDismissButton
                iconColor={iconColor}
                accessibilityLabel={
                  dismissButton.accessibilityLabel ?? accessibilityDismissButtonLabelDefault
                }
                onClick={dismissButton.onDismiss}
                size="xs"
              />
            </Flex.Item>
          ) : null}
        </Flex>
      </Box>
    </div>
  );
}
