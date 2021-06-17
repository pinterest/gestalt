// @flow strict
import type { Node } from 'react';
import styles from './Table.css';

type Props = {|
  children: Node,
|};

/**
 * https://gestalt.pinterest.systems/Table
 */
export default function TableBody(props: Props): Node {
  return <tbody className={styles.tbody}>{props.children}</tbody>;
}
