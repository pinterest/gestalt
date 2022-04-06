// @flow strict
/*
  Shared types among text components (Text, Heading)
*/

export type Align = 'start' | 'end' | 'center' | 'justify' | 'forceLeft' | 'forceRight';

export const semanticColors = [
  'default',
  'subtle',
  'success',
  'error',
  'warning',
  'inverse',
  'shopping',
  'link',
  'light',
  'dark',
];

export const literalColors = [
  'blue',
  'darkGray',
  'eggplant',
  'gray',
  'green',
  'lightGray',
  'maroon',
  'midnight',
  'navy',
  'olive',
  'orange',
  'orchid',
  'pine',
  'purple',
  'red',
  'watermelon',
  'white',
];

export const allowedColors: $ReadOnlyArray<string> = [...semanticColors, ...literalColors];

export type Color =
  | 'blue'
  | 'darkGray'
  | 'eggplant'
  | 'gray'
  | 'green'
  | 'lightGray'
  | 'maroon'
  | 'midnight'
  | 'navy'
  | 'olive'
  | 'orange'
  | 'orchid'
  | 'pine'
  | 'purple'
  | 'red'
  | 'watermelon'
  | 'white';

export type FontWeight = 'bold' | 'normal';
