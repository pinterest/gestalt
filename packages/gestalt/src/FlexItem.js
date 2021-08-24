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
  flexBasis?: string | number,
  minWidth?: Dimension,
|};

const allowedProps = ['alignSelf', 'children', 'flex', 'flexBasis', 'minWidth'];

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

FlexItem.displayName = 'Flex.Item';

FlexItem.propTypes = {
  alignSelf: AlignSelfPropType,
  children: PropTypes.node.isRequired,
  flex: FlexPropType,
  flexBasis: (PropTypes.oneOf([PropTypes.string, PropTypes.number]): React$PropType$Primitive<
    string | number,
  >),
  minWidth: DimensionPropType,
};
