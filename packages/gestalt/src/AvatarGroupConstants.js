// @flow strict
import PropTypes from 'prop-types';

export type Size = 'xs' | 'sm' | 'md' | 'fit';

export const SIZE_MAP = { 'xs': 24, 'sm': 32, 'md': 48, 'fit': '100%' };

export const SizeProptype: React$PropType$Primitive<Size> = PropTypes.oneOf([
  'xs',
  'sm',
  'md',
  'fit',
]);

export type BaseStackType = {|
  hovered: boolean,
  pileCount: number,
  size: Size,
|};
