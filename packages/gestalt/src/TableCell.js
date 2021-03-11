// @flow strict
import type { Node } from 'react';
import styles from './Table.css';

type Props = {|
  children: Node,
  colSpan?: number,
  rowSpan?: number,
|};

export default function TableCell(props: Props): Node {
  const { children, colSpan, rowSpan } = props;

  return (
    <td className={styles.td} colSpan={colSpan} rowSpan={rowSpan}>
      {children}
    </td>
  );
}
