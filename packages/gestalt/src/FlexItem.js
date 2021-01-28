// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { buildStyles } from './boxTransforms.js';
import styles from './Flex.css';
import { AlignSelfPropType, FlexPropType, type AlignSelf, type Flex } from './boxTypes.js';

export type Props = {|
  alignSelf?: AlignSelf,
  children?: Node,
  flex?: Flex,
|};

const allowedProps = ['alignSelf', 'children', 'flex'];

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
};
