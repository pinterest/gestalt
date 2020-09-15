// @flow strict

/*

# Welcome to Box!

This guide will help you navigate and understand its design. This file is roughly organized like:

  1. Flow Types
  2. Prop transformers -> moved to ./boxTransforms.js
  3. Box itself
  4. PropTypes

I'll explain each part as we go through. Just remember, if you want to make updates, PLEASE PLEASE PLEASE update the Flow Types & PropTypes (even though they look scary).

*/

import React, {
  forwardRef,
  type Node,
  type AbstractComponent,
  type Element,
} from 'react';
import PropTypes from 'prop-types';
import styles from './Box.css';
import { buildStyles } from './boxTransforms.js';
import { type Indexable } from './zIndex.js';
import {
  type DangerouslySetInlineStyle,
  type AlignContent,
  type AlignItems,
  type AlignSelf,
  type BorderSize,
  type Bottom,
  type Column,
  type Color,
  type Dimension,
  type Display,
  type Direction,
  type Fit,
  type Flex,
  type JustifyContent,
  type Left,
  type Margin,
  type Opacity,
  type Overflow,
  type Padding,
  type Position,
  type Right,
  type Role,
  type Rounding,
  type Top,
  type UserSelect,
  type Wrap,
  AlignContentPropType,
  AlignItemsPropType,
  AlignSelfPropType,
  BorderSizePropType,
  ColorPropType,
  ColumnPropType,
  DimensionPropType,
  DirectionPropType,
  DisplayPropType,
  FlexPropType,
  JustifyContentPropType,
  MarginPropType,
  OpacityPropType,
  OverflowPropType,
  PaddingPropType,
  PositionPropType,
  RoundingPropType,
  UserSelectPropType,
} from './boxTypes.js';

/*

# PropTypes

Box's type definition is exhaustive. With the exception of `dangerouslySetInlineStyle`, values
shouldn't be ambigious. That means that we have to type out things like boints, but that's also
where Box's magic lies. Also, by putting in extra effort around type definitions here, we can skip
extra runtime typechecks in the transformers for performance.

*/

type Props = {
  children?: Node,
  dangerouslySetInlineStyle?: DangerouslySetInlineStyle,

  display?: Display,
  column?: Column,
  direction?: Direction,
  smDisplay?: Display,
  smColumn?: Column,
  smDirection?: Direction,
  mdDisplay?: Display,
  mdColumn?: Column,
  mdDirection?: Direction,
  lgDisplay?: Display,
  lgColumn?: Column,
  lgDirection?: Direction,

  alignContent?: AlignContent,
  alignItems?: AlignItems,
  alignSelf?: AlignSelf,
  bottom?: Bottom,
  borderSize?: BorderSize,
  color?: Color,
  fit?: Fit,
  flex?: Flex,
  height?: Dimension,
  justifyContent?: JustifyContent,
  left?: Left,

  margin?: Margin,
  marginTop?: Margin,
  marginRight?: Margin,
  marginBottom?: Margin,
  marginLeft?: Margin,
  marginStart?: Margin,
  marginEnd?: Margin,

  smMargin?: Margin,
  smMarginTop?: Margin,
  smMarginRight?: Margin,
  smMarginBottom?: Margin,
  smMarginLeft?: Margin,
  smMarginStart?: Margin,
  smMarginEnd?: Margin,

  mdMargin?: Margin,
  mdMarginTop?: Margin,
  mdMarginRight?: Margin,
  mdMarginBottom?: Margin,
  mdMarginLeft?: Margin,
  mdMarginStart?: Margin,
  mdMarginEnd?: Margin,

  lgMargin?: Margin,
  lgMarginTop?: Margin,
  lgMarginRight?: Margin,
  lgMarginBottom?: Margin,
  lgMarginLeft?: Margin,
  lgMarginStart?: Margin,
  lgMarginEnd?: Margin,

  maxHeight?: Dimension,
  maxWidth?: Dimension,
  minHeight?: Dimension,
  minWidth?: Dimension,

  opacity?: Opacity,

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

  position?: Position,
  right?: Right,
  rounding?: Rounding,
  top?: Top,
  width?: Dimension,
  wrap?: Wrap,

  userSelect?: UserSelect,

  role?: Role,

  zIndex?: Indexable,
  ...
};

