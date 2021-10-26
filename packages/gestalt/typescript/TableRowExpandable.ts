import type { Node } from "react";
import {
  Children,
  cloneElement,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import cx from "classnames";
import styles from "./Table.css";
import Box from "./Box";
import IconButton from "./IconButton";
import TableCell from "./TableCell";
import type { AbstractEventHandler } from "./AbstractEventHandler";
import "./AbstractEventHandler";
import { useTableContext } from "./contexts/TableContext";
type Props = {
  accessibilityExpandLabel: string;
  accessibilityCollapseLabel: string;
  children: Node;
  expandedContents: Node;
  onExpand?: AbstractEventHandler<
    | React.MouseEvent<HTMLButtonElement>
    | React.KeyboardEvent<HTMLButtonElement>
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>,
    {
      expanded: boolean;
    }
  >;
  hoverStyle?: "gray" | "none";
  id: string;
};
/**
 * https://gestalt.pinterest.systems/Table
 */

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
  const hoverStyle = props.hoverStyle || "gray";
  const cs = hoverStyle === "gray" ? cx(styles.hoverShadeGray) : null;
  const { stickyColumns } = useTableContext();
  const rowRef = useRef();
  const [columnWidths, setColumnWidths] = useState([]);

  const handleButtonClick = ({ event }) => {
    setExpanded(!expanded);

    if (onExpand) {
      onExpand({
        event,
        expanded,
      });
    }
  };

  useEffect(() => {
    if (rowRef?.current && stickyColumns) {
      const colWidths = [...rowRef.current.children].map(
        (item) => item.clientWidth
      );
      setColumnWidths(colWidths);
    }
  }, [stickyColumns]);

  const renderCellWithAdjustedIndex = (child, index) => {
    // Account for initial expandable column
    const adjustedIndex = index + 1;
    const shouldBeSticky = stickyColumns
      ? stickyColumns >= 0 && adjustedIndex < stickyColumns
      : false;
    const shouldHaveShadow = stickyColumns
      ? stickyColumns - 1 === adjustedIndex
      : false;
    const previousWidths = columnWidths.slice(0, adjustedIndex);
    const previousTotalWidth =
      previousWidths.length > 0 ? previousWidths.reduce((a, b) => a + b) : 0;
    return cloneElement(child, {
      shouldBeSticky,
      previousTotalWidth,
      shouldHaveShadow,
    });
  };

  return (
    <Fragment>
      <tr className={cs} ref={rowRef}>
        <TableCell
          shouldBeSticky={stickyColumns ? stickyColumns > 0 : false}
          previousTotalWidth={0}
        >
          <IconButton
            accessibilityExpanded={expanded}
            accessibilityControls={id}
            accessibilityLabel={
              expanded ? accessibilityCollapseLabel : accessibilityExpandLabel
            }
            icon={expanded ? "arrow-up" : "arrow-down"}
            iconColor="darkGray"
            onClick={handleButtonClick}
            size="xs"
          />
        </TableCell>
        {Number(stickyColumns) > 0
          ? Children.map(props.children, renderCellWithAdjustedIndex)
          : children}
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