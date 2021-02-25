// @flow strict
import React, { type Node } from 'react';
import cx from 'classnames';
import styles from './Table.css';

type Props = {|
  children: Node,
  colSpan?: number,
  rowSpan?: number,
  shouldBeSticky?: boolean,
  previousTotalWidth?: number,
|};

export default function TableCell(props: Props): Node {
  const { children, colSpan, rowSpan, shouldBeSticky, previousTotalWidth } = props;
  const cs = cx(styles.td, shouldBeSticky && styles.columnSticky);
  return (
    <td
      className={cs}
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={{
        left: shouldBeSticky ? previousTotalWidth : undefined,
        right: shouldBeSticky ? previousTotalWidth : undefined,
      }}
    >
      {children}
    </td>
  );
}

TableCell.displayName = 'TableCell';
