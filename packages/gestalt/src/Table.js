// @flow strict
import React, { type Node, useState, useCallback, useEffect, useRef } from 'react';
import cx from 'classnames';
import Box from './Box.js';
import styles from './Table.css';
import TableCell from './TableCell.js';
import TableBody from './TableBody.js';
import TableFooter from './TableFooter.js';
import TableHeader from './TableHeader.js';
import TableHeaderCell from './TableHeaderCell.js';
import TableRowExpandable from './TableRowExpandable.js';
import TableRow from './TableRow.js';
import TableSortableHeaderCell from './TableSortableHeaderCell.js';
import { TableContextProvider } from './contexts/TableContext.js';

type Props = {|
  children: Node,
  borderStyle?: 'sm' | 'none',
  maxHeight?: number | string,
  stickyColumns?: ?number,
|};

export default function Table(props: Props): Node {
  const { borderStyle, children, maxHeight, stickyColumns } = props;
  const [showShadowScroll, setShowShadowScroll] = useState(null);
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
    >
      <table className={classNames}>
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
