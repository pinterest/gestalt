// @flow strict
import type { Node } from 'react';
import Controller from './Controller.js';
import { type Role } from './Contents.js';

type Color = 'blue' | 'orange' | 'red' | 'white' | 'darkGray';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'flexible' | number;
type IdealDirection = 'up' | 'right' | 'down' | 'left';

type Props = {|
  anchor: ?HTMLElement,
  children?: Node,
  color?: Color,
  handleKeyDown?: (event: SyntheticKeyboardEvent<HTMLElement>) => void,
  id?: string,
  idealDirection?: IdealDirection,
  onDismiss: () => void,
  positionRelativeToAnchor?: boolean,
  role?: Role,
  shouldFocus?: boolean,
  showCaret?: boolean,
  size?: Size,
|};

/**
 * [Popover](https://gestalt.pinterest.systems/popover) is a floating view that contains a task related to the content on screen. It can be triggered when the user clicks or focuses on an element, typically [Button](/button) or [IconButton](/iconbutton). It can also be triggered automatically, as in the case of user education. Popover is non-modal and can be dismissed by interacting with another part of the screen or an item within Popover.
 *
 * Popover is most appropriate for desktop screens and can contain a variety of elements, such as [Button](/button) and [Images](/image). Popover is also the container used to construct more complex elements like [Dropdown](/dropdown) and the board picker, pictured below, which allow people to choose the board to save a Pin to.
 */
export default function Popover(props: Props): null | Node {
  const {
    anchor,
    children,
    handleKeyDown,
    id,
    idealDirection,
    onDismiss,
    positionRelativeToAnchor = true,
    color = 'white',
    role,
    shouldFocus = true,
    showCaret = false,
    size = 'sm',
  } = props;

  if (!anchor) {
    return null;
  }

  return (
    <Controller
      anchor={anchor}
      bgColor={color}
      border
      caret={showCaret}
      handleKeyDown={handleKeyDown}
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
