// @flow
import {
  concat,
  fromClassName,
  fromInlineStyle,
  identity,
  mapClassName,
  toProps,
} from './style';

test('identity', () => {
  expect(identity()).toEqual({ className: new Set(), inlineStyle: {} });
});

test('fromClassname', () => {
  expect(fromClassName('a', 'b', 'a')).toEqual({
    className: new Set(['a', 'b']),
    inlineStyle: {},
  });
});

test('fromInlineStyle', () => {
  expect(fromInlineStyle({ width: 100 })).toEqual({
    className: new Set(),
    inlineStyle: { width: 100 },
  });
});

test('concat', () => {
  const a = identity();
  const b = fromClassName('b');
  const c = fromInlineStyle({ width: 100 });
  expect(concat([a, b, c])).toEqual({
    className: new Set(['b']),
    inlineStyle: { width: 100 },
  });
});

test('mapClassName', () => {
  const style = fromClassName('a', 'b', 'c');
  expect(mapClassName(s => s.toUpperCase())(style)).toEqual(
    fromClassName('A', 'B', 'C')
  );
});

test('toProps w/ identity', () => {
  expect(toProps(identity())).toEqual({});
});

test('toProps', () => {
  expect(
    toProps(concat([fromClassName('b', 'a'), fromInlineStyle({ c: 'c' })]))
  ).toEqual({
    className: 'a b',
    style: { c: 'c' },
  });
});
