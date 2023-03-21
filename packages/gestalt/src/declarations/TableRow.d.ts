import type { Node } from 'react';
type Props = {
  /**
   * Must be instances of Table.Cell, Table.HeaderCell, or Table.SortableHeaderCell components. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
   */
  children: Node;
};
/**
 * Use [Table.Row](https://gestalt.pinterest.systems/web/table#Table.Row) to define a row in Table.
 */
declare function TableRow({ children }: Props): Node;
declare namespace TableRow {
  var displayName: string;
}
export default TableRow;
