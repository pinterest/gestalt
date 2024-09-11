/*

Style is a monoid that capture the "to-be-applied" styles (inline and classes)
for a Box. It's basically set that is closed under an associative binary
operation and has an identity element such that for all HA HA HA. Yes, it's a
monoid, which sounds scary but it's not really and actually super useful. All
that means is that basically you can do two things with it:

    1. concat(concat(a, b), c) === concat(a, concat(b, c));
    2. concat(identity(), a) === concat(a, identity()) === a;

What that means is that it's really easy to compose styles together and the
order in which you do so doesn't really matter.

*/

type InlineStyle = {
  [key: string]: string | number | undefined;
};

// TODO: This type should be opaque, however the Babel parser doesn't support
//       the opaque syntax yet.
export type Style = {
  className: Set<string>;
  inlineStyle: InlineStyle;
};

export const identity = (): Style => ({
  className: new Set(),
  inlineStyle: {},
});

export const fromClassName = (...classNames: ReadonlyArray<string>): Style => ({
  className: new Set(classNames),
  inlineStyle: {},
});

export const fromInlineStyle = (inlineStyle: InlineStyle): Style => ({
  className: new Set(),
  inlineStyle,
});

export const concat = (styles: ReadonlyArray<Style>): Style =>
  styles.reduce(
    (
      { className: classNameA, inlineStyle: inlineStyleA },
      { className: classNameB, inlineStyle: inlineStyleB },
    ) => ({
      className: new Set([...classNameA, ...classNameB]),
      inlineStyle: { ...inlineStyleA, ...inlineStyleB },
    }),
    identity(),
  );

export const mapClassName =
  (fn: (x: string) => string): ((arg1: Style) => Style) =>
  ({ className, inlineStyle }: Style): Style => ({
    className: new Set(Array.from(className).map((n) => fn(n))),
    inlineStyle,
  });

export type ToPropsOutput = {
  className: string | null | undefined;
  style: InlineStyle | null | undefined;
};

export const toProps = ({ className, inlineStyle }: Style): ToPropsOutput => {
  let sortedClassNames;
  if (className.size > 0) {
    // Sorting here ensures that classNames are always stable, reducing diff
    // churn. Box usually has a small number of properties so it's not a perf
    // concern.
    sortedClassNames = Array.from(className).sort().join(' ');
  }
  let stylesObj;

  if (Object.keys(inlineStyle).length > 0) {
    stylesObj = inlineStyle;
  }

  return { className: sortedClassNames, style: stylesObj };
};
