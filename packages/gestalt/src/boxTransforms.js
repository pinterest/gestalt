// @flow strict
import borders from './Borders.css';
import styles from './Box.css';
import {
  type AlignContent,
  type AlignItems,
  type AlignSelf,
  type BorderStyle,
  type Color,
  type Column,
  type DangerouslySetInlineStyle,
  type Dimension,
  type Direction,
  type Display,
  type Flex,
  type JustifyContent,
  type Margin,
  type Opacity,
  type Overflow,
  type Padding,
  type Position,
  type UserSelect,
} from './boxTypes.js';
import whitespace from './boxWhitespace.css';
import colors from './Colors.css';
import { getRoundingStyle } from './getRoundingClassName.js';
import layout from './Layout.css';
import {
  concat,
  fromClassName,
  fromInlineStyle,
  identity,
  mapClassName,
  toProps,
  type ToPropsOutput,
} from './style.js';
import { bind, type Functor, mapping, range, rangeWithZero, toggle, union } from './transforms.js';
import omit from './utils/omit.js';
import { type Indexable } from './zIndex.js';

/*

# Transformers

This is where the meat and the bones of Box's transforms are. You can read more about the DSL in `./transforms.js`, but basically they are a small declarative way of specifying how a property (i.e. `marginTop={4}`) gets turned into a CSS class (`marginTop4`).

There's a little preamble here, but it culminates in a big object mapping the actual property names to the transformer values.

*/

const alignItems: Functor<AlignItems> = mapping({
  start: layout.xsItemsStart,
  end: layout.xsItemsEnd,
  center: layout.xsItemsCenter,
  baseline: layout.xsItemsBaseline,
  // default: stretch
});
const display: Functor<Display> = mapping({
  none: styles.xsDisplayNone,
  flex: styles.xsDisplayFlex,
  block: styles.xsDisplayBlock,
  inlineBlock: styles.xsDisplayInlineBlock,
  visuallyHidden: styles.xsDisplayVisuallyHidden,
});
const column: Functor<Column> = bind(range('xsCol'), styles);
const direction: Functor<Direction> = mapping({
  row: styles.xsDirectionRow,
  column: styles.xsDirectionColumn,
});

const smAlignItems: Functor<AlignItems> = mapping({
  start: layout.smItemsStart,
  end: layout.smItemsEnd,
  center: layout.smItemsCenter,
  baseline: layout.smItemsBaseline,
  // default: stretch
});
const smDisplay: Functor<Display> = mapping({
  none: styles.smDisplayNone,
  flex: styles.smDisplayFlex,
  block: styles.smDisplayBlock,
  inlineBlock: styles.smDisplayInlineBlock,
  visuallyHidden: styles.smDisplayVisuallyHidden,
});
const smColumn: Functor<Column> = bind(range('smCol'), styles);
const smDirection: Functor<Direction> = mapping({
  row: styles.smDirectionRow,
  column: styles.smDirectionColumn,
});

const mdAlignItems: Functor<AlignItems> = mapping({
  start: layout.mdItemsStart,
  end: layout.mdItemsEnd,
  center: layout.mdItemsCenter,
  baseline: layout.mdItemsBaseline,
  // default: stretch
});
const mdDisplay: Functor<Display> = mapping({
  none: styles.mdDisplayNone,
  flex: styles.mdDisplayFlex,
  block: styles.mdDisplayBlock,
  inlineBlock: styles.mdDisplayInlineBlock,
  visuallyHidden: styles.mdDisplayVisuallyHidden,
});
const mdColumn: Functor<Column> = bind(range('mdCol'), styles);
const mdDirection: Functor<Direction> = mapping({
  row: styles.mdDirectionRow,
  column: styles.mdDirectionColumn,
});

const lgAlignItems: Functor<AlignItems> = mapping({
  start: layout.lgItemsStart,
  end: layout.lgItemsEnd,
  center: layout.lgItemsCenter,
  baseline: layout.lgItemsBaseline,
  // default: stretch
});
const lgDisplay: Functor<Display> = mapping({
  none: styles.lgDisplayNone,
  flex: styles.lgDisplayFlex,
  block: styles.lgDisplayBlock,
  inlineBlock: styles.lgDisplayInlineBlock,
  visuallyHidden: styles.lgDisplayVisuallyHidden,
});
const lgColumn: Functor<Column> = bind(range('lgCol'), styles);
const lgDirection: Functor<Direction> = mapping({
  row: styles.lgDirectionRow,
  column: styles.lgDirectionColumn,
});

