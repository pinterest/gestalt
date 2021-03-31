// @flow strict
import PropTypes from 'prop-types';

/*

FLOW TYPES

*/

export type DangerouslySetInlineStyle = {|
  __style: { [key: string]: string | number | void },
|};

export type AlignContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
export type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type AlignSelf = 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';
export type As =
  | 'article'
  | 'aside'
  | 'details'
  | 'div'
  | 'figcaption'
  | 'figure'
  | 'footer'
  | 'header'
  | 'main'
  | 'nav'
  | 'section'
  | 'summary';
export type Bottom = boolean;
export type BorderStyle = 'sm' | 'lg' | 'shadow' | 'none';
export type Color =
  | 'blue'
  | 'darkGray'
  | 'darkWash'
  | 'eggplant'
  | 'gray'
  | 'green'
  | 'lightGray'
  | 'lightWash'
  | 'maroon'
  | 'midnight'
  | 'navy'
  | 'olive'
  | 'orange'
  | 'orchid'
  | 'pine'
  | 'purple'
  | 'red'
  | 'transparent'
  | 'transparentDarkGray'
  | 'watermelon'
  | 'white';
export type Column = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Dimension = number | string;
export type Display = 'none' | 'flex' | 'block' | 'inlineBlock' | 'visuallyHidden';
export type Direction = 'row' | 'column';
export type Flex = 'grow' | 'shrink' | 'none';
export type Fit = boolean;
export type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type JustifyContent = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
export type Left = boolean;
export type Margin =
  | -12
  | -11
  | -10
  | -9
  | -8
  | -7
  | -6
  | -5
  | -4
  | -3
  | -2
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 'auto';

export type Opacity = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
export type Overflow = 'visible' | 'hidden' | 'scroll' | 'scrollX' | 'scrollY' | 'auto';
export type Padding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Position = 'static' | 'absolute' | 'relative' | 'fixed';
export type Right = boolean;
export type Role = string;
export type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill';
export type Top = boolean;
export type UserSelect = 'auto' | 'none';
export type Wrap = boolean;

/*

PROPTYPES

*/

export const AlignContentPropType: React$PropType$Primitive<AlignContent> = PropTypes.oneOf([
  'start',
  'end',
  'center',
  'between',
  'around',
  'evenly',
  'stretch',
]);
export const AlignItemsPropType: React$PropType$Primitive<AlignItems> = PropTypes.oneOf([
  'start',
  'end',
  'center',
  'baseline',
  'stretch',
]);
export const AlignSelfPropType: React$PropType$Primitive<AlignSelf> = PropTypes.oneOf([
  'auto',
  'start',
  'end',
  'center',
  'baseline',
  'stretch',
]);
export const AsPropType: React$PropType$Primitive<As> = PropTypes.oneOf([
  'article',
  'aside',
  'details',
  'div',
  'figcaption',
  'figure',
  'footer',
  'header',
  'main',
  'nav',
  'section',
  'summary',
]);
export const BorderStylePropType: React$PropType$Primitive<BorderStyle> = PropTypes.oneOf([
  'sm',
  'lg',
  'shadow',
  'none',
]);
export const ColorPropType: React$PropType$Primitive<Color> = PropTypes.oneOf([
  'blue',
  'darkGray',
  'darkWash',
  'eggplant',
  'gray',
  'green',
  'lightGray',
  'lightWash',
  'maroon',
  'midnight',
  'navy',
  'olive',
  'orange',
  'orchid',
  'pine',
  'purple',
  'red',
  'transparent',
  'transparentDarkGray',
  'watermelon',
  'white',
]);
export const ColumnPropType: React$PropType$Primitive<Column> = PropTypes.oneOf([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
]);
export const DimensionPropType: React$PropType$Primitive<Dimension> = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.string,
]);
export const DirectionPropType: React$PropType$Primitive<Direction> = PropTypes.oneOf([
  'row',
  'column',
]);
export const DisplayPropType: React$PropType$Primitive<Display> = PropTypes.oneOf([
  'none',
  'flex',
  'block',
  'inlineBlock',
  'visuallyHidden',
]);
export const FlexPropType: React$PropType$Primitive<Flex> = PropTypes.oneOf([
  'grow',
  'shrink',
  'none',
]);
export const GapPropType: React$PropType$Primitive<Gap> = PropTypes.oneOf([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
]);
export const JustifyContentPropType: React$PropType$Primitive<JustifyContent> = PropTypes.oneOf([
  'start',
  'end',
  'center',
  'between',
  'around',
  'evenly',
]);
export const MarginPropType: React$PropType$Primitive<Margin> = PropTypes.oneOf([
  -12,
  -11,
  -10,
  -9,
  -8,
  -7,
  -6,
  -5,
  -4,
  -3,
  -2,
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  'auto',
]);
export const OpacityPropType: React$PropType$Primitive<Opacity> = PropTypes.oneOf([
  0,
  0.1,
  0.2,
  0.3,
  0.4,
  0.5,
  0.6,
  0.7,
  0.8,
  0.9,
  1,
]);
export const OverflowPropType: React$PropType$Primitive<Overflow> = PropTypes.oneOf([
  'visible',
  'hidden',
  'scroll',
  'scrollX',
  'scrollY',
  'auto',
]);
export const PaddingPropType: React$PropType$Primitive<Padding> = PropTypes.oneOf([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
]);
export const PositionPropType: React$PropType$Primitive<Position> = PropTypes.oneOf([
  'static',
  'absolute',
  'relative',
  'fixed',
]);
export const RoundingPropType: React$PropType$Primitive<Rounding> = PropTypes.oneOf([
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
export const UserSelectPropType: React$PropType$Primitive<UserSelect> = PropTypes.oneOf([
  'auto',
  'none',
]);
