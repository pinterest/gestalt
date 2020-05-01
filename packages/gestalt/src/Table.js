// @flow
import * as React from 'react';
import styles from './Table.css';

const TableBody = ({ children }: { children: React.Node }) => (
  <tbody>{children}</tbody>
);

const TableCell = ({
  children,
  colSpan,
  rowSpan,
}: {
  children: React.Node,
  colSpan?: number,
  rowSpan?: number,
}) => {
  let props = { className: styles.td };
  if (colSpan) {
    props = { ...props, colSpan };
  }
  if (rowSpan) {
    props = { ...props, rowSpan };
  }

  return <td {...props}>{children}</td>;
};

const TableHeader = ({ children }: { children: React.Node }) => (
  <thead className={styles.thead}>{children}</thead>
);

const TableHeaderCell = ({
  children,
  colSpan,
  rowSpan,
  scope = 'col',
}: {
  children: React.Node,
  colSpan?: number,
  rowSpan?: number,
  scope?: 'col' | 'colgroup' | 'row' | 'rowgroup',
}) => {
  let props = { className: styles.th, scope };
  if (colSpan) {
    props = { ...props, colSpan };
  }
  if (rowSpan) {
    props = { ...props, rowSpan };
  }

  return <th {...props}>{children}</th>;
};

const TableRow = ({ children }: { children: React.Node }) => (
  <tr>{children}</tr>
);

type TableProps = {|
  children: React.Node,
|};

export default class Table extends React.PureComponent<TableProps> {
  static Body = TableBody;

  static Cell = TableCell;

  static Header = TableHeader;

  static HeaderCell = TableHeaderCell;

  static Row = TableRow;

  render() {
    return (
      <div style={{ overflowX: 'scroll' }}>
        <table className={styles.table}>{this.props.children}</table>
      </div>
    );
  }
}
