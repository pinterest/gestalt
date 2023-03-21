import type { Node } from 'react';
import 'react';
type Props = {
  /**
   * Must be instances of Table.Row and/or Table.RowExpandable components. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
   */
  children: Node;
  /**
   * If true, the table footer will be sticky and the table body will be scrollable above it. See the [sticky footer](https://gestalt.pinterest.systems/web/table#Sticky-header-and-footer) and the [sticky header and columns](https://gestalt.pinterest.systems/web/table#Sticky-header-and-sticky-columns) variants for details.
   */
  sticky?: boolean;
};
/**
 * Use [Table.Footer](https://gestalt.pinterest.systems/web/table#Table.Footer) to group the footer content in Table.
 */
declare function TableFooter({ children, sticky }: Props): Node;
declare namespace TableFooter {
  var displayName: string;
}
export default TableFooter;
