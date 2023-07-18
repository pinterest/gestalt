// @flow strict
import { type Node } from 'react';
import InternalPopover from './Popover/InternalPopover.js';

type Color = 'deprecatedBlue' | 'red' | 'white' | 'darkGray';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'flexible' | number;
type IdealDirection = 'up' | 'right' | 'down' | 'left';
type Role = 'dialog' | 'listbox' | 'menu' | 'tooltip';

type Props = {|
  /**
   * Unique label to describe each Popover. Used for [accessibility](https://gestalt.pinterest.systems/web/popover#ARIA-attributes) purposes.
   */
  accessibilityLabel?: string,
  /**
   * Describes the dismiss button's purpose. See the [dismiss button](https://gestalt.pinterest.systems/web/popover#Dismiss-button) variant to learn more. Must be localized.
   */
  accessibilityDismissButtonLabel?: string,
  /**
   * The reference element, typically [Button](https://gestalt.pinterest.systems/web/button) or [IconButton](https://gestalt.pinterest.systems/web/iconbutton), that Popover uses to set its position.
   */
  anchor: ?HTMLElement,
  /**
   * The content shown in Popover.
   */
  children?: Node,
  /**
   * This field is deprecated and will be removed soon. Please do not use. See [PopoverEducational](https://gestalt.pinterest.systems/web/popovereducational).
   */
  color?: Color,
  /**
   * Callback for key stroke events allowing keyboard navigation in Popover's children.
   */
  onKeyDown?: ({| event: SyntheticKeyboardEvent<HTMLElement> |}) => void,
  /**
   * Unique id to identify each Popover. Used for [accessibility](https://gestalt.pinterest.systems/web/popover#ARIA-attributes) purposes.
   */
  id?: string,
  /**
   * Specifies the preferred position of Popover relative to its anchor element. See the [ideal direction](https://gestalt.pinterest.systems/web/popover#Ideal-direction) variant to learn more.
   */
  idealDirection?: IdealDirection,
  /**
   * Callback fired when Popover requests to be closed. Must be used to control Popover’s on/off display state.
   */
  onDismiss: () => void,
  /**
   * Properly positions Popover relative to its anchor element. Set to false when used within [Layer](https://gestalt.pinterest.systems/web/layer). See the [with Layer](https://gestalt.pinterest.systems/web/popover#With-layer) variant to learn more.
   */
  positionRelativeToAnchor?: boolean,
  /**
   * The underlying ARIA role for Popover. See the [accessibility](https://gestalt.pinterest.systems/web/popover#ARIA-attributes) section for more info.
   */
  role?: Role,
  /**
   * Puts the focus on Popover when it’s triggered. See [accessibility](https://gestalt.pinterest.systems/web/popover#Accessibility) to learn more.
   */
  shouldFocus?: boolean,
  /**
   * This field is deprecated and will be removed soon. Please do not use. See [PopoverEducational](https://gestalt.pinterest.systems/web/popovereducational).
   */
  _deprecatedShowCaret?: boolean,
  /**
   * Shows a dismiss button on Popover. See the [dismiss button](https://gestalt.pinterest.systems/web/popover#Dismiss-button) variant to learn more.
   */
  showDismissButton?: boolean,
  /**
   * The maximum width of Popover. See the [size](https://gestalt.pinterest.systems/web/popover#Size) variant to learn more.
   */
  size?: Size,
  // This property can be set when `ScrollBoundaryContainer` is set to `overflow="visible"` but therefore limits the height of the Popover-based component. Some cases require
  __dangerouslySetMaxHeight?: '30vh',
|};

/**
 * [Popover](https://gestalt.pinterest.systems/web/popover) is a floating view that contains a task related to the content on screen. It can be triggered when the user clicks or focuses on an element, typically [Button](https://gestalt.pinterest.systems/web/button) or [IconButton](https://gestalt.pinterest.systems/web/iconbutton). It can also be triggered automatically, as in the case of user education. Popover is non-modal and can be dismissed by interacting with another part of the screen or an item within Popover.
 *
 * Popover is most appropriate for desktop screens and can contain a variety of elements, such as [Button](https://gestalt.pinterest.systems/web/button) and [Images](https://gestalt.pinterest.systems/web/image). Popover is also the container used to construct more complex elements like [Dropdown](https://gestalt.pinterest.systems/web/dropdown) and the board picker, pictured below, which allow people to choose the board to save a Pin to.
 *
 * ![Popover light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Popover.spec.mjs-snapshots/Popover-chromium-darwin.png)
 * ![Popover dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Popover-dark.spec.mjs-snapshots/Popover-dark-chromium-darwin.png)
 *
 */
export default function Popover({
  accessibilityLabel = 'Popover',
  accessibilityDismissButtonLabel,
  anchor,
  children,
  showDismissButton,
  onKeyDown,
  id,
  idealDirection,
  onDismiss,
  positionRelativeToAnchor = true,
  color = 'white',
  role = 'dialog',
  shouldFocus = true,
  _deprecatedShowCaret = false,
  size = 'sm',
  __dangerouslySetMaxHeight,
}: Props): null | Node {
  return (
    <InternalPopover
      accessibilityLabel={accessibilityLabel}
      accessibilityDismissButtonLabel={accessibilityDismissButtonLabel}
      anchor={anchor}
      showDismissButton={showDismissButton}
      onKeyDown={onKeyDown}
      id={id}
      idealDirection={idealDirection}
      onDismiss={onDismiss}
      positionRelativeToAnchor={positionRelativeToAnchor}
      color={color === 'deprecatedBlue' ? 'blue' : color}
      role={role}
      shouldFocus={shouldFocus}
      showCaret={_deprecatedShowCaret}
      size={size}
      __dangerouslySetMaxHeight={__dangerouslySetMaxHeight}
    >
      {children}
    </InternalPopover>
  );
}
