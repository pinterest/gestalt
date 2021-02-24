// @flow strict
import React, { Children, type Node, cloneElement, useContext, useEffect, useState } from 'react';
import TableContext from './TableContextProvider.js';

type Props = {|
  children: Node,
|};

export default function TableRow(props: Props): Node {
  const { stickyColumn = -1 } = useContext(TableContext);
  const rowRef = React.useRef();
  const [columnWidths, setColumnWidths] = useState([]);

  useEffect(() => {
    if (rowRef && rowRef.current && stickyColumn > 0) {
      const colWidths = [];
      const tableRowChildrenArray = [...rowRef.current.children];
      tableRowChildrenArray.forEach((child) => {
        colWidths.push(child.clientWidth);
      });
      setColumnWidths(colWidths);
    }
  }, [rowRef, stickyColumn]);

  const renderCellsWithIndex = () => {
    const cells = [];
    const tableRowChildrenArray = Children.toArray(props.children);

    tableRowChildrenArray.forEach((child, index) => {
      const shouldBeSticky = stickyColumn >= 0 && index < stickyColumn;
      const previousWidths = columnWidths.slice(0, index);
      const previousTotalWidth =
        previousWidths.length > 0 ? previousWidths.reduce((a, b) => a + b) : 0;
      cells.push(cloneElement(child, { shouldBeSticky, previousTotalWidth }));
    });
    return cells;
  };

  return <tr ref={rowRef}>{stickyColumn > 0 ? renderCellsWithIndex() : props.children}</tr>;
}
