// @flow strict
import { Children, type Element, type Node } from 'react';
import Box from './Box.js';
import Button from './Button.js';
import { useColorScheme } from './contexts/ColorSchemeProvider.js';
import Flex from './Flex.js';
import InternalPopover from './Popover/InternalPopover.js';
import styles from './PopoverEducational.css';
import Text from './Text.js';
import { type Indexable } from './zIndex.js';

type Size = 'sm' | 'flexible';
type IdealDirection = 'up' | 'right' | 'down' | 'left';
type Role = 'dialog' | 'tooltip';
type PrimaryActionType = {|
  accessibilityLabel?: string,
  href?: string,
  text: string,
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
  href,
  text,
  onClick,
  rel,
  target,
}: PrimaryActionType) {
  return href ? (
    <Button
      accessibilityLabel={accessibilityLabel}
      color="white"
      fullWidth={false}
      href={href}
      onClick={onClick}
      rel={rel}
      role="link"
      target={target}
      text={text}
    />
  ) : (
    <Button
      accessibilityLabel={accessibilityLabel}
      color="white"
      fullWidth={false}
      onClick={onClick}
      role="button"
      text={text}
    />
  );
}

type Props = {|
  /**
   * Unique label to describe each PopoverEducational. See the [accessibility section](https://gestalt.pinterest.systems/web/popovereducational#ARIA-attributes) for more guidance.
   */
  accessibilityLabel?: string,
  /**
   * The reference element that PopoverEducational uses to set its position.
   */
  anchor: ?HTMLElement,
  /**
   * The optional content shown in PopoverEducational. See the [custom content section](https://gestalt.pinterest.systems/web/popovereducational#Custom-content) for more guidance.
   */
  children?: Node,
  /**
   * Unique id to identify each PopoverEducational. Used for [accessibility](https://gestalt.pinterest.systems/web/popovereducational#ARIA-attributes) purposes.
   */
  id?: string,
  /**
   * Specifies the preferred position of PopoverEducational relative to its anchor element.
   */
  idealDirection?: IdealDirection,
  /**
   * Callback fired when PopoverEducational is closed. Must be used to control Popover’s on/off display state. See the [visibility on page load variant](https://gestalt.pinterest.systems/web/popovereducational#Visibility-on-page-load) to learn more.
   */
  onDismiss: () => void,
  /**
   * Main action for users to take on PopoverEducational. If `href` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [accessibility guidelines for Button](https://gestalt.pinterest.systems/web/button#ARIA-attributes).
   * See the [primary action variant](https://gestalt.pinterest.systems/web/popovereducational#Primary-action) to learn more.
   */
  primaryAction?: PrimaryActionType,
  /**
   * Main text content of PopoverEducational. Content should be [localized](https://gestalt.pinterest.systems/web/popovereducational#Localization). See the [message variant](https://gestalt.pinterest.systems/web/popovereducational#Message) to learn more.
   *
   */
  message?: string | Element<typeof Text>,
  /**
   * The underlying ARIA role for PopoverEducational. See the [role section in Accessibility](https://gestalt.pinterest.systems/web/popovereducational#Role) for more info.
   */
  role?: Role,
  /**
   * Puts the focus on PopoverEducational when it’s triggered. See the [keyboard navigation section in Accessibility](https://gestalt.pinterest.systems/web/popovereducational#Keyboard-navigation) to learn more.
   */
  shouldFocus?: boolean,
  /**
   * The maximum width of PopoverEducational. See the [size variant](https://gestalt.pinterest.systems/web/popovereducational#Size) to learn more.
   */
  size?: Size,
  /**
   * An object representing the zIndex value of PopoverEducational. Learn more about [zIndex classes](https://gestalt.pinterest.systems/web/zindex_classes)
   */
  zIndex?: Indexable,
|};

/**
 * [PopoverEducational](https://gestalt.pinterest.systems/web/popovereducationaleducational) is a floating container that introduces users to elements on the screen. Used for education or onboarding experiences.
 * ![PopoverEducational light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/PopoverEducational.spec.mjs-snapshots/PopoverEducational-chromium-darwin.png)
 * ![PopoverEducational dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/PopoverEducational-dark.spec.mjs-snapshots/PopoverEducational-dark-chromium-darwin.png)
 */
export default function PopoverEducational({
  accessibilityLabel = 'Popover',
  anchor,
  children,
  id,
  idealDirection,
  message,
  onDismiss,
  primaryAction,
  role = 'tooltip',
  shouldFocus = false,
  size = 'sm',
  zIndex,
}: Props): Node {
  const { name: colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  if (!anchor) {
    return null;
  }

  let textElement: Element<'span'> | Element<typeof Text>;

  if (typeof message === 'string') {
    textElement = <Text color="light">{message}</Text>;
  }

  // If `message` is a Text component, we need to override any text colors within to ensure they all match
  if (
    message &&
    typeof message !== 'string' &&
    Children.only<Element<typeof Text>>(message).type.displayName === 'Text'
  ) {
    const textColorOverrideStyles = isDarkMode
      ? styles.textColorOverrideDark
      : styles.textColorOverrideLight;

    textElement = <span className={textColorOverrideStyles}>{message}</span>;
  }

  return (
    <Box zIndex={zIndex} position={zIndex ? 'relative' : undefined}>
      <InternalPopover
        accessibilityLabel={accessibilityLabel}
        anchor={anchor}
        color="blue"
        id={id}
        idealDirection={idealDirection}
        onDismiss={onDismiss}
        positionRelativeToAnchor
        showCaret
        shouldFocus={shouldFocus}
        role={primaryAction && !children ? 'dialog' : role}
        size={size}
      >
        {children ??
          (message ? (
            <Box padding={4} tabIndex={0}>
              <Flex direction="column" gap={3}>
                {textElement}
                {primaryAction ? (
                  <Flex.Item flex="grow" alignSelf="end">
                    <PrimaryAction {...primaryAction} />
                  </Flex.Item>
                ) : null}
              </Flex>
            </Box>
          ) : null)}
      </InternalPopover>
    </Box>
  );
}
