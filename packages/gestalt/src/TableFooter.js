// @flow strict
import { type Node } from 'react';

type Props = {|
  /**
   * Must be instances of Table.Row and/or Table.RowExpandable components. See the [Subcomponent section](https://gestalt.pinterest.systems/table#Subcomponents) to learn more.
   */
  children: Node,
|};

/**
 * Use [Table.Footer](https://gestalt.pinterest.systems/table#Table.Footer) to group the footer content in Table.
 */
export default function TableFooter({ children }: Props): Node {
  return <tfoot>{children}</tfoot>;
}

TableFooter.displayName = 'Table.Footer';
