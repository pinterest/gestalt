// @flow strict
import type { Node as $IMPORTED_TYPE$_Node } from "react";import { type Node, Children, cloneElement, Fragment, useEffect, useRef, useState } from 'react';
import styles from './Table.css';
import Box from './Box.js';
import IconButton from './IconButton.js';
import TableCell from './TableCell.js';
import { useTableContext } from './contexts/TableContext.js';
import getChildrenCount from './Table/getChildrenCount.js';

type Props = {|
  /**
   * Supply a short, descriptive label for screen-readers as a text alternative to the expand button.
   */
  accessibilityExpandLabel: string,
  /**
   * Supply a short, descriptive label for screen-readers as a text alternative to the collapse button. Accessibility: It populates  `aria-label` on the `<button>` element for the collapse button.
   */
  accessibilityCollapseLabel: string,
  /**
   * Must be instances of Table.Cell. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
   */
  children: Node,
  /**
   * When passed Row.TableRowExpandable becomes a controlled component. If not passed, it stays uncontrolled. See the [controlled/uncontrolled Table.RowExpandable section](https://gestalt.pinterest.systems/web/table#ControlledUncontrolled-Table.RowExpandable) to learn more.
   */
  expanded?: boolean,
  /**
   * The contents to show and/or hide on an expandable row. Required when using Table.RowExpandable as a controlled component. See the [controlled/uncontrolled Table.RowExpandable section](https://gestalt.pinterest.systems/web/table#ControlledUncontrolled-Table.RowExpandable) to learn more.
   */
  expandedContents: Node,
  /**
   * Callback fired when the expand button component is clicked.
   */
  onExpand?: ({|
    event:
      | SyntheticMouseEvent<HTMLButtonElement>
      | SyntheticKeyboardEvent<HTMLButtonElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
    expanded: boolean,
  |}) => void,
  /**
   * Sets the background color on hover over the row.
   */
  hoverStyle?: 'gray' | 'none',
  /**
   * Unique id for Table.RowExpandable.
   */
  id: string,
|};

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
}: Props): Node {
  const { stickyColumns } = useTableContext();
  const rowRef = useRef();
  const [columnWidths, setColumnWidths] = useState([]);
  const [isExpanded, setIsExpanded] = useState(expandedControlled ?? false);

  useEffect(() => {
    if (rowRef?.current && stickyColumns) {
      const colWidths = [...rowRef.current.children].map((item) => item.clientWidth);
      setColumnWidths(colWidths);
    }
  }, [stickyColumns]);

  useEffect(() => {
    if (expandedControlled !== undefined && isExpanded !== expandedControlled) {
      setIsExpanded(expandedControlled);
    }
  }, [isExpanded, setIsExpanded, expandedControlled]);

  const renderCellWithAdjustedIndex = (child: $IMPORTED_TYPE$_Node, index: number) => {
    // Account for initial expandable column
    const adjustedIndex = index + 1;
    const shouldBeSticky = stickyColumns
      ? stickyColumns >= 0 && adjustedIndex < stickyColumns
      : false;
    const shouldHaveShadow = stickyColumns ? stickyColumns - 1 === adjustedIndex : false;
    const previousWidths = columnWidths.slice(0, adjustedIndex);
    const previousTotalWidth =
      previousWidths.length > 0 ? previousWidths.reduce((a, b) => a + b) : 0;
    return cloneElement(child, { shouldBeSticky, previousTotalWidth, shouldHaveShadow });
  };

  return (
    <Fragment>
      <tr className={hoverStyle === 'gray' ? styles.hoverShadeGray : null} ref={rowRef}>
        <TableCell
          shouldBeSticky={stickyColumns ? stickyColumns > 0 : false}
          previousTotalWidth={0}
        >
          <IconButton
            accessibilityExpanded={isExpanded}
            accessibilityControls={id}
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
