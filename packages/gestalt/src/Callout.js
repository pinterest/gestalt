// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Button from './Button.js';
import Text from './Text.js';
import styles from './Callout.css';
import MESSAGING_TYPE_ATTRIBUTES from './MESSAGING_TYPE_ATTRIBUTES.js';
import useResponsiveMinWidth from './useResponsiveMinWidth.js';
import { type ActionDataType } from './commonTypes.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type Props = {|
  /**
   * Adds a dismiss button to Callout. See the [Dismissible variant](https://gestalt.pinterest.systems/callout#Dismissible) for more info.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/callout#Accessibility).
   */
  dismissButton?: {| accessibilityLabel: string, onDismiss: () => void |},
  /**
   * Label to describe the icon’s purpose. See the [Accessibility guidelines](https://gestalt.pinterest.systems/callout#Accessibility) for details on proper usage.
   */
  iconAccessibilityLabel: string,
  /**
   * Main content of Callout. Content should be [localized](https://gestalt.pinterest.systems/callout#Localization).
   *
   * See [Best Practices](https://gestalt.pinterest.systems/callout#Best-practices) for more info.
   */
  message: string,
  /**
   * Main action for users to take on Callout. If `href` is supplied, the action will serve as a link. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/onlinknavigationprovider) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/callout#Accessibility).
   */
  primaryAction?: {|
    accessibilityLabel: string,
    disabled?: boolean,
    href?: string,
    label: string,
    onClick?: AbstractEventHandler<
      | SyntheticMouseEvent<HTMLButtonElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLButtonElement>,
      {| dangerouslyDisableOnNavigation: () => void |},
    >,
    rel?: 'none' | 'nofollow',
    target?: null | 'self' | 'blank',
  |},
  /**
   * Secondary action for users to take on Callout. If `href` is supplied, the action will serve as a link. See [OnLinkNavigationProvider](https://gestalt.pinterest.systems/onlinknavigationprovider) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/callout#Accessibility).
   */
  secondaryAction?: {|
    accessibilityLabel: string,
    disabled?: boolean,
    href?: string,
    label: string,
    onClick?: AbstractEventHandler<
      | SyntheticMouseEvent<HTMLButtonElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLButtonElement>,
      {| dangerouslyDisableOnNavigation: () => void |},
    >,
    rel?: 'none' | 'nofollow',
    target?: null | 'self' | 'blank',
  |},
  /**
   * The category of Callout. See [Variants](https://gestalt.pinterest.systems/callout#Variants) to learn more.
   */
  type: 'error' | 'info' | 'warning',
  /**
   * Brief title summarizing Callout. Content should be [localized](https://gestalt.pinterest.systems/callout#Localization).
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
 * [Callout](https://gestalt.pinterest.systems/callout) is a banner displaying short messages with helpful information for a task on the page, or something that requires the user’s attention.
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
              accessibilityLabel={iconAccessibilityLabel}
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
              <Text align={responsiveMinWidth === 'xs' ? 'center' : undefined}>{message}</Text>
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
            accessibilityLabel={dismissButton.accessibilityLabel}
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
