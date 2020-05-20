// @flow strict
import * as React from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Icon from './Icon.js';
import styles from './Table.css';

type Props = {|
  children: React.Node,
  colSpan?: number,
  onSortChange: ({
    event:
      | SyntheticMouseEvent<HTMLTableCellElement>
      | SyntheticKeyboardEvent<HTMLTableCellElement>,
  }) => void,
  rowSpan?: number,
  scope?: 'col' | 'colgroup' | 'row' | 'rowgroup',
  sortOrder: 'asc' | 'desc',
  status: 'active' | 'inactive',
|};

const SPACE_CHAR_CODE = 32;
const ENTER_CHAR_CODE = 13;

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

  const handleKeyPress = (
    event: SyntheticKeyboardEvent<HTMLTableCellElement>
  ) => {
    if (
      event.charCode === SPACE_CHAR_CODE ||
      event.charCode === ENTER_CHAR_CODE
    ) {
      // Prevent the default action to stop scrolling when space is pressed
      event.preventDefault();
      onSortChange({ event });
    }
  };

  const shouldShowIcon = status === 'active' || isHovered || isFocused;
  const visibility = shouldShowIcon ? 'visible' : 'hidden';

  const classes = classnames(styles.th, styles.pointer, styles.accessibleStyle);

  return (
    <th
      className={classes}
      scope={scope || 'col'}
      colSpan={colSpan}
      rowSpan={rowSpan}
      onClick={event => onSortChange({ event })}
      onKeyPress={handleKeyPress}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex="0"
      role="button"
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
    </th>
  );
}
