// @flow strict
import { Children, type Element, type ElementConfig, type Node as ReactNode } from 'react';
import classnames from 'classnames';
import Avatar from './Avatar';
import styles from './BannerOverlay.css';
import PrimaryAction from './BannerOverlay/PrimaryAction';
import {
  BannerOverlayAvatarThumbnail,
  BannerOverlayIconThumbnail,
  BannerOverlayImageThumbnail,
  BannerOverlayMessage,
  BannerOverlayTypeThumbnail,
} from './BannerOverlay/subcomponents';
import Box from './Box';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import Flex from './Flex';
import Icon from './Icon';
import Image from './Image';
import Layer from './Layer';
import Link from './Link';
import Text from './Text';
import useResponsiveMinWidth from './useResponsiveMinWidth';

const DEFAULT_COLORS = {
  containerColor: 'default',
  textColor: 'default',
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

type Props = {
  /**
   * Main content of BannerOverlay. Content should be [localized](https://gestalt.pinterest.systems/web/banneroverlay#Localization). See the [Text variant](https://gestalt.pinterest.systems/web/banneroverlay#Text) to learn more.
   */
  message: string | Element<typeof Text>,
  /**
   * Secndary content of BannerOverlay. Content should be [localized](https://gestalt.pinterest.systems/web/banneroverlay#Localization). See the [Text variant](https://gestalt.pinterest.systems/web/banneroverlay#Text) to learn more.
   */
  title: string | Element<typeof Text>,
  /**
   * Adds a dismiss button to BannerOverlay. See the [Dismissible variant](https://gestalt.pinterest.systems/web/banneroverlay#Dismissible) for more info.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/banneroverlay#Accessibility).
   *
   */
  dismissButton?: {
    accessibilityLabel?: string,
    onDismiss: () => void,
  },
  /**
   * Helper [Link](https://gestalt.pinterest.systems/web/link) to be placed after the subtext. See the [helper link variant](https://gestalt.pinterest.systems/web/banneroverlay#helperLink) to learn more.
   */
  helperLink?: {
    text: string,
    accessibilityLabel: string,
    href: string,
    onClick?: ({
      event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
      dangerouslyDisableOnNavigation: () => void,
    }) => void,
  },
  /**
   * Adds an optional button for user interaction. Generally not recommended given the ephemeral nature of BannerOverlays.
   */
  primaryAction?:
    | {
        accessibilityLabel: string,
        href: string,
        label: string,
        onClick?: $ElementType<ElementConfig<typeof ButtonLink>, 'onClick'>,
        rel?: $ElementType<ElementConfig<typeof Link>, 'rel'>,
        role: 'link',
        size?: $ElementType<ElementConfig<typeof Button>, 'size'>,
        target?: $ElementType<ElementConfig<typeof Link>, 'target'>,
      }
    | {
        accessibilityLabel: string,
        label: string,
        onClick: $ElementType<ElementConfig<typeof Button>, 'onClick'>,
        role?: 'button',
        size?: $ElementType<ElementConfig<typeof Button>, 'size'>,
      },

  /**
   * An optional thumbnail to display next to the text.
   */
  thumbnail?:
    | { image: Element<typeof Image> }
    | { avatar: Element<typeof Avatar> }
    | { icon: Element<typeof Icon> },
  /**
   * See the [type variant](https://gestalt.pinterest.systems/web/banneroverlay#Type) to learn more.
   */
  type?: 'default' | 'success' | 'error' | 'progress',
};

/**
 * [BannerOverlays](https://gestalt.pinterest.systems/web/banneroverlay) displays short educational messages when users have performed actions that indicate some intent, such as a related pin tap or idea pin swipe. It is scrim-less, meaning users can scroll content underneath without having a wash layer on top of the content.
 *
 * BannerOverlay is a sticky component triggered by scroll, on tap or long-press, placed at the bottom of the screen.
 * ![BannerOverlay light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerOverlay.spec.mjs-snapshots/BannerOverlay-chromium-darwin.png)
 */
export default function BannerOverlay({
  message,
  title,
  dismissButton,
  helperLink,
  primaryAction,
  thumbnail,
  type = 'default',
}: Props): ReactNode {
  const { name: colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  const responsiveMinWidth = useResponsiveMinWidth();
  const isMobileWidth = responsiveMinWidth === 'xs';

  let messageTextElement: Element<'span'> | string;

  if (typeof message === 'string') {
    messageTextElement = message;
  }
  if (typeof title === 'string') {
    messageTextElement = title;
  }

  // If `message` is a Text component, we need to override any text colors within to ensure they all match
  const messageIsTextNode =
    typeof message !== 'string' &&
    Children.only<Element<typeof Text>>(message).type.displayName === 'Text';

  if (messageIsTextNode) {
    const textColorOverrideStyles = isDarkMode
      ? styles.textColorOverrideDark
      : styles.textColorOverrideLight;

    messageTextElement = <span className={textColorOverrideStyles}>{message}</span>;
  }

  // TODO: Add BannerOverlay to DefautlLabelProvider
  // const { accessibilityDismissButtonLabel: accessibilityDismissButtonLabelDefault } =
  //   useDefaultLabelContext('BannerOverlay');
  const accessibilityDismissButtonLabelDefault = '';

  const { containerColor, textColor } = COLORS_BY_TYPE[type];

  const isDefaultBannerOverlay = type === 'default';
  const isNotDefaultBannerOverlay = ['success', 'error', 'progress'].includes(type);

  return (
    <Layer>
      <Box
        color={containerColor}
        paddingX={4}
        paddingY={3}
        rounding={4}
        dangerouslySetInlineStyle={{
          __style: {
            border: '1px solid var(--color-gray-roboflow-200)',
            bottom: 50,
            left: '50%',
            transform: 'translateX(-50%)',
          },
        }}
        position="fixed"
        display="flex"
        justifyContent="center"
        direction="column"
        fit
        minWidth={isMobileWidth ? 348 : 900}
      >
        {dismissButton ? (
          <Flex.Item flex="none" alignSelf="end">
            <button
              aria-label={
                dismissButton.accessibilityLabel ?? accessibilityDismissButtonLabelDefault
              }
              className={classnames(styles.parentButton)}
              onClick={dismissButton.onDismiss}
              type="button"
            >
              X
            </button>
          </Flex.Item>
        ) : null}
        <Flex alignItems="center" gap={4}>
          {isDefaultBannerOverlay &&
          !!thumbnail?.image &&
          Children.only<Element<typeof Image>>(thumbnail.image).type.displayName === 'Image' ? (
            <Flex.Item flex="none">
              <BannerOverlayImageThumbnail thumbnail={thumbnail.image} />
            </Flex.Item>
          ) : null}

          {isDefaultBannerOverlay &&
          !!thumbnail?.icon &&
          Children.only<Element<typeof Icon>>(thumbnail.icon).type.displayName === 'Icon' ? (
            <Flex.Item flex="none">
              <BannerOverlayIconThumbnail thumbnail={thumbnail.icon} />
            </Flex.Item>
          ) : null}

          {isDefaultBannerOverlay &&
          !!thumbnail?.avatar &&
          Children.only<Element<typeof Avatar>>(thumbnail.avatar).type.displayName === 'Avatar' ? (
            <Flex.Item flex="none">
              <BannerOverlayAvatarThumbnail thumbnail={thumbnail.avatar} />
            </Flex.Item>
          ) : null}

          {isNotDefaultBannerOverlay ? (
            <Flex.Item flex="none">
              <BannerOverlayTypeThumbnail type={type} />
            </Flex.Item>
          ) : null}

          <Flex.Item flex="grow">
            <Text weight="bold">{title}</Text>
            <BannerOverlayMessage
              text={messageIsTextNode ? undefined : messageTextElement}
              textElement={messageIsTextNode ? messageTextElement : undefined}
              helperLink={helperLink}
              textColor={textColor}
              type={type}
            />
          </Flex.Item>
        </Flex>
        {primaryAction ? (
          // Allow button text to wrap on mobile
          <Flex.Item flex={isMobileWidth ? 'shrink' : 'none'} alignSelf="end">
            {primaryAction?.accessibilityLabel && primaryAction?.label
              ? (primaryAction.role === 'link' && (
                  <PrimaryAction
                    accessibilityLabel={primaryAction.accessibilityLabel}
                    href={primaryAction.href}
                    label={primaryAction.label}
                    onClick={primaryAction.onClick}
                    rel={primaryAction?.rel}
                    role="link"
                    size="sm"
                    target={primaryAction?.target}
                  />
                ),
                primaryAction.role !== 'link' && (
                  <PrimaryAction
                    accessibilityLabel={primaryAction.accessibilityLabel}
                    label={primaryAction.label}
                    onClick={primaryAction.onClick}
                    role="button"
                    size="sm"
                  />
                ))
              : null}
          </Flex.Item>
        ) : null}
      </Box>
    </Layer>
  );
}
