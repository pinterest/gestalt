// @flow strict
import type { Node } from 'react';
import Controller from './Controller.js';

type Color = 'blue' | 'orange' | 'red' | 'white' | 'darkGray';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'flexible' | number;
type IdealDirection = 'up' | 'right' | 'down' | 'left';
type Role = 'dialog' | 'listbox' | 'menu';

type Props = {|
  /**
   * The reference element, typically [Button](https://gestalt.pinterest.systems/button) or [IconButton](https://gestalt.pinterest.systems/iconbutton), that Popover uses to set its position.
   */
  anchor: ?HTMLElement,
  /**
   * The content shown in Popover.
   */
  children?: Node,
  /**
   * The background color of Popover. See the [color and caret](https://gestalt.pinterest.systems/popover#Color-and-caret) variant to learn more.
   */
  color?: Color,
  /**
   * Callback for key stroke events allowing keyboard navigation in Popover's children.
   */
  onKeyDown?: ({| event: SyntheticKeyboardEvent<HTMLElement> |}) => void,
  /**
   * Unique id to identify each Popover. Used for [accessibility](https://gestalt.pinterest.systems/popover#ARIA-attributes) purposes.
   */
  id?: string,
  /**
   * Specifies the preferred position of Popover relative to its anchor element. See the [ideal direction](https://gestalt.pinterest.systems/popover#Ideal-direction) variant to learn more.
   */
  idealDirection?: IdealDirection,
  /**
   * Callback fired when Popover requests to be closed. Must be used to control Popover’s on/off display state.
   */
  onDismiss: () => void,
  /**
   * Properly positions Popover relative to its anchor element. Set to false when used within [Layer](https://gestalt.pinterest.systems/layer). See the [with Layer](https://gestalt.pinterest.systems/popover#With-layer) variant to learn more.
   */
  positionRelativeToAnchor?: boolean,
  /**
   * The underlying ARIA role for Popover. See the [accessibility](https://gestalt.pinterest.systems/popover#ARIA-attributes) section for more info.
   */
  role?: Role,
  /**
   * Puts the focus on Popover when it’s triggered. See [accessibility](https://gestalt.pinterest.systems/popover#Accessibility) to learn more.
   */
  shouldFocus?: boolean,
  /**
   * Shows a caret on Popover. See the [color and caret](https://gestalt.pinterest.systems/popover#Color-and-caret) variant to learn more.
   */
  showCaret?: boolean,
  /**
   * The maximum width of Popover. See the [size](https://gestalt.pinterest.systems/popover#Size) variant to learn more.
   */
  size?: Size,
|};

/**
 * [Popover](https://gestalt.pinterest.systems/popover) is a floating view that contains a task related to the content on screen. It can be triggered when the user clicks or focuses on an element, typically [Button](/button) or [IconButton](/iconbutton). It can also be triggered automatically, as in the case of user education. Popover is non-modal and can be dismissed by interacting with another part of the screen or an item within Popover.
 *
 * Popover is most appropriate for desktop screens and can contain a variety of elements, such as [Button](/button) and [Images](/image). Popover is also the container used to construct more complex elements like [Dropdown](/dropdown) and the board picker, pictured below, which allow people to choose the board to save a Pin to.
 */
export default function Popover({
  anchor,
  children,
  onKeyDown,
  id,
  idealDirection,
  onDismiss,
  positionRelativeToAnchor = true,
  color = 'white',
  role,
  shouldFocus = true,
  showCaret = false,
  size = 'sm',
}: Props): null | Node {
  if (!anchor) {
    return null;
  }

  return (
    <Controller
      anchor={anchor}
      bgColor={color}
      border
      caret={showCaret}
      onKeyDown={onKeyDown}
      id={id}
      idealDirection={idealDirection}
      onDismiss={onDismiss}
      positionRelativeToAnchor={positionRelativeToAnchor}
      role={role}
      rounding={4}
      shouldFocus={shouldFocus}
      size={size === 'flexible' ? null : size}
    >
      {children}
    </Controller>
  );
}
