// @flow strict
import type { Node } from 'react';
import Box from './Box.js';
import styles from './Pulsar.css';

type Props = {|
  paused?: boolean,
  size?: number,
|};

/**
 * https://gestalt.pinterest.systems/pulsar
 */
export default function Pulsar({ paused, size = 136 }: Props): Node {
  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: {
          animationIterationCount: paused ? 0 : 'infinite',
          outline: 'none',
          boxShadow: 'none',
        },
      }}
      display={paused ? 'none' : 'block'}
      height={size}
      position="relative"
      width={size}
    >
      <div className={styles.innerCircle}>
        <div className={styles.outerCircle} />
      </div>
    </Box>
  );
}
