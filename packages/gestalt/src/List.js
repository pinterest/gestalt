// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import styles from './List.css';

type Props = {|
  /**
   * Prop description.
   */
  accessibilityLabel?: string,
|};

/**
 * [List] https://gestalt.pinterest.systems/web/list component should be used for ... on the page.
 * ![List light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/List.spec.mjs-snapshots/List-chromium-darwin.png)
 * ![List dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/List-dark.spec.mjs-snapshots/List-dark-chromium-darwin.png)
 */
export default function List({ accessibilityLabel }: Props): Node {
  return (
    <Box aria-label={accessibilityLabel}>
      <div className={styles.customClass} />
    </Box>
  );
}
