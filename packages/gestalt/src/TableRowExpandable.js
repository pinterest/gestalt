// @flow strict
import React, { Children, Fragment, type Node, useState, useContext } from 'react';
import cx from 'classnames';
import styles from './Table.css';
import Box from './Box.js';
import IconButton from './IconButton.js';
import TableCell from './TableCell.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import TableContext from './TableContextProvider.js';

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
  const { stickyColumns } = useContext(TableContext);

  const handleButtonClick = ({ event }) => {
    setExpanded(!expanded);
    if (onExpand) {
      onExpand({ event, expanded });
    }
  };

  return (
    <Fragment>
      <tr className={cs}>
        <TableCell shouldBeSticky={stickyColumns > 0} previousTotalWidth={0}>
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
          <td colSpan={Children.count(children) + 1}>
            <Box padding={6}>{expandedContents}</Box>
          </td>
        </tr>
      )}
    </Fragment>
  );
}
