// @flow strict
import { Children, type Element, type Node as ReactNode } from 'react';
import classnames from 'classnames';
import styles from './BannerCallout.css';
import Box from './Box';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Icon from './Icon';
import IconButton from './IconButton';
import MESSAGING_TYPE_ATTRIBUTES from './MESSAGING_TYPE_ATTRIBUTES';
import Text from './Text';
import useResponsiveMinWidth from './useResponsiveMinWidth';

export type ActionDataType =
  | {
      accessibilityLabel: string,
      disabled?: boolean,
      href: string,
      label: string,
      onClick?: $ElementType<React$ElementConfig<typeof ButtonLink>, 'onClick'>,
      rel?: 'none' | 'nofollow',
      role: 'link',
      target?: null | 'self' | 'blank',
    }
  | {
      accessibilityLabel: string,
      disabled?: boolean,
      label: string,
      onClick?: $ElementType<React$ElementConfig<typeof Button>, 'onClick'>,
      role?: 'button',
    };

type Props = {
  /**
   * Adds a dismiss button to BannerCallout. See the [Dismissible variant](https://gestalt.pinterest.systems/web/bannercallout#Dismissible) for more info.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannercallout#Accessibility).
   */
  dismissButton?: { accessibilityLabel?: string, onDismiss: () => void },
  /**
   * Label to describe the icon’s purpose. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannercallout#Accessibility) for details on proper usage.
   */
  iconAccessibilityLabel?: string,
  /**
   * Main content of BannerCallout. Content should be [localized](https://gestalt.pinterest.systems/web/bannercallout#Localization).
   *
   * See the [message variant](https://gestalt.pinterest.systems/web/bannercallout#Message) to learn more. Refer to the [Best Practices](https://gestalt.pinterest.systems/web/bannercallout#Best-practices) for content guidelines.
   */
  message: string | Element<typeof Text>,
  /**
   * Main action for users to take on BannerCallout. If `href` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannercallout#Accessibility).
   */
  primaryAction?:
    | {
        role: 'link',
        accessibilityLabel: string,
        disabled?: boolean,
        href: string,
        label: string,
        onClick?: $ElementType<React$ElementConfig<typeof ButtonLink>, 'onClick'>,
        rel?: 'none' | 'nofollow',
        target?: null | 'self' | 'blank',
      }
    | {
        role?: 'button',
        accessibilityLabel: string,
        disabled?: boolean,
        label: string,
        onClick?: $ElementType<React$ElementConfig<typeof Button>, 'onClick'>,
      },
  /**
   * Secondary action for users to take on BannerCallout. If role='link', the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   * If role='button' (or undefined), the action will be a button.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannercallout#Accessibility).
   */
  secondaryAction?:
    | {
        role: 'link',
        accessibilityLabel: string,
        disabled?: boolean,
        href: string,
        label: string,
        onClick?: $ElementType<React$ElementConfig<typeof ButtonLink>, 'onClick'>,
        rel?: 'none' | 'nofollow',
        target?: null | 'self' | 'blank',
      }
    | {
        role?: 'button',
        accessibilityLabel: string,
        disabled?: boolean,
        label: string,
        onClick?: $ElementType<React$ElementConfig<typeof Button>, 'onClick'>,
      },
  /**
   * The category of BannerCallout. See [Variants](https://gestalt.pinterest.systems/web/bannercallout#Variants) to learn more.
   */
  type: 'error' | 'info' | 'recommendation' | 'success' | 'warning',
  /**
   * Brief title summarizing BannerCallout. Content should be [localized](https://gestalt.pinterest.systems/web/bannercallout#Localization).
   */
  title?: string,
};

function BannerCalloutAction({
  data,
  stacked,
  type,
}: {
  data: ActionDataType,
  stacked?: boolean,
  type: string,
}): ReactNode {
  const color = type === 'primary' ? 'white' : 'transparent';

  const { accessibilityLabel, disabled, label } = data;

  return (
    <Box
      display="block"
      smDisplay="flex"
      alignItems="center"
      justifyContent="center"
      paddingX={1}
      marginTop={type === 'secondary' && stacked ? 2 : undefined}
      smMarginTop="auto"
      smMarginBottom="auto"
    >
      {data.role === 'link' ? (
        <ButtonLink
          accessibilityLabel={accessibilityLabel}
          color={color}
          disabled={disabled}
          href={data.href}
          fullWidth
          onClick={data.onClick}
          rel={data.rel}
          size="lg"
          target={data.target}
          text={label}
        />
      ) : (
        <Button
          accessibilityLabel={accessibilityLabel}
          disabled={disabled}
          color={color}
          onClick={data.onClick}
          fullWidth
          size="lg"
          text={label}
        />
      )}
    </Box>
  );
}