/* ***************************************** */

const alignContent: Functor<AlignContent> = mapping({
  start: layout.contentStart,
  end: layout.contentEnd,
  center: layout.contentCenter,
  between: layout.contentBetween,
  around: layout.contentAround,
  evenly: layout.contentEvenly,
  // default: stretch
});
const alignSelf: Functor<AlignSelf> = mapping({
  start: layout.selfStart,
  end: layout.selfEnd,
  center: layout.selfCenter,
  baseline: layout.selfBaseline,
  stretch: layout.selfStretch,
  // default: auto
});
const bottom: Functor<boolean> = toggle(layout.bottom0);
const borderStyle: Functor<BorderStyle> = (value) => {
  const borderProps =
    value === 'sm' || value === 'lg'
      ? [fromClassName(borders.solid), fromClassName(borders.borderColorLightGray)]
      : [];
  return concat([
    mapping({
      sm: borders.sizeSm,
      lg: borders.sizeLg,
      shadow: borders.shadow,
      raisedTopShadow: borders.raisedTop,
      raisedBottomShadow: borders.raisedBottom,
    })(value),
    ...borderProps,
  ]);
};
const color: Functor<Color> = mapping({
  lightWash: colors.lightWashBg,
  darkWash: colors.darkWashBg,
  transparentDarkGray: colors.transparentDarkGrayBg,
  default: colors.default,
  infoBase: colors.infoBase,
  infoWeak: colors.infoWeak,
  errorBase: colors.errorBase,
  errorWeak: colors.errorWeak,
  warningBase: colors.warningBase,
  warningWeak: colors.warningWeak,
  successBase: colors.successBase,
  successWeak: colors.successWeak,
  recommendationBase: colors.recommendationBase,
  recommendationWeak: colors.recommendationWeak,
  shopping: colors.shopping,
  primary: colors.primary,
  secondary: colors.secondary,
  tertiary: colors.tertiary,
  selected: colors.selected,
  inverse: colors.inverse,
  brand: colors.brand,
  education: colors.education,
  elevationAccent: colors.elevationAccent,
  elevationFloating: colors.elevationFloating,
  elevationRaised: colors.elevationRaised,
  dark: colors.dark,
  light: colors.light,
  // default: transparent
});
const fit: Functor<boolean> = toggle(layout.fit);
const flex: Functor<Flex> = mapping({
  grow: layout.flexGrow,
  none: layout.flexNone,
  // default: shrink
});
const flexBasis: Functor<number | string> = (v) => fromInlineStyle({ flexBasis: v });
const height: Functor<Dimension> = (h) => fromInlineStyle({ height: h });
const justifyContent: Functor<JustifyContent> = mapping({
  end: layout.justifyEnd,
  center: layout.justifyCenter,
  between: layout.justifyBetween,
  around: layout.justifyAround,
  evenly: layout.justifyEvenly,
  // default: start
});
const left: Functor<boolean> = toggle(layout.left0);

/* ***************************************** */

type MarginFunctorType = Functor<Margin>;

const transformNumberOrPassthrough =
  (selector: string): MarginFunctorType =>
  (m) => {
    if (typeof m === 'number') {
      return bind(rangeWithZero(selector), whitespace)(m);
    }

    if (m === 'auto') {
      return fromClassName(whitespace[`${selector}Auto`]);
    }

    return identity();
  };

const marginStart: MarginFunctorType = transformNumberOrPassthrough('marginStart');
const marginEnd: MarginFunctorType = transformNumberOrPassthrough('marginEnd');
const marginTop: MarginFunctorType = transformNumberOrPassthrough('marginTop');
const marginBottom: MarginFunctorType = transformNumberOrPassthrough('marginBottom');
const margin: MarginFunctorType = union(marginTop, marginBottom, marginStart, marginEnd);

