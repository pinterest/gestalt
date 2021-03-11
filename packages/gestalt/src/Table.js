// @flow strict
import React, { type Node } from 'react';
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

  return (
    <Box
      overflow="auto"
      {...(borderStyle === 'sm' ? { borderStyle: 'sm', rounding: 1 } : {})}
      maxHeight={maxHeight}
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
