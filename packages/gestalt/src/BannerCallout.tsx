import { ComponentProps, ReactElement } from 'react';
import classnames from 'classnames';
import styles from './BannerCallout.css';
import VRBannerCallout from './BannerCallout/VRBannerCallout';
import Box from './Box';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Icon from './Icon';
import IconButton from './IconButton';
import MESSAGING_TYPE_ATTRIBUTES from './MESSAGING_TYPE_ATTRIBUTES';
import Text from './Text';
import useInExperiment from './useInExperiment';
import useResponsiveMinWidth from './useResponsiveMinWidth';

export type ActionDataType =
  | {
      accessibilityLabel: string;
      disabled?: boolean;
      href: string;
      label: string;
      onClick?: ComponentProps<typeof ButtonLink>['onClick'];
      rel?: 'none' | 'nofollow';
      role: 'link';
      target?: null | 'self' | 'blank';
    }
  | {
      accessibilityLabel: string;
      disabled?: boolean;
      label: string;
      onClick?: ComponentProps<typeof Button>['onClick'];
      role?: 'button';
    };

type Props = {
  /**
   * Adds a dismiss button to BannerCallout. See the [Dismissible variant](https://gestalt.pinterest.systems/web/bannercallout#Dismissible) for more info.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannercallout#Accessibility).
   */
  dismissButton?: {
    accessibilityLabel?: string;
    onDismiss: () => void;
  };
  /**
   * Label to describe the icon’s purpose. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannercallout#Accessibility) for details on proper usage.
   */
  iconAccessibilityLabel?: string;
  /**
   * Main content of BannerCallout. Content should be [localized](https://gestalt.pinterest.systems/web/bannercallout#Localization).
   *
   * See the [message variant](https://gestalt.pinterest.systems/web/bannercallout#Message) to learn more. Refer to the [Best Practices](https://gestalt.pinterest.systems/web/bannercallout#Best-practices) for content guidelines.
   */
  message: string | ReactElement;
  /**
   * Main action for users to take on BannerCallout. If `href` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannercallout#Accessibility).
   */
  primaryAction?:
    | {
        role: 'link';
        accessibilityLabel: string;
        disabled?: boolean;
        href: string;
        label: string;
        onClick?: ComponentProps<typeof ButtonLink>['onClick'];
        rel?: 'none' | 'nofollow';
        target?: null | 'self' | 'blank';
      }
    | {
        role?: 'button';
        accessibilityLabel: string;
        disabled?: boolean;
        label: string;
        onClick?: ComponentProps<typeof Button>['onClick'];
      };
  /**
   * Secondary action for users to take on BannerCallout. If role='link', the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   * If role='button' (or undefined), the action will be a button.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannercallout#Accessibility).
   */
  secondaryAction?:
    | {
        role: 'link';
        accessibilityLabel: string;
        disabled?: boolean;
        href: string;
        label: string;
        onClick?: ComponentProps<typeof ButtonLink>['onClick'];
        rel?: 'none' | 'nofollow';
        target?: null | 'self' | 'blank';
      }
    | {
        role?: 'button';
        accessibilityLabel: string;
        disabled?: boolean;
        label: string;
        onClick?: ComponentProps<typeof Button>['onClick'];
      };
  /**
   * The category of BannerCallout. See [Variants](https://gestalt.pinterest.systems/web/bannercallout#Variants) to learn more.
   */
  type: 'default' | 'error' | 'info' | 'recommendation' | 'success' | 'warning';
  /**
   * Brief title summarizing BannerCallout. Content should be [localized](https://gestalt.pinterest.systems/web/bannercallout#Localization).
   */
  title?: string;
};

