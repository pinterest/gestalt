// @flow strict
import type { Node } from 'react';
import PropTypes from 'prop-types';
import { buildStyles } from './boxTransforms.js';
import styles from './Flex.css';
import {
  AlignSelfPropType,
  DimensionPropType,
  FlexPropType,
  type AlignSelf,
  type Dimension,
  type Flex,
} from './boxTypes.js';

export type Props = {|
  alignSelf?: AlignSelf,
  children?: Node,
  flex?: Flex,
  minWidth?: Dimension,
|};

const allowedProps = ['alignSelf', 'children', 'flex', 'minWidth'];

export default function FlexItem(props: Props): Node {
  const { passthroughProps, propsStyles } = buildStyles<Props>({
    baseStyles: styles.FlexItem,
    props,
    allowlistProps: allowedProps,
  });

  return <div {...passthroughProps} {...propsStyles} />;
}

FlexItem.displayName = 'Flex.Item';

FlexItem.propTypes = {
  alignSelf: AlignSelfPropType,
  children: PropTypes.node.isRequired,
  flex: FlexPropType,
  minWidth: DimensionPropType,
};
