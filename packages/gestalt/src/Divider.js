// @flow strict
import type { Node } from 'react';
import styles from './Divider.css';

/**
 * [Divider](https://gestalt.pinterest.systems/divider) is a light gray 1px horizontal or vertical line which groups and divides content in lists and layouts.
 */
export default function Divider(): Node {
  return <hr className={styles.divider} />;
}
