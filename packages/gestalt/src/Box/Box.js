// @flow

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
import borders from '../Borders.css';
import colors from '../Colors.css';
import layout from '../Layout.css';
import whitespace from './whitespace.css';
import whitespaceLegacy from '../Whitespace.css';
import {
  concat,
  fromClassName,
  fromInlineStyle,
  identity,
  mapClassName,
  toProps,
} from './style';
import {
  union,
  bind,
  range,
  toggle,
  mapping,
  rangeWithoutZero,
} from './transforms';

/*

# ProTypes

Box's type definition is exhaustive. With the exception of `dangerouslySetInlineStyle`, values shouldn't be ambigious. That means that we have to type out things like boints, but that's also where Box's magic lies. Also, by putting in extra effort around type definitions here, we can skip extra runtime typechecks in the transformers for performance.

*/

type NatBoint = 1 | 2 | 3 | 4 | 5 | 6;
type IntBoint = -6 | -5 | -4 | -3 | -2 | -1 | NatBoint;
type Display = 'none' | 'flex' | 'block' | 'inlineBlock';
type Direction = 'row' | 'column';
type Column = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type ResponsiveProps = {
  column?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  display?: boolean | 'flex' | 'flexColumn' | 'inlineBlock',
};
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
  | 12;
type Padding = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type PropType = {
  children?: React.Node,
  dangerouslySetInlineStyle?: { __style: { [key: string]: any } },

  xs?: ResponsiveProps,
  sm?: ResponsiveProps,
  md?: ResponsiveProps,
  lg?: ResponsiveProps,
  deprecatedPadding?: NatBoint | { x?: NatBoint, y?: NatBoint },
  deprecatedMargin?:
    | IntBoint
    | {
        top?: IntBoint,
        right?: IntBoint | 'auto',
        bottom?: IntBoint,
        left?: IntBoint | 'auto',
      },

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

  alignContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'stretch',
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  bottom?: boolean,
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
    | 'watermelon'
    | 'white',
  fit?: boolean,
  flex?: 'grow' | 'shrink' | 'none',
  height?: number | string,
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around',
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

  maxHeight?: number | string,
  maxWidth?: number | string,
  minHeight?: number | string,
  minWidth?: number | string,

  overflow?: 'visible' | 'hidden' | 'scroll' | 'scrollX' | 'scrollY' | 'auto',

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
  shape?:
    | 'square'
    | 'rounded'
    | 'pill'
    | 'circle'
    | 'roundedTop'
    | 'roundedBottom'
    | 'roundedLeft'
    | 'roundedRight',
  shrink?: boolean,
  top?: boolean,
  width?: number | string,
  wrap?: boolean,
};

// --

/*

# Transformers

This is where the meat and the bones of Box's transforms are. You can read more about the DSL in `./transforms.js`, but basically they are a small declarative way of specifying how a property (i.e. `marginTop={4}`) gets turned into a CSS class (`marginTop4`).

There's a little preamble here, but it culminates in a big object mapping the actual property names to the transformer values.

*/

const marginStart = bind(rangeWithoutZero('marginStart'), whitespace);
const marginEnd = bind(rangeWithoutZero('marginEnd'), whitespace);
const marginTop = bind(rangeWithoutZero('marginTop'), whitespace);
const marginRight = bind(rangeWithoutZero('marginRight'), whitespace);
const marginBottom = bind(rangeWithoutZero('marginBottom'), whitespace);
const marginLeft = bind(rangeWithoutZero('marginLeft'), whitespace);
const margin = union(marginTop, marginBottom, marginLeft, marginRight);

const smMarginTop = bind(rangeWithoutZero('smMarginTop'), whitespace);
const smMarginRight = bind(rangeWithoutZero('smMarginRight'), whitespace);
const smMarginBottom = bind(rangeWithoutZero('smMarginBottom'), whitespace);
const smMarginLeft = bind(rangeWithoutZero('smMarginLeft'), whitespace);
const smMargin = union(
  smMarginTop,
  smMarginBottom,
  smMarginLeft,
  smMarginRight
);

