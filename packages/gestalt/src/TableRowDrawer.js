// @flow strict
import { Children, cloneElement, Fragment, type Node, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import { useTableContext } from './contexts/TableContext.js';
import styles from './Table.css';
import getChildrenCount from './Table/getChildrenCount.js';

type Props = {|
  /**
   * Must be instances of Table.Cell. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
   */
  children: Node,
  /**
   * The contents within the drawer. See the [Table.RowDrawer implementation](https://gestalt.pinterest.systems/web/table#Table.RowDrawer-implementation) to learn more.
   */
  drawerContents: Node,
  /**
   * Sets the background color on hover over the row. See the [selected and hovered state variant](https://gestalt.pinterest.systems/web/table#Selected-and-hovered-state) to learn more.
   */
  hoverStyle?: 'gray' | 'none',

  /**
   * Unique id for Table.RowDrawer.
   */
  id: string,
  /**
   * Indicates if Table.RowDrawer is currently selected or unselected. See the [selected and hovered state variant](https://gestalt.pinterest.systems/web/table#Selected-and-hovered-state) to learn more.
   */
  selected?: 'selected' | 'unselected',
|};

/**
 * Use [Table.RowDrawer](https://gestalt.pinterest.systems/web/table#Table.RowDrawer) to define a row drawer to display additional content.
 */
export default function TableRowDrawer({
  children,
  drawerContents,
  hoverStyle = 'none',
  id,
  selected,
}: Props): Node {
  const { stickyColumns } = useTableContext();
  const rowRef = useRef<?HTMLTableRowElement>();
  const [columnWidths, setColumnWidths] = useState<$ReadOnlyArray<number>>([]);

  useEffect(() => {
    if (rowRef?.current && stickyColumns) {
      const colWidths = [...rowRef.current.children].map((item) => item.clientWidth);
      setColumnWidths(colWidths);
    }
  }, [stickyColumns]);

  const renderCellWithAdjustedIndex = (child: Node, index: number) => {
    // Account for initial expandable column
    const adjustedIndex = index + 1;
    const shouldBeSticky = stickyColumns
      ? stickyColumns >= 0 && adjustedIndex < stickyColumns
      : false;
    const shouldHaveShadow = stickyColumns ? stickyColumns - 1 === adjustedIndex : false;
    const previousWidths = columnWidths.slice(0, adjustedIndex);
    const previousTotalWidth =
      previousWidths.length > 0 ? previousWidths.reduce((a, b) => a + b) : 0;
    // $FlowFixMe[incompatible-exact]
    // $FlowFixMe[incompatible-type]
    return cloneElement(child, { shouldBeSticky, previousTotalWidth, shouldHaveShadow });
  };

  const rowStyle = classnames({
    [styles.hoverShadeGray]: hoverStyle === 'gray' && selected !== 'selected',
    [styles.selected]: selected === 'selected',
    [styles.unselected]: selected === 'unselected',
  });

  return (
    <Fragment>
      <tr aria-details={drawerContents ? id : undefined} className={rowStyle} ref={rowRef}>
        {/* This needs to be fixed for children wrapped in React.Fragment when sticky columns are present */}
        {Number(stickyColumns) > 0 ? Children.map(children, renderCellWithAdjustedIndex) : children}
      </tr>
      {drawerContents ? (
        <tr id={id}>
          <td className={styles.drawer} colSpan={getChildrenCount(children)}>
            <Box padding={2}>{drawerContents}</Box>
          </td>
        </tr>
      ) : null}
    </Fragment>
  );
}

TableRowDrawer.displayName = 'Table.RowDrawer';
