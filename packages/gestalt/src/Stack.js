// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Stack.css';
import {
  AlignContentPropType,
  AlignItemsPropType,
  AlignSelfPropType,
  DimensionPropType,
  FlexPropType,
  JustifyContentPropType,
  OverflowPropType,
  PaddingPropType,
  type AlignContent,
  type AlignItems,
  type AlignSelf,
  type Dimension,
  type Flex,
  type JustifyContent,
  type Overflow,
  type Padding,
} from './Box.js';

type Props = {|
  alignContent?: AlignContent,
  alignItems?: AlignItems,
  alignSelf?: AlignSelf,
  children?: Node,
  flex?: Flex,
  gap?: Padding,
  height?: Dimension,
  justifyContent?: JustifyContent,
  maxHeight?: Dimension,
  maxWidth?: Dimension,
  minHeight?: Dimension,
  minWidth?: Dimension,
  overflow?: Overflow,
  width?: Dimension,
  wrap?: boolean,
|};

export default function Stack({ children, gap = 0, ...rest }: Props): Node {
  const className = classnames(
    styles.stack,
    styles[`verticalGap${gap}`],
    styles[`verticalGap${gap} > *`]
  );

  // Handle `rest` props using Box transforms?

  return <div className={className}>{children}</div>;
}

Stack.propTypes = {
  alignContent: AlignContentPropType,
  alignItems: AlignItemsPropType,
  alignSelf: AlignSelfPropType,
  children: PropTypes.node,
  flex: FlexPropType,
  gap: PaddingPropType,
  height: DimensionPropType,
  justifyContent: JustifyContentPropType,
  maxHeight: DimensionPropType,
  maxWidth: DimensionPropType,
  minHeight: DimensionPropType,
  minWidth: DimensionPropType,
  overflow: OverflowPropType,
  width: DimensionPropType,
  wrap: PropTypes.bool,
};
