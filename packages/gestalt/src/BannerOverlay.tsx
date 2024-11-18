import { Children, ComponentProps, Fragment, ReactElement } from 'react';
import { TOKEN_SPACE_800 } from 'gestalt-design-tokens';
import styles from './BannerOverlay.css';
import CallToAction from './BannerOverlay/CalltoAction';
import Box from './Box';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import { useDeviceType } from './contexts/DeviceTypeProvider';
import Flex from './Flex';
import Heading from './Heading';
import InternalDismissButton from './sharedSubcomponents/InternalDismissButton';
import {
  AvatarThumbnail,
  IconThumbnail,
  ImageThumbnail,
  Message,
} from './sharedSubcomponents/thumbnailSubcomponents';
import Text from './Text';
import useInExperiment from './useInExperiment';
import { Indexable } from './zIndex';

const DEFAULT_COLORS = {
  lightModeBackground: 'default',
  darkModeBackground: 'elevationFloating',
  textColor: 'default',
  iconColor: 'white',
} as const;

type Props = {
  /**
   * Adds a dismiss button to BannerOverlay. See the [Dismissible variant](https://gestalt.pinterest.systems/web/banneroverlay#Dismissible) for more info.
   */
  onDismiss?: () => void;
  /**
   * Main content of BannerOverlay. Content should be [localized](https://gestalt.pinterest.systems/web/banneroverlay#Localization). See the [Text variant](https://gestalt.pinterest.systems/web/banneroverlay#Text) to learn more.
   */
  message: string | ReactElement;
  /**
   * Distance (in pixels) from the viewport edge (top will be used, if desktop, bottom will be used, if mobile). See the [Responsive section](https://gestalt.pinterest.systems/web/banneroverlay#Responsive) to learn more.
   */
  offset?: {
    bottom: number;
    top: number;
    reverseOffset?: boolean;
  };
  /**
   * Adds an optional primary button for user interaction.
   * Main action for users to take on BannerOverlay. If href is supplied, the action will serve as a link.
   * If no href is supplied, the action will be a button.
   * The accessibilityLabel should follow the Accessibility guidelines.
   * See the Primary action variant to learn more.
   */
  primaryAction?:
    | {
        accessibilityLabel: string;
        href: string;
        label: string;
        onClick?: ComponentProps<typeof ButtonLink>['onClick'];
        rel?: ComponentProps<typeof ButtonLink>['rel'];
        role: 'link';
        size?: ComponentProps<typeof ButtonLink>['size'];
        target?: ComponentProps<typeof ButtonLink>['target'];
      }
    | {
        accessibilityLabel: string;
        label: string;
        onClick: ComponentProps<typeof Button>['onClick'];
        role?: 'button';
        size?: ComponentProps<typeof Button>['size'];
      };
  /**
   * Adds an optional button for user interaction.
   * In this case, we use our ButtonGroup component.
   */
  secondaryAction?:
    | {
        accessibilityLabel: string;
        href: string;
        label: string;
        onClick?: ComponentProps<typeof ButtonLink>['onClick'];
        rel?: ComponentProps<typeof ButtonLink>['rel'];
        role: 'link';
        size?: ComponentProps<typeof ButtonLink>['size'];
        target?: ComponentProps<typeof ButtonLink>['target'];
      }
    | {
        accessibilityLabel: string;
        label: string;
        onClick: ComponentProps<typeof Button>['onClick'];
        role?: 'button';
        size?: ComponentProps<typeof Button>['size'];
      };
  /**
   * An optional thumbnail to display next to the text.
   */
  thumbnail?:
    | { image: ReactElement; avatar?: never; icon?: never }
    | { image?: never; avatar: ReactElement; icon?: never }
    | { image?: never; avatar?: never; icon: ReactElement };
  /**
   *  Heading of BannerOverlay. Content should be [localized](https://gestalt.pinterest.systems/web/banneroverlay#Localization). See the [Text variant](https://gestalt.pinterest.systems/web/banneroverlay#Text) to learn more.
   */
  title?: string;
  /**
   *  zIndex of BannerOverlay. See the [zIndex guidelines](https://gestalt.pinterest.systems/web/banneroverlay#zIndex) to learn more.
   */
  zIndex?: Indexable;
};

