import type { Node } from 'react';
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
   * Callback fired when the sort button component is clicked.
   */
  onSortChange: (arg0: {
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>;
    dangerouslyDisableOnNavigation: () => void;
  }) => void;
  /**
   * Private prop required for sticky columns
   */
  previousTotalWidth?: number;
  /**
   * `rowSpan` defines the number of rows a cell should span.
   */
  rowSpan?: number;
  /**
   * The scope attribute specifies whether a header cell is a header for a column, row, or group of columns or rows. The scope attribute has no visual effect in ordinary web browsers, but can be used by screen readers.
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
  /**
   * Sets the sorting direction: `sortOrder="asc"` is ascending (A to Z) and `sortOrder="desc"` is descending (Z to A):
   */
  sortOrder: 'asc' | 'desc';
  /**
   * Disables the sorting functionality for a column.
   */
  status: 'active' | 'inactive';
};
/**
 * Use [Table.SortableHeaderCell](https://gestalt.pinterest.systems/web/table#Table.SortableHeaderCell) to define a header cell with sorting functionality in Table.
 */
declare function TableSortableHeaderCell({
  children,
  colSpan,
  onSortChange,
  previousTotalWidth,
  rowSpan,
  scope,
  shouldBeSticky,
  shouldHaveShadow,
  status,
  sortOrder,
}: Props): Node;
declare namespace TableSortableHeaderCell {
  var displayName: string;
}
export default TableSortableHeaderCell;
