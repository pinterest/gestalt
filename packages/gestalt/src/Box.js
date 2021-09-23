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
  type As,
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

// These types are mostly defined in boxTypes.js. Unfortunately to get generated docs
// to work, we had to copy those types here. Ideally we can undo that copying in the
// future if we figure out how to get docgen to resolve types defined elsewhere. =(

// Please update `eslint-plugin-gestalt/no-box-disallowed-props` if you make changes to these props
type Props = {
  /**
   *
   */
  children?: Node,
  /**
   * An "escape hatch" used to apply styles not otherwise available on Box.
   */
  dangerouslySetInlineStyle?: {|
    __style: { [key: string]: string | number | void },
  |},

  /**
   * Aligns a flex container's lines within when there is extra space in the cross-axis, similar to how justify-content aligns individual items within the main-axis.
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox).
   * Default: 'stretch'
   */
  alignContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch',
  /**
   * Defines the default behaviour for how flex items are laid out along the cross-axis on the current line. Think of it as the justify-content version for the cross-axis (perpendicular to the main-axis).
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox).
   * Default: 'stretch'
   */
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  /**
   * Allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox).
   * Default: 'stretch'
   */
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  /**
   * Changes the underlying DOM element when needed for accessibility or SEO reasons. Note that currently only block-level elements are available.
   * Default: 'div'
   */
  as?:
    | 'article'
    | 'aside'
    | 'details'
    | 'div'
    | 'figcaption'
    | 'figure'
    | 'footer'
    | 'header'
    | 'main'
    | 'nav'
    | 'section'
    | 'summary',
  /**
   * Specify a border style for the box. For sizes, "sm" is 1px and "lg" is 2px. Setting a size will always default the border style to solid and color to lightGray. See the [borders](https://gestalt.pinterest.systems/box#Borders) variant for more details.
   * Default: 'none'
   */
  borderStyle?: 'sm' | 'lg' | 'shadow' | 'none',
  /**
   * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.pinterest.systems/box#Absolute-positioning) variant for more info.
   * Default: false
   */
  bottom?: boolean,
  /**
   * See the [color](https://gestalt.pinterest.systems/box#Color) variant for more info.
   * Default: 'transparent'
   */
  color?:
    | 'blue'
    | 'darkGray'
    | 'darkWash'
    | 'eggplant'
    | 'gray'
    | 'green'
    | 'lightGray'
    | 'lightWash'
    | 'maroon'
    | 'midnight'
    | 'navy'
    | 'olive'
    | 'orange'
    | 'orchid'
    | 'pine'
    | 'purple'
    | 'red'
    | 'transparent'
    | 'transparentDarkGray'
    | 'watermelon'
    | 'white',
  /**
   * See the [column layout](https://gestalt.pinterest.systems/box#Column-layout) variant for more info.
   *
   * Also available in responsive sizes: `smColumn`, `mdColumn`, `lgColumn`
   */
  column?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  smColumn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  mdColumn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  lgColumn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  /**
   * Establishes the main-axis, thus defining the direction flex items are placed in the flex container.
   *
   * Also available in responsive sizes: `smDirection`, `mdDirection`, `lgDirection`
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox).
   * Default: 'row'
   */
  direction?: 'row' | 'column',
  smDirection?: 'row' | 'column',
  mdDirection?: 'row' | 'column',
  lgDirection?: 'row' | 'column',
  /**
   * The display style, which can be customized at different breakpoints. See the [Accessibility guidelines](https://gestalt.pinterest.systems/box#Visually-hidden-content) to learn more about using \`visuallyHidden\`.
   *
   * Also available in responsive sizes: `smDisplay`, `mdDisplay`, `lgDisplay`
   * Default: 'block'
   */
  display?: 'none' | 'flex' | 'block' | 'inlineBlock' | 'visuallyHidden',
  smDisplay?: 'none' | 'flex' | 'block' | 'inlineBlock' | 'visuallyHidden',
  mdDisplay?: 'none' | 'flex' | 'block' | 'inlineBlock' | 'visuallyHidden',
  lgDisplay?: 'none' | 'flex' | 'block' | 'inlineBlock' | 'visuallyHidden',
  /**
   * Sets the max-width of the Box to 100%. See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
   * Default: false
   */
  fit?: boolean,
  /**
   * Defines how a flex item will be sized. "grow", equivalent to "flex: 1 1 auto", will size the Box relative to its parent, growing and shrinking based on available space. "shrink", equivalent to "flex: 0 1 auto" (the browser default), allows the Box to shrink if compressed but not grow if given extra space. Finally, "none", equivalent to "flex: 0 0 auto", preserves the Box's size based on child content regardless of its container's size.
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox).
   * Default: 'shrink'
   */
  flex?: 'grow' | 'shrink' | 'none',
  /**
   * Use numbers for pixels: height={100} and strings for percentages: height="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
   */
  height?: number | string,
  /**
   * Defines the alignment along the main axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox).
   * Default: 'start'
   */
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly',
  /**
   * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.pinterest.systems/box#Absolute-positioning) variant for more info.
   * Default: false
   */
  left?: boolean,
  /**
   * Scale is in 4px increments so a margin of 2 is 8px. Supports 3 responsive breakpoints: sm, md, lg. Each sets the margin from that breakpoint and up.
   *
   * Also available in responsive sizes: `smMargin`, `mdMargin`, `lgMargin`
   * Default: 0
   */
  margin?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  smMargin?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  mdMargin?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  lgMargin?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  /**
   * Also available in responsive sizes: `smMarginTop`, `mdMarginTop`, `lgMarginTop`
   * Default: 0
   */
  marginTop?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  smMarginTop?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  mdMarginTop?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  lgMarginTop?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  /**
   * Also available in responsive sizes: `smMarginBottom`, `mdMarginBottom`, `lgMarginBottom`
   * Default: 0
   */
  marginBottom?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  smMarginBottom?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  mdMarginBottom?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  lgMarginBottom?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  /**
   * Applies margin to the left in left-to-right languages, and to the right in right-to-left languages. See the [Localization guidelines](https://gestalt.pinterest.systems/box#Page-direction) to learn more about using `marginStart`.
   *
   * Also available in responsive sizes: `smMarginStart`, `mdMarginStart`, `lgMarginStart`
   * Default: 0
   */
  marginStart?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  smMarginStart?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  mdMarginStart?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  lgMarginStart?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  /**
   * Applies margin to the right in left-to-right languages, and to the left in right-to-left languages. See the [Localization guidelines](https://gestalt.pinterest.systems/box#Page-direction) to learn more about using `marginEnd`.
   *
   * Also available in responsive sizes: `smMarginEnd`, `mdMarginEnd`, `lgMarginEnd`
   * Default: 0
   */
  marginEnd?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  smMarginEnd?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  mdMarginEnd?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  lgMarginEnd?:
    | -12
    | -11
    | -10
    | -9
    | -8
    | -7
    | -6
    | -5
    | -4
    | -3
    | -2
    | -1
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 'auto',
  /**
   * Use numbers for pixels: maxHeight={100} and strings for percentages: maxHeight="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
   */
  maxHeight?: number | string,
  /**
   * Use numbers for pixels: maxWidth={100} and strings for percentages: maxWidth="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
   */
  maxWidth?: number | string,
  /**
   * Use numbers for pixels: minHeight={100} and strings for percentages: minHeight="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
   */
  minHeight?: number | string,
  /**
   * Use numbers for pixels: minWidth={100} and strings for percentages: minWidth="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
   */
  minWidth?: number | string,
  /**
   * See the [opacity](https://gestalt.pinterest.systems/box#Opacity) variant for more info.
   */
  opacity?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1,
  /**
   * See the [overflow](https://gestalt.pinterest.systems/box#Overflow) variant for more info.
   * Default: 'visible'
   */
  overflow?: 'visible' | 'hidden' | 'scroll' | 'scrollX' | 'scrollY' | 'auto',
  /**
   * Supports 3 responsive breakpoints: sm, md, lg. Each sets the padding from that breakpoint and up. See the [responsive padding](https://gestalt.pinterest.systems/box#Responsive-padding) variant for more info.
   *
   * Also available in responsive sizes: `smPadding`, `mdPadding`, `lgPadding`
   * Default: 0
   */
  padding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  smPadding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  mdPadding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  lgPadding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  /**
   * Horizontal padding (left/right)
   *
   * Also available in responsive sizes: `smPaddingX`, `mdPaddingX`, `lgPaddingX`
   * Default: 0
   */
  paddingX?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  smPaddingX?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  mdPaddingX?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  lgPaddingX?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  /**
   * Vertical padding (top/bottom)
   *
   * Also available in responsive sizes: `smPaddingY`, `mdPaddingY`, `lgPaddingY`
   * Default: 0
   */
  paddingY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  smPaddingY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  mdPaddingY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  lgPaddingY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  /**
   * See the [absolute positioning](https://gestalt.pinterest.systems/box#Absolute-positioning) variant for more info.
   * Default: 'static'
   */
  position?: 'static' | 'absolute' | 'relative' | 'fixed',
  /**
   * Ref that is forwarded to the underlying input element. See the [using as a ref](https://gestalt.pinterest.systems/box#Using-as-a-ref) variant for more info.
   */
  ref?: UnionRefs,
  /**
   * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.pinterest.systems/box#Absolute-positioning) variant for more info.
   * Default: false
   */
  right?: boolean,
  /**
   * Used to designate the Box as a type of element or landmark using ARIA roles. See the [Accessibility guidelines](https://gestalt.pinterest.systems/box#Using-role) to learn more about using `role`.
   */
  role?: string,
  /**
   * See the [rounding](https://gestalt.pinterest.systems/box#Rounding) variant for more info.
   */
  rounding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill',
  /**
   * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.pinterest.systems/box#Absolute-positioning) variant for more info.
   * Default: false
   */
  top?: boolean,
  /**
   * Controls whether or not user can select text.
   * Default: 'auto'
   */
  userSelect?: 'auto' | 'none',
  /**
   * Use numbers for pixels: width={100} and strings for percentages: width="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
   */
  width?: number | string,
  /**
   * By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap onto multiple lines, from top to bottom.
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox).
   * Default: false
   */
  wrap?: boolean,
  /**
   * An object representing the zIndex value of the Box. See the [Z-Index](https://gestalt.pinterest.systems/box#Z-Index) variant for more info.
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
