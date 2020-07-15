// @flow strict

/*

# Welcome to Box!

This guide will help you navigate and understand its design. This file is roughly organized like:

  1. Flow Types
  2. Prop transformers
  3. Box itself
  4. PropTypes

I'll explain each part as we go through. Just remember, if you want to make updates, PLEASE PLEASE PLEASE update the Flow Types & PropTypes (even though they look scary).

*/

import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './Box.css';
import borders from './Borders.css';
import colors from './Colors.css';
import layout from './Layout.css';
import whitespace from './boxWhitespace.css';
import {
  concat,
  fromClassName,
  fromInlineStyle,
  identity,
  mapClassName,
  toProps,
  type Style,
} from './style.js';
import {
  union,
  bind,
  range,
  toggle,
  mapping,
  rangeWithoutZero,
} from './transforms.js';
import { getRoundingStyle } from './getRoundingClassName.js';
import { type Indexable } from './zIndex.js';

/*

# PropTypes

Box's type definition is exhaustive. With the exception of `dangerouslySetInlineStyle`, values
shouldn't be ambigious. That means that we have to type out things like boints, but that's also
where Box's magic lies. Also, by putting in extra effort around type definitions here, we can skip
extra runtime typechecks in the transformers for performance.

*/

export type AlignContent =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch';

export type AlignItems = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

export type AlignSelf =
  | 'auto'
  | 'start'
  | 'end'
  | 'center'
  | 'baseline'
  | 'stretch';

type Column = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type Dimension = number | string;

type Display = 'none' | 'flex' | 'block' | 'inlineBlock' | 'visuallyHidden';

export type Direction = 'row' | 'column';

export type Flex = 'grow' | 'shrink' | 'none';

export type JustifyContent =
  | 'start'
  | 'end'
  | 'center'
  | 'between'
  | 'around'
  | 'evenly';

export type Margin =
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

export type Overflow =
  | 'visible'
  | 'hidden'
  | 'scroll'
  | 'scrollX'
  | 'scrollY'
  | 'auto';

export type Padding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type ResponsiveProps = {|
  column?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  display?: boolean | 'flex' | 'flexColumn' | 'inlineBlock',
|};

type Rounding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'circle' | 'pill';

type PropType = {
  children?: React.Node,
  dangerouslySetInlineStyle?: {|
    __style: { [key: string]: string | number | void },
  |},

  xs?: ResponsiveProps,
  sm?: ResponsiveProps,
  md?: ResponsiveProps,
  lg?: ResponsiveProps,

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
  bottom?: boolean,
  borderSize?: 'sm' | 'lg' | 'none',
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
  fit?: boolean,
  flex?: Flex,
  height?: Dimension,
  justifyContent?: JustifyContent,
  left?: boolean,

  marginStart?: Margin,
  marginEnd?: Margin,

  margin?: Margin,
  marginTop?: Margin,
  marginRight?: Margin,
  marginBottom?: Margin,
  marginLeft?: Margin,

  smMargin?: Margin,
  smMarginTop?: Margin,
  smMarginRight?: Margin,
  smMarginBottom?: Margin,
  smMarginLeft?: Margin,

  mdMargin?: Margin,
  mdMarginTop?: Margin,
  mdMarginRight?: Margin,
  mdMarginBottom?: Margin,
  mdMarginLeft?: Margin,

  lgMargin?: Margin,
  lgMarginTop?: Margin,
  lgMarginRight?: Margin,
  lgMarginBottom?: Margin,
  lgMarginLeft?: Margin,

  maxHeight?: Dimension,
  maxWidth?: Dimension,
  minHeight?: Dimension,
  minWidth?: Dimension,

  opacity?: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1,

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

  position?: 'static' | 'absolute' | 'relative' | 'fixed',
  right?: boolean,
  rounding?: Rounding,
  top?: boolean,
  width?: Dimension,
  wrap?: boolean,

  userSelect?: 'auto' | 'none',

  role?: string,

  zIndex?: Indexable,
  ...
};

