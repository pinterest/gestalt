// @flow strict
import React, { type Node, useState } from 'react';
import cx from 'classnames';
import styles from './Table.css';
import Box from './Box.js';
import IconButton from './IconButton.js';

type Props = {|
  accessibilityExpandLabel: string,
  accessibilityCollapseLabel: string,
  children: Node,
  hoverStyle?: 'gray' | 'none',
  expandedContents: Node,
|};

export default function TableRowExpandable(props: Props): Node {
  const {
    accessibilityCollapseLabel,
    accessibilityExpandLabel,
    children,
    expandedContents,
  } = props;
  const [expanded, setExpanded] = useState(false);
  const hoverStyle = props.hoverStyle || 'gray';
  const cs = hoverStyle === 'gray' ? cx(styles.hoverShadeGray) : null;

  return (
    <>
      <tr className={cs}>
        <td>
          <IconButton
            accessibilityLabel={
              expanded ? accessibilityCollapseLabel : accessibilityExpandLabel
            }
            icon={expanded ? 'arrow-up' : 'arrow-down'}
            iconColor="darkGray"
            onClick={() => setExpanded(!expanded)}
            size="xs"
          />
        </td>
        {children}
      </tr>
      {expanded && (
        <tr>
          <td colSpan={React.Children.count(children) + 1}>
            <Box padding={6}>{expandedContents}</Box>
          </td>
        </tr>
      )}
    </>
  );
}
