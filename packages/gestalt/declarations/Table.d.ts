import type { Node } from "react";
declare type Props = {
    /**
     * Must be instances of Table.Header, Table.Body, and/or Table.Footer components. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
     */
    children: Node;
    /**
     * Label for screen readers to announce Table.
     */
    accessibilityLabel: string;
    /**
     * Specify a border width for Table: "sm" is 1px.
     */
    borderStyle?: "sm" | "none";
    /**
     * Use numbers for pixels: `maxHeight={100}` and strings for percentages: `maxHeight="100%"`.
     */
    maxHeight?: number | string;
    /**
     * Specify how many columns from the start of the Table should be sticky when scrolling horizontally. See the [sticky column](https://gestalt.pinterest.systems/web/table#Sticky-Column), [multiple sticky columns](https://gestalt.pinterest.systems/web/table#Multiple-sticky-columns), [sticky header and columns](https://gestalt.pinterest.systems/web/table#Sticky-header-and-sticky-columns), [expandable row with sticky columns](https://gestalt.pinterest.systems/web/table#Table-Row-Expandable-with-Sticky-Columns), and [sortable header cells with sticky columns](https://gestalt.pinterest.systems/web/table#Sortable-header-cells-with-sticky-columns) variants for details.
     */
    stickyColumns?: number | null | undefined;
};
/**
 * [Table](https://gestalt.pinterest.systems/web/table) is a set of structured data that is easy for a user to scan, examine, and compare. Table data is displayed in a grid format and can be used to structure both interactive and static data.
 *
 * ![Table light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Table.spec.mjs-snapshots/Table-chromium-darwin.png)
 *
 */
declare function Table({ accessibilityLabel, borderStyle, children, maxHeight, stickyColumns, }: Props): Node;
declare namespace Table {
    var Body: any;
    var Cell: any;
    var Footer: any;
    var Header: any;
    var HeaderCell: any;
    var Row: any;
    var SortableHeaderCell: any;
    var RowExpandable: any;
    var RowDrawer: any;
}
export default Table;
