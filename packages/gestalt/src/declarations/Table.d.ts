import type { Node } from 'react';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableFooter from './TableFooter';
import TableHeader from './TableHeader';
import TableHeaderCell from './TableHeaderCell';
import TableRow from './TableRow';
import TableRowDrawer from './TableRowDrawer';
import TableRowExpandable from './TableRowExpandable';
import TableSortableHeaderCell from './TableSortableHeaderCell';
type Props = {
  /**
   * Must be instances of Table.Header, Table.Body, and/or Table.Footer components. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
   */
  children: Node;
  /**
   * Label for screen readers to announce Table.
   */
  accessibilityLabel: string;
  /**
   * Specify a border width for Table: "sm" is 1px.
   */
  borderStyle?: 'sm' | 'none';
  /**
   * Use numbers for pixels: `maxHeight={100}` and strings for percentages: `maxHeight="100%"`.
   */
  maxHeight?: number | string;
  /**
   * Specify how many columns from the start of the Table should be sticky when scrolling horizontally. See the [sticky column](https://gestalt.pinterest.systems/web/table#Sticky-Column), [multiple sticky columns](https://gestalt.pinterest.systems/web/table#Multiple-sticky-columns), [sticky header and columns](https://gestalt.pinterest.systems/web/table#Sticky-header-and-sticky-columns), [expandable row with sticky columns](https://gestalt.pinterest.systems/web/table#Table-Row-Expandable-with-Sticky-Columns), and [sortable header cells with sticky columns](https://gestalt.pinterest.systems/web/table#Sortable-header-cells-with-sticky-columns) variants for details.
   */
  stickyColumns?: number | null | undefined;
};
/**
 * [Table](https://gestalt.pinterest.systems/web/table) is a set of structured data that is easy for a user to scan, examine, and compare. Table data is displayed in a grid format and can be used to structure both interactive and static data.
 *
 * ![Table light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Table.spec.mjs-snapshots/Table-chromium-darwin.png)
 *
 */
declare function Table({
  accessibilityLabel,
  borderStyle,
  children,
  maxHeight,
  stickyColumns,
}: Props): Node;
declare namespace Table {
  var Body: typeof TableBody;
  var Cell: typeof TableCell;
  var Footer: typeof TableFooter;
  var Header: typeof TableHeader;
  var HeaderCell: typeof TableHeaderCell;
  var Row: typeof TableRow;
  var SortableHeaderCell: typeof TableSortableHeaderCell;
  var RowExpandable: typeof TableRowExpandable;
  var RowDrawer: typeof TableRowDrawer;
}
export default Table;