const mdMarginTop = bind(rangeWithoutZero('mdMarginTop'), whitespace);
const mdMarginRight = bind(rangeWithoutZero('mdMarginRight'), whitespace);
const mdMarginBottom = bind(rangeWithoutZero('mdMarginBottom'), whitespace);
const mdMarginLeft = bind(rangeWithoutZero('mdMarginLeft'), whitespace);
const mdMargin = union(
  mdMarginTop,
  mdMarginBottom,
  mdMarginLeft,
  mdMarginRight
);

const lgMarginTop = bind(rangeWithoutZero('lgMarginTop'), whitespace);
const lgMarginRight = bind(rangeWithoutZero('lgMarginRight'), whitespace);
const lgMarginBottom = bind(rangeWithoutZero('lgMarginBottom'), whitespace);
const lgMarginLeft = bind(rangeWithoutZero('lgMarginLeft'), whitespace);
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
    case false:
      return fromClassName('DisplayNone');
    default:
      /* block */
      return fromClassName('DisplayBlock');
  }
};
const column = range('Col');

const formatIntBoint = x => (x < 0 ? `n${Math.abs(x)}` : x.toString());

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
    // default: start
  }),
  left: toggle(layout.left0),
  deprecatedMargin: value => {
    let mt = identity();
    let mb = identity();
    let ml = identity();
    let mr = identity();
    switch (typeof value) {
      case 'number':
        return fromClassName(whitespaceLegacy[`m${formatIntBoint(value)}`]);
      case 'object':
        if (value.top) {
          mt = fromClassName(
            whitespaceLegacy[`mt${formatIntBoint(value.top)}`]
          );
        }

        if (value.bottom) {
          mb = fromClassName(
            whitespaceLegacy[`mb${formatIntBoint(value.bottom)}`]
          );
        }

        if (value.left) {
          ml = fromClassName(
            value.left === 'auto'
              ? whitespaceLegacy.mlAuto
              : whitespaceLegacy[`ml${formatIntBoint(value.left)}`]
          );
        }

        if (value.right) {
          mr = fromClassName(
            value.right === 'auto'
              ? whitespaceLegacy.mrAuto
              : whitespaceLegacy[`mr${formatIntBoint(value.right)}`]
          );
        }
        return concat([mt, mb, ml, mr]);
      default:
        return identity();
    }
  },
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
  overflow: mapping({
    hidden: layout.overflowHidden,
    scroll: layout.overflowScroll,
    auto: layout.overflowAuto,
    scrollX: layout.overflowScrollX,
    scrollY: layout.overflowScrollY,
    // default: visible
  }),
  deprecatedPadding: value => {
    switch (typeof value) {
      case 'number':
        return fromClassName(whitespaceLegacy[`p${value}`]);
      case 'object':
        return concat([
          value.x
            ? fromClassName(whitespaceLegacy[`px${value.x}`])
            : identity(),
          value.y
            ? fromClassName(whitespaceLegacy[`py${value.y}`])
            : identity(),
        ]);
      default:
        return identity();
    }
  },
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
  shape: mapping({
    circle: borders.circle,
    pill: borders.pill,
    rounded: borders.rounded,
    roundedBottom: borders.roundedBottom,
    roundedLeft: borders.roundedLeft,
    roundedRight: borders.roundedRight,
    roundedTop: borders.roundedTop,
    // default: square
  }),
  top: toggle(layout.top0),
  width: width => fromInlineStyle({ width }),
  wrap: toggle(layout.flexWrap),
  dangerouslySetInlineStyle: value =>
    /* eslint-disable-next-line no-underscore-dangle */
    value && value.__style ? fromInlineStyle(value.__style) : identity(),
};

/*

# The Component

*/

const contains = (key, arr) => arr.indexOf(key) >= 0;
const omit = (keys, obj) =>
  Object.keys(obj).reduce((acc, k) => {
    if (contains(k, keys)) {
      return acc;
    }
    return {
      ...acc,
      [k]: obj[k],
    };
  }, {});

