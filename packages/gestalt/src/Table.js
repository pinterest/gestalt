// @flow
import * as React from 'react';
import Box from './Box.js';
import styles from './Table.css';
import TableCell from './TableCell.js';
import TableBody from './TableBody.js';
import TableHeader from './TableHeader.js';
import TableHeaderCell from './TableHeaderCell.js';
import TableRow from './TableRow.js';

type Props = {|
  children: React.Node,
|};

export default function Table(props: Props) {
  return (
    <Box overflow="scrollX">
      <table className={styles.table}>{props.children}</table>
    </Box>
  );
}

Table.Body = TableBody;

Table.Cell = TableCell;

Table.Header = TableHeader;

Table.HeaderCell = TableHeaderCell;

Table.Row = TableRow;
