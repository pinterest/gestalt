// @flow strict
import * as React from 'react';
import styles from './Table.css';

type Props = {|
  children: React.Node,
  colSpan?: number,
  rowSpan?: number,
  scope?: 'col' | 'colgroup' | 'row' | 'rowgroup',
|};

export default function TableHeaderCell(props: Props) {
  const { children, colSpan, scope, rowSpan } = props;

  return (
    <th
      className={styles.th}
      scope={scope || 'col'}
      colSpan={colSpan}
      rowSpan={rowSpan}
    >
      {children}
    </th>
  );
}