// --

/*

# Transformers

This is where the meat and the bones of Box's transforms are. You can read more about the DSL in `./transforms.js`, but basically they are a small declarative way of specifying how a property (i.e. `marginTop={4}`) gets turned into a CSS class (`marginTop4`).

There's a little preamble here, but it culminates in a big object mapping the actual property names to the transformer values.

*/

const transformNumberOrPassthrough = (selector: string) => (
  m: Margin
): Style => {
  if (typeof m === 'number') {
    return bind(rangeWithoutZero(selector), whitespace)(m);
  }

  if (m === 'auto') {
    return fromClassName(whitespace[`${selector}Auto`]);
  }

  return identity();
};

const marginStart = transformNumberOrPassthrough('marginStart');
const marginEnd = transformNumberOrPassthrough('marginEnd');
const marginTop = transformNumberOrPassthrough('marginTop');
const marginRight = transformNumberOrPassthrough('marginRight');
const marginBottom = transformNumberOrPassthrough('marginBottom');
const marginLeft = transformNumberOrPassthrough('marginLeft');
const margin = union(marginTop, marginBottom, marginLeft, marginRight);

const smMarginTop = transformNumberOrPassthrough('smMarginTop');
const smMarginRight = transformNumberOrPassthrough('smMarginRight');
const smMarginBottom = transformNumberOrPassthrough('smMarginBottom');
const smMarginLeft = transformNumberOrPassthrough('smMarginLeft');
const smMargin = union(
  smMarginTop,
  smMarginBottom,
  smMarginLeft,
  smMarginRight
);

const mdMarginTop = transformNumberOrPassthrough('mdMarginTop');
const mdMarginRight = transformNumberOrPassthrough('mdMarginRight');
const mdMarginBottom = transformNumberOrPassthrough('mdMarginBottom');
const mdMarginLeft = transformNumberOrPassthrough('mdMarginLeft');
const mdMargin = union(
  mdMarginTop,
  mdMarginBottom,
  mdMarginLeft,
  mdMarginRight
);

const lgMarginTop = transformNumberOrPassthrough('lgMarginTop');
const lgMarginRight = transformNumberOrPassthrough('lgMarginRight');
const lgMarginBottom = transformNumberOrPassthrough('lgMarginBottom');
const lgMarginLeft = transformNumberOrPassthrough('lgMarginLeft');
const lgMargin = union(
  lgMarginTop,
  lgMarginBottom,
  lgMarginLeft,
  lgMarginRight
);

const paddingX = bind(rangeWithoutZero('paddingX'), whitespace);
const paddingY = bind(rangeWithoutZero('paddingY'), whitespace);
const padding = union(paddingX, paddingY);

const smPaddingX = bind(rangeWithoutZero('smPaddingX'), whitespace);
const smPaddingY = bind(rangeWithoutZero('smPaddingY'), whitespace);
const smPadding = union(smPaddingX, smPaddingY);

const mdPaddingX = bind(rangeWithoutZero('mdPaddingX'), whitespace);
const mdPaddingY = bind(rangeWithoutZero('mdPaddingY'), whitespace);
const mdPadding = union(mdPaddingX, mdPaddingY);

const lgPaddingX = bind(rangeWithoutZero('lgPaddingX'), whitespace);
const lgPaddingY = bind(rangeWithoutZero('lgPaddingY'), whitespace);
const lgPadding = union(lgPaddingX, lgPaddingY);

const opacityMap = mapClassName(name => styles[name]);
const opacity = val => {
  if (val > 0 && val < 1) {
    return opacityMap(range('opacity0')(val * 10));
  }
  return opacityMap(range('opacity')(val));
};

/*

These functions are legacy. I'd like to get rid of most of this file's dependency on importing `./style.js` directly once these are removed.

*/

