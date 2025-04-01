import { Children, ReactElement, ReactNode } from 'react';
import Box from './Box';
import Button from './Button';
import ButtonLink from './ButtonLink';
import Flex from './Flex';
import InternalPopover from './Popover/InternalPopover';
import styles from './PopoverMessage.css';
import Text from './Text';
import useExperimentalTheme from './utils/useExperimentalTheme';
import { Indexable } from './zIndex';

type Size = 'sm' | 'flexible';
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
        focusColor="darkBackground"
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
      backgroundContext="dark"
      color="white"
      fullWidth={false}
      onClick={props.onClick}
      text={props.text}
    />
  );
}

type Props = {
  /**
   * Unique label to describe each PopoverMessage. See the [accessibility section](https://gestalt.pinterest.systems/web/PopoverMessage#ARIA-attributes) for more guidance.
   */
  accessibilityLabel?: string;
  /**
   * The reference element that PopoverMessage uses to set its position.
   */
  anchor: HTMLElement | null | undefined;
  /**
   * The optional content shown in PopoverMessage. See the [custom content section](https://gestalt.pinterest.systems/web/PopoverMessage#Custom-content) for more guidance.
   */
  children?: ReactNode;
  /**
   * Unique id to identify each PopoverMessage. Used for [accessibility](https://gestalt.pinterest.systems/web/PopoverMessage#ARIA-attributes) purposes.
   */
  id?: string;
  /**
   * Specifies the preferred position of PopoverMessage relative to its anchor element. See the [ideal direction variant in Popover's](https://gestalt.pinterest.systems/web/popover#Ideal-direction) to learn more.
   */
  idealDirection?: 'up' | 'right' | 'down' | 'left';
  /**
   * Forces the  position of Popover relative to its anchor element.
   */
  forceDirection?: boolean;
  /**
   * Callback fired when PopoverMessage is closed. Must be used to control Popover’s on/off display state. See the [visibility on page load variant](https://gestalt.pinterest.systems/web/PopoverMessage#Visibility-on-page-load) to learn more.
   */
  onDismiss: () => void;
  /**
   * Main action for users to take on PopoverMessage. If `href` is supplied, the action will serve as a link. See [GlobalEventsHandlerProvider](https://gestalt.pinterest.systems/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
   * If no `href` is supplied, the action will be a button.
   * The `accessibilityLabel` should follow the [accessibility guidelines for Button](https://gestalt.pinterest.systems/web/button#ARIA-attributes).
   * See the [primary action variant](https://gestalt.pinterest.systems/web/PopoverMessage#Primary-action) to learn more.
   */
  primaryAction?: PrimaryActionType;
  /**
   * Main text content of PopoverMessage. Content should be [localized](https://gestalt.pinterest.systems/web/PopoverMessage#Localization). See the [message variant](https://gestalt.pinterest.systems/web/PopoverMessage#Message) to learn more.
   *
   */
  message?: string | ReactElement;
  /**
   * The underlying ARIA role for PopoverMessage. See the [role section in Accessibility](https://gestalt.pinterest.systems/web/PopoverMessage#Role) for more info.
   */
  role?: Role;
  /**
   * Puts the focus on PopoverMessage when it’s triggered. See the [keyboard navigation section in Accessibility](https://gestalt.pinterest.systems/web/PopoverMessage#Keyboard-navigation) to learn more.
   */
  shouldFocus?: boolean;
  /**
   * The maximum width of PopoverMessage. See the [size variant](https://gestalt.pinterest.systems/web/PopoverMessage#Size) to learn more.
   */
  size?: Size;
  /**
   * An object representing the zIndex value of PopoverMessage. Learn more about [zIndex classes](https://gestalt.pinterest.systems/web/zindex_classes)
   */
  zIndex?: Indexable;
  /**
   * If set to 'notification', the background color will be darkGray, and if set to 'education', background color will be blue.
   */
  type?: 'notification' | 'education';
};

/**
 * [PopoverMessage](https://gestalt.pinterest.systems/web/PopoverMessageeducational) is a floating container that introduces users to elements on the screen. Used for education or onboarding experiences.
 * ![PopoverMessage light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/PopoverMessage.spec.ts-snapshots/PopoverMessage-chromium-darwin.png)
 * ![PopoverMessage dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/PopoverMessage-dark.spec.ts-snapshots/PopoverMessage-dark-chromium-darwin.png)
 */
export default function PopoverMessage({
  accessibilityLabel = 'Popover',
  anchor,
  children,
  id,
  idealDirection,
  forceDirection = false,
  message,
  onDismiss,
  primaryAction,
  role = 'tooltip',
  shouldFocus = false,
  type = 'education',
  size = 'sm',
  zIndex,
}: Props) {
  const theme = useExperimentalTheme();

  if (!anchor) {
    return null;
  }

  let textElement: ReactElement | undefined;

  if (typeof message === 'string') {
    textElement = <Text color="inverse">{message}</Text>;
  }

  // If `message` is a Text component, we need to override any text colors within to ensure they all match
  if (
    message &&
    typeof message !== 'string' &&
    // @ts-expect-error - TS2339
    Children.only<ReactElement>(message).type.displayName === 'Text'
  ) {
    textElement = <span className={styles.textColorOverride}>{message}</span>;
  }

  return (
    <Box position={zIndex ? 'relative' : undefined} zIndex={zIndex}>
      <InternalPopover
        accessibilityLabel={accessibilityLabel}
        anchor={anchor}
        color={type === 'notification' ? 'darkGray' : 'blue'}
        disableFocusTrap
        disablePortal
        forceDirection={forceDirection}
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
            <Box padding={4} tabIndex={0}>
              <Flex direction="column" gap={theme.MAIN ? 4 : 3}>
                {textElement}
                {primaryAction && type === 'education' ? (
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

PopoverMessage.displayName = 'PopoverMessage';
