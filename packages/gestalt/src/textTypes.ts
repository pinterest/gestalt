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
  'recommendation',
  'link',
  'light',
  'dark',
] as const;

export type FontWeight = 'bold' | 'normal';
