// @flow strict
import { type Node } from 'react';
import icons from './icons/index.js';

export type TypeOptions = 'error' | 'info';

export type BaseModuleProps = {|
  children?: Node,
  icon?: $Keys<typeof icons>,
  iconAccessibilityLabel?: string,
  title?: string,
  type?: TypeOptions,
|};

export type ModuleExpandableItemBaseProps = {|
  ...BaseModuleProps,
  summary?: $ReadOnlyArray<string>,
  title: string, // overwriting base to be required
|};
