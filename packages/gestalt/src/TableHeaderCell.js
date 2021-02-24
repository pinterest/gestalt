// @flow strict
import React, { type Node } from 'react';
import cx from 'classnames';
import styles from './Table.css';

type Props = {|
  children: Node,
  shouldBeSticky?: Boolean,
  colSpan?: number,
  rowSpan?: number,
  scope?: 'col' | 'colgroup' | 'row' | 'rowgroup',
  previousTotalWidth?: number,
|};

export default function TableHeaderCell(props: Props): Node {
  const { children, colSpan, scope, rowSpan, shouldBeSticky, previousTotalWidth } = props;
  const cs = cx(styles.th, shouldBeSticky && styles.columnSticky);

  return (
    <th
      className={cs}
      scope={scope || 'col'}
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={{ left: shouldBeSticky ? previousTotalWidth : undefined }}
    >
      {children}
    </th>
  );
}

TableHeaderCell.displayName = 'TableHeaderCell';
