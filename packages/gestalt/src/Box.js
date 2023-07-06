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

import { type AbstractComponent, type Element, forwardRef, type Node } from 'react';
import styles from './Box.css';
import { buildStyles } from './boxTransforms.js';
import { type As } from './boxTypes.js';
import { type Indexable } from './zIndex.js';

/*

# PropTypes

Box's type definition is exhaustive. With the exception of `dangerouslySetInlineStyle`, values
shouldn't be ambiguous. That means that we have to type out things like boints, but that's also
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
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/web/flex)!
   * Default: 'stretch'
   */
  alignContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch',
  /**
   * Defines the default behaviour for how flex items are laid out along the cross-axis on the current line. Think of it as the justify-content version for the cross-axis (perpendicular to the main-axis).
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/web/flex)!
   * Default: 'stretch'
   *
   * Also available in responsive sizes: `smAlignItems`, `mdAlignItems`, `lgAlignItems`. See the [Screen size page](https://gestalt.pinterest.systems/foundations/screen_sizes#Web-(px)) to learn more about viewport breakpoints in web.
   */
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  /**
   * The alignItems style in sm or larger viewports. See the [Screen size page](https://gestalt.pinterest.systems/foundations/screen_sizes#Web-(px)) to learn more about viewport breakpoints in web.
   */
  smAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  /**
   * The alignItems style in md or larger viewports. See the [Screen size page](https://gestalt.pinterest.systems/foundations/screen_sizes#Web-(px)) to learn more about viewport breakpoints in web.
   */
  mdAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  /**
   * The alignItems style in lg or larger viewports. See the [Screen size page](https://gestalt.pinterest.systems/foundations/screen_sizes#Web-(px)) to learn more about viewport breakpoints in web.
   */
  lgAlignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  /**
   * Allows the default alignment (or the one specified by align-items) to be overridden for individual flex items.
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/web/flex)!
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
    | 'p'
    | 'section'
    | 'summary',
  /**
   * Specify a border style for the box. For sizes, "sm" is 1px and "lg" is 2px. Setting a size will always default the border style to solid and color to lightGray. See the [borders](https://gestalt.pinterest.systems/web/box#Borders) variant for more details.
   * Default: 'none'
   */
  borderStyle?: 'sm' | 'lg' | 'shadow' | 'raisedTopShadow' | 'raisedBottomShadow' | 'none',
  /**
   * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.pinterest.systems/web/box#Absolute-positioning) variant for more info.
   * Default: false
   */
  bottom?: boolean,
  /**
   * See the [color](https://gestalt.pinterest.systems/web/box#Colors) variant for more info.
   * Default: 'transparent'
   */
  color?:
    | 'darkWash'
    | 'lightWash'
    | 'transparent'
    | 'transparentDarkGray'
    | 'default'
    | 'infoBase'
    | 'infoWeak'
    | 'errorBase'
    | 'errorWeak'
    | 'warningBase'
    | 'warningWeak'
    | 'successBase'
    | 'successWeak'
    | 'recommendationBase'
    | 'recommendationWeak'
    | 'shopping'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'selected'
    | 'inverse'
    | 'brand'
    | 'education'
    | 'elevationAccent'
    | 'elevationFloating'
    | 'elevationRaised'
    | 'dark'
    | 'light',
  /**
   * See the [column layout](https://gestalt.pinterest.systems/web/box#Column-layout) variant for more info.
   *
   * Also available in responsive sizes: `smColumn`, `mdColumn`, `lgColumn`
   */
  column?: Column,
  /**
   * See the [column layout](https://gestalt.pinterest.systems/web/box#Column-layout) variant for more info.
   */
  smColumn?: Column,
  /**
   * See the [column layout](https://gestalt.pinterest.systems/web/box#Column-layout) variant for more info.
   */
  mdColumn?: Column,
  /**
   * See the [column layout](https://gestalt.pinterest.systems/web/box#Column-layout) variant for more info.
   */
  lgColumn?: Column,
  /**
   * Establishes the main-axis, thus defining the direction flex items are placed in the flex container.
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/web/flex)!
   *
   * Also available in responsive sizes: `smDirection`, `mdDirection`, `lgDirection`
   * Default: 'row'
   */
  direction?: Direction,
  /**
   * Establishes the main-axis, thus defining the direction flex items are placed in the flex container in sm or larger viewports.
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/web/flex)!
   */
  smDirection?: Direction,
  /**
   * Establishes the main-axis, thus defining the direction flex items are placed in the flex container in md or larger viewports.
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/web/flex)!
   */
  mdDirection?: Direction,
  /**
   * Establishes the main-axis, thus defining the direction flex items are placed in the flex container in lg or larger viewports.
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/web/flex)!
   */
  lgDirection?: Direction,
  /**
   * The display style. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/box#Visually-hidden-content) to learn more about using \`visuallyHidden\`.
   *
   * Also available in responsive sizes: `smDisplay`, `mdDisplay`, `lgDisplay`
   * Default: 'block'
   */
  display?: Display,
  /**
   * The display style in sm or larger viewports. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/box#Visually-hidden-content) to learn more about using \`visuallyHidden\`.
   */
  smDisplay?: Display,
  /**
   * The display style in md or larger viewports. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/box#Visually-hidden-content) to learn more about using \`visuallyHidden\`.
   */
  mdDisplay?: Display,
  /**
   * The display style in lg or larger viewports. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/box#Visually-hidden-content) to learn more about using \`visuallyHidden\`.
   */
  lgDisplay?: Display,
  /**
   * Sets the max-width of the Box to 100%. See the [sizing](https://gestalt.pinterest.systems/web/box#Sizing) variant for more info.
   * Default: false
   */
  fit?: boolean,
  /**
   * Defines how a flex item will be sized. "grow", equivalent to "flex: 1 1 auto", will size the Box relative to its parent, growing and shrinking based on available space. "shrink", equivalent to "flex: 0 1 auto" (the browser default), allows the Box to shrink if compressed but not grow if given extra space. Finally, "none", equivalent to "flex: 0 0 auto", preserves the Box's size based on child content regardless of its container's size.
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/web/flex)!
   * Default: 'shrink'
   */
  flex?: 'grow' | 'shrink' | 'none',
  /**
   * Use numbers for pixels: height={100} and strings for percentages: height="100%". See the [sizing](https://gestalt.pinterest.systems/web/box#Sizing) variant for more info.
   */
  height?: Dimension,
  /**
   * Defines the alignment along the main axis. It helps distribute extra free space left over when either all the flex items on a line are inflexible, or are flexible but have reached their maximum size. It also exerts some control over the alignment of items when they overflow the line.
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/web/flex)!
   * Default: 'start'
   */
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly',
  /**
   * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.pinterest.systems/web/box#Absolute-positioning) variant for more info.
   * Default: false
   */
  left?: boolean,
  /**
   * Scale is in 4px increments so a `margin` of 2 is 8px.
   *
   * Also available in responsive sizes: `smMargin`, `mdMargin`, `lgMargin`
   * Default: 0
   */
  margin?: Margin,
  /**
   * Scale is in 4px increments so a `margin` of 2 is 8px. For viewports of size sm and larger.
   */
  smMargin?: Margin,
  /**
   * Scale is in 4px increments so a `margin` of 2 is 8px. For viewports of size md and larger.
   */
  mdMargin?: Margin,
  /**
   * Scale is in 4px increments so a `margin` of 2 is 8px. For viewports of size lg and larger.
   */
  lgMargin?: Margin,
  /**
   * Scale is in 4px increments so a `marginTop` of 2 is 8px.
   *
   * Also available in responsive sizes: `smMarginTop`, `mdMarginTop`, `lgMarginTop`
   * Default: 0
   */
  marginTop?: Margin,
  /**
   * Scale is in 4px increments so a `marginTop` of 2 is 8px. For viewports of size sm and larger.
   */
  smMarginTop?: Margin,
  /**
   * Scale is in 4px increments so a `marginTop` of 2 is 8px. For viewports of size md and larger.
   */
  mdMarginTop?: Margin,
  /**
   * Scale is in 4px increments so a `marginTop` of 2 is 8px. For viewports of size lg and larger.
   */
  lgMarginTop?: Margin,
  /**
   * Scale is in 4px increments so a `marginBottom` of 2 is 8px.
   *
   * Also available in responsive sizes: `smMarginBottom`, `mdMarginBottom`, `lgMarginBottom`
   * Default: 0
   */
  marginBottom?: Margin,
  /**
   * Scale is in 4px increments so a `marginBottom` of 2 is 8px. For viewports of size sm and larger.
   */
  smMarginBottom?: Margin,
  /**
   * Scale is in 4px increments so a `marginBottom` of 2 is 8px. For viewports of size md and larger.
   */
  mdMarginBottom?: Margin,
  /**
   * Scale is in 4px increments so a `marginBottom` of 2 is 8px. For viewports of size lg and larger.
   */
  lgMarginBottom?: Margin,
  /**
   * Applies margin to the left in left-to-right languages, and to the right in right-to-left languages. See the [Localization guidelines](https://gestalt.pinterest.systems/web/box#Page-direction) to learn more about using `marginStart`.
   * Scale is in 4px increments so a `marginStart` of 2 is 8px.
   *
   * Also available in responsive sizes: `smMarginStart`, `mdMarginStart`, `lgMarginStart`
   * Default: 0
   */
  marginStart?: Margin,
  /**
   * Applies margin to the left in left-to-right languages, and to the right in right-to-left languages. See the [Localization guidelines](https://gestalt.pinterest.systems/web/box#Page-direction) to learn more about using `marginStart`.
   * Scale is in 4px increments so a `marginStart` of 2 is 8px. For viewports of size sm and larger.
   */
  smMarginStart?: Margin,
  /**
   * Applies margin to the left in left-to-right languages, and to the right in right-to-left languages. See the [Localization guidelines](https://gestalt.pinterest.systems/web/box#Page-direction) to learn more about using `marginStart`.
   * Scale is in 4px increments so a `marginStart` of 2 is 8px. For viewports of size md and larger.
   */
  mdMarginStart?: Margin,
  /**
   * Applies margin to the left in left-to-right languages, and to the right in right-to-left languages. See the [Localization guidelines](https://gestalt.pinterest.systems/web/box#Page-direction) to learn more about using `marginStart`.
   * Scale is in 4px increments so a `marginStart` of 2 is 8px. For viewports of size lg and larger.
   */
  lgMarginStart?: Margin,
  /**
   * Applies margin to the right in left-to-right languages, and to the left in right-to-left languages. See the [Localization guidelines](https://gestalt.pinterest.systems/web/box#Page-direction) to learn more about using `marginEnd`.
   * Scale is in 4px increments so a marginEnd of 2 is 8px.
   *
   * Also available in responsive sizes: `smMarginEnd`, `mdMarginEnd`, `lgMarginEnd`
   * Default: 0
   */
  marginEnd?: Margin,
  /**
   * Applies margin to the right in left-to-right languages, and to the left in right-to-left languages. See the [Localization guidelines](https://gestalt.pinterest.systems/web/box#Page-direction) to learn more about using `marginEnd`.
   * Scale is in 4px increments so a marginEnd of 2 is 8px. For viewports of size sm and larger.
   */
  smMarginEnd?: Margin,
  /**
   * Applies margin to the right in left-to-right languages, and to the left in right-to-left languages. See the [Localization guidelines](https://gestalt.pinterest.systems/web/box#Page-direction) to learn more about using `marginEnd`.
   * Scale is in 4px increments so a marginEnd of 2 is 8px. For viewports of size md and larger.
   */
  mdMarginEnd?: Margin,
  /**
   * Applies margin to the right in left-to-right languages, and to the left in right-to-left languages. See the [Localization guidelines](https://gestalt.pinterest.systems/web/box#Page-direction) to learn more about using `marginEnd`.
   * Scale is in 4px increments so a marginEnd of 2 is 8px. For viewports of size lg and larger.
   */
  lgMarginEnd?: Margin,
  /**
   * Use numbers for pixels: maxHeight={100} and strings for percentages: maxHeight="100%". See the [sizing](https://gestalt.pinterest.systems/web/box#Sizing) variant for more info.
   */
  maxHeight?: Dimension,
  /**
   * Use numbers for pixels: maxWidth={100} and strings for percentages: maxWidth="100%". See the [sizing](https://gestalt.pinterest.systems/web/box#Sizing) variant for more info.
   */
  maxWidth?: Dimension,
  /**
   * Use numbers for pixels: minHeight={100} and strings for percentages: minHeight="100%". See the [sizing](https://gestalt.pinterest.systems/web/box#Sizing) variant for more info.
   */
  minHeight?: Dimension,
  /**
   * Use numbers for pixels: minWidth={100} and strings for percentages: minWidth="100%". See the [sizing](https://gestalt.pinterest.systems/web/box#Sizing) variant for more info.
   */
  minWidth?: Dimension,
  /**
   * See the [opacity](https://gestalt.pinterest.systems/web/box#Opacity) variant for more info.
   */
  opacity?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1,
  /**
   * See the [overflow](https://gestalt.pinterest.systems/web/box#Overflow) variant for more info.
   * Default: 'visible'
   */
  overflow?: 'visible' | 'hidden' | 'scroll' | 'scrollX' | 'scrollY' | 'auto',
  /**
   * Supports 3 responsive breakpoints: sm, md, lg. Each sets the padding from that breakpoint and up. See the [responsive padding](https://gestalt.pinterest.systems/web/box#Responsive-padding) variant for more info.
   *
   * Also available in responsive sizes: `smPadding`, `mdPadding`, `lgPadding`
   * Default: 0
   */
  padding?: Padding,
  /**
   * Supports 3 responsive breakpoints: sm, md, lg. Each sets the padding from that breakpoint and up. See the [responsive padding](https://gestalt.pinterest.systems/web/box#Responsive-padding) variant for more info.
   */
  smPadding?: Padding,
  /**
   * Supports 3 responsive breakpoints: sm, md, lg. Each sets the padding from that breakpoint and up. See the [responsive padding](https://gestalt.pinterest.systems/web/box#Responsive-padding) variant for more info.
   */
  mdPadding?: Padding,
  /**
   * Supports 3 responsive breakpoints: sm, md, lg. Each sets the padding from that breakpoint and up. See the [responsive padding](https://gestalt.pinterest.systems/web/box#Responsive-padding) variant for more info.
   */
  lgPadding?: Padding,
  /**
   * Horizontal padding (left/right).
   *
   * Also available in responsive sizes: `smPaddingX`, `mdPaddingX`, `lgPaddingX`
   * Default: 0
   */
  paddingX?: Padding,
  /**
   * Horizontal padding (left/right). For viewports of size sm and larger.
   */
  smPaddingX?: Padding,
  /**
   * Horizontal padding (left/right). For viewports of size md and larger.
   */
  mdPaddingX?: Padding,
  /**
   * Horizontal padding (left/right). For viewports of size lg and larger.
   */
  lgPaddingX?: Padding,
  /**
   * Vertical padding (top/bottom).
   *
   * Also available in responsive sizes: `smPaddingY`, `mdPaddingY`, `lgPaddingY`
   * Default: 0
   */
  paddingY?: Padding,
  /**
   * Vertical padding (top/bottom). For viewports of size sm and larger.
   */
  smPaddingY?: Padding,
  /**
   * Vertical padding (top/bottom). For viewports of size md and larger.
   */
  mdPaddingY?: Padding,
  /**
   * Vertical padding (top/bottom). For viewports of size lg and larger.
   */
  lgPaddingY?: Padding,
  /**
   * See the [absolute positioning](https://gestalt.pinterest.systems/web/box#Absolute-positioning) variant for more info.
   * Default: 'static'
   */
  position?: 'static' | 'absolute' | 'relative' | 'fixed',
  /**
   * Ref that is forwarded to the underlying input element. See the [using as a ref](https://gestalt.pinterest.systems/web/box#Using-as-a-ref) variant for more info.
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
   * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.pinterest.systems/web/box#Absolute-positioning) variant for more info.
   * Default: false
   */
  right?: boolean,
  /**
   * Used to designate the Box as a type of element or landmark using ARIA roles. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/box#Using-role) to learn more about using `role`.
   */
  role?: string,
  /**
   * See the [rounding](https://gestalt.pinterest.systems/web/box#Rounding) variant for more info.
   */
  rounding?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill',
  /**
   * Helper to specify location when using absolute positioning. See the [absolute positioning](https://gestalt.pinterest.systems/web/box#Absolute-positioning) variant for more info.
   * Default: false
   */
  top?: boolean,
  /**
   * Controls whether or not user can select text.
   * Default: 'auto'
   */
  userSelect?: 'auto' | 'none',
  /**
   * Use numbers for pixels: width={100} and strings for percentages: width="100%". See the [sizing](https://gestalt.pinterest.systems/web/box#Sizing) variant for more info.
   */
  width?: Dimension,
  /**
   * By default, flex items will all try to fit onto one line. You can change that and allow the items to wrap onto multiple lines, from top to bottom.
   *
   * Learn more about Flexbox layouts on [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). If you're using Box strictly for Flexbox layouts, check out [Flex](https://gestalt.pinterest.systems/web/flex)!
   * Default: false
   */
  wrap?: boolean,
  /**
   * An object representing the zIndex value of the Box. See the [Z-Index](https://gestalt.pinterest.systems/web/box#Z-Index) variant for more info.
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
 * [Box](https://gestalt.pinterest.systems/web/box) is a component primitive that can be used to build the foundation of pretty much any other component. It keeps details like spacing, borders and colors consistent with the rest of Gestalt, while allowing the developer to focus on the content.
 *
 * ![Box light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Box.spec.mjs-snapshots/Box-chromium-darwin.png)
 * ![Box dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Box-dark.spec.mjs-snapshots/Box-dark-chromium-darwin.png)
 *
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
