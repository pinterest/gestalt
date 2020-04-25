// @flow
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
  fit?: boolean,
  flex?: Flex,
  height?: Dimension,
  justifyContent?: JustifyContent,

  maxHeight?: Dimension,
  maxWidth?: Dimension,
  minHeight?: Dimension,
  minWidth?: Dimension,

  overflow?: Overflow,

  padding?: Padding,
  smPadding?: Padding,
  mdPadding?: Padding,
  lgPadding?: Padding,

  paddingX?: Padding,
  smPaddingX?: Padding,
  mdPaddingX?: Padding,
  lgPaddingX?: Padding,

  paddingY?: Padding,
  smPaddingY?: Padding,
  mdPaddingY?: Padding,
  lgPaddingY?: Padding,

  spacing?: Padding,
  width?: Dimension,
  wrap?: boolean,
|};

export default function Row({
  alignItems,
  children,
  justifyContent,
  spacing,
  ...rest
}: Props) {
  return (
    <FlexBox
      alignItems={alignItems ?? 'center'}
      direction="row"
      justifyContent={justifyContent ?? 'start'}
      {...rest}
    >
      {React.Children.map(children, (child, index) => (
        <Box
          marginStart={index === 0 ? 0 : spacing}
          marginEnd={index === React.Children.count(children) - 1 ? 0 : spacing}
        >
          {child}
        </Box>
      ))}
    </FlexBox>
  );
}

Row.propTypes = {
  alignContent: AlignContentPropType,
  alignItems: AlignItemsPropType,
  alignSelf: AlignSelfPropType,
  children: PropTypes.node,
  fit: PropTypes.bool,
  flex: FlexPropType,
  height: DimensionPropType,
  justifyContent: JustifyContentPropType,

  maxHeight: DimensionPropType,
  maxWidth: DimensionPropType,
  minHeight: DimensionPropType,
  minWidth: DimensionPropType,

  overflow: OverflowPropType,

  padding: PaddingPropType,
  paddingX: PaddingPropType,
  paddingY: PaddingPropType,

  smPadding: PaddingPropType,
  smPaddingX: PaddingPropType,
  smPaddingY: PaddingPropType,

  mdPadding: PaddingPropType,
  mdPaddingX: PaddingPropType,
  mdPaddingY: PaddingPropType,

  lgPadding: PaddingPropType,
  lgPaddingX: PaddingPropType,
  lgPaddingY: PaddingPropType,

  spacing: PaddingPropType,
  width: DimensionPropType,
  wrap: PropTypes.bool,
};
