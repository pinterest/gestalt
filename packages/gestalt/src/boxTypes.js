// @flow strict

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
  | 'caption'
  | 'details'
  | 'div'
  | 'figcaption'
  | 'figure'
  | 'footer'
  | 'header'
  | 'main'
  | 'nav'
  | 'p'
  | 'section'
  | 'summary';
export type Bottom = boolean;
export type BorderStyle =
  | 'sm'
  | 'lg'
  | 'shadow'
  | 'raisedTopShadow'
  | 'raisedBottomShadow'
  | 'none';
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
export type Direction = 'row' | 'column';
export type Display = 'none' | 'flex' | 'block' | 'inlineBlock' | 'visuallyHidden';
export type Fit = boolean;
export type Flex = 'grow' | 'shrink' | 'none';
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
