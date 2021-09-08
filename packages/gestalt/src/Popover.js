// @flow strict
import type { Node } from 'react';
import PropTypes from 'prop-types';
import Controller from './Controller.js';

type Color = 'blue' | 'orange' | 'red' | 'white' | 'darkGray';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'flexible' | number;
type IdealDirection = 'up' | 'right' | 'down' | 'left';
type Role = 'dialog' | 'listbox' | 'menu';

type Props = {|
  /**
   * The reference element, typically [Button](/Button) or [IconButton](/IconButton), that Popover uses to set its position.
   */
  anchor: ?HTMLElement,
  /**
   * The content shown in Popover.
   */
  children?: Node,
  /**
   * The background color of Popover. See the [color and caret](#Color-and-caret) variant to learn more.
   */
  color?: Color,
  /**
   * Callback fired on keyboard navigation (keydown event).
   */
  handleKeyDown?: (event: SyntheticKeyboardEvent<HTMLElement>) => void,
  /**
   * Unique id to identify each Popover. Used for [accessibility](#ARIA-attributes) purposes.
   */
  id?: string,
  /**
   * Specifies the preferred position of Popover relative to its anchor element. See the [ideal direction](#Ideal-direction) variant to learn more.
   */
  idealDirection?: IdealDirection,
  /**
   * Callback fired when Popover requests to be closed. Must be used to control Popover’s on/off display state.
   */
  onDismiss: () => void,
  /**
   * Properly positions Popover relative to its anchor element. Set to false when used within [Layer](/Layer. See the [with Layer](#With-layer) variant to learn more.
   */
  positionRelativeToAnchor?: boolean,
  /**
   * The underlying ARIA role for Popover. See the [accessibility](#ARIA-attributes) section for more info.
   */
  role?: Role,
  /**
   * Puts the focus on Popover when it’s triggered. See [accessibility](#Accessibility) to learn more.   */
  shouldFocus?: boolean,
  /**
   * Shows a caret on Popover. See the [color and caret](#Color-and-caret) variant to learn more.
   */
  showCaret?: boolean,
  /**
   * The maximum width of Popover. See the [size](#Size) variant to learn more.
   *
   */
  size?: Size,
|};

/**
 * https://gestalt.pinterest.systems/Popover
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

Popover.propTypes = {
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  anchor: PropTypes.shape({
    contains: PropTypes.func,
    getBoundingClientRect: PropTypes.func,
  }),
  children: PropTypes.node,
  id: PropTypes.string,
  idealDirection: (PropTypes.oneOf([
    'up',
    'right',
    'down',
    'left',
  ]): React$PropType$Primitive<IdealDirection>),
  onDismiss: PropTypes.func.isRequired,
  positionRelativeToAnchor: PropTypes.bool,
  color: (PropTypes.oneOf([
    'blue',
    'orange',
    'red',
    'white',
    'darkGray',
  ]): React$PropType$Primitive<Color>),
  role: (PropTypes.oneOf(['dialog', 'listbox', 'menu']): React$PropType$Primitive<Role>),
  size: (PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'flexible']),
  ]): React$PropType$Primitive<Size>),
  showCaret: PropTypes.bool,
};
