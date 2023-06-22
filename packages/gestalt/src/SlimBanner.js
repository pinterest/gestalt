// @flow strict
import { Children, type Element, Fragment, type Node } from 'react';
import Box from './Box.js';
import Button from './Button.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import Flex from './Flex.js';
import Icon from './Icon.js';
import IconButton from './IconButton.js';
import Link from './Link.js';
import MESSAGING_TYPE_ATTRIBUTES from './MESSAGING_TYPE_ATTRIBUTES.js';
import Text from './Text.js';

type DismissButtonType = {|
  accessibilityLabel?: string,
  onDismiss: () => void,
|};

function DismissButton({ accessibilityLabel, onDismiss }: DismissButtonType) {
  const { accessibilityDismissButtonLabel } = useDefaultLabelContext('SlimBanner');
  return (
    <IconButton
      accessibilityLabel={accessibilityLabel ?? accessibilityDismissButtonLabel}
      icon="cancel"
      iconColor="darkGray"
      onClick={onDismiss}
      size="xs"
    />
  );
}

type HelperLinkType = {|
  accessibilityLabel: string,
  href: string,
  onClick?: ({|
    event: SyntheticMouseEvent<HTMLAnchorElement> | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  |}) => void,
  target?: null | 'self' | 'blank',
  text: string,
|};

function HelperLink({ accessibilityLabel, href, onClick, target, text }: HelperLinkType) {
  return (
    <Text inline>
      <Link
        accessibilityLabel={accessibilityLabel}
        href={href}
        display="inlineBlock"
        onClick={onClick}
        target={target}
      >
        {text}
      </Link>
    </Text>
  );
}

