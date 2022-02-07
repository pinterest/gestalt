// @flow strict
import type { Node } from 'react';

import { useState } from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import TableHeaderCell from './TableHeaderCell.js';
import TapArea from './TapArea.js';

type Props = {|
  /**
   * The content of the table cell.
   */
  children: Node,
  /**
   * `colSpan` defines the number of columns a cell should span.
   */
  colSpan?: number,
  /**
   * Callback fired when the sort button component is clicked.
   */
  onSortChange: ({|
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>,
    dangerouslyDisableOnNavigation: () => void,
  |}) => void,
  /**
   * Private prop required for sticky columns
   */
  previousTotalWidth?: number,
  /**
   * `rowSpan` defines the number of rows a cell should span.
   */
  rowSpan?: number,
  /**
   * The scope attribute specifies whether a header cell is a header for a column, row, or group of columns or rows. The scope attribute has no visual effect in ordinary web browsers, but can be used by screen readers.
   */
  scope?: 'col' | 'colgroup' | 'row' | 'rowgroup',
  /**
   * Private prop required for sticky columns
   */
  shouldBeSticky?: boolean,
  /**
   * Private prop required for sticky columns
   */
  shouldHaveShadow?: boolean,
  /**
   * Sets the sorting direction: `sortOrder="asc"` is ascending (A to Z) and `sortOrder="desc"` is descending (Z to A):
   */
  sortOrder: 'asc' | 'desc',
  /**
   * Disables the sorting functionality for a column.
   */
  status: 'active' | 'inactive',
|};

/**
 * Subcomponent of [Table](https://gestalt.pinterest.systems/table).
 * Use [Table.SortableHeaderCell](https://gestalt.pinterest.systems/table#Table.SortableHeaderCellProps) to define a header cell with sorting functionality in Table.
 */
export default function TableSortableHeaderCell({
  children,
  colSpan,
  scope,
  rowSpan,
  status,
  sortOrder,
  onSortChange,
  shouldBeSticky,
  previousTotalWidth,
  shouldHaveShadow,
}: Props): Node {
  const [isFocused, setFocused] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const shouldShowIcon = status === 'active' || isHovered || isFocused;
  const visibility = shouldShowIcon ? 'visible' : 'hidden';

  return (
    <TableHeaderCell
      colSpan={colSpan}
      rowSpan={rowSpan}
      scope={scope}
      shouldBeSticky={shouldBeSticky}
      shouldHaveShadow={shouldHaveShadow}
      previousTotalWidth={previousTotalWidth}
    >
      <Box display="inlineBlock">
        <TapArea
          fullWidth={false}
          onTap={onSortChange}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <Box display="flex" alignItems="center">
            {children}
            <Box
              marginStart={2}
              dangerouslySetInlineStyle={{
                __style: { visibility },
              }}
            >
              <Icon
                accessibilityLabel=""
                icon={
                  status === 'active' && sortOrder === 'asc' ? 'sort-ascending' : 'sort-descending'
                }
                color={status === 'active' ? 'darkGray' : 'gray'}
              />
            </Box>
          </Box>
        </TapArea>
      </Box>
    </TableHeaderCell>
  );
}
