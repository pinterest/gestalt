// @flow strict
import * as React from 'react';
import styles from './Table.css';

type Props = {|
  children: React.Node,
  colSpan?: number,
  rowSpan?: number,
|};

export default function TableCell(props: Props) {
  const { children, colSpan, rowSpan } = props;

  return (
    <td className={styles.td} colSpan={colSpan} rowSpan={rowSpan}>
      {children}
    </td>
  );
}