const prefix = (pre: string) => mapClassName(name => `${pre}${name}`);
const display = value => {
  switch (value) {
    case 'flex':
      return fromClassName('DisplayFlex', 'DirectionRow');
    case 'flexColumn':
      return fromClassName('DisplayFlex', 'DirectionColumn');
    case 'inlineBlock':
      return fromClassName('DisplayInlineBlock');
    case 'visuallyHidden':
      return fromClassName('DisplayVisuallyHidden');
    case false:
      return fromClassName('DisplayNone');
    default:
      /* block */
      return fromClassName('DisplayBlock');
  }
};
const column = range('Col');

/*

It's preferable to put new properties into that object directly just so it's easier to read.

*/

const propToFn = {
  xs: value => {
    if (!value) {
      return identity();
    }
    return mapClassName(c => styles[c])(
      prefix('xs')(
        concat([
          value.column ? column(value.column) : identity(),
          typeof value.display !== 'undefined'
            ? display(value.display)
            : identity(),
        ])
      )
    );
  },
  sm: value => {
    if (!value) {
      return identity();
    }
    return mapClassName(c => styles[c])(
      prefix('sm')(
        concat([
          value.column ? column(value.column) : identity(),
          typeof value.display !== 'undefined'
            ? display(value.display)
            : identity(),
        ])
      )
    );
  },
  md: value => {
    if (!value) {
      return identity();
    }
    return mapClassName(c => styles[c])(
      prefix('md')(
        concat([
          value.column ? column(value.column) : identity(),
          typeof value.display !== 'undefined'
            ? display(value.display)
            : identity(),
        ])
      )
    );
  },
  lg: value => {
    if (!value) {
      return identity();
    }
    return mapClassName(c => styles[c])(
      prefix('lg')(
        concat([
          value.column ? column(value.column) : identity(),
          typeof value.display !== 'undefined'
            ? display(value.display)
            : identity(),
        ])
      )
    );
  },

  display: mapping({
    none: styles.xsDisplayNone,
    flex: styles.xsDisplayFlex,
    block: styles.xsDisplayBlock,
    inlineBlock: styles.xsDisplayInlineBlock,
    visuallyHidden: styles.xsDisplayVisuallyHidden,
  }),
  column: bind(range('xsCol'), styles),
  direction: mapping({
    row: styles.xsDirectionRow,
    column: styles.xsDirectionColumn,
  }),

  smDisplay: mapping({
    none: styles.smDisplayNone,
    flex: styles.smDisplayFlex,
    block: styles.smDisplayBlock,
    inlineBlock: styles.smDisplayInlineBlock,
    visuallyHidden: styles.smDisplayVisuallyHidden,
  }),
  smColumn: bind(range('smCol'), styles),
  smDirection: mapping({
    row: styles.smDirectionRow,
    column: styles.smDirectionColumn,
  }),

  mdDisplay: mapping({
    none: styles.mdDisplayNone,
    flex: styles.mdDisplayFlex,
    block: styles.mdDisplayBlock,
    inlineBlock: styles.mdDisplayInlineBlock,
    visuallyHidden: styles.mdDisplayVisuallyHidden,
  }),
  mdColumn: bind(range('mdCol'), styles),
  mdDirection: mapping({
    row: styles.mdDirectionRow,
    column: styles.mdDirectionColumn,
  }),

  lgDisplay: mapping({
    none: styles.lgDisplayNone,
    flex: styles.lgDisplayFlex,
    block: styles.lgDisplayBlock,
    inlineBlock: styles.lgDisplayInlineBlock,
    visuallyHidden: styles.lgDisplayVisuallyHidden,
  }),
  lgColumn: bind(range('lgCol'), styles),
  lgDirection: mapping({
    row: styles.lgDirectionRow,
    column: styles.lgDirectionColumn,
  }),

  alignContent: mapping({
    start: layout.contentStart,
    end: layout.contentEnd,
    center: layout.contentCenter,
    between: layout.contentBetween,
    around: layout.contentAround,
    evenly: layout.contentEvenly,
    // default: stretch
  }),
  alignItems: mapping({
    start: layout.itemsStart,
    end: layout.itemsEnd,
    center: layout.itemsCenter,
    baseline: layout.itemsBaseline,
    // default: stretch
  }),
  alignSelf: mapping({
    start: layout.selfStart,
    end: layout.selfEnd,
    center: layout.selfCenter,
    baseline: layout.selfBaseline,
    stretch: layout.selfStretch,
    // default: auto
  }),
  bottom: toggle(layout.bottom0),
  borderSize: value => {
    const borderProps =
      value !== 'none'
        ? [
            fromClassName(borders.solid),
            fromClassName(borders.borderColorLightGray),
          ]
        : [];
    return concat([
      mapping({
        sm: borders.sizeSm,
        lg: borders.sizeLg,
        // default: none
      })(value),
      ...borderProps,
    ]);
  },
  color: mapping({
    blue: colors.blueBg,
    darkGray: colors.darkGrayBg,
    pine: colors.pineBg,
    gray: colors.grayBg,
    red: colors.redBg,
    olive: colors.oliveBg,
    lightGray: colors.lightGrayBg,
    white: colors.whiteBg,
    orange: colors.orangeBg,
    green: colors.greenBg,
    navy: colors.navyBg,
    midnight: colors.midnightBg,
    purple: colors.purpleBg,
    orchid: colors.orchidBg,
    eggplant: colors.eggplantBg,
    maroon: colors.maroonBg,
    watermelon: colors.watermelonBg,
    lightWash: colors.lightWashBg,
    darkWash: colors.darkWashBg,
    transparentDarkGray: colors.transparentDarkGrayBg,
    // default: transparent
  }),
  fit: toggle(layout.fit),
  flex: mapping({
    grow: layout.flexGrow,
    none: layout.flexNone,
    // default: shrink
  }),
  height: height => fromInlineStyle({ height }),
  justifyContent: mapping({
    end: layout.justifyEnd,
    center: layout.justifyCenter,
    between: layout.justifyBetween,
    around: layout.justifyAround,
    evenly: layout.justifyEvenly,
    // default: start
  }),
  left: toggle(layout.left0),
  marginStart,
  marginEnd,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  smMargin,
  smMarginTop,
  smMarginRight,
  smMarginBottom,
  smMarginLeft,
  mdMargin,
  mdMarginTop,
  mdMarginRight,
  mdMarginBottom,
  mdMarginLeft,
  lgMargin,
  lgMarginTop,
  lgMarginRight,
  lgMarginBottom,
  lgMarginLeft,
  maxHeight: maxHeight => fromInlineStyle({ maxHeight }),
  maxWidth: maxWidth => fromInlineStyle({ maxWidth }),
  minHeight: minHeight => fromInlineStyle({ minHeight }),
  minWidth: minWidth => fromInlineStyle({ minWidth }),
  opacity,
  overflow: mapping({
    hidden: layout.overflowHidden,
    scroll: layout.overflowScroll,
    auto: layout.overflowAuto,
    scrollX: layout.overflowScrollX,
    scrollY: layout.overflowScrollY,
    // default: visible
  }),
  padding,
  paddingX,
  paddingY,
  smPadding,
  smPaddingX,
  smPaddingY,
  mdPadding,
  mdPaddingX,
  mdPaddingY,
  lgPadding,
  lgPaddingX,
  lgPaddingY,
  position: mapping({
    absolute: layout.absolute,
    relative: layout.relative,
    fixed: layout.fixed,
    // default: static
  }),
  right: toggle(layout.right0),
  rounding: getRoundingStyle,
  top: toggle(layout.top0),
  userSelect: mapping({
    none: styles.userSelectNone,
    // default: auto
  }),
  width: width => fromInlineStyle({ width }),
  wrap: toggle(layout.flexWrap),
  dangerouslySetInlineStyle: value => {
    // eslint-disable-next-line no-underscore-dangle
    return value && value.__style ? fromInlineStyle(value.__style) : identity();
  },
  zIndex: (value: ?Indexable) => {
    if (!value) {
      return identity();
    }
    return fromInlineStyle({ zIndex: value.index() });
  },
};

