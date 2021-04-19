// @flow strict
import type { Node } from 'react';

import { useState } from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import TableHeaderCell from './TableHeaderCell.js';
import TapArea from './TapArea.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type Props = {|
  children: Node,
  colSpan?: number,
  onSortChange: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLDivElement>
    | SyntheticKeyboardEvent<HTMLDivElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
    {| disableOnNavigation: () => void |},
  >,
  rowSpan?: number,
  scope?: 'col' | 'colgroup' | 'row' | 'rowgroup',
  sortOrder: 'asc' | 'desc',
  status: 'active' | 'inactive',
|};

export default function TableSortableHeaderCell(props: Props): Node {
  const { children, colSpan, scope, rowSpan, status, sortOrder, onSortChange } = props;

  const [isFocused, setFocused] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const shouldShowIcon = status === 'active' || isHovered || isFocused;
  const visibility = shouldShowIcon ? 'visible' : 'hidden';

  return (
    <TableHeaderCell colSpan={colSpan} rowSpan={rowSpan} scope={scope}>
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
