// @flow strict
import React, { type ChildrenArray, type Element, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import disallowedProps from './stackDisallowedProps.js';
import styles from './Stack.css';
import { buildStyles } from './boxTransforms.js';
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
} from './boxTypes.js';

type Props = {|
  alignContent?: AlignContent,
  alignItems?: AlignItems,
  alignSelf?: AlignSelf,
  children?: ChildrenArray<?Element<*>>,
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

// Defaults for align-items and justify-content set in base styles
export default function Stack({ children, gap = 0, ...rest }: Props): Node {
  const hasGap = gap > 0;

  const baseClasses = classnames(styles.stack, {
    [styles[`verticalGap${gap}`]]: hasGap,
  });
  const { passthroughProps, propsStyles } = buildStyles<Props>(
    baseClasses,
    rest,
    disallowedProps
  );

  return (
    <div {...passthroughProps} {...propsStyles}>
      {children}
    </div>
  );
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
