// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import FlexBox from './FlexBox.js';
import Box, {
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
  children?: React.Node,
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

export default function Stack({
  alignItems = 'start',
  children,
  gap = 0,
  height,
  justifyContent = 'center',
  width,
  ...rest
}: Props) {
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
        {React.Children.map(children, child =>
          child !== null && child !== undefined ? (
            <Box paddingY={gap}>{child}</Box>
          ) : null
        )}
      </FlexBox>
    </Box>
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
