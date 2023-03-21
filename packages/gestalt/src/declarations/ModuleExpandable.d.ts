import { $Keys } from 'utility-types';
import type { Node, Element } from 'react';
import IconButton from './IconButton';
import icons from './icons/index';
type BadgeType = {
  text: string;
  type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'darkWash' | 'lightWash';
};
type Props = {
  /**
   * Label used to communicate to screen readers which module will be collapsed when interacting with the title button. Should be something clear, like "Collapse Security Policies Module". Be sure to localize the label. See [Expandable](https://gestalt.pinterest.systems/web/module#Expandable) variant to learn more.
   *
   */
  accessibilityCollapseLabel: string;
  /**
   * Label used to communicate to screen readers which module will be expanded when interacting with the title button. Should be something clear, like "Expand Security Policies Module". Be sure to localize the label. See [Expandable](https://gestalt.pinterest.systems/web/module#Expandable) variant to learn more.
   */
  accessibilityExpandLabel: string;
  /**
   * The 0-based index indicating the item that should currently be expanded. This must be updated via `onExpandedChange` to ensure the correct item is expanded. See [Expandable](https://gestalt.pinterest.systems/web/module#Expandable) variant to learn more.
   */
  expandedIndex?: number | null | undefined;
  /**
   * Unique id to identify this Module. See [Expandable](https://gestalt.pinterest.systems/web/module#Expandable) variant to learn more.
   */
  id: string;
  /**
   * Array of modules displayed in a stack. Only one item can be expanded at a time. See [Expandable](https://gestalt.pinterest.systems/web/module#Expandable) variant to learn more.
   */
  items: ReadonlyArray<{
    badge?: BadgeType;
    children?: Node;
    icon?: $Keys<typeof icons>;
    iconAccessibilityLabel?: string;
    iconButton?: Element<typeof IconButton>;
    summary?: ReadonlyArray<string>;
    title: string;
    type?: 'error' | 'info';
  }>;
  /**
   * Callback executed whenever any module item is expanded or collapsed. It receives the index of the currently expanded module, or null if none are expanded. See [Expandable](https://gestalt.pinterest.systems/web/module#Expandable) variant to learn more.
   */
  onExpandedChange?: (arg0: number | null | undefined) => void;
};
/**
 * Use [Module.Expandable](https://gestalt.pinterest.systems/web/module) if your module requires expanding and collapsing content.
 */
declare function ModuleExpandable({
  accessibilityExpandLabel,
  accessibilityCollapseLabel,
  expandedIndex,
  id,
  items,
  onExpandedChange,
}: Props): Node;
declare namespace ModuleExpandable {
  var displayName: string;
}
export default ModuleExpandable;
