// @flow strict
import React, {
  Children,
  cloneElement,
  Fragment,
  type Node,
  useEffect,
  useRef,
  useState,
} from 'react';
import cx from 'classnames';
import styles from './Table.css';
import Box from './Box.js';
import IconButton from './IconButton.js';
import TableCell from './TableCell.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import { useTableContext } from './contexts/TableContext.js';

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
  const { stickyColumns } = useTableContext();
  const rowRef = useRef();
  const [columnWidths, setColumnWidths] = useState([]);

  const handleButtonClick = ({ event }) => {
    setExpanded(!expanded);
    if (onExpand) {
      onExpand({ event, expanded });
    }
  };

  useEffect(() => {
    if (rowRef?.current && stickyColumns) {
      const colWidths = [...rowRef.current.children].map((item) => item.clientWidth);
      setColumnWidths(colWidths);
    }
  }, [stickyColumns]);

  const renderCellWithAdjustedIndex = (child, index) => {
    const adjustedIndex = index + 1;
    const shouldBeSticky = stickyColumns >= 0 && adjustedIndex < stickyColumns;
    const shouldHaveShadow = stickyColumns - 1 === adjustedIndex;
    const previousWidths = columnWidths.slice(0, adjustedIndex);
    const previousTotalWidth =
      previousWidths.length > 0 ? previousWidths.reduce((a, b) => a + b) : 0;
    return cloneElement(child, { shouldBeSticky, previousTotalWidth, shouldHaveShadow });
  };

  return (
    <Fragment>
      <tr className={cs} ref={rowRef}>
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
        {stickyColumns > 0 ? Children.map(props.children, renderCellWithAdjustedIndex) : children}
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
