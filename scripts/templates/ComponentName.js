// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import styles from './ComponentName.css';

type Props = {|
  /**
   * Prop description.
   */
  accessibilityLabel?: string,
|};

/**
 * [ComponentName](https://gestalt.pinterest.systems/web/componentname) component should be used for ... on the page.
 * ![ComponentName light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ComponentName.spec.mjs-snapshots/ComponentName-chromium-darwin.png)
 * ![ComponentName dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ComponentName-dark.spec.mjs-snapshots/ComponentName-dark-chromium-darwin.png)
 */
export default function ComponentName({ accessibilityLabel }: Props): Node {
  return (
    <Box aria-label={accessibilityLabel}>
      <div className={styles.customClass} />
    </Box>
  );
}
