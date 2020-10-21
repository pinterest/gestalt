// @flow strict
import React, { Children, type Node } from 'react';
import PropTypes from 'prop-types';
import FlexBox from './FlexBox.js';
import Box from './Box.js';
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

export default function Row({
  alignItems = 'center',
  children,
  gap = 0,
  height,
  justifyContent = 'start',
  width,
  ...rest
}: Props): Node {
  return (
    <Box
      height={height}
      marginStart={gap ? -gap : 0}
      marginEnd={gap ? -gap : 0}
      width={width}
    >
      <FlexBox
        alignItems={alignItems}
        direction="row"
        height={height}
        justifyContent={justifyContent}
        width={width}
        {...rest}
      >
        {Children.map(children, (child) =>
          child !== null && child !== undefined ? (
            <Box paddingX={gap}>{child}</Box>
          ) : null
        )}
      </FlexBox>
    </Box>
  );
}

Row.propTypes = {
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
