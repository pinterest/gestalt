// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

type Props = {
  direction?: ?'up' | 'right' | 'down' | 'left',
};

export default function Caret(props: Props) {
  const { direction } = props;
  let path;
  switch (direction) {
    case 'up':
      path = 'M0 -1 L12 12 L24 -1';
      break;
    case 'right':
      path = 'M25 0 L12 12 L25 24';
      break;
    case 'down':
      path = 'M0 25 L12 12 L24 25';
      break;
    case 'left':
      path = 'M-1 0 L12 12 L-1 24';
      break;
    default:
  }

  return (
    <svg width="25" height="25">
      <path d={path} />
    </svg>
  );
}

Caret.propTypes = {
  direction: PropTypes.oneOf(['up', 'right', 'down', 'left']),
};
