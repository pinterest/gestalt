// @flow strict
import React, { type Node, useState } from 'react';
import cx from 'classnames';
import styles from './Table.css';
import Box from './Box.js';
import IconButton from './IconButton.js';
import TableCell from './TableCell.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type Props = {|
  accessibilityExpandLabel: string,
  accessibilityCollapseLabel: string,
  children: Node,
  expandedContents: Node,
  onExpand?: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>,
    {| expanded: boolean |},
  >,
  hoverStyle?: 'gray' | 'none',
  id: string,
|};

export default function TableRowExpandable(props: Props): Node {
  const {
    accessibilityCollapseLabel,
    accessibilityExpandLabel,
    children,
    expandedContents,
    onExpand,
    id,
  } = props;
  const [expanded, setExpanded] = useState(false);
  const hoverStyle = props.hoverStyle || 'gray';
  const cs = hoverStyle === 'gray' ? cx(styles.hoverShadeGray) : null;

  const handleButtonClick = ({ event }) => {
    setExpanded(!expanded);
    if (onExpand) {
      onExpand({ event, expanded });
    }
  };

  return (
    <>
      <tr className={cs}>
        <TableCell>
          <IconButton
            accessibilityExpanded={expanded}
            accessibilityControls={id}
            accessibilityLabel={expanded ? accessibilityCollapseLabel : accessibilityExpandLabel}
            icon={expanded ? 'arrow-up' : 'arrow-down'}
            iconColor="darkGray"
            onClick={handleButtonClick}
            size="xs"
          />
        </TableCell>
        {children}
      </tr>
      {expanded && (
        <tr id={id}>
          <td colSpan={React.Children.count(children) + 1}>
            <Box padding={6}>{expandedContents}</Box>
          </td>
        </tr>
      )}
    </>
  );
}
