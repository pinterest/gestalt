// @flow strict

/*

# Welcome to Box!

This guide will help you navigate and understand its design. This file is roughly organized like:

  1. Flow Types
  2. Prop transformers -> moved to ./boxTransforms.js
  3. Box itself
  4. PropTypes

I'll explain each part as we go through. Just remember, if you want to make updates, PLEASE PLEASE PLEASE update the Flow Types  (even though they look scary).

*/

import { forwardRef, type Node, type AbstractComponent, type Element } from 'react';
import styles from './Box.css';
import { buildStyles } from './boxTransforms.js';
import { type Indexable } from './zIndex.js';
import { type As } from './boxTypes.js';

/*

# PropTypes

Box's type definition is exhaustive. With the exception of `dangerouslySetInlineStyle`, values
shouldn't be ambigious. That means that we have to type out things like boints, but that's also
where Box's magic lies. Also, by putting in extra effort around type definitions here, we can skip
extra runtime typechecks in the transformers for performance.

*/

// These types are mostly defined in boxTypes.js. Unfortunately to get generated docs
// to work, we had to copy those types here. Ideally we can undo that copying in the
// future if we figure out how to get docgen to resolve types defined elsewhere. =(

type Column = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Dimension = number | string;
type Direction = 'row' | 'column';
type Display = 'none' | 'flex' | 'block' | 'inlineBlock' | 'visuallyHidden';
type Margin =
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
  | 'auto';