const smMarginStart: MarginFunctorType = transformNumberOrPassthrough('smMarginStart');
const smMarginEnd: MarginFunctorType = transformNumberOrPassthrough('smMarginEnd');
const smMarginTop: MarginFunctorType = transformNumberOrPassthrough('smMarginTop');
const smMarginBottom: MarginFunctorType = transformNumberOrPassthrough('smMarginBottom');
const smMargin: MarginFunctorType = union(smMarginTop, smMarginBottom, smMarginStart, smMarginEnd);

const mdMarginStart: MarginFunctorType = transformNumberOrPassthrough('mdMarginStart');
const mdMarginEnd: MarginFunctorType = transformNumberOrPassthrough('mdMarginEnd');
const mdMarginTop: MarginFunctorType = transformNumberOrPassthrough('mdMarginTop');
const mdMarginBottom: MarginFunctorType = transformNumberOrPassthrough('mdMarginBottom');
const mdMargin: MarginFunctorType = union(mdMarginTop, mdMarginBottom, mdMarginStart, mdMarginEnd);

const lgMarginStart: MarginFunctorType = transformNumberOrPassthrough('lgMarginStart');
const lgMarginEnd: MarginFunctorType = transformNumberOrPassthrough('lgMarginEnd');
const lgMarginTop: MarginFunctorType = transformNumberOrPassthrough('lgMarginTop');
const lgMarginBottom: MarginFunctorType = transformNumberOrPassthrough('lgMarginBottom');
const lgMargin: MarginFunctorType = union(lgMarginTop, lgMarginBottom, lgMarginStart, lgMarginEnd);

/* ***************************************** */

const maxHeight: Functor<Dimension> = (d) => fromInlineStyle({ maxHeight: d });
const maxWidth: Functor<Dimension> = (d) => fromInlineStyle({ maxWidth: d });
const minHeight: Functor<Dimension> = (d) => fromInlineStyle({ minHeight: d });
const minWidth: Functor<Dimension> = (d) => fromInlineStyle({ minWidth: d });
const opacityMap = mapClassName((name) => styles[name]);
const opacity: Functor<Opacity> = (val) => {
  if (val > 0 && val < 1) {
    return opacityMap(range('opacity0')(val * 10));
  }
  return opacityMap(range('opacity')(val));
};
const overflow: Functor<Overflow> = mapping({
  hidden: layout.overflowHidden,
  scroll: layout.overflowScroll,
  auto: layout.overflowAuto,
  scrollX: layout.overflowScrollX,
  scrollY: layout.overflowScrollY,
  // default: visible
});

/* ***************************************** */

type PaddingFunctor = Functor<Padding>;

const paddingX: PaddingFunctor = bind(rangeWithZero('paddingX'), whitespace);
const paddingY: PaddingFunctor = bind(rangeWithZero('paddingY'), whitespace);
const padding: PaddingFunctor = union(paddingX, paddingY);

const smPaddingX: PaddingFunctor = bind(rangeWithZero('smPaddingX'), whitespace);
const smPaddingY: PaddingFunctor = bind(rangeWithZero('smPaddingY'), whitespace);
const smPadding: PaddingFunctor = union(smPaddingX, smPaddingY);

const mdPaddingX: PaddingFunctor = bind(rangeWithZero('mdPaddingX'), whitespace);
const mdPaddingY: PaddingFunctor = bind(rangeWithZero('mdPaddingY'), whitespace);
const mdPadding: PaddingFunctor = union(mdPaddingX, mdPaddingY);

const lgPaddingX: PaddingFunctor = bind(rangeWithZero('lgPaddingX'), whitespace);
const lgPaddingY: PaddingFunctor = bind(rangeWithZero('lgPaddingY'), whitespace);
const lgPadding: PaddingFunctor = union(lgPaddingX, lgPaddingY);

/* ***************************************** */