/**
 * [BannerOverlays](https://gestalt.pinterest.systems/web/banneroverlay) displays short educational messages when users have performed actions that indicate some intent, such as a related pin tap or idea pin swipe. It is scrim-less, meaning users can scroll content underneath without having a wash layer on top of the content.
 *
 * BannerOverlay is a sticky component triggered by scroll, on tap or long-press, placed at the bottom of the screen.
 * ![BannerOverlay light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerOverlay.spec.ts-snapshots/BannerOverlay-chromium-darwin.png)
 */
export default function BannerOverlay({
  message,
  title,
  onDismiss,
  primaryAction,
  secondaryAction,
  offset = { top: 0, bottom: 0, reverseOffset: false },
  thumbnail,
  zIndex,
}: Props) {
  const { colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  const isMobileDevice = useDeviceType() === 'mobile';

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const { accessibilityDismissButtonLabel: accessibilityDismissButtonLabelDefault } =
    useDefaultLabelContext('BannerOverlay');

  let messageTextElement: ReactElement | string | undefined;

  if (typeof message === 'string') {
    messageTextElement = message;
  }

  // If `message` is a Text component, we need to override any text colors within to ensure they all match
  const checkTextIsNode = () => {
    const messageIsTextNode =
      typeof message !== 'string' &&
      // @ts-expect-error - TS2339
      Children.only<ReactElement>(message).type.displayName === 'Text';

    if (messageIsTextNode) {
      const textColorOverrideStyles = isDarkMode
        ? styles.textColorOverrideDark
        : styles.textColorOverrideLight;

      messageTextElement = <span className={textColorOverrideStyles}>{message}</span>;
    }
    return messageIsTextNode;
  };

  const isMessageTextNode = checkTextIsNode();

  const getPosition: () => { bottom: number | 'unset'; top: number | 'unset' } = () => {
    if (!offset.reverseOffset && isMobileDevice) return { bottom: offset.bottom, top: 'unset' };
    if (!offset.reverseOffset && !isMobileDevice) return { bottom: 'unset', top: offset.top };
    if (offset.reverseOffset && !isMobileDevice) return { bottom: offset.bottom, top: 'unset' };
    if (offset.reverseOffset && isMobileDevice) return { bottom: 'unset', top: offset.top };
    return { bottom: 0, top: 0 };
  };

  const checkDisplayName: (arg0: ReactElement, arg1: string) => boolean = (
    thumbnailElement,
    displayName,
  ) =>
    // @ts-expect-error - TS2339
    Children.only<ReactElement>(thumbnailElement).type.displayName === displayName;

  return (
    <Fragment>
      {/*
            XS BREAKPOINT
      */}
      <Box display="flex" smDisplay="none">
        <Box
          borderStyle="shadow"
          color={isDarkMode ? DEFAULT_COLORS.darkModeBackground : DEFAULT_COLORS.lightModeBackground}
          dangerouslySetInlineStyle={{
            __style: {
              bottom: getPosition().bottom,
              top: getPosition().top,
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
          direction="column"
          maxWidth={348}
          padding={4}
          position="fixed"
          rounding={4}
          width={`calc(100% - ${TOKEN_SPACE_800}`}
          zIndex={zIndex}
        >
          <Flex direction="column" gap={4}>
            <Flex gap={4}>
              {thumbnail?.image && checkDisplayName(thumbnail.image, 'Image') ? (
                <ImageThumbnail thumbnail={thumbnail.image} />
              ) : null}
              {thumbnail?.icon && checkDisplayName(thumbnail.icon, 'Icon') ? (
                <IconThumbnail thumbnail={thumbnail.icon} />
              ) : null}
              {thumbnail?.avatar && checkDisplayName(thumbnail.avatar, 'Avatar') ? (
                <AvatarThumbnail thumbnail={thumbnail.avatar} />
              ) : null}
              <Flex.Item flex="grow">
                <Flex direction="row" gap={4} justifyContent="between">
                  {title && !isInVRExperiment ? <Text weight="bold">{title}</Text> : null}
                  {title && isInVRExperiment ? <Heading size="300">{title}</Heading> : null}
                  {onDismiss && (
                    <Flex.Item alignSelf={title ? 'end' : 'start'}>
                      <InternalDismissButton
                        accessibilityLabel={accessibilityDismissButtonLabelDefault}
                        iconColor="darkGray"
                        onClick={onDismiss}
                        size="xs"
                      />
                    </Flex.Item>
                  )}
                </Flex>
                <Message
                  text={isMessageTextNode ? undefined : messageTextElement}
                  textColor={DEFAULT_COLORS.textColor}
                  textElement={isMessageTextNode ? messageTextElement : undefined}
                />
              </Flex.Item>
            </Flex>
            <Flex.Item alignSelf="end">
              <Flex direction="row" gap={2} wrap>
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
              </Flex>
            </Flex.Item>
          </Flex>
        </Box>
      </Box>
      {/*
            SM BREAKPOINT
      */}
      <Box display="none" smDisplay="flex">
        <Box
          borderStyle="shadow"
          color={isDarkMode ? DEFAULT_COLORS.darkModeBackground : DEFAULT_COLORS.lightModeBackground}
          dangerouslySetInlineStyle={{
            __style: {
              bottom: getPosition().bottom,
              top: getPosition().top,
              left: '50%',
              transform: 'translateX(-50%)',
            },
          }}
          maxWidth={900}
          padding={4}
          position="fixed"
          rounding={4}
          width={`calc(100% - ${TOKEN_SPACE_800}`}
          zIndex={zIndex}
        >
          <Flex gap={4}>
            {thumbnail?.image && checkDisplayName(thumbnail.image, 'Image') ? (
              <ImageThumbnail thumbnail={thumbnail.image} />
            ) : null}
            {thumbnail?.icon && checkDisplayName(thumbnail.icon, 'Icon') ? (
              <IconThumbnail thumbnail={thumbnail.icon} />
            ) : null}
            {thumbnail?.avatar && checkDisplayName(thumbnail.avatar, 'Avatar') ? (
              <AvatarThumbnail thumbnail={thumbnail.avatar} />
            ) : null}
            <Flex.Item flex="grow">
              <Flex direction="column">
                {title && !isInVRExperiment ? <Text weight="bold">{title}</Text> : null}
                {title && isInVRExperiment ? <Heading size="300">{title}</Heading> : null}
                <Message
                  text={isMessageTextNode ? undefined : messageTextElement}
                  textColor={DEFAULT_COLORS.textColor}
                  textElement={isMessageTextNode ? messageTextElement : undefined}
                />
              </Flex>
            </Flex.Item>
            <Flex.Item alignSelf="center" flex="none">
              <Flex gap={2}>
                {secondaryAction && secondaryAction.role === 'link' ? (
                  <CallToAction
                    accessibilityLabel={secondaryAction.accessibilityLabel}
                    color="gray"
                    href={secondaryAction.href}
                    label={secondaryAction.label}
                    onClick={secondaryAction.onClick}
                    rel={secondaryAction?.rel}
                    role="link"
                    size={isInVRExperiment ? 'md' : 'sm'}
                    target={secondaryAction?.target}
                  />
                ) : null}

                {secondaryAction && secondaryAction.role === 'button' ? (
                  <CallToAction
                    accessibilityLabel={secondaryAction.accessibilityLabel}
                    color="gray"
                    label={secondaryAction.label}
                    onClick={secondaryAction.onClick}
                    role="button"
                    size={isInVRExperiment ? 'md' : 'sm'}
                  />
                ) : null}

                {primaryAction && primaryAction.role === 'link' ? (
                  <CallToAction
                    accessibilityLabel={primaryAction.accessibilityLabel}
                    color="red"
                    href={primaryAction.href}
                    label={primaryAction.label}
                    onClick={primaryAction.onClick}
                    rel={primaryAction?.rel}
                    role="link"
                    size={isInVRExperiment ? 'md' : 'sm'}
                    target={primaryAction?.target}
                  />
                ) : null}

                {primaryAction && primaryAction.role === 'button' ? (
                  <CallToAction
                    accessibilityLabel={primaryAction.accessibilityLabel}
                    color="red"
                    label={primaryAction.label}
                    onClick={primaryAction.onClick}
                    role="button"
                    size={isInVRExperiment ? 'md' : 'sm'}
                  />
                ) : null}
              </Flex>
            </Flex.Item>
            <Flex.Item alignSelf="center">
              {!!onDismiss && (
                <InternalDismissButton
                  accessibilityLabel={accessibilityDismissButtonLabelDefault}
                  iconColor="darkGray"
                  onClick={onDismiss}
                  size="xs"
                />
              )}{' '}
            </Flex.Item>
          </Flex>
        </Box>
      </Box>
    </Fragment>
  );
}

BannerOverlay.displayName = 'BannerOverlay';