function BannerCalloutAction({
  data,
  stacked,
  level,
  type,
}: {
  data: ActionDataType;
  stacked?: boolean;
  level: string;
  type: 'default' | 'error' | 'info' | 'recommendation' | 'success' | 'warning';
}) {
  const primaryColor: ComponentProps<typeof Button>['color'] = 'white';

  let secondaryColor: 'white' | 'transparent' | 'gray' = 'transparent';

  if (type === 'default') {
    secondaryColor = 'gray';
  }

  const color: ComponentProps<typeof Button>['color'] =
    level === 'primary' ? primaryColor : secondaryColor;

  const { accessibilityLabel, disabled, label } = data;

  return (
    <Box
      alignItems="center"
      display="block"
      justifyContent="center"
      marginTop={level === 'secondary' && stacked ? 2 : undefined}
      paddingX={1}
      smDisplay="flex"
      smMarginBottom="auto"
      smMarginTop="auto"
    >
      {data.role === 'link' ? (
        <ButtonLink
          accessibilityLabel={accessibilityLabel}
          color={color}
          disabled={disabled}
          fullWidth
          href={data.href}
          onClick={data.onClick}
          rel={data.rel}
          size="lg"
          target={data.target}
          text={label}
        />
      ) : (
        <Button
          accessibilityLabel={accessibilityLabel}
          color={color}
          disabled={disabled}
          fullWidth
          onClick={data.onClick}
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
 * ![BannerCallout light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerCallout.spec.ts-snapshots/BannerCallout-chromium-darwin.png)
 * ![BannerCallout dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/BannerCallout-dark.spec.ts-snapshots/BannerCallout-dark-chromium-darwin.png)
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
}: Props) {
  const responsiveMinWidth = useResponsiveMinWidth();
  const {
    accessibilityDismissButtonLabel,
    iconAccessibilityLabelError,
    iconAccessibilityLabelInfo,
    iconAccessibilityLabelRecommendation,
    iconAccessibilityLabelSuccess,
    iconAccessibilityLabelWarning,
  } = useDefaultLabelContext('BannerCallout');

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

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

  if (isInVRExperiment) {
    return (
      <VRBannerCallout
        dismissButton={dismissButton}
        iconAccessibilityLabel={iconAccessibilityLabel}
        message={message}
        primaryAction={primaryAction}
        secondaryAction={secondaryAction}
        title={title}
        type={type}
      />
    );
  }

  return (
    <Box
      borderStyle={type === 'default' ? 'sm' : undefined}
      color={MESSAGING_TYPE_ATTRIBUTES[type]?.backgroundColor}
      direction="column"
      display="flex"
      paddingX={6}
      paddingY={6}
      position="relative"
      rounding={4}
      smDirection="row"
      smPadding={8}
    >
      <Box smDisplay="flex" smMarginBottom={-3} smMarginTop={-3} width="100%" wrap>
        <Box
          alignItems="center"
          direction="column"
          display="flex"
          justifyContent="center"
          marginBottom={primaryAction || secondaryAction ? 4 : undefined}
          smDirection="row"
          smMarginBottom={primaryAction || secondaryAction ? 0 : undefined}
          smPaddingY={3}
        >
          <Box marginBottom={4} marginTop={0} smMarginBottom="auto" smMarginTop="auto">
            <Icon
              accessibilityLabel={iconAccessibilityLabel ?? getDefaultIconAccessibilityLabel()}
              color={MESSAGING_TYPE_ATTRIBUTES[type]?.iconColor}
              icon={MESSAGING_TYPE_ATTRIBUTES[type]?.icon}
              size={32}
            />
          </Box>
          <Box marginBottom="auto" marginTop="auto" maxWidth={648} paddingX={6}>
            <Box
              alignItems="center"
              direction="column"
              display="flex"
              marginBottom="auto"
              marginTop="auto"
              smDisplay="block"
            >
              {title && (
                <Box marginBottom={2}>
                  <Text
                    align={responsiveMinWidth === 'xs' ? 'center' : undefined}
                    size="400"
                    weight="bold"
                  >
                    {title}
                  </Text>
                </Box>
              )}
              {typeof message === 'string' && (
                <Text align={responsiveMinWidth === 'xs' ? 'center' : undefined}>{message}</Text>
              )}
              {message && typeof message !== 'string' && message}
            </Box>
          </Box>
        </Box>
        {(primaryAction || secondaryAction) && (
          <Box marginStart="auto" smDisplay="flex" smMarginEnd={4} smPaddingY={3}>
            {secondaryAction && responsiveMinWidth !== 'xs' && (
              <BannerCalloutAction data={secondaryAction} level="secondary" type={type} />
            )}
            {primaryAction && (
              <BannerCalloutAction data={primaryAction} level="primary" type={type} />
            )}
            {secondaryAction && responsiveMinWidth === 'xs' && (
              <BannerCalloutAction
                data={secondaryAction}
                level="secondary"
                stacked={!!secondaryAction}
                type={type}
              />
            )}
          </Box>
        )}
      </Box>
      {dismissButton && (
        <div className={classnames(styles.dismissButton, styles.rtlPos)}>
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
