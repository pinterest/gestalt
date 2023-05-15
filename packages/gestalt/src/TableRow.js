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
  const rowRef = useRef<?HTMLTableRowElement>();
  const [columnWidths, setColumnWidths] = useState<$ReadOnlyArray<number>>([]);

  useEffect(() => {
    if (rowRef?.current && stickyColumns) {
      const colWidths = [...rowRef.current.children].map((item) => item.clientWidth);
      setColumnWidths(colWidths);
    }
  }, [stickyColumns]);

  const renderCellWithIndex = (child: Node, index: number) => {
    const shouldBeSticky = stickyColumns ? stickyColumns >= 0 && index < stickyColumns : false;
    const shouldHaveShadow = stickyColumns ? stickyColumns - 1 === index : false;
    const previousWidths = columnWidths.slice(0, index);
    const previousTotalWidth =
      previousWidths.length > 0 ? previousWidths.reduce((a, b) => a + b) : 0;
    // $FlowFixMe[incompatible-exact]
    // $FlowFixMe[incompatible-type]
    return cloneElement(child, { shouldBeSticky, previousTotalWidth, shouldHaveShadow });
  };

  return (
    <tr ref={rowRef}>
      {Number(stickyColumns) > 0 ? Children.map(children, renderCellWithIndex) : children}
    </tr>
  );
}

TableRow.displayName = 'Table.Row';
