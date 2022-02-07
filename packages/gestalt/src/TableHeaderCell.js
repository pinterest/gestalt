// @flow strict
import type { Node } from 'react';
import cx from 'classnames';
import styles from './Table.css';

type Props = {|
  /**
   * The content of the table cell.
   */
  children: Node,
  /**
   * Private prop required for sticky columns
   */
  shouldBeSticky?: boolean,
  /**
   * Private prop required for sticky columns
   */
  shouldHaveShadow?: boolean,
  /**
   * `colSpan` defines the number of columns a cell should span.
   */
  colSpan?: number,
  /**
   * `rowSpan` defines the number of rows a cell should span.
   */
  rowSpan?: number,
  /**
   * The scope attribute specifies whether a header cell is a header for a column, row, or group of columns or rows. The scope attribute has no visual effect in ordinary web browsers, but can be used by screen readers.
   */
  scope?: 'col' | 'colgroup' | 'row' | 'rowgroup',
  /**
   * Private prop required for sticky columns
   */
  previousTotalWidth?: number,
|};

/**
 * Subcomponent of [Table](https://gestalt.pinterest.systems/table).
 * Use [Table.HeaderCell](https://gestalt.pinterest.systems/table#Table.HeaderCellProps) to define a header cell in Table.
 */
export default function TableHeaderCell({
  children,
  colSpan,
  scope,
  rowSpan,
  shouldBeSticky,
  previousTotalWidth,
  shouldHaveShadow,
}: Props): Node {
  const cs = cx(
    styles.th,
    shouldBeSticky && styles.columnSticky,
    shouldHaveShadow && styles.columnStickyShadow,
  );

  return (
    <th
      className={cs}
      scope={scope || 'col'}
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={{
        left: shouldBeSticky ? previousTotalWidth : undefined,
        right: shouldBeSticky ? previousTotalWidth : undefined,
      }}
    >
      {children}
    </th>
  );
}
