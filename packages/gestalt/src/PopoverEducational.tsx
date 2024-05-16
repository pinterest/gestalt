import { Children, ReactElement, ReactNode } from 'react';
import Box from './Box';
import Button from './Button';
import ButtonLink from './ButtonLink';
import { useColorScheme } from './contexts/ColorSchemeProvider';
import Flex from './Flex';
import InternalPopover from './Popover/InternalPopover';
import styles from './PopoverEducational.css';
import Text from './Text';
import { Indexable } from './zIndex';

type Size = 'sm' | 'flexible';
type IdealDirection = 'up' | 'right' | 'down' | 'left';
type Role = 'dialog' | 'tooltip';
type PrimaryActionType =
  | {
      accessibilityLabel?: string;
      href: string;
      onClick?: (arg1: {
        event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        dangerouslyDisableOnNavigation: () => void;
      }) => void;
      rel?: 'none' | 'nofollow';
      role: 'link';
      target?: null | 'self' | 'blank';
      text: string;
    }
  | {
      accessibilityLabel?: string;
      onClick?: (arg1: {
        event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
      }) => void;
      role?: 'button';
      text: string;
    };

function PrimaryAction(props: PrimaryActionType) {
  if (props.role === 'link') {
    return (
      <ButtonLink
        accessibilityLabel={props.accessibilityLabel}
        color="white"
        fullWidth={false}
        href={props.href}
        onClick={props.onClick}
        rel={props.rel}
        target={props.target}
        text={props.text}
      />
    );
  }
  return (
    <Button
      accessibilityLabel={props.accessibilityLabel}
      color="white"
      fullWidth={false}
      onClick={props.onClick}
      text={props.text}
    />
  );
}

type Props = {
  /**
   * Unique label to describe each PopoverEducational. See the [accessibility section](https://gestalt.pinterest.systems/web/popovereducational#ARIA-attributes) for more guidance.
   */
  accessibilityLabel?: string;
  /**
   * The reference element that PopoverEducational uses to set its position.
   */
  anchor: HTMLElement | null | undefined;
  /**
   * The optional content shown in PopoverEducational. See the [custom content section](https://gestalt.pinterest.systems/web/popovereducational#Custom-content) for more guidance.
   */
  children?: ReactNode;
  /**
   * Unique id to identify each PopoverEducational. Used for [accessibility](https://gestalt.pinterest.systems/web/popovereducational#ARIA-attributes) purposes.
   */
  id?: string;
  /**
   * Specifies the preferred position of PopoverEducational relative to its anchor element.
   */
  idealDirection?: IdealDirection;
  /**
   * Callback fired when PopoverEducational is closed. Must be used to control Popover’s on/off display state. See the [visibility on page load variant](https://gestalt.pinterest.systems/web/popovereducational#Visibility-on-page-load) to learn more.
   */
  onDismiss: () => void;
  /**
   * Main action for users to take on PopoverEducational. If `href` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [accessibility guidelines for Button](https://gestalt.pinterest.systems/web/button#ARIA-attributes).
   * See the [primary action variant](https://gestalt.pinterest.systems/web/popovereducational#Primary-action) to learn more.
   */
  primaryAction?: PrimaryActionType;
  /**
   * Main text content of PopoverEducational. Content should be [localized](https://gestalt.pinterest.systems/web/popovereducational#Localization). See the [message variant](https://gestalt.pinterest.systems/web/popovereducational#Message) to learn more.
   *
   */
  // @ts-expect-error - TS2315 - Type 'Element' is not generic.
  message?: string | Element<typeof Text>;
  /**
   * The underlying ARIA role for PopoverEducational. See the [role section in Accessibility](https://gestalt.pinterest.systems/web/popovereducational#Role) for more info.
   */
  role?: Role;
  /**
   * Puts the focus on PopoverEducational when it’s triggered. See the [keyboard navigation section in Accessibility](https://gestalt.pinterest.systems/web/popovereducational#Keyboard-navigation) to learn more.
   */
  shouldFocus?: boolean;
  /**
   * The maximum width of PopoverEducational. See the [size variant](https://gestalt.pinterest.systems/web/popovereducational#Size) to learn more.
   */
  size?: Size;
  /**
   * An object representing the zIndex value of PopoverEducational. Learn more about [zIndex classes](https://gestalt.pinterest.systems/web/zindex_classes)
   */
  zIndex?: Indexable;
};

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
}: Props) {
  const { colorSchemeName } = useColorScheme();
  const isDarkMode = colorSchemeName === 'darkMode';

  if (!anchor) {
    return null;
  }

  // @ts-expect-error - TS2315 - Type 'Element' is not generic. | TS2315 - Type 'Element' is not generic.
  let textElement: Element<'span'> | Element<typeof Text>;

  if (typeof message === 'string') {
    textElement = <Text color="light">{message}</Text>;
  }

  // If `message` is a Text component, we need to override any text colors within to ensure they all match
  if (
    message &&
    typeof message !== 'string' &&
    // @ts-expect-error - TS2315 - Type 'Element' is not generic.
    Children.only<Element<typeof Text>>(message).type.displayName === 'Text'
  ) {
    const textColorOverrideStyles = isDarkMode
      ? styles.textColorOverrideDark
      : styles.textColorOverrideLight;

    textElement = <span className={textColorOverrideStyles}>{message}</span>;
  }

  return (
    <Box position={zIndex ? 'relative' : undefined} zIndex={zIndex}>
      {/* @ts-expect-error - TS2786 - 'InternalPopover' cannot be used as a JSX component. */}
      <InternalPopover
        accessibilityLabel={accessibilityLabel}
        anchor={anchor}
        color="blue"
        disableFocusTrap
        disablePortal
        hideWhenReferenceHidden
        id={id}
        idealDirection={idealDirection}
        onDismiss={onDismiss}
        role={primaryAction && !children ? 'dialog' : role}
        shouldFocus={shouldFocus}
        showCaret
        size={size}
      >
        {children ??
          (message ? (
            // @ts-expect-error - TS2322 - Type '{ children: Element; padding: 4; tabIndex: number; }' is not assignable to type 'IntrinsicAttributes & Omit<Props, "ref"> & RefAttributes<HTMLElement>'.
            <Box padding={4} tabIndex={0}>
              <Flex direction="column" gap={3}>
                {textElement}
                {primaryAction ? (
                  <Flex.Item alignSelf="end" flex="grow">
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

PopoverEducational.displayName = 'PopoverEducational';
