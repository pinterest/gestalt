import type { Node } from 'react';
import 'react';
type Props = {
  /**
   * Must be an instance of Table.Row. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
   */
  children: Node;
  /**
   * Display `visuallyHidden` ensures the component is visually hidden but still is read by screen readers.
   */
  display?: 'tableHeaderGroup' | 'visuallyHidden';
  /**
   * If true, the table header will be sticky and the table body will be scrollable. See the [sticky Header](https://gestalt.pinterest.systems/web/table#Sticky-header-and-footer) and the [sticky header and columns](https://gestalt.pinterest.systems/web/table#Sticky-header-and-sticky-columns) variants for details.
   */
  sticky?: boolean;
};
/**
 * Use [Table.Header](https://gestalt.pinterest.systems/web/table#Table.Header) to group the header content in Table.
 */
declare function TableHeader({ children, display, sticky }: Props): Node;
declare namespace TableHeader {
  var displayName: string;
}
export default TableHeader;
