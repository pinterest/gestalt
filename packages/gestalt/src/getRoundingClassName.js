// @flow strict
import PropTypes from 'prop-types';
import borders from './Borders.css';
import { fromClassName, identity, toProps, type Style } from './style.js';
import { bind, range } from './transforms.js';

export type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill';

export const RoundingPropType = PropTypes.oneOf([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  'circle',
  'pill',
]);

export const getRoundingStyle = (rounding: Rounding): Style => {
  if (typeof rounding === 'number') {
    return bind(range('rounding'), borders)(rounding);
  }

  if (rounding === 'circle') {
    return fromClassName(borders.circle);
  }

  if (rounding === 'pill') {
    return fromClassName(borders.pill);
  }

  return identity();
};

const getRoundingClassName = (rounding: Rounding): string =>
  toProps(getRoundingStyle(rounding)).className;

export default getRoundingClassName;