// --

/*

# The Component

*/

// Box is a "pass-through" component, meaning that if you pass properties to it
// that it doesn't know about (`aria-label` for instance) it passes directly
// back to the underlying `<div/>`. That's generally useful, but we'd also like
// to strip out a few naughty properties that break style encapsulation
// (className, style) or accessibility (onClick).
const disallowedProps = ['onClick', 'className', 'style'];

const BoxWithForwardRef: AbstractComponent<Props, HTMLDivElement> = forwardRef<
  Props,
  HTMLDivElement
>(function Box(props, ref): Element<'div'> {
  const { passthroughProps, propsStyles } = buildStyles<Props>(
    styles.box,
    props,
    disallowedProps
  );

  // And... magic!
  return <div {...passthroughProps} {...propsStyles} ref={ref} />;
});

BoxWithForwardRef.displayName = 'Box';

export default BoxWithForwardRef;

/*

# PropTypes

And we're done here :)

*/

// $FlowFixMe Flow(InferError)
BoxWithForwardRef.propTypes = {
  children: PropTypes.node,
  dangerouslySetInlineStyle: PropTypes.exact({
    __style: PropTypes.object,
  }),

  display: DisplayPropType,
  direction: DirectionPropType,
  column: ColumnPropType,

  smDisplay: DisplayPropType,
  smDirection: DirectionPropType,
  smColumn: ColumnPropType,

  mdDisplay: DisplayPropType,
  mdDirection: DirectionPropType,
  mdColumn: ColumnPropType,

  lgDisplay: DisplayPropType,
  lgDirection: DirectionPropType,
  lgColumn: ColumnPropType,

  alignContent: AlignContentPropType,
  alignItems: AlignItemsPropType,
  alignSelf: AlignSelfPropType,
  bottom: PropTypes.bool,
  borderSize: BorderSizePropType,
  color: ColorPropType,
  fit: PropTypes.bool,
  flex: FlexPropType,
  height: DimensionPropType,
  justifyContent: JustifyContentPropType,
  left: PropTypes.bool,

  margin: MarginPropType,
  marginTop: MarginPropType,
  marginRight: MarginPropType,
  marginBottom: MarginPropType,
  marginLeft: MarginPropType,
  marginStart: MarginPropType,
  marginEnd: MarginPropType,

  smMargin: MarginPropType,
  smMarginTop: MarginPropType,
  smMarginRight: MarginPropType,
  smMarginBottom: MarginPropType,
  smMarginLeft: MarginPropType,
  smMarginStart: MarginPropType,
  smMarginEnd: MarginPropType,

  mdMargin: MarginPropType,
  mdMarginTop: MarginPropType,
  mdMarginRight: MarginPropType,
  mdMarginBottom: MarginPropType,
  mdMarginLeft: MarginPropType,
  mdMarginStart: MarginPropType,
  mdMarginEnd: MarginPropType,

  lgMargin: MarginPropType,
  lgMarginTop: MarginPropType,
  lgMarginRight: MarginPropType,
  lgMarginBottom: MarginPropType,
  lgMarginLeft: MarginPropType,
  lgMarginStart: MarginPropType,
  lgMarginEnd: MarginPropType,

  maxHeight: DimensionPropType,
  maxWidth: DimensionPropType,
  minHeight: DimensionPropType,
  minWidth: DimensionPropType,

  opacity: OpacityPropType,

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

  position: PositionPropType,
  right: PropTypes.bool,
  rounding: RoundingPropType,
  top: PropTypes.bool,
  width: DimensionPropType,
  wrap: PropTypes.bool,

  userSelect: UserSelectPropType,

  role: PropTypes.string,

  // eslint-disable-next-line react/forbid-prop-types
  zIndex: PropTypes.any,
};
