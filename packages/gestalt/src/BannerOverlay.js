// @flow strict
import { Children, type Element, type ElementConfig, type Node as ReactNode } from 'react';
import Avatar from './Avatar';
import styles from './BannerOverlay.css';
import PrimaryAction from './BannerOverlay/PrimaryAction';
import {
  BannerOverlayAvatarThumbnail,
  BannerOverlayIconThumbnail,
  BannerOverlayImageThumbnail,
  BannerOverlayMessage,
} from './BannerOverlay/subcomponents';
import Box from './Box';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import { useDeviceType } from './contexts/DeviceTypeProvider';
import Flex from './Flex';
import Icon from './Icon';
import IconButton from './IconButton';
import Image from './Image';
import Layer from './Layer';
import Link from './Link';
import Text from './Text';
import { type Indexable } from './zIndex';

const DEFAULT_COLORS = {
  lightModeBackground: 'default',
  darkModeBackground: 'elevationRaised',
  textColor: 'default',
  iconColor: 'white',
};

type Props = {
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
   * Main content of BannerOverlay. Content should be [localized](https://gestalt.pinterest.systems/web/banneroverlay#Localization). See the [Text variant](https://gestalt.pinterest.systems/web/banneroverlay#Text) to learn more.
   */
  message: string | Element<typeof Text>,
  /**
   * Distance (in pixels) from the viewport edge (offsetTop will be used, if desktop, offsetBottom will be used, if mobile).
   */
  offsetTop?: number,
  /**
   * Distance (in pixels) from the viewport edge (offsetTop will be used, if desktop, offsetBottom will be used, if mobile).
   */
  offsetBottom?: number,
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
   * Adds an optional primary button for user interaction.
   * Main action for users to take on BannerOverlay. If href is supplied, the action will serve as a link. See OnLinkNavigationProvider to learn more about link navigation.
   * If no href is supplied, the action will be a button.
   * The accessibilityLabel should follow the Accessibility guidelines.
   * See the Primary action variant to learn more.
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
   *  Heading of BannerOverlay. Content should be [localized](https://gestalt.pinterest.systems/web/banneroverlay#Localization). See the [Text variant](https://gestalt.pinterest.systems/web/banneroverlay#Text) to learn more.
   */
  title?: string | Element<typeof Text>,
  /**
   *  zIndex of BannerOverlay. See the [zIndex guidelines](https://gestalt.pinterest.systems/web/banneroverlay#zIndex) to learn more.
   */
  zIndex?: Indexable,
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
  offsetTop = 130,
  offsetBottom = 24,
  thumbnail,
  zIndex,
}: Props): ReactNode {
  const { name: colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  const isMobileWidth = useDeviceType() === 'mobile';

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

  const { lightModeBackground, darkModeBackground, textColor } = DEFAULT_COLORS;

  const dismissButtonComponent = dismissButton && (
    <Flex.Item flex="none" alignSelf={isMobileWidth ? 'end' : 'center'}>
      <IconButton
        accessibilityLabel={
          dismissButton.accessibilityLabel ?? accessibilityDismissButtonLabelDefault
        }
        icon="cancel"
        iconColor="darkGray"
        onClick={dismissButton.onDismiss}
        size="xs"
      />
    </Flex.Item>
  );
  const messageComponent = (
    <Flex.Item flex="grow">
      <Text weight="bold">{title}</Text>
      <BannerOverlayMessage
        text={messageIsTextNode ? undefined : messageTextElement}
        textElement={messageIsTextNode ? messageTextElement : undefined}
        helperLink={helperLink}
        textColor={textColor}
      />
    </Flex.Item>
  );
  const CTAComponent = primaryAction && (
    <Flex.Item flex={isMobileWidth ? 'shrink' : 'none'}>
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
  );
  return (
    <Layer>
      <Box
        zIndex={zIndex}
        color={isDarkMode ? darkModeBackground : lightModeBackground}
        paddingX={4}
        paddingY={3}
        rounding={4}
        borderStyle="shadow"
        dangerouslySetInlineStyle={
          isMobileWidth
            ? {
                __style: {
                  bottom: offsetBottom,
                  left: '50%',
                  transform: 'translateX(-50%)',
                },
              }
            : {
                __style: {
                  top: offsetTop,
                  left: '50%',
                  transform: 'translateX(-50%)',
                },
              }
        }
        position="fixed"
        display="flex"
        justifyContent={isMobileWidth ? 'center' : 'between'}
        alignContent={isMobileWidth ? 'stretch' : 'center'}
        direction={isMobileWidth ? 'column' : 'row'}
        smPaddingY={4}
        fit
        minWidth={isMobileWidth ? 348 : 900}
      >
        {isMobileWidth && dismissButtonComponent}
        <Flex alignItems="center" gap={4}>
          {!!thumbnail?.image &&
          Children.only<Element<typeof Image>>(thumbnail.image).type.displayName === 'Image' ? (
            <Flex.Item flex="none">
              <BannerOverlayImageThumbnail thumbnail={thumbnail.image} />
            </Flex.Item>
          ) : null}

          {!!thumbnail?.icon &&
          Children.only<Element<typeof Icon>>(thumbnail.icon).type.displayName === 'Icon' ? (
            <Flex.Item flex="none">
              <BannerOverlayIconThumbnail thumbnail={thumbnail.icon} />
            </Flex.Item>
          ) : null}

          {!!thumbnail?.avatar &&
          Children.only<Element<typeof Avatar>>(thumbnail.avatar).type.displayName === 'Avatar' ? (
            <Flex.Item flex="none">
              <BannerOverlayAvatarThumbnail thumbnail={thumbnail.avatar} />
            </Flex.Item>
          ) : null}
          {messageComponent}
        </Flex>
        <Flex direction="row" alignSelf={isMobileWidth ? 'end' : 'center'} gap={4}>
          {CTAComponent}
          {!isMobileWidth && dismissButtonComponent}
        </Flex>
      </Box>
    </Layer>
  );
}
