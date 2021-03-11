// @flow strict
import React, { Children, type Node, cloneElement, useContext, useEffect, useState } from 'react';
import TableContext from './TableContextProvider.js';

type Props = {|
  children: Node,
|};

export default function TableRow(props: Props): Node {
  const { stickyColumns } = useContext(TableContext);
  const rowRef = React.useRef();
  const [columnWidths, setColumnWidths] = useState([]);

  useEffect(() => {
    if (rowRef && rowRef.current && stickyColumns) {
      const colWidths = [];
      const tableRowChildrenArray = [...rowRef.current.children];
      tableRowChildrenArray.forEach((child) => {
        colWidths.push(child.clientWidth);
      });
      setColumnWidths(colWidths);
    }
  }, [rowRef, stickyColumns]);

  const renderCellsWithIndex = () => {
    const cells = [];
    const tableRowChildrenArray = Children.toArray(props.children);

    tableRowChildrenArray.forEach((child, index) => {
      const shouldBeSticky = stickyColumns >= 0 && index < stickyColumns;
      const shouldHaveShadow = stickyColumns - 1 === index;
      const previousWidths = columnWidths.slice(0, index);
      const previousTotalWidth =
        previousWidths.length > 0 ? previousWidths.reduce((a, b) => a + b) : 0;
      cells.push(cloneElement(child, { shouldBeSticky, previousTotalWidth, shouldHaveShadow }));
    });
    return cells;
  };

  return <tr ref={rowRef}>{stickyColumns > 0 ? renderCellsWithIndex() : props.children}</tr>;
}
