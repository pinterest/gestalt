import { $Keys } from "utility-types";
import type { Element, Node } from "react";
import icons from "./icons/index";
import IconButton from "./IconButton";
export type TypeOptions = "error" | "info";
type BaseBadgeProps = {
  badgeText?: string;
};
type BaseIconProps = {
  icon?: $Keys<typeof icons>;
};
type BaseIconButtonProps = {
  iconButton?: Element<typeof IconButton>;
};
type BaseMutuallyExclusiveProps =
  | BaseBadgeProps
  | BaseIconProps
  | BaseIconButtonProps;
type BaseCombinedProps = BaseBadgeProps & BaseIconProps & BaseIconButtonProps;
// Props for ModuleTitle
type BaseModuleTitleProps = {
  iconAccessibilityLabel?: string;
  title: string;
  type?: TypeOptions;
};
export type ModuleTitleProps = BaseModuleTitleProps & BaseCombinedProps;
// Props for Module
type BaseModuleProps = BaseModuleTitleProps & {
  children?: Node;
  id: string;
  title?: string; // overwriting to be optional
};
export type PublicModuleProps = BaseModuleProps & BaseMutuallyExclusiveProps;
// Props for ModuleExpandable
type BaseModuleExpandableItemProps = BaseModuleTitleProps & {
  children?: Node;
  summary?: ReadonlyArray<string>;
};
export type PublicModuleExpandableItemProps = BaseModuleExpandableItemProps &
  BaseMutuallyExclusiveProps;
export type ModuleExpandableItemProps = BaseModuleExpandableItemProps &
  BaseCombinedProps & {
    accessibilityCollapseLabel: string;
    accessibilityExpandLabel: string;
    id: string;
    isCollapsed: boolean;
    onModuleClicked: (arg0: boolean) => void;
  };
export type PublicModuleExpandableProps = {
  accessibilityCollapseLabel: string;
  accessibilityExpandLabel: string;
  expandedIndex?: number | null | undefined;
  id: string;
  items: ReadonlyArray<PublicModuleExpandableItemProps>;
  onExpandedChange?: (arg0: number | null | undefined) => void;
};