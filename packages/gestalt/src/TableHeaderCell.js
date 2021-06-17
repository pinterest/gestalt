// @flow strict
import type { Node } from 'react';
import cx from 'classnames';
import styles from './Table.css';

type Props = {|
  children: Node,
  shouldBeSticky?: boolean,
  shouldHaveShadow?: boolean,
  colSpan?: number,
  rowSpan?: number,
  scope?: 'col' | 'colgroup' | 'row' | 'rowgroup',
  previousTotalWidth?: number,
|};

/**
 * https://gestalt.pinterest.systems/Table
 */
export default function TableHeaderCell(props: Props): Node {
  const {
    children,
    colSpan,
    scope,
    rowSpan,
    shouldBeSticky,
    previousTotalWidth,
    shouldHaveShadow,
  } = props;
  const cs = cx(
    styles.th,
    shouldBeSticky && styles.columnSticky,
    shouldHaveShadow && styles.columnStickyShadow,
  );

  return (
    <th
      className={cs}
      scope={scope || 'col'}
      colSpan={colSpan}
      rowSpan={rowSpan}
      style={{
        left: shouldBeSticky ? previousTotalWidth : undefined,
        right: shouldBeSticky ? previousTotalWidth : undefined,
      }}
    >
      {children}
    </th>
  );
}
