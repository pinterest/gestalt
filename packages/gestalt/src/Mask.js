// @flow strict
import { type Node } from 'react';
import cx from 'classnames';
import styles from './Mask.css';
import getRoundingClassName from './getRoundingClassName.js';

type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle';

type Props = {|
  /**
   * The content to be masked.
   */
  children?: Node,
  /**
   * Use numbers for pixels: height={100} and strings for percentages: height="100%".
   */
  height?: number | string,
  /**
   * Specifies the corner radius to apply. See the [Rounding example](https://gestalt.pinterest.systems/mask#roundingCombinations) for more details.
   */
  rounding?: Rounding,
  /**
   * Applies a wash to provide contrast when the masked content is nearly white. See the [Wash example](https://gestalt.pinterest.systems/mask#wash) for more details.
   */
  wash?: boolean,
  /**
   * Use numbers for pixels: width={100} and strings for percentages: width="100%".
   */
  width?: number | string,
  /**
   * Mask applies the style `will-change: transform` by default as a performance optimization. In certain specific scenarios, this can be problematic. This prop can be used to turn off that optimization. See the [willChangeTransform example](https://gestalt.pinterest.systems/mask#willChangeTransform) for more details.
   */
  willChangeTransform?: boolean,
|};

/**
 * [Mask](https://gestalt.pinterest.systems/mask) is used to display content in a specific shape.
 */
export default function Mask({
  children,
  rounding = 0,
  width,
  height,
  willChangeTransform = true,
  wash = false,
}: Props): Node {
  return (
    <div
      className={cx(styles.Mask, getRoundingClassName(rounding), {
        [styles.willChangeTransform]: willChangeTransform,
      })}
      style={{ width, height }}
    >
      {children}
      {wash && <div className={styles.wash} />}
    </div>
  );
}
