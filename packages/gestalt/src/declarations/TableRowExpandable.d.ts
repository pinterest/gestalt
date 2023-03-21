import type { Node } from 'react';
type Props = {
  /**
   * Supply a short, descriptive label for screen-readers as a text alternative to the expand button.
   */
  accessibilityExpandLabel: string;
  /**
   * Supply a short, descriptive label for screen-readers as a text alternative to the collapse button. Accessibility: It populates  `aria-label` on the `<button>` element for the collapse button.
   */
  accessibilityCollapseLabel: string;
  /**
   * Must be instances of Table.Cell. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
   */
  children: Node;
  /**
   * When passed Row.TableRowExpandable becomes a controlled component. If not passed, it stays uncontrolled. See the [controlled/uncontrolled Table.RowExpandable section](https://gestalt.pinterest.systems/web/table#ControlledUncontrolled-Table.RowExpandable) to learn more.
   */
  expanded?: boolean;
  /**
   * The contents to show and/or hide on an expandable row. Required when using Table.RowExpandable as a controlled component. See the [controlled/uncontrolled Table.RowExpandable section](https://gestalt.pinterest.systems/web/table#ControlledUncontrolled-Table.RowExpandable) to learn more.
   */
  expandedContents: Node;
  /**
   * Callback fired when the expand button component is clicked.
   */
  onExpand?: (arg0: {
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>;
    expanded: boolean;
  }) => void;
  /**
   * Sets the background color on hover over the row.
   */
  hoverStyle?: 'gray' | 'none';
  /**
   * Unique id for Table.RowExpandable.
   */
  id: string;
};
/**
 * Use [Table.RowExpandable](https://gestalt.pinterest.systems/web/table#Table.RowExpandable) to define a row that expands and collapses additional content.
 */
declare function TableRowExpandable({
  accessibilityCollapseLabel,
  accessibilityExpandLabel,
  children,
  expanded: expandedControlled,
  expandedContents,
  onExpand,
  id,
  hoverStyle,
}: Props): Node;
declare namespace TableRowExpandable {
  var displayName: string;
}
export default TableRowExpandable;
