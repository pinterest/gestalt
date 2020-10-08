// @flow strict
import React, { type Node, useState } from 'react';
import cx from 'classnames';
import styles from './Table.css';
import Box from './Box.js';
import IconButton from './IconButton.js';

type Props = {|
  children: Node,
  hoverStyle?: 'gray' | 'none',
  expandedContents: Node,
|};

export default function TableRowExpandable(props: Props): Node {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHover] = useState(false);
  const handleHover: (isHovered: boolean) => void = (isHovered: boolean) =>
    setHover(isHovered);
  const hoverStyle = props.hoverStyle || 'gray';
  const cs =
    hovered && hoverStyle === 'gray'
      ? cx(styles.hoverShadeGray)
      : cx(styles.hoverNone);

  return (
    <>
      <tr
        className={cs}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <td>
          <IconButton
            accessibilityLabel=""
            icon={expanded ? 'arrow-up' : 'arrow-down'}
            iconColor="darkGray"
            onClick={() => setExpanded(!expanded)}
          />
        </td>
        {props.children}
      </tr>
      {expanded && (
        <tr>
          <td colSpan={Object.keys(props.children).length}>
            <Box>{props.expandedContents}</Box>
          </td>
        </tr>
      )}
    </>
  );
}
