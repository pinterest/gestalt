// @flow strict
import { type Node } from 'react';
import cx from 'classnames';
import styles from './Table.css';

type Props = {
  /**
   * The content of the table cell.
   */
  children: Node,
  /**
   * `colSpan` defines the number of columns a cell should span.
   */
  colSpan?: number,
  /**
   * `rowSpan` defines the number of rows a cell should span.
   */
  rowSpan?: number,
  /**
   * Private prop required for sticky columns
   */
  shouldBeSticky?: boolean,
  /**
   * Private prop required for sticky columns
   */
  shouldHaveShadow?: boolean,
  /**
   * Private prop required for sticky columns
   */
  previousTotalWidth?: number,
};

/**
 * Use [Table.Cell](https://gestalt.pinterest.systems/web/table#Table.Cell) for individual table values.
 */
export default function TableCell({
  children,
  colSpan,
  rowSpan,
  shouldBeSticky,
  previousTotalWidth,
  shouldHaveShadow,
}: Props): Node {
  const cs = cx(
    styles.td,
    shouldBeSticky && styles.columnSticky,
    shouldHaveShadow && styles.columnStickyShadow,
  );
  return (
    <td
      className={cs}
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={{
        left: shouldBeSticky ? previousTotalWidth : undefined,
        right: shouldBeSticky ? previousTotalWidth : undefined,
      }}
    >
      {children}
    </td>
  );
}

TableCell.displayName = 'Table.Cell';
