// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import styles from './Pulsar.css';

type Props = {|
  /**
   * Used to hide the element. See the [paused variant](https://gestalt.pinterest.systems/web/pulsar#Paused) for more details.
   */
  paused?: boolean,
  /**
   * The size of the element in pixels. See the [size variant](https://gestalt.pinterest.systems/web/pulsar#Size) for more details.
   */
  size?: number,
|};

/**
 * [Pulsar](https://gestalt.pinterest.systems/web/pulsar ) brings focus to a specific element on the screen, acting like "training wheels" to guide people towards the intended way to perform the action. Pulsar is used in isolation or combination with other education components for more instruction.
 *
 * ![Pulsar light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Pulsar.spec.mjs-snapshots/Pulsar-chromium-darwin.png)
 * ![Pulsar dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Pulsar-dark.spec.mjs-snapshots/Pulsar-dark-chromium-darwin.png)
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
