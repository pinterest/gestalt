// @flow strict
import { type Node } from 'react';
import { buildStyles } from './boxTransforms.js';
import styles from './Flex.css';
import { type AlignSelf, type Dimension, type Flex } from './boxTypes.js';

export type Props = {|
  alignSelf?: AlignSelf,
  children?: Node,
  flex?: Flex,
  flexBasis?: string | number,
  minWidth?: Dimension,
|};

const allowedProps = ['alignSelf', 'children', 'flex', 'flexBasis', 'minWidth'];

/**
 * https://gestalt.pinterest.systems/flex
 */
export default function FlexItem(props: Props): Node {
  const { passthroughProps, propsStyles } = buildStyles<Props>({
    baseStyles: styles.FlexItem,
    props,
    allowlistProps: allowedProps,
  });

  return <div {...passthroughProps} {...propsStyles} />;
}

FlexItem.displayName = 'Flex.Item';
