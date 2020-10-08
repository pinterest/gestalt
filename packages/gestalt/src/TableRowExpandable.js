// @flow strict
import React, { type Node, useState } from 'react';
import cx from 'classnames';
import styles from './Table.css';
import Box from './Box.js';
import IconButton from './IconButton.js';
import TableCell from './TableCell.js';

type Props = {|
  accessibilityExpandLabel: string,
  accessibilityCollapseLabel: string,
  children: Node,
  expandedContents: Node,
  hoverStyle?: 'gray' | 'none',
  id: string,
|};

export default function TableRowExpandable(props: Props): Node {
  const {
    accessibilityCollapseLabel,
    accessibilityExpandLabel,
    children,
    expandedContents,
    id,
  } = props;
  const [expanded, setExpanded] = useState(false);
  const hoverStyle = props.hoverStyle || 'gray';
  const cs = hoverStyle === 'gray' ? cx(styles.hoverShadeGray) : null;

  return (
    <>
      <tr className={cs}>
        <TableCell>
          <IconButton
            accessibilityExpanded={expanded}
            accessibilityControls={id}
            accessibilityLabel={
              expanded ? accessibilityCollapseLabel : accessibilityExpandLabel
            }
            icon={expanded ? 'arrow-up' : 'arrow-down'}
            iconColor="darkGray"
            onClick={() => setExpanded(!expanded)}
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
