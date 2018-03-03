import { concat, fromClassName, identity, mapClassName } from './style';

/*

Transforms

These are a collection of a few functors that take values and returns Style's. OMG, I used the word functor - it's really just a fancy word for function.

*/

// Adds a classname when a property is present.
//
//     <Box top />
//
export const toggle = (...classNames) => val =>
  val ? fromClassName(...classNames) : identity();

// Maps string values to classes
//
//     <Box alignItems="center" />
//
export const mapping = map => val =>
  Object.prototype.hasOwnProperty.call(map, val)
    ? fromClassName(map[val])
    : identity();

// Maps a range of integers to a range of classnames
//
//     <Box padding={1} />
//
export const range = scale => n =>
  fromClassName(`${scale}${n < 0 ? `N${Math.abs(n)}` : n}`);

// Like `range`, maps a range of integers to a range of classnames, excluding
// zero values.
//
//     <Box padding={0} />
export const rangeWithoutZero = scale => n =>
  n === 0 ? identity() : range(scale)(n);

// Binds a string classname to the value in an object. Useful when interacting
// with ranges that need to come dynamically from a style object. This is
// similar to the NPM package 'classnames/bind'.
export const bind = (fn, scope) => val =>
  mapClassName(name => scope[name])(fn(val));

// This takes a series of the previously defined functors, runs them all
// against a value and returns the set of their classnames.
export const union = (...fns) => val => concat(fns.map(fn => fn(val)));
