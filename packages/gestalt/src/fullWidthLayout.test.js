// @flow
import fullWidthLayout from './fullWidthLayout';

const stubCache = (measurements: Object = {}) => {
  let cache = measurements;

  return {
    get(item) {
      return cache[item];
    },
    has(item) {
      return !!cache[item];
    },
    set(item, value) {
      cache[item] = value;
    },
    reset() {
      cache = {};
    },
  };
};

test('empty', () => {
  const layout = fullWidthLayout({
    cache: stubCache(),
    width: 500,
  });
  expect(layout([])).toEqual([]);
});

test('one row', () => {
  const measurements = { a: 100, b: 120, c: 80 };
  const items = ['a', 'b', 'c'];
  const layout = fullWidthLayout({
    cache: stubCache(measurements),
    width: 900,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 0, width: 300 },
    { top: 0, height: 120, left: 300, width: 300 },
    { top: 0, height: 80, left: 600, width: 300 },
  ]);
});

test('wrapping items', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = ['a', 'b', 'c', 'd'];
  const layout = fullWidthLayout({
    cache: stubCache(measurements),
    width: 500,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 0, width: 250 },
    { top: 0, height: 120, left: 250, width: 250 },
    { top: 100, height: 80, left: 0, width: 250 },
    { top: 120, height: 100, left: 250, width: 250 },
  ]);
});
