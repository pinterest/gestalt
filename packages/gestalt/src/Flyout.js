// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import Controller from './Controller.js';

type Props = {|
  anchor: ?HTMLElement,
  children?: React.Node,
  color?: 'blue' | 'orange' | 'red' | 'white' | 'darkGray',
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  onDismiss: () => void,
  positionRelativeToAnchor?: boolean,
  shouldFocus?: boolean,
  showCaret?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'flexible' | number,
|};

export default function Flyout(props: Props) {
  const {
    anchor,
    children,
    idealDirection,
    onDismiss,
    positionRelativeToAnchor = true,
    color = 'white',
    shouldFocus = true,
    showCaret = false,
    size,
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
      idealDirection={idealDirection}
      onDismiss={onDismiss}
      positionRelativeToAnchor={positionRelativeToAnchor}
      rounding={4}
      shouldFocus={shouldFocus}
      size={size === 'flexible' ? null : size}
    >
      {children}
    </Controller>
  );
}

Flyout.propTypes = {
  anchor: PropTypes.shape({
    contains: PropTypes.func,
    getBoundingClientRect: PropTypes.func,
  }),
  children: PropTypes.node,
  idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  onDismiss: PropTypes.func.isRequired,
  positionRelativeToAnchor: PropTypes.bool,
  color: PropTypes.oneOf(['blue', 'orange', 'red', 'white', 'darkGray']),
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'flexible']), // default: sm
  ]),
  showCaret: PropTypes.bool,
};
