// @flow strict
import type { Element, Node } from 'react';
import icons from './icons/index.js';
import IconButton from './IconButton.js';

export type TypeOptions = 'error' | 'info';

type BaseBadgeProps = {|
  badgeText?: string,
|};

type BaseIconProps = {|
  icon?: $Keys<typeof icons>,
  iconAccessibilityLabel?: string,
|};

type BaseIconButtonProps = {|
  iconButton?: Element<typeof IconButton>,
|};

// Props for ModuleTitle
type BaseModuleTitleProps = {|
  title?: string,
  type?: TypeOptions,
|};
export type ModuleTitleProps = {|
  ...BaseModuleTitleProps,
  ...BaseBadgeProps,
  ...BaseIconProps,
  ...BaseIconButtonProps,
|};

// Props for Module
type BaseModuleProps = {|
  ...BaseModuleTitleProps,
  children?: Node,
  id: string,
|};

type ModuleBadgeProps = {|
  ...BaseModuleProps,
  ...BaseBadgeProps,
|};

type ModuleIconProps = {|
  ...BaseModuleProps,
  ...BaseIconProps,
|};

type ModuleIconButtonProps = {|
  ...BaseModuleProps,
  ...BaseIconButtonProps,
|};

export type PublicModuleProps = ModuleBadgeProps | ModuleIconProps | ModuleIconButtonProps;

// Props for ModuleExpandable
type BaseModuleExpandableItemProps = {| summary?: $ReadOnlyArray<string> |};

export type PublicModuleExpandableItemProps = {|
  ...PublicModuleProps,
  ...BaseModuleExpandableItemProps,
  title: string, // overwriting to be required
|};

export type ModuleExpandableItemProps = {|
  ...BaseModuleExpandableItemProps,
  ...BaseModuleTitleProps,
  ...BaseBadgeProps,
  ...BaseIconProps,
  ...BaseIconButtonProps,
  ...BaseModuleProps,
  accessibilityCollapseLabel: string,
  accessibilityExpandLabel: string,
  isCollapsed: boolean,
  onModuleClicked: (boolean) => void,
|};

export type PublicModuleExpandableProps = {|
  accessibilityCollapseLabel: string,
  accessibilityExpandLabel: string,
  expandedIndex?: ?number,
  id: string,
  items: $ReadOnlyArray<PublicModuleExpandableItemProps>,
  onExpandedChange?: (?number) => void,
|};
