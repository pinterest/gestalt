// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Controller from './Controller.js';

type Props = {|
  anchor: ?HTMLElement,
  children?: Node,
  color?: 'blue' | 'orange' | 'red' | 'white' | 'darkGray',
  handleKeyDown?: (
    event: SyntheticKeyboardEvent<HTMLElement> | {| keyCode: number |}
  ) => void,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  onDismiss: () => void,
  positionRelativeToAnchor?: boolean,
  shouldFocus?: boolean,
  showCaret?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'flexible' | number,
|};

export default function Flyout(props: Props): null | Node {
  const {
    anchor,
    children,
    handleKeyDown,
    idealDirection,
    onDismiss,
    positionRelativeToAnchor = true,
    color = 'white',
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
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  anchor: PropTypes.shape({
    contains: PropTypes.func,
    getBoundingClientRect: PropTypes.func,
  }),
  children: PropTypes.node,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  onDismiss: PropTypes.func.isRequired,
  positionRelativeToAnchor: PropTypes.bool,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  color: PropTypes.oneOf(['blue', 'orange', 'red', 'white', 'darkGray']),
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'flexible']), // default: sm
  ]),
  showCaret: PropTypes.bool,
};
