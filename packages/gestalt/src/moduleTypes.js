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

type MutuallyExclusiveProps = BaseBadgeProps | BaseIconProps | BaseIconButtonProps;

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

export type PublicModuleProps = {|
  ...BaseModuleProps,
  ...MutuallyExclusiveProps,
|};

// Props for ModuleExpandable
type BaseModuleExpandableItemProps = {|
  ...BaseModuleTitleProps,
  children?: Node,
  summary?: $ReadOnlyArray<string>,
  title: string, // overwriting to be required
|};

export type PublicModuleExpandableItemProps = {|
  ...BaseModuleExpandableItemProps,
  ...MutuallyExclusiveProps,
|};

export type ModuleExpandableItemProps = {|
  ...BaseModuleExpandableItemProps,
  ...BaseBadgeProps,
  ...BaseIconProps,
  ...BaseIconButtonProps,
  accessibilityCollapseLabel: string,
  accessibilityExpandLabel: string,
  id: string,
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
