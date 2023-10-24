// @flow strict
import { type Node, useState } from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import TableHeaderCell from './TableHeaderCell.js';
import TapArea from './TapArea.js';

type Props = {
  /**
   * Sets the alignment of the cell content and reverses the sort icon position.
   */
  align?: 'start' | 'end',
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
  onSortChange: ({
    event: SyntheticMouseEvent<HTMLDivElement> | SyntheticKeyboardEvent<HTMLDivElement>,
  }) => void,
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
};

function SortIcon({
  align,
  status,
  sortOrder,
  visibility,
}: {
  align: 'start' | 'end',
  status: 'active' | 'inactive',
  sortOrder: 'asc' | 'desc',
  visibility: 'visible' | 'hidden',
}) {
  return (
    <Box
      marginStart={align === 'start' ? 2 : undefined}
      marginEnd={align === 'end' ? 2 : undefined}
      dangerouslySetInlineStyle={{
        __style: { visibility },
      }}
    >
      <Icon
        accessibilityLabel=""
        icon={status === 'active' && sortOrder === 'asc' ? 'sort-ascending' : 'sort-descending'}
        color={status === 'active' ? 'default' : 'subtle'}
      />
    </Box>
  );
}

/**
 * Use [Table.SortableHeaderCell](https://gestalt.pinterest.systems/web/table#Table.SortableHeaderCell) to define a header cell with sorting functionality in Table.
 */
export default function TableSortableHeaderCell({
  align = 'start',
  children,
  colSpan,
  onSortChange,
  previousTotalWidth,
  rowSpan,
  scope,
  shouldBeSticky,
  shouldHaveShadow,
  status,
  sortOrder,
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
      <Box display="inlineBlock" width="100%">
        <TapArea
          fullWidth={false}
          onTap={({ event }) => {
            setFocused(false);
            onSortChange({ event });
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          {/** Ideally, we would reverse the flex with row-reverse, but row-reverse will deviate from the DOM structure causing an accessibility issue in the order things are read */}
          <Box display="flex" alignItems="center" justifyContent={align}>
            {align === 'end' && (
              <SortIcon
                align={align}
                status={status}
                sortOrder={sortOrder}
                visibility={visibility}
              />
            )}
            {children}
            {align === 'start' && (
              <SortIcon
                align={align}
                status={status}
                sortOrder={sortOrder}
                visibility={visibility}
              />
            )}
          </Box>
        </TapArea>
      </Box>
    </TableHeaderCell>
  );
}

TableSortableHeaderCell.displayName = 'Table.SortableHeaderCell';
