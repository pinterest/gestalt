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

import { forwardRef, type Node, type AbstractComponent, type Element } from 'react';
import PropTypes from 'prop-types';
import styles from './Box.css';
import { buildStyles } from './boxTransforms.js';
import { type Indexable, UnsafeIndexablePropType } from './zIndex.js';
import {
  type DangerouslySetInlineStyle,
  type AlignContent,
  type AlignItems,
  type AlignSelf,
  type As,
  type BorderStyle,
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
  AsPropType,
  BorderStylePropType,
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

type UnionRefs = HTMLDivElement | HTMLAnchorElement;

// Please update `eslint-plugin-gestalt/no-box-disallowed-props` if you make changes to these props
type Props = {
  /**
   *
   */
  children?: Node,
  /**
   * An "escape hatch" used to apply styles not otherwise available on Box.
   */
  dangerouslySetInlineStyle?: DangerouslySetInlineStyle,

  /**
   * Aligns a flex container's lines within when there is extra space in the cross-axis, similar to how justify-content aligns individual items within the main-axis.
   */
  alignContent?: AlignContent,
  /**
   * Defines the default behaviour for how flex items are laid out along the cross-axis on the current line. Think of it as the justify-content version for the cross-axis (perpendicular to the main-axis).
   */
  alignItems?: AlignItems,
  /**
   * Allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.
   */
  alignSelf?: AlignSelf,
  /**
   * Changes the underlying DOM element when needed for accessibility or SEO reasons. Note that currently only block-level elements are available.
   */
  as?: As,
  /**
   * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.netlify.app/box#Absolute-positioning) variant for more info.
   */
  bottom?: Bottom,
  /**
   * Specify a border style for the box. For sizes, "sm" is 1px and "lg" is 2px. Setting a size will always default the border style to solid and color to lightGray. See the [borders](https://gestalt.netlify.app/box#Borders) variant for more details.
   */
  borderStyle?: BorderStyle,
  /**
   * See the [color](https://gestalt.netlify.app/box#Color) variant for more info.
   */
  color?: Color,
  /**
   * See the [column layout](https://gestalt.netlify.app/box#Column-layout) variant for more info.
   *
   * Also available in responsive sizes: `smColumn`, `mdColumn`, `lgColumn`
   */
  column?: Column,
  smColumn?: Column,
  mdColumn?: Column,
  lgColumn?: Column,
  /**
   * Establishes the main-axis, thus defining the direction flex items are placed in the flex container.
   *
   * Also available in responsive sizes: `smDirection`, `mdDirection`, `lgDirection`
   */
  direction?: Direction,
  smDirection?: Direction,
  mdDirection?: Direction,
  lgDirection?: Direction,
  /**
   * The display style, which can be customized at different breakpoints. See the [Accessibility guidelines](https://gestalt.netlify.app/box#Visually-hidden-content) to learn more about using \`visuallyHidden\`.
   *
   * Also available in responsive sizes: `smDisplay`, `mdDisplay`, `lgDisplay`
   */
  display?: Display,
  smDisplay?: Display,
  mdDisplay?: Display,
  lgDisplay?: Display,
  /**
   * Sets the max-width of the Box to 100%. See the [sizing](https://gestalt.netlify.app/box#Sizing) variant for more info.
   */
  fit?: Fit,
  /**
   * Defines how a flex item will be sized. "grow", equivalent to "flex: 1 1 auto", will size the Box relative to its parent, growing and shrinking based on available space. "shrink", equivalent to "flex: 0 1 auto" (the browser default), allows the Box to shrink if compressed but not grow if given extra space. Finally, "none", equivalent to "flex: 0 0 auto", preserves the Box's size based on child content regardless of its container's size.
   */
  flex?: Flex,
  /**
   * Use numbers for pixels: height={100} and strings for percentages: height="100%". See the [sizing](https://gestalt.netlify.app/box#Sizing) variant for more info.
   */
  height?: Dimension,
  /**
   * Defines the alignment along the main axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.
   */
  justifyContent?: JustifyContent,
  /**
   * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.netlify.app/box#Absolute-positioning) variant for more info.
   */
  left?: Left,

  /**
   * Scale is in 4px increments so a margin of 2 is 8px. Supports 3 responsive breakpoints: sm, md, lg. Each sets the margin from that breakpoint and up.
   *
   * Also available in responsive sizes: `smMargin`, `mdMargin`, `lgMargin`
   */
  margin?: Margin,
  smMargin?: Margin,
  mdMargin?: Margin,
  lgMargin?: Margin,
  /**
   * Also available in responsive sizes: `smMarginTop`, `mdMarginTop`, `lgMarginTop`
   */
  marginTop?: Margin,
  smMarginTop?: Margin,
  mdMarginTop?: Margin,
  lgMarginTop?: Margin,
  /**
   * Also available in responsive sizes: `smMarginBottom`, `mdMarginBottom`, `lgMarginBottom`
   */
  marginBottom?: Margin,
  smMarginBottom?: Margin,
  mdMarginBottom?: Margin,
  lgMarginBottom?: Margin,
  /**
   * Applies margin to the left in left-to-right languages, and to the right in right-to-left languages. See the [Localization guidelines](https://gestalt.netlify.app/box#Page-direction) to learn more about using `marginStart`.
   *
   * Also available in responsive sizes: `smMarginStart`, `mdMarginStart`, `lgMarginStart`
   */
  marginStart?: Margin,
  smMarginStart?: Margin,
  mdMarginStart?: Margin,
  lgMarginStart?: Margin,
  /**
   * Applies margin to the right in left-to-right languages, and to the left in right-to-left languages. See the [Localization guidelines](https://gestalt.netlify.app/box#Page-direction) to learn more about using `marginEnd`.
   *
   * Also available in responsive sizes: `smMarginEnd`, `mdMarginEnd`, `lgMarginEnd`
   */
  marginEnd?: Margin,
  smMarginEnd?: Margin,
  mdMarginEnd?: Margin,
  lgMarginEnd?: Margin,

  /**
   * Use numbers for pixels: maxHeight={100} and strings for percentages: maxHeight="100%". See the [sizing](https://gestalt.netlify.app/box#Sizing) variant for more info.
   */
  maxHeight?: Dimension,
  /**
   * Use numbers for pixels: maxWidth={100} and strings for percentages: maxWidth="100%". See the [sizing](https://gestalt.netlify.app/box#Sizing) variant for more info.
   */
  maxWidth?: Dimension,
  /**
   * Use numbers for pixels: minHeight={100} and strings for percentages: minHeight="100%". See the [sizing](https://gestalt.netlify.app/box#Sizing) variant for more info.
   */
  minHeight?: Dimension,
  /**
   * Use numbers for pixels: minWidth={100} and strings for percentages: minWidth="100%". See the [sizing](https://gestalt.netlify.app/box#Sizing) variant for more info.
   */
  minWidth?: Dimension,

  /**
   * See the [opacity](https://gestalt.netlify.app/box#Opacity) variant for more info.
   */
  opacity?: Opacity,

  /**
   * See the [overflow](https://gestalt.netlify.app/box#Overflow) variant for more info.
   */
  overflow?: Overflow,

  /**
   * Supports 3 responsive breakpoints: sm, md, lg. Each sets the padding from that breakpoint and up. See the [responsive padding](https://gestalt.netlify.app/box#Responsive-padding) variant for more info.
   *
   * Also available in responsive sizes: `smPadding`, `mdPadding`, `lgPadding`
   */
  padding?: Padding,
  smPadding?: Padding,
  mdPadding?: Padding,
  lgPadding?: Padding,

  /**
   * Horizontal padding (left/right)
   *
   * Also available in responsive sizes: `smPaddingX`, `mdPaddingX`, `lgPaddingX`
   */
  paddingX?: Padding,
  smPaddingX?: Padding,
  mdPaddingX?: Padding,
  lgPaddingX?: Padding,

  /**
   * Vertical padding (top/bottom)
   *
   * Also available in responsive sizes: `smPaddingY`, `mdPaddingY`, `lgPaddingY`
   */
  paddingY?: Padding,
  smPaddingY?: Padding,
  mdPaddingY?: Padding,
  lgPaddingY?: Padding,

  /**
   * See the [absolute positioning](https://gestalt.netlify.app/box#Absolute-positioning) variant for more info.
   */
  position?: Position,
  /**
   * Ref that is forwarded to the underlying input element. See the [using as a ref](https://gestalt.netlify.app/box#Using-as-a-ref) variant for more info.
   */
  ref?: UnionRefs,
  /**
   * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.netlify.app/box#Absolute-positioning) variant for more info.
   */
  right?: Right,
  /**
   * Used to designate the Box as a type of element or landmark using ARIA roles. See the [Accessibility guidelines](https://gestalt.netlify.app/box#Using-role) to learn more about using `role`.
   */
  role?: Role,
  /**
   * See the [rounding](https://gestalt.netlify.app/box#Rounding) variant for more info.
   */
  rounding?: Rounding,
  /**
   * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.netlify.app/box#Absolute-positioning) variant for more info.
   */
  top?: Top,
  /**
   * Use numbers for pixels: width={100} and strings for percentages: width="100%". See the [sizing](https://gestalt.netlify.app/box#Sizing) variant for more info.
   */
  width?: Dimension,
  /**
   * By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap onto multiple lines, from top to bottom.
   */
  wrap?: Wrap,
  /**
   * Controls whether or not user can select text.
   */
  userSelect?: UserSelect,
  /**
   * An object representing the zIndex value of the Box. See the [Z-Index](https://gestalt.netlify.app/box#Z-Index) variant for more info.
   */
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
const disallowedProps = [
  'onClick',
  'className',
  'style',
  // We're currently also explicitly disallowing the deprecated marginLeft/Right
  // props, as they're not RTL-friendly.
  'marginLeft',
  'smMarginLeft',
  'mdMarginLeft',
  'lgMarginLeft',
  'marginRight',
  'smMarginRight',
  'mdMarginRight',
  'lgMarginRight',
];

type OutputType = Element<As>;

/**
 * https://gestalt.pinterest.systems/Box
 */
const BoxWithForwardRef: AbstractComponent<Props, HTMLElement> = forwardRef<Props, HTMLElement>(
  function Box({ as, ...props }: Props, ref): OutputType {
    const { passthroughProps, propsStyles } = buildStyles<$Diff<Props, {| as?: As |}>>({
      baseStyles: styles.box,
      props,
      blocklistProps: disallowedProps,
    });

    const BoxElement: As = as ?? 'div';

    // And... magic!
    return <BoxElement {...passthroughProps} {...propsStyles} ref={ref} />;
  },
);

BoxWithForwardRef.displayName = 'Box';

export default BoxWithForwardRef;

/*

# PropTypes

And we're done here :)

*/

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
  as: AsPropType,
  bottom: PropTypes.bool,
  borderStyle: BorderStylePropType,
  color: ColorPropType,
  fit: PropTypes.bool,
  flex: FlexPropType,
  height: DimensionPropType,
  justifyContent: JustifyContentPropType,
  left: PropTypes.bool,

  margin: MarginPropType,
  marginTop: MarginPropType,
  marginBottom: MarginPropType,
  marginStart: MarginPropType,
  marginEnd: MarginPropType,

  smMargin: MarginPropType,
  smMarginTop: MarginPropType,
  smMarginBottom: MarginPropType,
  smMarginStart: MarginPropType,
  smMarginEnd: MarginPropType,

  mdMargin: MarginPropType,
  mdMarginTop: MarginPropType,
  mdMarginBottom: MarginPropType,
  mdMarginStart: MarginPropType,
  mdMarginEnd: MarginPropType,

  lgMargin: MarginPropType,
  lgMarginTop: MarginPropType,
  lgMarginBottom: MarginPropType,
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
  role: PropTypes.string,
  rounding: RoundingPropType,
  top: PropTypes.bool,
  width: DimensionPropType,
  wrap: PropTypes.bool,

  userSelect: UserSelectPropType,
  zIndex: UnsafeIndexablePropType,
};
