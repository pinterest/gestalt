import { Children, cloneElement, type ReactNode, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { useTableContext } from './contexts/TableContext';
import styles from './Table.css';

type Props = {
  /**
   * Must be instances of Table.Cell, Table.HeaderCell, or Table.SortableHeaderCell components. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
   */
  children: ReactNode;
  /**
   * Sets the background color on hover over the row. See the [selected and hovered state variant](https://gestalt.pinterest.systems/web/table#Selected-and-hovered-state) to learn more.
   */
  hoverStyle?: 'gray' | 'none';
  /**
   * Indicates if Table.Row is currently selected or unselected. See the [selected and hovered state variant](https://gestalt.pinterest.systems/web/table#Selected-and-hovered-state) to learn more.
   */
  selected?: 'selected' | 'unselected';
};

/**
 * Use [Table.Row](https://gestalt.pinterest.systems/web/table#Table.Row) to define a row in Table.
 */
export default function TableRow({ children, hoverStyle = 'none', selected }: Props) {
  const { stickyColumns } = useTableContext();
  const rowRef = useRef<HTMLTableRowElement | null | undefined>();
  const [columnWidths, setColumnWidths] = useState<ReadonlyArray<number>>([]);

  useEffect(() => {
    if (rowRef?.current && stickyColumns) {
      // @ts-expect-error - TS2488 - Type 'HTMLCollection' must have a '[Symbol.iterator]()' method that returns an iterator.
      const colWidths = [...rowRef.current.children].map((item) => item.clientWidth);
      setColumnWidths(colWidths);
    }
  }, [stickyColumns]);

  const renderCellWithIndex = (child: ReactNode, index: number) => {
    const shouldBeSticky = stickyColumns ? stickyColumns >= 0 && index < stickyColumns : false;
    const shouldHaveShadow = stickyColumns ? stickyColumns - 1 === index : false;
    const previousWidths = columnWidths.slice(0, index);
    const previousTotalWidth =
      previousWidths.length > 0 ? previousWidths.reduce((a, b) => a + b) : 0;
    // @ts-expect-error - TS2769 - No overload matches this call.
    return cloneElement(child, {
      shouldBeSticky,
      previousTotalWidth,
      shouldHaveShadow,
    });
  };

  const rowStyle = classnames({
    [styles.hoverShadeGray]: hoverStyle === 'gray' && selected !== 'selected',
    [styles.selected]: selected === 'selected',
    [styles.unselected]: selected === 'unselected',
  });

  return (
    // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLTableRowElement | null | undefined>' is not assignable to type 'LegacyRef<HTMLTableRowElement> | undefined'.
    <tr ref={rowRef} className={rowStyle}>
      {Number(stickyColumns) > 0 ? Children.map(children, renderCellWithIndex) : children}
    </tr>
  );
}

TableRow.displayName = 'Table.Row';
