// @flow strict
import * as React from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import TableHeaderCell from './TableHeaderCell.js';
import Touchable from './Touchable.js';

type Props = {|
  children: React.Node,
  colSpan?: number,
  onSortChange: ({
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>,
  }) => void,
  rowSpan?: number,
  scope?: 'col' | 'colgroup' | 'row' | 'rowgroup',
  sortOrder: 'asc' | 'desc',
  status: 'active' | 'inactive',
|};

export default function TableSortableHeaderCell(props: Props) {
  const {
    children,
    colSpan,
    scope,
    rowSpan,
    status,
    sortOrder,
    onSortChange,
  } = props;

  const [isFocused, setFocused] = React.useState(false);
  const [isHovered, setHovered] = React.useState(false);

  const shouldShowIcon = status === 'active' || isHovered || isFocused;
  const visibility = shouldShowIcon ? 'visible' : 'hidden';

  return (
    <TableHeaderCell colSpan={colSpan} rowSpan={rowSpan} scope={scope}>
      <Touchable
        onTouch={onSortChange}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <Box display="flex">
          {children}
          <Box
            marginLeft={2}
            dangerouslySetInlineStyle={{
              __style: { visibility },
            }}
          >
            <Icon
              accessibilityLabel=""
              icon={
                status === 'active' && sortOrder === 'asc'
                  ? 'sort-ascending'
                  : 'sort-descending'
              }
              color={status === 'active' ? 'darkGray' : 'gray'}
            />
          </Box>
        </Box>
      </Touchable>
    </TableHeaderCell>
  );
}
