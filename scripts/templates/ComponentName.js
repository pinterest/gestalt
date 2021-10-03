// @flow strict
import type { Node } from 'react';
import Box from './Box.js';
import styles from './ComponentName.css';

type Props = {|
  accessibilityLabel?: string,
|};

/**
 * https://gestalt.pinterest.systems/ComponentName
 */
export default function ComponentName({ accessibilityLabel }: Props): Node {
  return (
    <Box aria-label={accessibilityLabel}>
      <div className={styles.customClass} />
    </Box>
  );
}
