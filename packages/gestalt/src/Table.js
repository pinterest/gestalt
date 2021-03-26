// @flow strict
import React, { type Node, useState, useCallback, useEffect, useRef } from 'react';
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
import TableContext from './TableContextProvider.js';

type Props = {|
  children: Node,
  borderStyle?: 'sm' | 'none',
  maxHeight?: number | string,
  stickyColumns?: number,
|};

export default function Table(props: Props): Node {
  const { borderStyle, children, maxHeight, stickyColumns } = props;
  const [showShadowScroll, setShowShadowScroll] = useState(false);
  const contentRef = useRef<?HTMLDivElement>(null);

  const updateShadows = useCallback(() => {
    console.log('update shadows');
    const target = contentRef.current;
    if (!target) {
      return;
    }
    console.log(target.scrollHeight);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', updateShadows);
    return () => {
      document.removeEventListener('scroll', updateShadows);
    };
  }, [updateShadows]);

  useEffect(() => {
    updateShadows();
  }, [updateShadows]);

  return (
    <Box
      id="testing"
      overflow="auto"
      {...(borderStyle === 'sm' ? { borderStyle: 'sm', rounding: 1 } : {})}
      maxHeight={maxHeight}
      ref={contentRef}
    >
      <table className={styles.table}>
        <TableContext.Provider value={{ stickyColumns }}>{children}</TableContext.Provider>
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
