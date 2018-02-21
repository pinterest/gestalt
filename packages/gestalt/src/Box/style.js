/* @flow */

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

// TODO: This type should be opaque, however the Babel parser doesn't support
//       the opaque syntax yet.
type Style = {|
  className: Set<string>,
  inlineStyle: { [key: string]: any },
|};

export const identity = (): Style => ({
  className: new Set(),
  inlineStyle: {},
});

export const fromClassName = (...classNames: Array<string>): Style => ({
  className: new Set(classNames),
  inlineStyle: {},
});

export const fromInlineStyle = (inlineStyle: {
  [key: string]: any,
}): Style => ({
  className: new Set(),
  inlineStyle,
});

export const concat = (styles: Array<Style>): Style =>
  styles.reduce(
    (
      { className: classNameA, inlineStyle: inlineStyleA },
      { className: classNameB, inlineStyle: inlineStyleB }
    ) => ({
      className: new Set([...classNameA, ...classNameB]),
      inlineStyle: { ...inlineStyleA, ...inlineStyleB },
    }),
    identity()
  );

export const mapClassName = (fn: (x: string) => string) => ({
  className,
  inlineStyle,
}: Style): Style => ({
  className: new Set(Array.from(className).map(fn)),
  inlineStyle,
});

export const toProps = ({
  className,
  inlineStyle,
}: Style): { className: string, style: { [key: string]: any } } => {
  const props = {};

  if (className.size > 0) {
    // Sorting here ensures that classNames are always stable, reducing diff
    // churn. Box usually has a small number of properties so it's not a perf
    // concern.
    props.className = Array.from(className)
      .sort()
      .join(' ');
  }

  if (Object.keys(inlineStyle).length > 0) {
    props.style = inlineStyle;
  }

  return props;
};
