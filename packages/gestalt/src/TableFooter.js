// @flow strict
import { type Node } from 'react';

type Props = {|
  /**
   * Must be instances of Table.Row and/or Table.RowExpandable components. See the [Subcomponent section](https://gestalt.pinterest.systems/table#Subcomponents) to learn more.
   */
  children: Node,
|};

/**
 * Subcomponent of [Table](https://gestalt.pinterest.systems/table).
 * Use [Table.Footer](https://gestalt.pinterest.systems/table#Table.FooterProps) to group the footer content in Table.
 */
export default function TableFooter({ children }: Props): Node {
  return <tfoot>{children}</tfoot>;
}
