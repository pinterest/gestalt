import { Children, ComponentProps, ReactElement } from 'react';
import classnames from 'classnames';
import {
  SEMA_SPACE_800,
  SEMA_SPACE_1200,
} from 'gestalt-design-tokens/dist/js/vr-theme/constants.es';
import styles from './BannerCallout.css';
import Box from './Box';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Heading from './Heading';
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
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const primaryColor: ComponentProps<typeof Button>['color'] = isInVRExperiment ? 'red' : 'white';

  let secondaryColor: 'white' | 'transparent' | 'gray'  = isInVRExperiment ? 'white' : 'transparent';

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

  const isRtl = typeof document === 'undefined' ? false : document?.dir === 'rtl';

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

  return (
    <Box
      borderStyle={type === 'default' ? 'sm' : undefined}
      // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"selected" | "default" | "shopping" | "inverse" | "light" | "dark" | "darkWash" | "lightWash" | "transparent" | "transparentDarkGray" | "infoBase" | "infoWeak" | "errorBase" | ... 15 more ... | undefined'.
      color={MESSAGING_TYPE_ATTRIBUTES[type].backgroundColor}
      dangerouslySetInlineStyle={
        isInVRExperiment
          ? {
              __style: isRtl
                ? { paddingRight: SEMA_SPACE_800, paddingLeft: SEMA_SPACE_1200 }
                : { paddingRight: SEMA_SPACE_1200, paddingLeft: SEMA_SPACE_800 },
            }
          : undefined
      }
      direction="column"
      display="flex"
      paddingX={isInVRExperiment ? undefined : 6}
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
          <Box
            marginBottom={4}
            marginTop={0}
            smMarginBottom="auto"
            smMarginTop={isInVRExperiment ? undefined : 'auto'}
          >
            <Icon
              accessibilityLabel={iconAccessibilityLabel ?? getDefaultIconAccessibilityLabel()}
              // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'IconColor | undefined'.
              color={MESSAGING_TYPE_ATTRIBUTES[type].iconColor}
              // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"replace" | "search" | "link" | "text" | "dash" | "3D" | "3D-move" | "360" | "accessibility" | "ad" | "ad-group" | "add" | "add-circle" | "add-layout" | "add-pin" | "add-section" | ... 318 more ... | undefined'.
              icon={MESSAGING_TYPE_ATTRIBUTES[type].icon}
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
                  {isInVRExperiment ? (
                    <Heading align={responsiveMinWidth === 'xs' ? 'center' : undefined} size="400">
                      {title}
                    </Heading>
                  ) : (
                    <Text
                      align={responsiveMinWidth === 'xs' ? 'center' : undefined}
                      size="400"
                      weight="bold"
                    >
                      {title}
                    </Text>
                  )}
                </Box>
              )}
              {typeof message === 'string' ? (
                <Text align={responsiveMinWidth === 'xs' ? 'center' : undefined}>{message}</Text>
              ) : null}
              {typeof message !== 'string' &&
              // @ts-expect-error - TS2339
              Children.only<ReactElement>(message).type.displayName === 'Text'
                ? message
                : null}
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
        <div
          className={classnames(styles.dismissButton, {
            [styles.rtlPos]: !isInVRExperiment,
            [styles.rtlVRPos]: isInVRExperiment,
          })}
        >
          <IconButton
            accessibilityLabel={dismissButton.accessibilityLabel ?? accessibilityDismissButtonLabel}
            icon="cancel"
            iconColor="darkGray"
            onClick={dismissButton.onDismiss}
            padding={isInVRExperiment ? undefined : 4}
            size="sm"
          />
        </div>
      )}
    </Box>
  );
}

BannerCallout.displayName = 'BannerCallout';