export default function Box({ children, ...props }: PropType) {
  // Flow can't reason about the constant nature of Object.keys so we can't use
  // a functional (reduce) style here.

  // Box is a "pass-through" component, meaning that if you pass properties to
  // it that it doesn't know about (`aria-label` for instance) it passes
  // directly back to the underlying `<div/>`. That's generally useful, but
  // we'd also like to strip out a few naughty properties that break style
  // encapsulation (className, style) or accessibility (onClick).
  let blacklist = ['onClick', 'className', 'style'];

  // All Box's are box-sized by default, so we start off building up the styles
  // to be applied with a Box base class.
  let s = fromClassName(styles.box);

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
      blacklist = blacklist.concat(prop);
      s = concat([s, fn(value)]);
    }
  }

  // And... magic!
  return (
    <div {...omit(blacklist, props)} {...toProps(s)}>
      {children}
    </div>
  );
}

/*

# PropTypes

And we're done here :)

*/

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

const MarginPropType = PropTypes.oneOf([
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
]);

const PaddingPropType = PropTypes.oneOf([
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

Box.propTypes = {
  children: PropTypes.node,
  dangerouslySetInlineStyle: PropTypes.exact({
    __style: PropTypes.object,
  }),

  xs: PropTypes.exact({
    display: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['flex', 'flexColumn', 'inlineBlock']),
    ]),
    column: PropTypes.number,
  }),
  sm: PropTypes.exact({
    display: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['flex', 'flexColumn', 'inlineBlock']),
    ]),
    column: PropTypes.number,
  }),
  md: PropTypes.exact({
    display: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['flex', 'flexColumn', 'inlineBlock']),
    ]),
    column: PropTypes.number,
  }),
  lg: PropTypes.exact({
    display: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['flex', 'flexColumn', 'inlineBlock']),
    ]),
    column: PropTypes.number,
  }),
  deprecatedMargin: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
      right: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
    }),
  ]),
  deprecatedPadding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  ]),

  display: PropTypes.oneOf(['none', 'flex', 'block', 'inlineBlock']),
  direction: PropTypes.oneOf(['row', 'column']),
  column: ColumnPropType,

  smDisplay: PropTypes.oneOf(['none', 'flex', 'block', 'inlineBlock']),
  smDirection: PropTypes.oneOf(['row', 'column']),
  smColumn: ColumnPropType,

  mdDisplay: PropTypes.oneOf(['none', 'flex', 'block', 'inlineBlock']),
  mdDirection: PropTypes.oneOf(['row', 'column']),
  mdColumn: ColumnPropType,

  lgDisplay: PropTypes.oneOf(['none', 'flex', 'block', 'inlineBlock']),
  lgDirection: PropTypes.oneOf(['row', 'column']),
  lgColumn: ColumnPropType,

  alignContent: PropTypes.oneOf([
    'start',
    'end',
    'center',
    'between',
    'around',
    'stretch',
  ]),
  alignItems: PropTypes.oneOf([
    'start',
    'end',
    'center',
    'baseline',
    'stretch',
  ]),
  alignSelf: PropTypes.oneOf([
    'auto',
    'start',
    'end',
    'center',
    'baseline',
    'stretch',
  ]),
  bottom: PropTypes.bool,
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
    'watermelon',
    'white',
  ]),
  fit: PropTypes.bool,
  flex: PropTypes.oneOf(['grow', 'shrink', 'none']),
  grow: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  justifyContent: PropTypes.oneOf([
    'start',
    'end',
    'center',
    'between',
    'around',
  ]),
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

  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  overflow: PropTypes.oneOf([
    'visible',
    'hidden',
    'scroll',
    'scrollX',
    'scrollY',
    'auto',
  ]),

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
  shape: PropTypes.oneOf([
    'square',
    'rounded',
    'pill',
    'circle',
    'roundedTop',
    'roundedBottom',
    'roundedLeft',
    'roundedRight',
  ]),
  top: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  wrap: PropTypes.bool,
};
