// @flow strict
import {
  Children,
  type Element,
  type ElementConfig,
  Fragment,
  type Node as ReactNode,
} from 'react';
import Avatar from './Avatar';
import styles from './BannerOverlay.css';
import CallToAction from './BannerOverlay/CalltoAction';
import Box from './Box';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import ButtonLink from './ButtonLink';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import { useDeviceType } from './contexts/DeviceTypeProvider';
import Flex from './Flex';
import Icon from './Icon';
import Image from './Image';
import InternalDismissButton from './shared/InternalDismissButton';
import {
  ToastAvatarThumbnail,
  ToastIconThumbnail,
  ToastImageThumbnail,
  ToastMessage,
} from './Shared/ToastSubcomponents';
import Text from './Text';
import { type Indexable } from './zIndex';

const DEFAULT_COLORS = {
  lightModeBackground: 'default',
  darkModeBackground: 'elevationFloating',
  textColor: 'default',
  iconColor: 'white',
};

type Props = {
  /**
   * Adds a dismiss button to BannerOverlay. See the [Dismissible variant](https://gestalt.pinterest.systems/web/banneroverlay#Dismissible) for more info.
   */
  onDismiss?: () => void,
  /**
   * Main content of BannerOverlay. Content should be [localized](https://gestalt.pinterest.systems/web/banneroverlay#Localization). See the [Text variant](https://gestalt.pinterest.systems/web/banneroverlay#Text) to learn more.
   */
  message: string | Element<typeof Text>,
  /**
   * Distance (in pixels) from the viewport edge (top will be used, if desktop, bottom will be used, if mobile).
   */
  offset?: { bottom: number, top: number },
  /**
   * Adds an optional primary button for user interaction.
   * Main action for users to take on BannerOverlay. If href is supplied, the action will serve as a link.
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
        rel?: $ElementType<ElementConfig<typeof ButtonLink>, 'rel'>,
        role: 'link',
        size?: $ElementType<ElementConfig<typeof ButtonLink>, 'size'>,
        target?: $ElementType<ElementConfig<typeof ButtonLink>, 'target'>,
      }
    | {
        accessibilityLabel: string,
        label: string,
        onClick: $ElementType<ElementConfig<typeof Button>, 'onClick'>,
        role?: 'button',
        size?: $ElementType<ElementConfig<typeof Button>, 'size'>,
      },
  /**
   * Adds an optional button for user interaction.
   * In this case, we use our ButtonGroup component.
   */
  secondaryAction?:
    | {
        accessibilityLabel: string,
        href: string,
        label: string,
        onClick?: $ElementType<ElementConfig<typeof ButtonLink>, 'onClick'>,
        rel?: $ElementType<ElementConfig<typeof ButtonLink>, 'rel'>,
        role: 'link',
        size?: $ElementType<ElementConfig<typeof ButtonLink>, 'size'>,
        target?: $ElementType<ElementConfig<typeof ButtonLink>, 'target'>,
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
  title?: string,
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
  onDismiss,
  primaryAction,
  secondaryAction,
  offset = { top: 0, bottom: 0 },
  thumbnail,
  zIndex,
}: Props): ReactNode {
  const { colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  const isMobileDevice = useDeviceType() === 'mobile';

  let messageTextElement: Element<'span'> | string;

  if (typeof message === 'string') {
    messageTextElement = message;
  }

  // If `message` is a Text component, we need to override any text colors within to ensure they all match
  const checkTextNode = () => {
    const messageIsTextNode =
      typeof message !== 'string' &&
      Children.only<Element<typeof Text>>(message).type.displayName === 'Text';

    if (messageIsTextNode) {
      const textColorOverrideStyles = isDarkMode
        ? styles.textColorOverrideDark
        : styles.textColorOverrideLight;

      messageTextElement = <span className={textColorOverrideStyles}>{message}</span>;
    }
    return messageIsTextNode;
  };

  const { accessibilityDismissButtonLabel: accessibilityDismissButtonLabelDefault } =
    useDefaultLabelContext('BannerOverlay');

  const { lightModeBackground, darkModeBackground, textColor } = DEFAULT_COLORS;

  const dismissButtonComponent = (
    <InternalDismissButton
      accessibilityLabel={accessibilityDismissButtonLabelDefault}
      iconColor="darkGray"
      onClick={onDismiss}
      size="xs"
    />
  );

  const isMessageTextNode = checkTextNode();
  return (
    <Fragment>
      <Box display="none" smDisplay="flex">
        <Box
          alignContent="center"
          borderStyle="shadow"
          color={isDarkMode ? darkModeBackground : lightModeBackground}
          dangerouslySetInlineStyle={{
            __style: {
              position: 'fixed',
              bottom: isMobileDevice ? offset.bottom : 'unset',
              top: !isMobileDevice ? offset.top : 'unset',
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
          direction="row"
          display="flex"
          fit
          justifyContent="between"
          maxWidth={900}
          paddingX={4}
          paddingY={3}
          position="fixed"
          rounding={4}
          smPaddingY={4}
          width="calc(100% - 32px)"
          zIndex={zIndex}
        >
          <Flex alignItems="center" gap={4}>
            {!!thumbnail?.image &&
            Children.only<Element<typeof Image>>(thumbnail.image).type.displayName === 'Image' ? (
              <Flex.Item alignSelf="center">
                <ToastImageThumbnail thumbnail={thumbnail.image} />
              </Flex.Item>
            ) : null}

            {!!thumbnail?.icon &&
            Children.only<Element<typeof Icon>>(thumbnail.icon).type.displayName === 'Icon' ? (
              <Flex.Item alignSelf="center">
                <ToastIconThumbnail thumbnail={thumbnail.icon} />
              </Flex.Item>
            ) : null}

            {!!thumbnail?.avatar &&
            Children.only<Element<typeof Avatar>>(thumbnail.avatar).type.displayName ===
              'Avatar' ? (
              <Flex.Item alignSelf="center">
                <ToastAvatarThumbnail thumbnail={thumbnail.avatar} />
              </Flex.Item>
            ) : null}
            <Flex.Item flex="grow">
              <Flex direction="row" justifyContent="between">
                {title ? (
                  <Text weight="bold">{title}</Text>
                ) : (
                  <ToastMessage
                    text={isMessageTextNode ? undefined : messageTextElement}
                    textColor={textColor}
                    textElement={isMessageTextNode ? messageTextElement : undefined}
                  />
                )}
              </Flex>
              {title && (
                <ToastMessage
                  text={isMessageTextNode ? undefined : messageTextElement}
                  textColor={textColor}
                  textElement={isMessageTextNode ? messageTextElement : undefined}
                />
              )}
            </Flex.Item>
          </Flex>
          <Flex alignSelf="center" direction="row" gap={4}>
            <ButtonGroup>
              {secondaryAction && (
                <Flex.Item>
                  {secondaryAction.role === 'link' ? (
                    <CallToAction
                      accessibilityLabel={secondaryAction.accessibilityLabel}
                      color="gray"
                      href={secondaryAction.href}
                      label={secondaryAction.label}
                      onClick={secondaryAction.onClick}
                      rel={secondaryAction?.rel}
                      role="link"
                      size="sm"
                      target={secondaryAction?.target}
                    />
                  ) : (
                    <CallToAction
                      accessibilityLabel={secondaryAction.accessibilityLabel}
                      color="gray"
                      label={secondaryAction.label}
                      onClick={secondaryAction.onClick}
                      role="button"
                      size="sm"
                    />
                  )}
                </Flex.Item>
              )}
              {primaryAction && (
                <Flex.Item>
                  {primaryAction.role === 'link' ? (
                    <CallToAction
                      accessibilityLabel={primaryAction.accessibilityLabel}
                      color="red"
                      href={primaryAction.href}
                      label={primaryAction.label}
                      onClick={primaryAction.onClick}
                      rel={primaryAction?.rel}
                      role="link"
                      size="sm"
                      target={primaryAction?.target}
                    />
                  ) : (
                    <CallToAction
                      accessibilityLabel={primaryAction.accessibilityLabel}
                      color="red"
                      label={primaryAction.label}
                      onClick={primaryAction.onClick}
                      role="button"
                      size="sm"
                    />
                  )}
                </Flex.Item>
              )}
            </ButtonGroup>
            {!!onDismiss && <Flex.Item alignSelf="center">{dismissButtonComponent}</Flex.Item>}
          </Flex>
        </Box>
      </Box>
      <Box display="flex" smDisplay="none">
        <Box
          alignContent="stretch"
          borderStyle="shadow"
          color={isDarkMode ? darkModeBackground : lightModeBackground}
          dangerouslySetInlineStyle={{
            __style: {
              position: 'fixed',
              bottom: isMobileDevice ? offset.bottom : 'unset',
              top: !isMobileDevice ? offset.top : 'unset',
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
          direction="column"
          display="flex"
          fit
          justifyContent="center"
          maxWidth={348}
          paddingX={4}
          paddingY={3}
          position="fixed"
          rounding={4}
          smPaddingY={4}
          width="calc(100% - 32px)"
          zIndex={zIndex}
        >
          <Flex alignItems="center" gap={4}>
            {!!thumbnail?.image &&
            Children.only<Element<typeof Image>>(thumbnail.image).type.displayName === 'Image' ? (
              <Flex.Item alignSelf="baseline">
                <ToastImageThumbnail thumbnail={thumbnail.image} />
              </Flex.Item>
            ) : null}

            {!!thumbnail?.icon &&
            Children.only<Element<typeof Icon>>(thumbnail.icon).type.displayName === 'Icon' ? (
              <Flex.Item alignSelf="baseline">
                <ToastIconThumbnail thumbnail={thumbnail.icon} />
              </Flex.Item>
            ) : null}

            {!!thumbnail?.avatar &&
            Children.only<Element<typeof Avatar>>(thumbnail.avatar).type.displayName ===
              'Avatar' ? (
              <Flex.Item alignSelf="baseline">
                <ToastAvatarThumbnail thumbnail={thumbnail.avatar} />
              </Flex.Item>
            ) : null}
            <Flex.Item flex="grow">
              <Flex direction="row" justifyContent="between">
                {title ? (
                  <Text weight="bold">{title}</Text>
                ) : (
                  <Box marginBottom={2}>
                    <ToastMessage
                      text={isMessageTextNode ? undefined : messageTextElement}
                      textColor={textColor}
                      textElement={isMessageTextNode ? messageTextElement : undefined}
                    />
                  </Box>
                )}
                {!!onDismiss && (
                  <Flex.Item alignSelf={title ? 'end' : 'start'}>
                    {dismissButtonComponent}
                  </Flex.Item>
                )}
              </Flex>
              {title && (
                <Box marginBottom={2}>
                  <ToastMessage
                    text={isMessageTextNode ? undefined : messageTextElement}
                    textColor={textColor}
                    textElement={isMessageTextNode ? messageTextElement : undefined}
                  />
                </Box>
              )}
            </Flex.Item>
          </Flex>
          <Flex alignSelf="end" direction="row" gap={4}>
            <ButtonGroup>
              {secondaryAction && (
                <Flex.Item>
                  {secondaryAction.role === 'link' ? (
                    <CallToAction
                      accessibilityLabel={secondaryAction.accessibilityLabel}
                      color="gray"
                      href={secondaryAction.href}
                      label={secondaryAction.label}
                      onClick={secondaryAction.onClick}
                      rel={secondaryAction?.rel}
                      role="link"
                      size="sm"
                      target={secondaryAction?.target}
                    />
                  ) : (
                    <CallToAction
                      accessibilityLabel={secondaryAction.accessibilityLabel}
                      color="gray"
                      label={secondaryAction.label}
                      onClick={secondaryAction.onClick}
                      role="button"
                      size="sm"
                    />
                  )}
                </Flex.Item>
              )}
              {primaryAction && (
                <Flex.Item>
                  {primaryAction.role === 'link' ? (
                    <CallToAction
                      accessibilityLabel={primaryAction.accessibilityLabel}
                      color="red"
                      href={primaryAction.href}
                      label={primaryAction.label}
                      onClick={primaryAction.onClick}
                      rel={primaryAction?.rel}
                      role="link"
                      size="sm"
                      target={primaryAction?.target}
                    />
                  ) : (
                    <CallToAction
                      accessibilityLabel={primaryAction.accessibilityLabel}
                      color="red"
                      label={primaryAction.label}
                      onClick={primaryAction.onClick}
                      role="button"
                      size="sm"
                    />
                  )}
                </Flex.Item>
              )}
            </ButtonGroup>
          </Flex>
        </Box>
      </Box>
    </Fragment>
  );
}

BannerOverlay.displayName = 'BannerOverlay';
