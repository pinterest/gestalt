// @flow strict
import { type Node } from 'react';
import cx from 'classnames';
import styles from './Table.css';

type Props = {
  /**
   * Must be instances of Table.Row and/or Table.RowExpandable components. See the [Subcomponent section](https://gestalt.pinterest.systems/web/table#Subcomponents) to learn more.
   */
  children: Node,
  /**
   * If true, the table footer will be sticky and the table body will be scrollable above it. See the [sticky footer](https://gestalt.pinterest.systems/web/table#Sticky-header-and-footer) and the [sticky header and columns](https://gestalt.pinterest.systems/web/table#Sticky-header-and-sticky-columns) variants for details.
   */
  sticky?: boolean,
};

/**
 * Use [Table.Footer](https://gestalt.pinterest.systems/web/table#Table.Footer) to group the footer content in Table.
 */
export default function TableFooter({ children, sticky }: Props): Node {
  return (
    <tfoot className={cx(!sticky && styles.tfooter, sticky && styles.stickyFooter)}>
      {children}
    </tfoot>
  );
}

TableFooter.displayName = 'Table.Footer';
