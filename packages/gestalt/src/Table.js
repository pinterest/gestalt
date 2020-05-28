// @flow strict
import * as React from 'react';
import Box from './Box.js';
import styles from './Table.css';
import TableCell from './TableCell.js';
import TableBody from './TableBody.js';
import TableFooter from './TableFooter.js';
import TableHeader from './TableHeader.js';
import TableHeaderCell from './TableHeaderCell.js';
import TableRow from './TableRow.js';
import TableSortableHeaderCell from './TableSortableHeaderCell.js';

type Props = {|
  children: React.Node,
  borderSize?: 'sm' | 'none',
|};

export default function Table(props: Props) {
  const { borderSize, children } = props;

  return (
    <Box
      overflow="auto"
      {...(borderSize === 'sm' ? { borderSize: 'sm', rounding: 1 } : {})}
    >
      <table className={styles.table}>{children}</table>
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
