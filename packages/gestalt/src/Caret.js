// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';

const PATHS = {
  down:
    'M 0 4 C 0.69415 4 1.35929 3.7216 1.84646 3.2271 L 4.3752 0.66038 C 5.182 -0.15852 6.5628 -0.224911 7.4592 0.512109 C 7.5161 0.558899 7.5703 0.60839 7.6215 0.66038 L 10.148 3.2248 C 10.6367 3.7208 11.3038 4 12 4',
  left:
    'M 0 0 C 0 0.69415 0.2784 1.35929 0.7729 1.84646 L 3.33962 4.3752 C 4.15852 5.182 4.22491 6.5628 3.48789 7.4592 C 3.4411 7.5161 3.39161 7.5703 3.33962 7.6215 L 0.775201 10.148 C 0.279201 10.6367 0 11.3038 0 12',
  right:
    'M 4 12 C 4 11.3059 3.7216 10.6407 3.2271 10.1535 L 0.66038 7.6248 C -0.15852 6.818 -0.224911 5.4372 0.512109 4.5408 C 0.558899 4.4839 0.60839 4.4297 0.66038 4.3785 L 3.2248 1.852 C 3.7208 1.3633 4 0.6962 4 0',
  up:
    'M 12 0 C 11.3059 0 10.6407 0.2784 10.1535 0.7729 L 7.6248 3.33962 C 6.818 4.15852 5.4372 4.22491 4.5408 3.48789 C 4.4839 3.4411 4.4297 3.39161 4.3785 3.33962 L 1.852 0.775201 C 1.3633 0.279201 0.6962 0 0 0',
};

type Props = {|
  direction: 'up' | 'right' | 'down' | 'left',
  height: 4 | 12,
  width: 4 | 12,
|};

export default function Caret(props: Props): Node {
  const { direction, height, width } = props;

  const path = PATHS[direction];

  return (
    <svg height={height} width={width}>
      <path d={path} stroke="rgba(0, 0, 0, 0.02)" />
    </svg>
  );
}

Caret.propTypes = {
  direction: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  height: PropTypes.oneOf([4, 12]),
  width: PropTypes.oneOf([4, 12]),
};
