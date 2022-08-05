// @flow strict
import { type Node, Children, cloneElement, useEffect, useRef, useState } from 'react';
import { useTableContext } from './contexts/TableContext.js';

type Props = {|
  /**
   * Must be instances of Table.Cell, Table.HeaderCell, or Table.SortableHeaderCell components. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
   */
  children: Node,
|};

/**
 * Use [Table.Row](https://gestalt.pinterest.systems/web/table#Table.Row) to define a row in Table.
 */
export default function TableRow({ children }: Props): Node {
  const { stickyColumns } = useTableContext();
  const rowRef = useRef();
  const [columnWidths, setColumnWidths] = useState([]);

  useEffect(() => {
    if (rowRef?.current && stickyColumns) {
      const colWidths = [...rowRef.current.children].map((item) => item.clientWidth);
      setColumnWidths(colWidths);
    }
  }, [stickyColumns]);

  const renderCellWithIndex = (child, index) => {
    const shouldBeSticky = stickyColumns ? stickyColumns >= 0 && index < stickyColumns : false;
    const shouldHaveShadow = stickyColumns ? stickyColumns - 1 === index : false;
    const previousWidths = columnWidths.slice(0, index);
    const previousTotalWidth =
      previousWidths.length > 0 ? previousWidths.reduce((a, b) => a + b) : 0;
    return cloneElement(child, { shouldBeSticky, previousTotalWidth, shouldHaveShadow });
  };

  return (
    <tr ref={rowRef}>
      {Number(stickyColumns) > 0 ? Children.map(children, renderCellWithIndex) : children}
    </tr>
  );
}

TableRow.displayName = 'Table.Row';