/*

# The Component

*/

const contains = (key, arr) => arr.indexOf(key) >= 0;
const omit = (keys, obj) =>
  Object.keys(obj).reduce((acc, k: string) => {
    if (contains(k, keys)) {
      return acc;
    }
    return {
      ...acc,
      [k]: obj[k],
    };
  }, {});

// Box is a "pass-through" component, meaning that if you pass properties to it
// that it doesn't know about (`aria-label` for instance) it passes directly
// back to the underlying `<div/>`. That's generally useful, but we'd also like
// to strip out a few naughty properties that break style encapsulation
// (className, style) or accessibility (onClick).
const blacklistProps = ['onClick', 'className', 'style'];

const BoxWithRef: React.AbstractComponent<
  PropType,
  HTMLDivElement
> = React.forwardRef<PropType, HTMLDivElement>(function Box(props, ref) {
  // Flow can't reason about the constant nature of Object.keys so we can't use
  // a functional (reduce) style here.

  // All Box's are box-sized by default, so we start off building up the styles
  // to be applied with a Box base class.
  let s = fromClassName(styles.box);

  // Init the list of props we'll omit from passthrough. We'll add to this
  // list as we match props against the transforms list.
  const omitProps = [...blacklistProps];

  // This loops through each property and if it exists in the previously
  // defined transform map, concatentes the resulting styles to the base
  // styles. If there's a match, we also don't pass through that property. This
  // means Box's runtime is only dependent on the number of properties passed
  // to it (which is typically small) instead of the total number of possible
  // properties (~30 or so). While it may ~feel~ like Box is innefficient, its
  // biggest performance impact is on startup time because there's so much code
  // here.

  // eslint-disable-next-line no-restricted-syntax
  for (const prop in props) {
    if (Object.prototype.hasOwnProperty.call(propToFn, prop)) {
      const fn = propToFn[prop];
      const value = props[prop];
      omitProps.push(prop);
      s = concat([s, fn(value)]);
    }
  }

  // And... magic!
  return <div {...omit(omitProps, props)} {...toProps(s)} ref={ref} />;
});

