// @flow strict
import { type Node } from 'react';
import styles from './Table.css';

type Props = {|
  /**
   * Must be instances of Table.Row and/or Table.RowExpandable components. See the [Subcomponent section](https://gestalt.pinterest.systems/table#Subcomponents) to learn more.
   */
  children: Node,
|};

/**
 * Use [Table.Body](https://gestalt.pinterest.systems/table#Table.Body) to group the body content in Table.
 */
export default function TableBody({ children }: Props): Node {
  return <tbody className={styles.tbody}>{children}</tbody>;
}

TableBody.displayName = 'Table.Body';