/**
 * [BannerCallout](https://gestalt.pinterest.systems/web/bannercallout) is a banner displaying short messages with helpful information for a task on the page, or something that requires the user’s attention.
 *
 * ![BannerCallout light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerCallout.spec.mjs-snapshots/BannerCallout-chromium-darwin.png)
 * ![BannerCallout dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerCallout-dark.spec.mjs-snapshots/BannerCallout-dark-chromium-darwin.png)
 *
 */
export default function BannerCallout({
  dismissButton,
  iconAccessibilityLabel,
  message,
  primaryAction,
  secondaryAction,
  type,
  title,
}: Props): ReactNode {
  const responsiveMinWidth = useResponsiveMinWidth();
  const {
    accessibilityDismissButtonLabel,
    iconAccessibilityLabelError,
    iconAccessibilityLabelInfo,
    iconAccessibilityLabelRecommendation,
    iconAccessibilityLabelSuccess,
    iconAccessibilityLabelWarning,
  } = useDefaultLabelContext('BannerCallout');

  const getDefaultIconAccessibilityLabel = () => {
    switch (type) {
      case 'success':
        return iconAccessibilityLabelSuccess;
      case 'info':
        return iconAccessibilityLabelInfo;
      case 'recommendation':
        return iconAccessibilityLabelRecommendation;
      case 'warning':
        return iconAccessibilityLabelWarning;
      case 'error':
        return iconAccessibilityLabelError;
      default:
        return '';
    }
  };

  return (
    <Box
      color={MESSAGING_TYPE_ATTRIBUTES[type].backgroundColor}
      display="flex"
      direction="column"
      smDirection="row"
      padding={6}
      smPadding={8}
      position="relative"
      rounding={4}
    >
      <Box smDisplay="flex" wrap width="100%" smMarginTop={-3} smMarginBottom={-3}>
        <Box
          display="flex"
          direction="column"
          smDirection="row"
          justifyContent="center"
          alignItems="center"
          marginBottom={primaryAction || secondaryAction ? 4 : undefined}
          smMarginBottom={primaryAction || secondaryAction ? 0 : undefined}
          smPaddingY={3}
        >
          <Box marginBottom={4} marginTop={0} smMarginBottom="auto" smMarginTop="auto">
            <Icon
              accessibilityLabel={iconAccessibilityLabel ?? getDefaultIconAccessibilityLabel()}
              color={MESSAGING_TYPE_ATTRIBUTES[type].iconColor}
              icon={MESSAGING_TYPE_ATTRIBUTES[type].icon}
              size={32}
            />
          </Box>
          <Box marginBottom="auto" marginTop="auto" maxWidth={648} paddingX={6}>
            <Box
              display="flex"
              smDisplay="block"
              direction="column"
              alignItems="center"
              marginBottom="auto"
              marginTop="auto"
            >
              {title && (
                <Box marginBottom={2}>
                  <Text
                    size="400"
                    weight="bold"
                    align={responsiveMinWidth === 'xs' ? 'center' : undefined}
                  >
                    {title}
                  </Text>
                </Box>
              )}
              {typeof message === 'string' ? (
                <Text align={responsiveMinWidth === 'xs' ? 'center' : undefined}>{message}</Text>
              ) : null}
              {typeof message !== 'string' &&
              Children.only<Element<typeof Text>>(message).type.displayName === 'Text'
                ? message
                : null}
            </Box>
          </Box>
        </Box>
        {(primaryAction || secondaryAction) && (
          <Box smDisplay="flex" marginStart="auto" smMarginEnd={4} smPaddingY={3}>
            {secondaryAction && responsiveMinWidth !== 'xs' && (
              <BannerCalloutAction type="secondary" data={secondaryAction} />
            )}
            {primaryAction && <BannerCalloutAction type="primary" data={primaryAction} />}
            {secondaryAction && responsiveMinWidth === 'xs' && (
              <BannerCalloutAction
                type="secondary"
                data={secondaryAction}
                stacked={!!secondaryAction}
              />
            )}
          </Box>
        )}
      </Box>

      {dismissButton && (
        <div className={classnames(styles.rtlPos)}>
          <IconButton
            accessibilityLabel={dismissButton.accessibilityLabel ?? accessibilityDismissButtonLabel}
            icon="cancel"
            iconColor="darkGray"
            onClick={dismissButton.onDismiss}
            padding={4}
            size="sm"
          />
        </div>
      )}
    </Box>
  );
}

BannerCallout.displayName = 'BannerCallout';
