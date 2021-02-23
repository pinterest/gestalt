// @flow strict
import React, { Children, type Node, cloneElement, useContext, useEffect, useState } from 'react';
import TableContext from './TableContextProvider.js';

type Props = {|
  children: Node,
|};

export default function TableRow(props: Props): Node {
  const { stickyColumn = -1, stickyInclusive } = useContext(TableContext);
  const rowRef = React.useRef();
  const [columnWidths, setColumnWidths] = useState([]);

  useEffect(() => {
    if (rowRef && rowRef.current) {
      const colWidths = [];
      const tableRowChildrenArray = [...rowRef.current.children];
      tableRowChildrenArray.forEach((child) => {
        colWidths.push(child.clientWidth);
      });
      setColumnWidths(colWidths);
    }
  }, [columnWidths, props.children]);

  const renderCellsWithIndex = React.useCallback(() => {
    const cells = [];
    const tableRowChildrenArray = Children.toArray(props.children);

    tableRowChildrenArray.forEach((child, index) => {
      const shouldBeSticky =
        stickyColumn >= 0 &&
        ((index < stickyColumn && stickyInclusive) ||
          (!stickyInclusive && index === stickyColumn - 1));
      console.log({ columnWidths });
      // this doesn't re-run after columnWidths changes
      // or
      // columnWidths isn't changing
      if (columnWidths.length > 0) {
        if (
          child.type.displayName === 'TableCell' ||
          child.type.displayName === 'TableHeaderCell'
        ) {
          const previousWidths = columnWidths.slice(0, index);
          const previousTotalWidth = previousWidths.reduce((a, b) => a + b);
          cells.push(cloneElement(child, { shouldBeSticky, previousTotalWidth }));
        }
      }
    });
    return cells;
  }, [columnWidths, props.children, stickyInclusive, stickyColumn]);

  return <tr ref={rowRef}>{renderCellsWithIndex()}</tr>;
}
