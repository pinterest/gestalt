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
   * `rowSpan` defines the number of rows a cell should span.
   */
  rowSpan?: number;
  /**
   * Private prop required for sticky columns
   */
  shouldBeSticky?: boolean;
  /**
   * Private prop required for sticky columns
   */
  shouldHaveShadow?: boolean;
  /**
   * Private prop required for sticky columns
   */
  previousTotalWidth?: number;
};
/**
 * Use [Table.Cell](https://gestalt.pinterest.systems/web/table#Table.Cell) for individual table values.
 */
declare function TableCell({
  children,
  colSpan,
  rowSpan,
  shouldBeSticky,
  previousTotalWidth,
  shouldHaveShadow,
}: Props): Node;
declare namespace TableCell {
  var displayName: string;
}
export default TableCell;
