import { Children, ComponentProps, isValidElement, ReactElement, ReactNode } from 'react';
import { TOKEN_ROUNDING_300, TOKEN_ROUNDING_400 } from 'gestalt-design-tokens';
import Box from './Box';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Flex from './Flex';
import Link from './Link';
import InternalDismissButton from './sharedSubcomponents/InternalDismissButton';
import OverridingSpan from './sharedSubcomponents/OverridingSpan';
import {
  AvatarThumbnail,
  IconThumbnail,
  ImageThumbnail,
  Message,
  TypeThumbnail,
} from './sharedSubcomponents/thumbnailSubcomponents';
import styles from './Toast.css';
import PrimaryAction from './Toast/PrimaryAction';
import useInExperiment from './useInExperiment';
import useResponsiveMinWidth from './useResponsiveMinWidth';
import isComponentNode from './utils/isComponentNode';

const DEFAULT_COLORS = {
  containerColor: 'inverse',
  textColor: 'inverse',
  iconColor: 'white',
} as const;

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
   * Allows to insert a custom button for user interaction. Do not use except for allowed cases where primaryAction doesn't support functionality required in it.
   */
  _dangerouslySetPrimaryAction?: ReactNode;
  /**
   * Allows to insert a custom thumbnail. Do not use except for allowed cases where thumbnail doesn't support functionality required in it or legacy code.
   */
  _dangerouslySetThumbnail?: ReactNode;
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
    onClick?: (arg1: {
      event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
      dangerouslyDisableOnNavigation: () => void;
    }) => void;
  };
  /**
   * Adds an optional button for user interaction. Generally not recommended given the ephemeral nature of Toasts.
   */
  primaryAction?:
    | {
        accessibilityLabel: string;
        href: string;
        label: string;
        onClick?: ComponentProps<typeof ButtonLink>['onClick'];
        rel?: ComponentProps<typeof Link>['rel'];
        role: 'link';
        size?: ComponentProps<typeof Button>['size'];
        target?: ComponentProps<typeof Link>['target'];
      }
    | {
        accessibilityLabel: string;
        label: string;
        onClick: ComponentProps<typeof Button>['onClick'];
        role?: 'button';
        size?: ComponentProps<typeof Button>['size'];
      };
  /**
   * Main content of Toast. Content should be [localized](https://gestalt.pinterest.systems/web/toast#Localization). See the [Text variant](https://gestalt.pinterest.systems/web/toast#Text) to learn more.
   */
  text: string | ReactElement;
  /**
   * An optional thumbnail to display next to the text.
   */
  thumbnail?: { image: ReactElement } | { avatar: ReactElement } | { icon: ReactElement };
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
 * ![Toast light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Toast.spec.ts-snapshots/Toast-chromium-darwin.png)
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
}: Props) {
  const isInExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });
  const responsiveMinWidth = useResponsiveMinWidth();
  const isMobileWidth = responsiveMinWidth === 'xs';

  const isTextNode = isComponentNode({ text, components: ['Text'] });
  const { accessibilityDismissButtonLabel: accessibilityDismissButtonLabelDefault } =
    useDefaultLabelContext('Toast');

  const { containerColor, textColor, iconColor } = COLORS_BY_TYPE[type];

  const isDefaultToast = type === 'default';
  const isNotDefaultToast = ['success', 'error', 'progress'].includes(type);

  const isImage =
    isDefaultToast &&
    !_dangerouslySetThumbnail &&
    // @ts-expect-error - TS2339 - Property 'image' does not exist on type '{ image: any; } | { avatar: any; } | { icon: any; }'.
    !!thumbnail?.image &&
    // @ts-expect-error - TS2339 - Property 'image' does not exist on type '{ image: any; } | { avatar: any; } | { icon: any; }'.
    Children.only<ReactElement>(thumbnail.image).type.displayName === 'Image';

  const isIcon =
    isDefaultToast &&
    !_dangerouslySetThumbnail &&
    // @ts-expect-error - TS2339 - Property 'icon' does not exist on type '{ image: any; } | { avatar: any; } | { icon: any; }'.
    !!thumbnail?.icon &&
    // @ts-expect-error - TS2339 - Property 'icon' does not exist on type '{ image: any; } | { avatar: any; } | { icon: any; }'.
    Children.only<ReactElement>(thumbnail.icon).type.displayName === 'Icon';

  const isAvatar =
    isDefaultToast &&
    !_dangerouslySetThumbnail &&
    // @ts-expect-error - TS2339 - Property 'avatar' does not exist on type '{ image: any; } | { avatar: any; } | { icon: any; }'.
    !!thumbnail?.avatar &&
    // @ts-expect-error - TS2339 - Property 'avatar' does not exist on type '{ image: any; } | { avatar: any; } | { icon: any; }'.
    Children.only<ReactElement>(thumbnail.avatar).type.displayName === 'Avatar';
  return (
    <div className={styles.toast} role="status">
      <Box
        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"selected" | "default" | "shopping" | "inverse" | "light" | "dark" | "darkWash" | "lightWash" | "transparent" | "transparentDarkGray" | "infoBase" | "infoWeak" | "errorBase" | ... 15 more ... | undefined'.
        color={containerColor}
        dangerouslySetInlineStyle={{
          __style: {
            paddingInlineStart: TOKEN_ROUNDING_400,
            paddingInlineEnd: isInExperiment ? TOKEN_ROUNDING_300 : TOKEN_ROUNDING_400,
          },
        }}
        paddingY={3}
        rounding={4}
        width="100%"
      >
        <Flex alignItems="center" gap={isInExperiment ? 2 : 4}>
          {isDefaultToast && _dangerouslySetThumbnail ? (
            <Flex.Item flex="none">{_dangerouslySetThumbnail}</Flex.Item>
          ) : null}

          {isImage ? (
            <Flex.Item flex="none">
              {/* @ts-expect-error - TS2339 - Property 'image' does not exist on type '{ image: any; } | { avatar: any; } | { icon: any; }'. */}
              <ImageThumbnail thumbnail={thumbnail.image} />
            </Flex.Item>
          ) : null}

          {isIcon ? (
            <Flex.Item flex="none">
              {/* @ts-expect-error - TS2339 - Property 'icon' does not exist on type '{ image: any; } | { avatar: any; } | { icon: any; }'. */}
              <IconThumbnail overrideColor="inverse" thumbnail={thumbnail.icon} />
            </Flex.Item>
          ) : null}

          {isAvatar ? (
            <Flex.Item flex="none">
              {/* @ts-expect-error - TS2339 - Property 'avatar' does not exist on type '{ image: any; } | { avatar: any; } | { icon: any; }'. */}
              <AvatarThumbnail thumbnail={thumbnail.avatar} />
            </Flex.Item>
          ) : null}

          {isNotDefaultToast ? (
            <Flex.Item flex="none">
              <TypeThumbnail type={type} />
            </Flex.Item>
          ) : null}

          <Flex.Item flex="grow">
            <Message
              helperLink={helperLink}
              text={isTextNode ? undefined : text}
              // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"link" | "warning" | "error" | "default" | "subtle" | "success" | "shopping" | "inverse" | "light" | "dark" | undefined'.
              textColor={textColor}
              textElement={
                isTextNode ? (
                  <OverridingSpan inverseTextColor isError={type === 'error'} textElement={text} />
                ) : undefined
              }
              type={type}
            />
          </Flex.Item>

          {primaryAction || _dangerouslySetPrimaryAction ? (
            // Allow button text to wrap on mobile
            <Flex.Item flex={isMobileWidth ? 'shrink' : 'none'}>
              {isValidElement(_dangerouslySetPrimaryAction) ? _dangerouslySetPrimaryAction : null}
              {!_dangerouslySetPrimaryAction &&
              primaryAction?.accessibilityLabel &&
              primaryAction?.label
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

          {dismissButton ? (
            <Flex.Item flex="none">
              <InternalDismissButton
                accessibilityLabel={
                  dismissButton.accessibilityLabel ?? accessibilityDismissButtonLabelDefault
                }
                // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"darkGray" | "gray" | "red" | "white" | "brandPrimary" | undefined'.
                iconColor={iconColor}
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

Toast.displayName = 'Toast';
