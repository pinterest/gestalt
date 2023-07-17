// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import styles from './DensityProvider.css';

type Props = {|
  /**
   * Prop description.
   */
  accessibilityLabel?: string,
|};

/**
 * [DensityProvider](https://gestalt.pinterest.systems/web/densityprovider) component should be used for ... on the page.
 * ![DensityProvider light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DensityProvider.spec.mjs-snapshots/DensityProvider-chromium-darwin.png)
 * ![DensityProvider dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DensityProvider-dark.spec.mjs-snapshots/DensityProvider-dark-chromium-darwin.png)
 */
export default function DensityProvider({ accessibilityLabel }: Props): Node {
  return (
    <Box aria-label={accessibilityLabel}>
      <div className={styles.customClass} />
    </Box>
  );
}