type PrimaryActionType = {|
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

function PrimaryAction({
  accessibilityLabel,
  disabled,
  href,
  label,
  onClick,
  rel,
  target,
}: PrimaryActionType) {
  return href ? (
    <Button
      accessibilityLabel={accessibilityLabel}
      color="white"
      disabled={disabled}
      fullWidth
      href={href}
      onClick={onClick}
      rel={rel}
      role="link"
      size="sm"
      target={target}
      text={label}
    />
  ) : (
    <Button
      accessibilityLabel={accessibilityLabel}
      color="white"
      disabled={disabled}
      fullWidth
      onClick={onClick}
      role="button"
      size="sm"
      text={label}
    />
  );
}

type Props = {|
  /**
   * Adds a dismiss button to SlimBanner. See the [Dismissible variant](https://gestalt.pinterest.systems/web/slimbanner#Dismissible) for more info.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/slimbanner#Accessibility).
   *
   * Note that compact ("___Bare" type) SlimBanners are not dismissable.
   */
  dismissButton?: DismissButtonType,
  /**
   * Helper [Link](https://gestalt.pinterest.systems/web/link) to be placed after the message. See the [Message variant](https://gestalt.pinterest.systems/web/slimbanner#Message) to learn more.
   */
  helperLink?: HelperLinkType,
  /**
   * Label to describe the status icon’s purpose. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/slimbanner#Accessibility) for details on proper usage.
   */
  iconAccessibilityLabel?: string,
  /**
   * Main content of SlimBanner. Content should be [localized](https://gestalt.pinterest.systems/web/slimbanner#Localization). See the [Message variant](https://gestalt.pinterest.systems/web/slimbanner#Message) to learn more.
   *
   */
  message: string | Element<typeof Text>,
  /**
   * Main action for users to take on SlimBanner. If `href` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/slimbanner#Accessibility).
   * See the [Primary action](https://gestalt.pinterest.systems/web/slimbanner#Primary-action) variant to learn more.
   *
   * Note that actions are not available on compact ("___Bare" type) SlimBanners.
   */
  primaryAction?: PrimaryActionType,
  /**
   * The type of SlimBanner. See the [variants](https://gestalt.pinterest.systems/web/slimbanner#Variants) to learn more.
   */
  type?:
    | 'neutral'
    | 'error'
    | 'info'
    | 'warning'
    | 'success'
    | 'recommendation'
    | 'errorBare'
    | 'infoBare'
    | 'warningBare'
    | 'successBare'
    | 'recommendationBare',
|};

/**
 * [SlimBanner](https://gestalt.pinterest.systems/web/slimbanner) conveys brief information related to a specific section of a page. The message can relay success, warning, error or general information. Since they are about a specific section of a page or surface, SlimBanner sits inside of a container, and not at the top of the page. For alerts that apply to the whole page, use [Callout](https://gestalt.pinterest.systems/web/callout).
 *
 * ![SlimBanner light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SlimBanner.spec.mjs-snapshots/SlimBanner-chromium-darwin.png)
 * ![SlimBanner dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SlimBanner-dark.spec.mjs-snapshots/SlimBanner-dark-chromium-darwin.png)
 *
 */
export default function SlimBanner({
  dismissButton,
  helperLink,
  iconAccessibilityLabel,
  message,
  primaryAction,
  type = 'neutral',
}: Props): Node {
  const isBare = type.endsWith('Bare');
  const isDefault = type === 'neutral';
  const { backgroundColor, iconColor, icon } = MESSAGING_TYPE_ATTRIBUTES[type.replace('Bare', '')];
  const {
    iconAccessibilityLabelError,
    iconAccessibilityLabelInfo,
    iconAccessibilityLabelRecommendation,
    iconAccessibilityLabelSuccess,
    iconAccessibilityLabelWarning,
  } = useDefaultLabelContext('SlimBanner');

  const getDefaultIconAccessibilityLabel = () => {
    switch (type) {
      case 'success':
      case 'successBare':
        return iconAccessibilityLabelSuccess;
      case 'info':
      case 'infoBare':
        return iconAccessibilityLabelInfo;
      case 'recommendation':
      case 'recommendationBare':
        return iconAccessibilityLabelRecommendation;
      case 'warning':
      case 'warningBare':
        return iconAccessibilityLabelWarning;
      case 'error':
      case 'errorBare':
        return iconAccessibilityLabelError;
      default:
        return '';
    }
  };
  // Buttons not allowed on compact SlimBanners
  const shouldShowButtons = !isBare && (primaryAction || dismissButton);

  return (
    <Box
      alignItems="center"
      color={isBare ? 'transparent' : backgroundColor}
      display="flex"
      direction="column"
      mdDirection="row"
      padding={isBare ? 0 : 4}
      paddingY={isBare ? 1 : 0}
      rounding={4}
      width="100%"
    >
      <Flex
        alignItems="start"
        mdAlignItems="center"
        gap={{ row: isBare ? 2 : 4, column: 0 }}
        flex="grow"
        width="100%"
      >
        {!isDefault && (
          <Flex.Item alignSelf={shouldShowButtons ? undefined : 'start'}>
            <Icon
              accessibilityLabel={iconAccessibilityLabel ?? getDefaultIconAccessibilityLabel()}
              color={iconColor}
              icon={icon}
              size={16}
            />
          </Flex.Item>
        )}

        <Flex.Item flex="grow">
          <Box dangerouslySetInlineStyle={{ __style: !isDefault ? { marginTop: '-1px' } : {} }}>
            {typeof message === 'string' ? (
              <Text inline>
                {message}
                {helperLink ? (
                  <Fragment>
                    {' '}
                    <HelperLink {...helperLink} />
                  </Fragment>
                ) : null}
              </Text>
            ) : null}
            {typeof message !== 'string' &&
            Children.only<Element<typeof Text>>(message).type.displayName === 'Text'
              ? message
              : null}
          </Box>
        </Flex.Item>

        {shouldShowButtons && (
          <Flex.Item flex="none">
            <Flex alignItems="center" gap={{ row: 4, column: 0 }}>
              {primaryAction && (
                <Box display="none" mdDisplay="flex" flex="none">
                  <PrimaryAction {...primaryAction} />
                </Box>
              )}

              {dismissButton && <DismissButton {...dismissButton} />}
            </Flex>
          </Flex.Item>
        )}
      </Flex>
      {!isBare && primaryAction && (
        <Box display="flex" mdDisplay="none" flex="none" alignSelf="end" marginTop={4}>
          <PrimaryAction {...primaryAction} />
        </Box>
      )}
    </Box>
  );
}
