// @flow strict
import { type Node } from 'react';
import icons from './icons/index.js';

export type TypeOptions = 'error' | 'info';

export type BaseModuleTitleProps = {|
  badgeText?: string,
  icon?: $Keys<typeof icons>,
  iconAccessibilityLabel?: string,
  title?: string,
  type?: TypeOptions,
|};

export type ModuleExpandableItemBaseProps = {|
  ...BaseModuleTitleProps,
  children?: Node,
  summary?: $ReadOnlyArray<string>,
  title: string, // overwriting to be required
|};