// This is a legacy backport around tools external to Gestalt (*waves hands*)
// expecting Boxes' displayName to be just "Box" and not "ForwardRef(Box)".
BoxWithRef.displayName = 'Box';

export default BoxWithRef;

/*

# PropTypes

And we're done here :)

*/

export const AlignContentPropType: React$PropType$Primitive<
  'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch'
> = PropTypes.oneOf([
  'start',
  'end',
  'center',
  'between',
  'around',
  'evenly',
  'stretch',
]);

export const AlignItemsPropType: React$PropType$Primitive<
  'start' | 'end' | 'center' | 'baseline' | 'stretch'
> = PropTypes.oneOf(['start', 'end', 'center', 'baseline', 'stretch']);

export const AlignSelfPropType: React$PropType$Primitive<
  'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch'
> = PropTypes.oneOf(['auto', 'start', 'end', 'center', 'baseline', 'stretch']);

const ColumnPropType = PropTypes.oneOf([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
]);

export const DimensionPropType: React$PropType$Primitive<
  number | string
> = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);

export const DirectionPropType: React$PropType$Primitive<
  'row' | 'column'
> = PropTypes.oneOf(['row', 'column']);

const DisplayPropType = PropTypes.oneOf([
  'none',
  'flex',
  'block',
  'inlineBlock',
  'visuallyHidden',
]);

export const FlexPropType: React$PropType$Primitive<
  'grow' | 'shrink' | 'none'
> = PropTypes.oneOf(['grow', 'shrink', 'none']);

export const JustifyContentPropType: React$PropType$Primitive<
  'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
> = PropTypes.oneOf(['start', 'end', 'center', 'between', 'around', 'evenly']);

