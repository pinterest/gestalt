import type { Node } from "react";
import { useState } from "react";
import Box from "./Box";
import Icon from "./Icon";
import TableHeaderCell from "./TableHeaderCell";
import TapArea from "./TapArea";
import type { AbstractEventHandler } from "./AbstractEventHandler";
import "./AbstractEventHandler";
type Props = {
  children: Node;
  colSpan?: number;
  onSortChange: AbstractEventHandler<
    | React.MouseEvent<HTMLDivElement>
    | React.KeyboardEvent<HTMLDivElement>
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>,
    {
      dangerouslyDisableOnNavigation: () => void;
    }
  >;
  previousTotalWidth?: number;
  rowSpan?: number;
  scope?: "col" | "colgroup" | "row" | "rowgroup";
  shouldBeSticky?: boolean;
  shouldHaveShadow?: boolean;
  sortOrder: "asc" | "desc";
  status: "active" | "inactive";
};
/**
 * https://gestalt.pinterest.systems/Table
 */

export default function TableSortableHeaderCell(props: Props): Node {
  const {
    children,
    colSpan,
    scope,
    rowSpan,
    status,
    sortOrder,
    onSortChange,
    shouldBeSticky,
    previousTotalWidth,
    shouldHaveShadow,
  } = props;
  const [isFocused, setFocused] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const shouldShowIcon = status === "active" || isHovered || isFocused;
  const visibility = shouldShowIcon ? "visible" : "hidden";
  return (
    <TableHeaderCell
      colSpan={colSpan}
      rowSpan={rowSpan}
      scope={scope}
      shouldBeSticky={shouldBeSticky}
      shouldHaveShadow={shouldHaveShadow}
      previousTotalWidth={previousTotalWidth}
    >
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
                __style: {
                  visibility,
                },
              }}
            >
              <Icon
                accessibilityLabel=""
                icon={
                  status === "active" && sortOrder === "asc"
                    ? "sort-ascending"
                    : "sort-descending"
                }
                color={status === "active" ? "darkGray" : "gray"}
              />
            </Box>
          </Box>
        </TapArea>
      </Box>
    </TableHeaderCell>
  );
}