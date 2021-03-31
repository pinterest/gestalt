// @flow strict
import React, {
  Children,
  Fragment,
  type Node,
  useState,
  useContext,
  useEffect,
  cloneElement,
} from 'react';
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
  const rowRef = React.useRef();
  const [columnWidths, setColumnWidths] = useState([]);

  const handleButtonClick = ({ event }) => {
    setExpanded(!expanded);
    if (onExpand) {
      onExpand({ event, expanded });
    }
  };

  useEffect(() => {
    if (rowRef && rowRef.current && stickyColumns) {
      const colWidths = [];
      const tableRowChildrenArray = [...rowRef.current.children];
      tableRowChildrenArray.forEach((child) => {
        colWidths.push(child.clientWidth);
      });
      setColumnWidths(colWidths);
    }
  }, [rowRef, stickyColumns]);

  const renderCellsWithIndex = () => {
    const cells = [];
    const tableRowChildrenArray = Children.toArray(props.children);

    tableRowChildrenArray.forEach((child, index) => {
      // Account for the extra first column
      const adjustedIndex = index + 1;
      const shouldBeSticky = stickyColumns >= 0 && adjustedIndex < stickyColumns;
      const shouldHaveShadow = stickyColumns - 1 === adjustedIndex;
      const previousWidths = columnWidths.slice(0, adjustedIndex);
      const previousTotalWidth =
        previousWidths.length > 0 ? previousWidths.reduce((a, b) => a + b) : 0;
      cells.push(cloneElement(child, { shouldBeSticky, previousTotalWidth, shouldHaveShadow }));
    });
    return cells;
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
        {stickyColumns > 0 ? renderCellsWithIndex() : children}
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
