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
      path = 'M0 -2 L12 12 L24 -2';
      break;
    case 'right':
      path = 'M26 0 L12 12 L26 24';
      break;
    case 'down':
      path = 'M0 26 L12 12 L24 26';
      break;
    case 'left':
      path = 'M-2 0 L12 12 L-2 24';
      break;
    default:
  }

  return (
    <svg width="26" height="26">
      <path d={path} />
    </svg>
  );
}

Caret.propTypes = {
  direction: PropTypes.oneOf(['up', 'right', 'down', 'left']),
};
