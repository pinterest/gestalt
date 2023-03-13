import type { Node } from 'react';
import type { Indexable } from './zIndex';
import './zIndex';
import './utils/keyboardNavigation';
declare type Props = {
  /**
   * Ref for the element that the Dropdown will attach to, will most likely be a [Button](https://gestalt.pinterest.systems/web/button). See the [Accessibility](https://gestalt.pinterest.systems/web/dropdown#Accessibility) guidelines to learn more.
   */
  anchor?: HTMLElement | null | undefined;
  /**
   * Must be instances of [Dropdown.Item](https://gestalt.pinterest.systems/web/dropdown#Types-of-items), [Dropdown.Link](https://gestalt.pinterest.systems/web/dropdown#Types-of-items) or [Dropdown.Section](https://gestalt.pinterest.systems/web/dropdown#Sections) components. See the [Types of items](https://gestalt.pinterest.systems/web/dropdown#Types-of-items) variant to learn more.
   */
  children: Node;
  /**
   * Enables correct behavior when Dropdown is used within a fixed container. To achieve this it removes the Layer component around Popover and enables positioning relative to its anchor element. Should only be used in cases where Layer breaks the Dropdown positionings such as when the anchor element is within a sticky component.
   */
  isWithinFixedContainer?: boolean;
  /**
   * Content to display at the top of the Dropdown before any items or sections. See the [Custom header](https://gestalt.pinterest.systems/web/dropdown#Custom-header) variant to learn more.
   */
  headerContent?: Node;
  /**
   * Unique id to identify each Dropdown. Used for [Accessibility](https://gestalt.pinterest.systems/web/dropdown#Accessibility) purposes.
   */
  id: string;
  /**
   * Preferred direction for the Dropdown to open.
   */
  idealDirection?: 'up' | 'right' | 'down' | 'left';
  /**
   *  Define a controlled size to dropdown's Popover.
   */
  maxHeight?: '30vh';
  /**
   * Callback fired when the menu is closed.
   */
  onDismiss: () => void;
  /**
   * An object representing the zIndex value of the Dropdown menu. Learn more about [zIndex classes](https://gestalt.pinterest.systems/web/zindex_classes)
   */
  zIndex?: Indexable;
};
/**
 * [Dropdown](https://gestalt.pinterest.systems/web/dropdown) displays a list of actions, options or links. It is triggered when a user interacts with a Button, Textfield or other control. Dropdown allows for complex functionality that can’t be accomplished with SelectList.
 *
 * ![Dropdown open light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Dropdown-open.spec.mjs-snapshots/Dropdown-open-chromium-darwin.png)
 * ![Dropdown open dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Dropdown-open-dark.spec.mjs-snapshots/Dropdown-open-dark-chromium-darwin.png)
 *
 */
declare function Dropdown({
  anchor,
  children,
  isWithinFixedContainer,
  headerContent,
  id,
  idealDirection,
  onDismiss,
  zIndex,
  maxHeight,
}: Props): Node;
declare namespace Dropdown {
  var Item: any;
  var Link: any;
  var Section: any;
}
export default Dropdown;
