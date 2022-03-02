// @flow strict
import { type Node } from 'react';
import styles from './Divider.css';

/**
 * [Divider](https://gestalt.pinterest.systems/divider) is a light gray 1px horizontal or vertical line which groups and divides content in lists and layouts.
 *
 * ![Divider light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Divider%20%230.png)
 * ![Divider dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/Divider-dark%20%230.png)
 *
 */
export default function Divider(): Node {
  return <hr className={styles.divider} />;
}
