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
      path = 'M0 0 L12 12 L24 0';
      break;
    case 'right':
      path = 'M24 0 L12 12 L24 24';
      break;
    case 'down':
      path = 'M0 24 L12 12 L24 24';
      break;
    case 'left':
      path = 'M0 0 L12 12 L0 24';
      break;
    default:
  }

  return (
    <svg width="24" height="24">
      <path d={path} />
    </svg>
  );
}

Caret.propTypes = {
  direction: PropTypes.oneOf(['up', 'right', 'down', 'left']),
};
