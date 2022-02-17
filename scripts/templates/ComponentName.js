// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import styles from './ComponentName.css';

type Props = {|
  /**
   * Prop description.
   *
   * Link: https://gestalt.pinterest.systems/componentname#prop
   */
  accessibilityLabel?: string,
|};

/**
 * [ComponentName] https://gestalt.pinterest.systems/componentname component should be used for ... on the page.
 * ![ComponentName light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/ComponentName-lightName%20%230.png)
 * ![ComponentName dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/ComponentName-dark%20%230.png)
 */
export default function ComponentName({ accessibilityLabel }: Props): Node {
  return (
    <Box aria-label={accessibilityLabel}>
      <div className={styles.customClass} />
    </Box>
  );
}
