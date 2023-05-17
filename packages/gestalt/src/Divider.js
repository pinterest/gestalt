// @flow strict
import { type Node } from 'react';
import styles from './Divider.css';

/**
 * [Divider](https://gestalt.pinterest.systems/web/divider) is a light gray 1px horizontal or vertical line which groups and divides content in lists and layouts.
 *
 * ![Divider light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Divider.spec.mjs-snapshots/Divider-chromium-darwin.png)
 * ![Divider dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Divider-dark.spec.mjs-snapshots/Divider-dark-chromium-darwin.png)
 *
 */
// eslint-disable-next-line no-empty-pattern
export default function Divider({}: {||}): Node {
  return <hr className={styles.divider} />;
}
