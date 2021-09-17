// @flow strict
import type { Element, Node } from 'react';
import icons from './icons/index.js';
import IconButton from './IconButton.js';

export type TypeOptions = 'error' | 'info';

type BaseModuleProps = {|
  title?: string,
  type?: TypeOptions,
|};

type ModuleBadgeProps = {|
  ...BaseModuleProps,
  badgeText?: string,
|};

type ModuleIconProps = {|
  ...BaseModuleProps,
  icon?: $Keys<typeof icons>,
  iconAccessibilityLabel?: string,
|};

type ModuleIconButtonProps = {|
  ...BaseModuleProps,
  iconButton?: Element<typeof IconButton>,
|};

export type BaseModuleTitleProps = ModuleBadgeProps | ModuleIconProps | ModuleIconButtonProps;

export type ModuleExpandableItemBaseProps = {|
  ...BaseModuleTitleProps,
  children?: Node,
  summary?: $ReadOnlyArray<string>,
  title: string, // overwriting to be required
|};