export const MarginPropType: React$PropType$Primitive<
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
  | 'auto'
> = PropTypes.oneOf([
  -12,
  -11,
  -10,
  -9,
  -8,
  -7,
  -6,
  -5,
  -4,
  -3,
  -2,
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  'auto',
]);

export const OverflowPropType: React$PropType$Primitive<
  'visible' | 'hidden' | 'scroll' | 'scrollX' | 'scrollY' | 'auto'
> = PropTypes.oneOf([
  'visible',
  'hidden',
  'scroll',
  'scrollX',
  'scrollY',
  'auto',
]);

export const PaddingPropType: React$PropType$Primitive<
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
> = PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

const RoundingPropType = PropTypes.oneOf([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  'circle',
  'pill',
]);

const SizeDisplayPropType = PropTypes.oneOf([
  'flex',
  'flexColumn',
  'inlineBlock',
]);

// $FlowFixMe
BoxWithRef.propTypes = {
  children: PropTypes.node,
  dangerouslySetInlineStyle: PropTypes.exact({
    __style: PropTypes.object,
  }),

  xs: PropTypes.exact({
    display: PropTypes.oneOfType([PropTypes.bool, SizeDisplayPropType]),
    column: PropTypes.number,
  }),
  sm: PropTypes.exact({
    display: PropTypes.oneOfType([PropTypes.bool, SizeDisplayPropType]),
    column: PropTypes.number,
  }),
  md: PropTypes.exact({
    display: PropTypes.oneOfType([PropTypes.bool, SizeDisplayPropType]),
    column: PropTypes.number,
  }),
  lg: PropTypes.exact({
    display: PropTypes.oneOfType([PropTypes.bool, SizeDisplayPropType]),
    column: PropTypes.number,
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
  borderSize: PropTypes.oneOf(['sm', 'lg', 'none']),
  color: PropTypes.oneOf([
    'blue',
    'darkGray',
    'darkWash',
    'eggplant',
    'gray',
    'green',
    'lightGray',
    'lightWash',
    'maroon',
    'midnight',
    'navy',
    'olive',
    'orange',
    'orchid',
    'pine',
    'purple',
    'red',
    'transparent',
    'transparentDarkGray',
    'watermelon',
    'white',
  ]),
  fit: PropTypes.bool,
  flex: FlexPropType,
  height: DimensionPropType,
  justifyContent: JustifyContentPropType,
  left: PropTypes.bool,

  marginStart: MarginPropType,
  marginEnd: MarginPropType,

  margin: MarginPropType,
  marginTop: MarginPropType,
  marginRight: MarginPropType,
  marginBottom: MarginPropType,
  marginLeft: MarginPropType,

  smMargin: MarginPropType,
  smMarginTop: MarginPropType,
  smMarginRight: MarginPropType,
  smMarginBottom: MarginPropType,
  smMarginLeft: MarginPropType,

  mdMargin: MarginPropType,
  mdMarginTop: MarginPropType,
  mdMarginRight: MarginPropType,
  mdMarginBottom: MarginPropType,
  mdMarginLeft: MarginPropType,

  lgMargin: MarginPropType,
  lgMarginTop: MarginPropType,
  lgMarginRight: MarginPropType,
  lgMarginBottom: MarginPropType,
  lgMarginLeft: MarginPropType,

  maxHeight: DimensionPropType,
  maxWidth: DimensionPropType,
  minHeight: DimensionPropType,
  minWidth: DimensionPropType,

  opacity: PropTypes.oneOf([0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]),

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

  position: PropTypes.oneOf(['static', 'absolute', 'relative', 'fixed']),
  right: PropTypes.bool,
  rounding: RoundingPropType,
  top: PropTypes.bool,
  width: DimensionPropType,
  wrap: PropTypes.bool,

  userSelect: PropTypes.oneOf(['auto', 'none']),

  role: PropTypes.string,

  // eslint-disable-next-line react/forbid-prop-types
  zIndex: PropTypes.any,
};
