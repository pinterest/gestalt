// @flow strict
import { type Node, useCallback, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import Box from './Box.js';
import { TableContextProvider } from './contexts/TableContext.js';
import styles from './Table.css';
import TableBody from './TableBody.js';
import TableCell from './TableCell.js';
import TableFooter from './TableFooter.js';
import TableHeader from './TableHeader.js';
import TableHeaderCell from './TableHeaderCell.js';
import TableRow from './TableRow.js';
import TableRowDrawer from './TableRowDrawer.js';
import TableRowExpandable from './TableRowExpandable.js';
import TableSortableHeaderCell from './TableSortableHeaderCell.js';

type Props = {|
  /**
   * Must be instances of Table.Header, Table.Body, and/or Table.Footer components. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
   */
  children: Node,
  /**
   * Label for screen readers to announce Table.
   */
  accessibilityLabel: string,
  /**
   * Specify a border width for Table: "sm" is 1px.
   */
  borderStyle?: 'sm' | 'none',
  /**
   * Use numbers for pixels: `maxHeight={100}` and strings for percentages: `maxHeight="100%"`.
   */
  maxHeight?: number | string,
  /**
   * Specify how many columns from the start of the Table should be sticky when scrolling horizontally. See the [sticky column](https://gestalt.pinterest.systems/web/table#Sticky-Column), [multiple sticky columns](https://gestalt.pinterest.systems/web/table#Multiple-sticky-columns), [sticky header and columns](https://gestalt.pinterest.systems/web/table#Sticky-header-and-sticky-columns), [expandable row with sticky columns](https://gestalt.pinterest.systems/web/table#Table-Row-Expandable-with-Sticky-Columns), and [sortable header cells with sticky columns](https://gestalt.pinterest.systems/web/table#Sortable-header-cells-with-sticky-columns) variants for details.
   */
  stickyColumns?: ?number,
|};

/**
 * [Table](https://gestalt.pinterest.systems/web/table) is a set of structured data that is easy for a user to scan, examine, and compare. Table data is displayed in a grid format and can be used to structure both interactive and static data.
 *
 * ![Table light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Table.spec.mjs-snapshots/Table-chromium-darwin.png)
 *
 */
export default function Table({
  accessibilityLabel,
  borderStyle,
  children,
  maxHeight,
  stickyColumns,
}: Props): Node {
  const [showShadowScroll, setShowShadowScroll] = useState<'left' | 'right' | null>(null);
  const tableRef = useRef<?HTMLElement>(null);

  const updateShadows = useCallback(() => {
    const target = tableRef.current;
    if (!target) {
      return;
    }
    if (target.scrollLeft > 0) {
      setShowShadowScroll('right');
    } else if (target.scrollLeft < 0) {
      setShowShadowScroll('left');
    } else {
      setShowShadowScroll(null);
    }
  }, []);

  useEffect(() => {
    const target = tableRef.current;
    target?.addEventListener('scroll', updateShadows);
    updateShadows();
    return () => {
      target?.removeEventListener('scroll', updateShadows);
    };
  }, [updateShadows]);

  const classNames = cx(
    styles.table,
    showShadowScroll === 'right' && styles.horizontalScrollRight,
    showShadowScroll === 'left' && styles.horizontalScrollLeft,
  );

  return (
    <Box
      overflow="auto"
      {...(borderStyle === 'sm' ? { borderStyle: 'sm', rounding: 1 } : {})}
      maxHeight={maxHeight}
      ref={tableRef}
      tabIndex="0"
    >
      <table className={classNames}>
        <Box
          width={1}
          height={1}
          overflow="hidden"
          position="absolute"
          as="caption"
          dangerouslySetInlineStyle={{
            __style: { clip: 'rect(1px, 1px, 1px, 1px)', whiteSpace: 'nowrap' },
          }}
        >
          {accessibilityLabel}
        </Box>
        <TableContextProvider stickyColumns={stickyColumns}>{children}</TableContextProvider>
      </table>
    </Box>
  );
}

Table.Body = TableBody;

Table.Cell = TableCell;

Table.Footer = TableFooter;

Table.Header = TableHeader;

Table.HeaderCell = TableHeaderCell;

Table.Row = TableRow;

Table.SortableHeaderCell = TableSortableHeaderCell;

Table.RowExpandable = TableRowExpandable;

Table.RowDrawer = TableRowDrawer;
