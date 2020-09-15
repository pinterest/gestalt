// @flow strict
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
  type ToPropsOutput,
} from './style.js';
import omit from './utils/omit.js';
import {
  union,
  bind,
  range,
  toggle,
  mapping,
  rangeWithZero,
  rangeWithoutZero,
  type Functor,
} from './transforms.js';
import { getRoundingStyle } from './getRoundingClassName.js';
import { type Indexable } from './zIndex.js';
import {
  type AlignContent,
  type AlignItems,
  type AlignSelf,
  type BorderSize,
  type Column,
  type Color,
  type DangerouslySetInlineStyle,
  type Dimension,
  type Display,
  type Direction,
  type Flex,
  type JustifyContent,
  type Margin,
  type Opacity,
  type Overflow,
  type Padding,
  type Position,
  type UserSelect,
} from './boxTypes.js';

/*

# Transformers

This is where the meat and the bones of Box's transforms are. You can read more about the DSL in `./transforms.js`, but basically they are a small declarative way of specifying how a property (i.e. `marginTop={4}`) gets turned into a CSS class (`marginTop4`).

There's a little preamble here, but it culminates in a big object mapping the actual property names to the transformer values.

*/

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
const alignItems: Functor<AlignItems> = mapping({
  start: layout.itemsStart,
  end: layout.itemsEnd,
  center: layout.itemsCenter,
  baseline: layout.itemsBaseline,
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
const borderSize: Functor<BorderSize> = value => {
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
};
const color: Functor<Color> = mapping({
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
});
const fit: Functor<boolean> = toggle(layout.fit);
const flex: Functor<Flex> = mapping({
  grow: layout.flexGrow,
  none: layout.flexNone,
  // default: shrink
});
const height: Functor<Dimension> = h => fromInlineStyle({ height: h });
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

const transformNumberOrPassthrough = (
  selector: string
): MarginFunctorType => m => {
  if (typeof m === 'number') {
    return bind(rangeWithZero(selector), whitespace)(m);
  }

  if (m === 'auto') {
    return fromClassName(whitespace[`${selector}Auto`]);
  }

  return identity();
};

const marginStart: MarginFunctorType = transformNumberOrPassthrough(
  'marginStart'
);
const marginEnd: MarginFunctorType = transformNumberOrPassthrough('marginEnd');
const marginTop: MarginFunctorType = transformNumberOrPassthrough('marginTop');
const marginRight: MarginFunctorType = transformNumberOrPassthrough(
  'marginRight'
);
const marginBottom: MarginFunctorType = transformNumberOrPassthrough(
  'marginBottom'
);
const marginLeft: MarginFunctorType = transformNumberOrPassthrough(
  'marginLeft'
);
const margin: MarginFunctorType = union(
  marginTop,
  marginBottom,
  marginLeft,
  marginRight
);

const smMarginStart: MarginFunctorType = transformNumberOrPassthrough(
  'smMarginStart'
);
const smMarginEnd: MarginFunctorType = transformNumberOrPassthrough(
  'smMarginEnd'
);
const smMarginTop: MarginFunctorType = transformNumberOrPassthrough(
  'smMarginTop'
);
const smMarginRight: MarginFunctorType = transformNumberOrPassthrough(
  'smMarginRight'
);
const smMarginBottom: MarginFunctorType = transformNumberOrPassthrough(
  'smMarginBottom'
);
const smMarginLeft: MarginFunctorType = transformNumberOrPassthrough(
  'smMarginLeft'
);
const smMargin: MarginFunctorType = union(
  smMarginTop,
  smMarginBottom,
  smMarginLeft,
  smMarginRight,
  smMarginStart,
  smMarginEnd
);

const mdMarginStart: MarginFunctorType = transformNumberOrPassthrough(
  'mdMarginStart'
);
const mdMarginEnd: MarginFunctorType = transformNumberOrPassthrough(
  'mdMarginEnd'
);
const mdMarginTop: MarginFunctorType = transformNumberOrPassthrough(
  'mdMarginTop'
);
const mdMarginRight: MarginFunctorType = transformNumberOrPassthrough(
  'mdMarginRight'
);
const mdMarginBottom: MarginFunctorType = transformNumberOrPassthrough(
  'mdMarginBottom'
);
const mdMarginLeft: MarginFunctorType = transformNumberOrPassthrough(
  'mdMarginLeft'
);
const mdMargin: MarginFunctorType = union(
  mdMarginTop,
  mdMarginBottom,
  mdMarginLeft,
  mdMarginRight,
  mdMarginStart,
  mdMarginEnd
);

const lgMarginStart: MarginFunctorType = transformNumberOrPassthrough(
  'lgMarginStart'
);
const lgMarginEnd: MarginFunctorType = transformNumberOrPassthrough(
  'lgMarginEnd'
);
const lgMarginTop: MarginFunctorType = transformNumberOrPassthrough(
  'lgMarginTop'
);
const lgMarginRight: MarginFunctorType = transformNumberOrPassthrough(
  'lgMarginRight'
);
const lgMarginBottom: MarginFunctorType = transformNumberOrPassthrough(
  'lgMarginBottom'
);
const lgMarginLeft: MarginFunctorType = transformNumberOrPassthrough(
  'lgMarginLeft'
);
const lgMargin: MarginFunctorType = union(
  lgMarginTop,
  lgMarginBottom,
  lgMarginLeft,
  lgMarginRight,
  lgMarginStart,
  lgMarginEnd
);

/* ***************************************** */

const maxHeight: Functor<Dimension> = d => fromInlineStyle({ maxHeight: d });
const maxWidth: Functor<Dimension> = d => fromInlineStyle({ maxWidth: d });
const minHeight: Functor<Dimension> = d => fromInlineStyle({ minHeight: d });
const minWidth: Functor<Dimension> = d => fromInlineStyle({ minWidth: d });
const opacityMap = mapClassName(name => styles[name]);
const opacity: Functor<Opacity> = val => {
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

const paddingX: PaddingFunctor = bind(rangeWithoutZero('paddingX'), whitespace);
const paddingY: PaddingFunctor = bind(rangeWithoutZero('paddingY'), whitespace);
const padding: PaddingFunctor = union(paddingX, paddingY);

const smPaddingX: PaddingFunctor = bind(
  rangeWithoutZero('smPaddingX'),
  whitespace
);
const smPaddingY: PaddingFunctor = bind(
  rangeWithoutZero('smPaddingY'),
  whitespace
);
const smPadding: PaddingFunctor = union(smPaddingX, smPaddingY);

const mdPaddingX: PaddingFunctor = bind(
  rangeWithoutZero('mdPaddingX'),
  whitespace
);
const mdPaddingY: PaddingFunctor = bind(
  rangeWithoutZero('mdPaddingY'),
  whitespace
);
const mdPadding: PaddingFunctor = union(mdPaddingX, mdPaddingY);

const lgPaddingX: PaddingFunctor = bind(
  rangeWithoutZero('lgPaddingX'),
  whitespace
);
const lgPaddingY: PaddingFunctor = bind(
  rangeWithoutZero('lgPaddingY'),
  whitespace
);
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
const width: Functor<Dimension> = w => fromInlineStyle({ width: w });
const wrap: Functor<boolean> = toggle(layout.flexWrap);
const dangerouslySetInlineStyle: Functor<DangerouslySetInlineStyle> = value => {
  // eslint-disable-next-line no-underscore-dangle
  return value && value.__style ? fromInlineStyle(value.__style) : identity();
};
const zIndex: Functor<?Indexable> = value => {
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
  display,
  column,
  direction,

  smDisplay,
  smColumn,
  smDirection,

  mdDisplay,
  mdColumn,
  mdDirection,

  lgDisplay,
  lgColumn,
  lgDirection,

  alignContent,
  alignItems,
  alignSelf,
  bottom,
  borderSize,
  color,
  fit,
  flex,
  height,
  justifyContent,
  left,

  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginStart,
  marginEnd,

  smMargin,
  smMarginTop,
  smMarginRight,
  smMarginBottom,
  smMarginLeft,
  smMarginStart,
  smMarginEnd,

  mdMargin,
  mdMarginTop,
  mdMarginRight,
  mdMarginBottom,
  mdMarginLeft,
  mdMarginStart,
  mdMarginEnd,

  lgMargin,
  lgMarginTop,
  lgMarginRight,
  lgMarginBottom,
  lgMarginLeft,
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

*/

// $FlowExpectedError[unclear-type]
export function buildStyles<T: Object>(
  baseStyles: string,
  props: T,
  disallowedProps?: Array<string>
): {|
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
  const omitProps = [...(disallowedProps ?? [])];

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
      Object.prototype.hasOwnProperty.call(propToFn, prop) &&
      !omitProps.includes(prop)
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
