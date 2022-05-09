// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import styles from './SlimBanner.css';

type Props = {|
  /**
   * Prop description.
   *
   * Link: https://gestalt.pinterest.systems/slimbanner#prop
   */
  accessibilityLabel?: string,
|};

/**
 * [SlimBanner] https://gestalt.pinterest.systems/slimbanner component should be used for ... on the page.
 * ![SlimBanner light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/SlimBanner-lightName%20%230.png)
 * ![SlimBanner dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/SlimBanner-dark%20%230.png)
 */
export default function SlimBanner({ accessibilityLabel }: Props): Node {
  return (
    <Box aria-label={accessibilityLabel}>
      <div className={styles.customClass} />
    </Box>
  );
}
