import type { Node } from 'react';
import 'react';
type Props = {
  /**
   * The content of the table cell.
   */
  children: Node;
  /**
   * `colSpan` defines the number of columns a cell should span.
   */
  colSpan?: number;
  /**
   * Private prop required for sticky columns
   */
  previousTotalWidth?: number;
  /**
   * `rowSpan` defines the number of rows a cell should span.
   */
  rowSpan?: number;
  /**
   * The scope attribute specifies whether a header cell is a header for a column, row, or group of columns or rows. The scope attribute has no visual effect, but is used by screen readers and other assistive technologies.
   */
  scope?: 'col' | 'colgroup' | 'row' | 'rowgroup';
  /**
   * Private prop required for sticky columns
   */
  shouldBeSticky?: boolean;
  /**
   * Private prop required for sticky columns
   */
  shouldHaveShadow?: boolean;
};
/**
 * Use [Table.HeaderCell](https://gestalt.pinterest.systems/web/table#Table.HeaderCell) to define a header cell in Table.
 */
declare function TableHeaderCell({
  children,
  colSpan,
  previousTotalWidth,
  rowSpan,
  scope,
  shouldBeSticky,
  shouldHaveShadow,
}: Props): Node;
declare namespace TableHeaderCell {
  var displayName: string;
}
export default TableHeaderCell;
