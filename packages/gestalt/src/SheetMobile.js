// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import styles from './SheetMobile.css';

type Props = {|
  /**
   * Prop description.
   */
  accessibilityLabel?: string,
|};

/**
 * [SheetMobile] https://gestalt.pinterest.systems/web/sheetmobile component should be used for ... on the page.
 * ![SheetMobile light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SheetMobile.spec.mjs-snapshots/SheetMobile-chromium-darwin.png)
 * ![SheetMobile dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SheetMobile-dark.spec.mjs-snapshots/SheetMobile-dark-chromium-darwin.png)
 */
export default function SheetMobile({ accessibilityLabel }: Props): Node {
  return (
    <Box aria-label={accessibilityLabel}>
      <div className={styles.customClass} />
    </Box>
  );
}