const position: Functor<Position> = mapping({
  absolute: layout.absolute,
  relative: layout.relative,
  fixed: layout.fixed,
  // default: static
});
const right: Functor<boolean> = toggle(layout.right0);
const rounding = getRoundingStyle;
const top: Functor<boolean> = toggle(layout.top0);
const userSelect: Functor<UserSelect> = mapping({
  none: styles.userSelectNone,
  // default: auto
});
const width: Functor<Dimension> = (w) => fromInlineStyle({ width: w });
const wrap: Functor<boolean> = toggle(layout.flexWrap);
const dangerouslySetInlineStyle: Functor<DangerouslySetInlineStyle> = (value) =>
  // eslint-disable-next-line no-underscore-dangle
  value && value.__style ? fromInlineStyle(value.__style) : identity();
const zIndex: Functor<?Indexable> = (value) => {
  if (!value) {
    return identity();
  }
  return fromInlineStyle({ zIndex: value.index() });
};

/*

It's preferable to put new properties into that object directly just so it's easier to read.
Unfortunately Flow doesn't like that for the vast majority of the fields. :(

*/

export const propToFn = {
  alignItems,
  display,
  column,
  direction,

  smAlignItems,
  smDisplay,
  smColumn,
  smDirection,

  mdAlignItems,
  mdDisplay,
  mdColumn,
  mdDirection,

  lgAlignItems,
  lgDisplay,
  lgColumn,
  lgDirection,

  alignContent,
  alignSelf,
  bottom,
  borderStyle,
  color,
  fit,
  flex,
  flexBasis,
  height,
  justifyContent,
  left,

  margin,
  marginTop,
  marginBottom,
  marginStart,
  marginEnd,

  smMargin,
  smMarginTop,
  smMarginBottom,
  smMarginStart,
  smMarginEnd,

  mdMargin,
  mdMarginTop,
  mdMarginBottom,
  mdMarginStart,
  mdMarginEnd,

  lgMargin,
  lgMarginTop,
  lgMarginBottom,
  lgMarginStart,
  lgMarginEnd,

  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  opacity,
  overflow,

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

  position,
  right,
  rounding,
  top,
  userSelect,
  width,
  wrap,
  dangerouslySetInlineStyle,
  zIndex,
};

/*

# Style Builder

This is where it all comes together. This function takes the base styles for the component,
the component's props, and any disallowed props. It outputs the passthrough props (after
removing disallowed and given props), as well as an object with the combined classNames
and styles from the given props.

Optionally, for more restrictive components, this function can accept an allowlist of
valid props. Any props not on this list will be ignored.

*/

// $FlowExpectedError[unclear-type]
export function buildStyles<T: Object>({
  baseStyles,
  props,
  blocklistProps,
  allowlistProps,
}: {|
  baseStyles: string,
  props: T,
  blocklistProps?: $ReadOnlyArray<string>,
  allowlistProps?: $ReadOnlyArray<string>,
|}): {|
  passthroughProps: T,
  propsStyles: ToPropsOutput,
|} {
  // Flow can't reason about the constant nature of Object.keys so we can't use
  // a functional (reduce) style here.

  // All Box's are box-sized by default, so we start off building up the styles
  // to be applied with a Box base class.
  let s = fromClassName(baseStyles);

  // Init the list of props we'll omit from passthrough. We'll add to this
  // list as we match props against the transforms list.
  const omitProps = [...(blocklistProps ?? [])];

  // This loops through each property and if it exists in the previously
  // defined transform map, concatenates the resulting styles to the base
  // styles. If there's a match, we also don't pass through that property. This
  // means Box's runtime is only dependent on the number of properties passed
  // to it (which is typically small) instead of the total number of possible
  // properties (~30 or so). While it may ~feel~ like Box is inefficient, its
  // biggest performance impact is on startup time because there's so much code
  // here.

  // eslint-disable-next-line no-restricted-syntax
  for (const prop in props) {
    if (
      // $FlowExpectedError[method-unbinding]
      Object.prototype.hasOwnProperty.call(propToFn, prop) &&
      !omitProps.includes(prop) &&
      (!allowlistProps || allowlistProps.includes(prop))
    ) {
      const fn = propToFn[prop];
      const value = props[prop];
      omitProps.push(prop);
      s = concat([s, fn(value)]);
    }
  }

  return {
    passthroughProps: omit(omitProps, props),
    propsStyles: toProps(s),
  };
}
