// @flow strict
import { Children, type Element, type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Button from './Button.js';
import styles from './Callout.css';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import MESSAGING_TYPE_ATTRIBUTES from './MESSAGING_TYPE_ATTRIBUTES.js';
import Text from './Text.js';
import useResponsiveMinWidth from './useResponsiveMinWidth.js';

export type ActionDataType = {|
  accessibilityLabel: string,
  disabled?: boolean,
  href?: string,
  label: string,
  onClick?: ({|
    event:
      | SyntheticMouseEvent<HTMLButtonElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLButtonElement>,
    dangerouslyDisableOnNavigation: () => void,
  |}) => void,
  rel?: 'none' | 'nofollow',
  target?: null | 'self' | 'blank',
|};

type Props = {|
  /**
   * Adds a dismiss button to Callout. See the [Dismissible variant](https://gestalt.pinterest.systems/web/callout#Dismissible) for more info.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/callout#Accessibility).
   */
  dismissButton?: {| accessibilityLabel?: string, onDismiss: () => void |},
  /**
   * Label to describe the icon’s purpose. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/callout#Accessibility) for details on proper usage.
   */
  iconAccessibilityLabel: string,
  /**
   * Main content of Callout. Content should be [localized](https://gestalt.pinterest.systems/web/callout#Localization).
   *
   * See the [message variant](https://gestalt.pinterest.systems/web/callout#Message) to learn more. Refer to the [Best Practices](https://gestalt.pinterest.systems/web/callout#Best-practices) for content guidelines.
   */
  message: string | Element<typeof Text>,
  /**
   * Main action for users to take on Callout. If `href` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/callout#Accessibility).
   */
  primaryAction?: {|
    accessibilityLabel: string,
    disabled?: boolean,
    href?: string,
    label: string,
    onClick?: ({|
      event:
        | SyntheticMouseEvent<HTMLButtonElement>
        | SyntheticMouseEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLButtonElement>,
      dangerouslyDisableOnNavigation: () => void,
    |}) => void,
    rel?: 'none' | 'nofollow',
    target?: null | 'self' | 'blank',
  |},
  /**
   * Secondary action for users to take on Callout. If `href` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/callout#Accessibility).
   */
  secondaryAction?: {|
    accessibilityLabel: string,
    disabled?: boolean,
    href?: string,
    label: string,
    onClick?: ({|
      event:
        | SyntheticMouseEvent<HTMLButtonElement>
        | SyntheticMouseEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLButtonElement>,
      dangerouslyDisableOnNavigation: () => void,
    |}) => void,
    rel?: 'none' | 'nofollow',
    target?: null | 'self' | 'blank',
  |},
  /**
   * The category of Callout. See [Variants](https://gestalt.pinterest.systems/web/callout#Variants) to learn more.
   */
  type: 'error' | 'info' | 'recommendation' | 'success' | 'warning',
  /**
   * Brief title summarizing Callout. Content should be [localized](https://gestalt.pinterest.systems/web/callout#Localization).
   */
  title?: string,
|};

function CalloutAction({
  data,
  stacked,
  type,
}: {|
  data: ActionDataType,
  stacked?: boolean,
  type: string,
|}): Node {
  const color = type === 'primary' ? 'white' : 'transparent';
  const { accessibilityLabel, disabled, label, onClick, href, rel, target } = data;

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
      {href ? (
        <Button
          accessibilityLabel={accessibilityLabel}
          color={color}
          disabled={disabled}
          href={href}
          fullWidth
          onClick={onClick}
          rel={rel}
          role="link"
          size="lg"
          target={target}
          text={label}
        />
      ) : (
        <Button
          accessibilityLabel={accessibilityLabel}
          disabled={disabled}
          color={color}
          onClick={onClick}
          fullWidth
          role="button"
          size="lg"
          text={label}
        />
      )}
    </Box>
  );
}

/**
 * [Callout](https://gestalt.pinterest.systems/web/callout) is a banner displaying short messages with helpful information for a task on the page, or something that requires the user’s attention.
 *
 * ![Callout light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Callout.spec.mjs-snapshots/Callout-chromium-darwin.png)
 * ![Callout dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Callout-dark.spec.mjs-snapshots/Callout-dark-chromium-darwin.png)
 *
 */
export default function Callout({
  dismissButton,
  iconAccessibilityLabel,
  message,
  primaryAction,
  secondaryAction,
  type,
  title,
}: Props): Node {
  const responsiveMinWidth = useResponsiveMinWidth();
  const {
    accessibilityDismissButtonLabel,
    iconAccessibilityLabelError,
    iconAccessibilityLabelInfo,
    iconAccessibilityLabelRecommendation,
    iconAccessibilityLabelSuccess,
    iconAccessibilityLabelWarning,
  } = useDefaultLabelContext('Callout');

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
              <CalloutAction type="secondary" data={secondaryAction} />
            )}
            {primaryAction && <CalloutAction type="primary" data={primaryAction} />}
            {secondaryAction && responsiveMinWidth === 'xs' && (
              <CalloutAction type="secondary" data={secondaryAction} stacked={!!secondaryAction} />
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
