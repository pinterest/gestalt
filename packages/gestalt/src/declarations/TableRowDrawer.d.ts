import type { Node } from 'react';
type Props = {
  /**
   * Must be instances of Table.Cell. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
   */
  children: Node;
  /**
   * The contents within the drawer. See the [Table.RowDrawer implementation](https://gestalt.pinterest.systems/web/table#Table.RowDrawer-implementation) to learn more.
   */
  drawerContents: Node;
  /**
   * Unique id for Table.RowDrawer.
   */
  id: string;
};
/**
 * Use [Table.RowDrawer](https://gestalt.pinterest.systems/web/table#Table.RowDrawer) to define a row drawer to display additional content.
 */
declare function TableRowDrawer({ children, drawerContents, id }: Props): Node;
declare namespace TableRowDrawer {
  var displayName: string;
}
export default TableRowDrawer;
