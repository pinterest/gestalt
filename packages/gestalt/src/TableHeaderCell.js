// @flow strict
import React, { type Node } from 'react';
import styles from './Table.css';

type Props = {|
  children: Node,
  colSpan?: number,
  rowSpan?: number,
  scope?: 'col' | 'colgroup' | 'row' | 'rowgroup',
|};

export default function TableHeaderCell(props: Props): Node {
  const { children, colSpan, scope, rowSpan } = props;

  return (
    <th className={styles.th} scope={scope || 'col'} colSpan={colSpan} rowSpan={rowSpan}>
      {children}
    </th>
  );
}
