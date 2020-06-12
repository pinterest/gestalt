// @flow strict

import {
  concat,
  fromClassName,
  identity,
  mapClassName,
  type Style,
} from './style.js';

/*

Transforms

These are a collection of a few functors that take values and returns Style's. OMG, I used the word functor - it's really just a fancy word for function.

*/

type Functor<T> = (n: T) => Style;

// Adds a classname when a property is present.
//
//     <Box top />
//
export const toggle = (...classNames: Array<string>) => (val?: boolean) =>
  val ? fromClassName(...classNames) : identity();

// Maps string values to classes
//
//     <Box alignItems="center" />
//
export const mapping = (map: { [key: string]: string, ... }) => (val: string) =>
  Object.prototype.hasOwnProperty.call(map, val)
    ? fromClassName(map[val])
    : identity();

// Maps a range of integers to a range of classnames
//
//     <Box padding={1} />
//
export const range = (scale: string) => (n: number): Style =>
  fromClassName(`${scale}${n < 0 ? `N${Math.abs(n)}` : n}`);

// Like `range`, maps a range of integers to a range of classnames, excluding
// zero values.
//
//     <Box padding={0} />
export const rangeWithoutZero = (scale: string) => (n: number): Style =>
  n === 0 ? identity() : range(scale)(n);

// Binds a string classname to the value in an object. Useful when interacting
// with ranges that need to come dynamically from a style object. This is
// similar to the NPM package 'classnames/bind'.
export function bind<T>(
  fn: Functor<T>,
  scope: { +[key: string]: string, ... }
): (val: T) => Style {
  const map = mapClassName(name => scope[name]);
  return (val: T): Style => map(fn(val));
}

// This takes a series of the previously defined functors, runs them all
// against a value and returns the set of their classnames.
export const union = <T>(...fns: Array<Functor<T>>) => (val: T) =>
  concat(fns.map(fn => fn(val)));
