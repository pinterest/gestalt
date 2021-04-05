// @flow strict
import React, { Children, cloneElement, type Node, useEffect, useRef, useState } from 'react';
import { useTableContext } from './contexts/TableContext.js';

type Props = {|
  children: Node,
|};

export default function TableRow(props: Props): Node {
  const { stickyColumns } = useTableContext();
  const rowRef = useRef();
  const [columnWidths, setColumnWidths] = useState([]);

  useEffect(() => {
    if (rowRef?.current && stickyColumns) {
      const colWidths = [...rowRef.current.children].map((item) => item.clientWidth);
      setColumnWidths(colWidths);
    }
  }, [rowRef, stickyColumns]);

  const renderCellWithIndex = (child, index) => {
    const shouldBeSticky = stickyColumns && stickyColumns >= 0 && index < stickyColumns;
    const shouldHaveShadow = stickyColumns && stickyColumns - 1 === index;
    const previousWidths = columnWidths.slice(0, index);
    const previousTotalWidth =
      previousWidths.length > 0 ? previousWidths.reduce((a, b) => a + b) : 0;
    return cloneElement(child, { shouldBeSticky, previousTotalWidth, shouldHaveShadow });
  };

  return (
    <tr ref={rowRef}>
      {stickyColumns && stickyColumns > 0
        ? Children.map(props.children, renderCellWithIndex)
        : props.children}
    </tr>
  );
}
