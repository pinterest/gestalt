import { Children, cloneElement, Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Box from './Box';
import { useTableContext } from './contexts/TableContext';
import IconButton from './IconButton';
import styles from './Table.css';
import getChildrenCount from './Table/getChildrenCount';
import TableCell from './TableCell';

type Props = {
  /**
   * Supply a short, descriptive label for screen-readers as a text alternative to the expand button.
   */
  accessibilityExpandLabel: string;
  /**
   * Supply a short, descriptive label for screen-readers as a text alternative to the collapse button. Accessibility: It populates  `aria-label` on the `<button>` element for the collapse button.
   */
  accessibilityCollapseLabel: string;
  /**
   * Must be instances of Table.Cell. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
   */
  children: ReactNode;
  /**
   * When passed Row.TableRowExpandable becomes a controlled component. If not passed, it stays uncontrolled. See the [controlled/uncontrolled Table.RowExpandable section](https://gestalt.pinterest.systems/web/table#ControlledUncontrolled-Table.RowExpandable) to learn more.
   */
  expanded?: boolean;
  /**
   * The contents to show and/or hide on an expandable row. Required when using Table.RowExpandable as a controlled component. See the [controlled/uncontrolled Table.RowExpandable section](https://gestalt.pinterest.systems/web/table#ControlledUncontrolled-Table.RowExpandable) to learn more.
   */
  expandedContents: ReactNode;
  /**
   * Callback fired when the expand button component is clicked.
   */
  onExpand?: (arg1: {
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
    expanded: boolean;
  }) => void;
  /**
   * Sets the background color on hover over the row. See the [selected and hovered state variant](https://gestalt.pinterest.systems/web/table#Selected-and-hovered-state) to learn more.
   */
  hoverStyle?: 'gray' | 'none';
  /**
   * Unique id for Table.RowExpandable.
   */
  id: string;
  /**
   * Indicates if Table.RowExpandable is currently selected or unselected. See the [selected and hovered state variant](https://gestalt.pinterest.systems/web/table#Selected-and-hovered-state) to learn more.
   */
  selected?: 'selected' | 'unselected';
};

/**
 * Use [Table.RowExpandable](https://gestalt.pinterest.systems/web/table#Table.RowExpandable) to define a row that expands and collapses additional content.
 */
export default function TableRowExpandable({
  accessibilityCollapseLabel,
  accessibilityExpandLabel,
  children,
  expanded: expandedControlled,
  expandedContents,
  onExpand,
  id,
  hoverStyle = 'gray',
  selected,
}: Props) {
  const { stickyColumns } = useTableContext();
  const rowRef = useRef<HTMLTableRowElement | null | undefined>();
  const [columnWidths, setColumnWidths] = useState<ReadonlyArray<number>>([]);
  const [isExpanded, setIsExpanded] = useState(expandedControlled ?? false);

  useEffect(() => {
    if (rowRef?.current && stickyColumns) {
      // @ts-expect-error - TS2488 - Type 'HTMLCollection' must have a '[Symbol.iterator]()' method that returns an iterator.
      const colWidths = [...rowRef.current.children].map((item) => item.clientWidth);
      setColumnWidths(colWidths);
    }
  }, [stickyColumns]);

  useEffect(() => {
    if (expandedControlled !== undefined && isExpanded !== expandedControlled) {
      setIsExpanded(expandedControlled);
    }
  }, [isExpanded, setIsExpanded, expandedControlled]);

  const renderCellWithAdjustedIndex = (child: ReactNode, index: number) => {
    // Account for initial expandable column
    const adjustedIndex = index + 1;
    const shouldBeSticky = stickyColumns
      ? stickyColumns >= 0 && adjustedIndex < stickyColumns
      : false;
    const shouldHaveShadow = stickyColumns ? stickyColumns - 1 === adjustedIndex : false;
    const previousWidths = columnWidths.slice(0, adjustedIndex);
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
    <Fragment>
      {/* @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLTableRowElement | null | undefined>' is not assignable to type 'LegacyRef<HTMLTableRowElement> | undefined'. */}
      <tr ref={rowRef} className={rowStyle}>
        <TableCell
          previousTotalWidth={0}
          shouldBeSticky={stickyColumns ? stickyColumns > 0 : false}
        >
          <IconButton
            accessibilityControls={id}
            accessibilityExpanded={isExpanded}
            accessibilityLabel={isExpanded ? accessibilityCollapseLabel : accessibilityExpandLabel}
            icon={isExpanded ? 'arrow-up' : 'arrow-down'}
            iconColor="darkGray"
            onClick={({ event }) => {
              if (expandedControlled === undefined) {
                setIsExpanded((value) => !value);
              }
              onExpand?.({ event, expanded: isExpanded });
            }}
            size="xs"
          />
        </TableCell>
        {/* This needs to be fixed for children wrapped in React.Fragment when sticky columns are present */}
        {Number(stickyColumns) > 0 ? Children.map(children, renderCellWithAdjustedIndex) : children}
      </tr>
      {isExpanded ? (
        <tr id={id}>
          {/* + 1 is added to colSpan to account for the icon button cell */}
          <td className={styles.drawer} colSpan={getChildrenCount(children) + 1}>
            <Box padding={6}>{expandedContents}</Box>
          </td>
        </tr>
      ) : null}
    </Fragment>
  );
}

TableRowExpandable.displayName = 'Table.RowExpandable';
