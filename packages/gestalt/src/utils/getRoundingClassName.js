// @flow strict
import borders from '../shared/Borders.css';
import { fromClassName, identity, toProps, type Style } from '../Box/style.js';
import { bind, range } from '../Box/transforms.js';

export type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill';

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