type Padding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

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
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/flex)!
   * Default: 'stretch'
   */
  alignContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch',
  /**
   * Defines the default behaviour for how flex items are laid out along the cross-axis on the current line. Think of it as the justify-content version for the cross-axis (perpendicular to the main-axis).
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/flex)!
   * Default: 'stretch'
   */
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  /**
   * Allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/flex)!
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
    | 'caption'
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
  column?: Column,
  smColumn?: Column,
  mdColumn?: Column,
  lgColumn?: Column,
  /**
   * Establishes the main-axis, thus defining the direction flex items are placed in the flex container.
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/flex)!
   *
   * Also available in responsive sizes: `smDirection`, `mdDirection`, `lgDirection`
   * Default: 'row'
   */
  direction?: Direction,
  smDirection?: Direction,
  mdDirection?: Direction,
  lgDirection?: Direction,
  /**
   * The display style, which can be customized at different breakpoints. See the [Accessibility guidelines](https://gestalt.pinterest.systems/box#Visually-hidden-content) to learn more about using \`visuallyHidden\`.
   *
   * Also available in responsive sizes: `smDisplay`, `mdDisplay`, `lgDisplay`
   * Default: 'block'
   */
  display?: Display,
  smDisplay?: Display,
  mdDisplay?: Display,
  lgDisplay?: Display,
  /**
   * Sets the max-width of the Box to 100%. See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
   * Default: false
   */
  fit?: boolean,
  /**
   * Defines how a flex item will be sized. "grow", equivalent to "flex: 1 1 auto", will size the Box relative to its parent, growing and shrinking based on available space. "shrink", equivalent to "flex: 0 1 auto" (the browser default), allows the Box to shrink if compressed but not grow if given extra space. Finally, "none", equivalent to "flex: 0 0 auto", preserves the Box's size based on child content regardless of its container's size.
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/flex)!
   * Default: 'shrink'
   */
  flex?: 'grow' | 'shrink' | 'none',
  /**
   * Use numbers for pixels: height={100} and strings for percentages: height="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
   */
  height?: Dimension,
  /**
   * Defines the alignment along the main axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/flex)!
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
  margin?: Margin,
  smMargin?: Margin,
  mdMargin?: Margin,
  lgMargin?: Margin,
  /**
   * Also available in responsive sizes: `smMarginTop`, `mdMarginTop`, `lgMarginTop`
   * Default: 0
   */
  marginTop?: Margin,
  smMarginTop?: Margin,
  mdMarginTop?: Margin,
  lgMarginTop?: Margin,
  /**
   * Also available in responsive sizes: `smMarginBottom`, `mdMarginBottom`, `lgMarginBottom`
   * Default: 0
   */
  marginBottom?: Margin,
  smMarginBottom?: Margin,
  mdMarginBottom?: Margin,
  lgMarginBottom?: Margin,
  /**
   * Applies margin to the left in left-to-right languages, and to the right in right-to-left languages. See the [Localization guidelines](https://gestalt.pinterest.systems/box#Page-direction) to learn more about using `marginStart`.
   *
   * Also available in responsive sizes: `smMarginStart`, `mdMarginStart`, `lgMarginStart`
   * Default: 0
   */
  marginStart?: Margin,
  smMarginStart?: Margin,
  mdMarginStart?: Margin,
  lgMarginStart?: Margin,
  /**
   * Applies margin to the right in left-to-right languages, and to the left in right-to-left languages. See the [Localization guidelines](https://gestalt.pinterest.systems/box#Page-direction) to learn more about using `marginEnd`.
   *
   * Also available in responsive sizes: `smMarginEnd`, `mdMarginEnd`, `lgMarginEnd`
   * Default: 0
   */
  marginEnd?: Margin,
  smMarginEnd?: Margin,
  mdMarginEnd?: Margin,
  lgMarginEnd?: Margin,
  /**
   * Use numbers for pixels: maxHeight={100} and strings for percentages: maxHeight="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
   */
  maxHeight?: Dimension,
  /**
   * Use numbers for pixels: maxWidth={100} and strings for percentages: maxWidth="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
   */
  maxWidth?: Dimension,
  /**
   * Use numbers for pixels: minHeight={100} and strings for percentages: minHeight="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
   */
  minHeight?: Dimension,
  /**
   * Use numbers for pixels: minWidth={100} and strings for percentages: minWidth="100%". See the [sizing](https://gestalt.pinterest.systems/box#Sizing) variant for more info.
   */
  minWidth?: Dimension,
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
  padding?: Padding,
  smPadding?: Padding,
  mdPadding?: Padding,
  lgPadding?: Padding,
  /**
   * Horizontal padding (left/right)
   *
   * Also available in responsive sizes: `smPaddingX`, `mdPaddingX`, `lgPaddingX`
   * Default: 0
   */
  paddingX?: Padding,
  smPaddingX?: Padding,
  mdPaddingX?: Padding,
  lgPaddingX?: Padding,
  /**
   * Vertical padding (top/bottom)
   *
   * Also available in responsive sizes: `smPaddingY`, `mdPaddingY`, `lgPaddingY`
   * Default: 0
   */
  paddingY?: Padding,
  smPaddingY?: Padding,
  mdPaddingY?: Padding,
  lgPaddingY?: Padding,
  /**
   * See the [absolute positioning](https://gestalt.pinterest.systems/box#Absolute-positioning) variant for more info.
   * Default: 'static'
   */
  position?: 'static' | 'absolute' | 'relative' | 'fixed',
  /**
   * Ref that is forwarded to the underlying input element. See the [using as a ref](https://gestalt.pinterest.systems/box#Using-as-a-ref) variant for more info.
   */
  ref?:
    | HTMLDivElement
    | Element<'article'>
    | Element<'aside'>
    | Element<'details'>
    | Element<'figcaption'>
    | Element<'figure'>
    | Element<'footer'>
    | Element<'header'>
    | Element<'main'>
    | Element<'nav'>
    | Element<'section'>
    | Element<'summary'>,
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
  width?: Dimension,
  /**
   * By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap onto multiple lines, from top to bottom.
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/flex)!
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
 * [Box](https://gestalt.pinterest.systems/box) is a component primitive that can be used to build the foundation of pretty much any other component. It keeps details like spacing, borders and colors consistent with the rest of Gestalt, while allowing the developer to focus on the content.
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
