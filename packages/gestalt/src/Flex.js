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
  type Flex as FlexType,
  type JustifyContent,
  type Overflow,
  type Padding,
} from './boxTypes.js';

type Props = {|
  alignContent?: AlignContent,
  alignItems?: AlignItems,
  alignSelf?: AlignSelf,
  children?: Node,
  flex?: FlexType,
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

export default function Flex({
  alignItems = 'start',
  children,
  gap = 0,
  height,
  justifyContent = 'center',
  width,
  ...rest
}: Props): Node {
  return (
    <Box
      height={height}
      marginTop={gap ? -gap : 0}
      marginBottom={gap ? -gap : 0}
      width={width}
    >
      <FlexBox
        alignItems={alignItems}
        direction="column"
        height={height}
        justifyContent={justifyContent}
        width={width}
        {...rest}
      >
        {Children.map(children, child =>
          child !== null && child !== undefined ? (
            <Box paddingY={gap}>{child}</Box>
          ) : null
        )}
      </FlexBox>
    </Box>
  );
}

Flex.propTypes = {
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
