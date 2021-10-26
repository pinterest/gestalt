import type { Node } from "react";
import cx from "classnames";
import styles from "./Mask.css";
import getRoundingClassName from "./getRoundingClassName";
type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "circle";
type Props = {
  children?: Node;
  height?: number | string;
  rounding?: Rounding;
  width?: number | string;
  willChangeTransform?: boolean;
  wash?: boolean;
};
/**
 * https://gestalt.pinterest.systems/Mask
 */

export default function Mask(props: Props): Node {
  const {
    children,
    rounding = 0,
    width,
    height,
    willChangeTransform = true,
    wash = false,
  } = props;
  return (
    <div
      className={cx(styles.Mask, getRoundingClassName(rounding), {
        [styles.willChangeTransform]: willChangeTransform,
      })}
      style={{
        width,
        height,
      }}
    >
      {children}
      {wash && <div className={styles.wash} />}
    </div>
  );
}