import type { Node } from "react";
import { buildStyles } from "./boxTransforms";
import styles from "./Flex.css";
import type { AlignSelf, Dimension, Flex } from "./boxTypes";
import "./boxTypes";
export type Props = {
  alignSelf?: AlignSelf;
  children?: Node;
  flex?: Flex;
  flexBasis?: string | number;
  minWidth?: Dimension;
};
const allowedProps = ["alignSelf", "children", "flex", "flexBasis", "minWidth"];
/**
 * https://gestalt.pinterest.systems/Flex
 */

export default function FlexItem(props: Props): Node {
  const { passthroughProps, propsStyles } = buildStyles<Props>({
    baseStyles: styles.FlexItem,
    props,
    allowlistProps: allowedProps,
  });
  return <div {...passthroughProps} {...propsStyles} />;
}
FlexItem.displayName = "Flex.Item";