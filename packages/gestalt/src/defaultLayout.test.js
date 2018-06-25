// @flow
import defaultLayout from './defaultLayout';

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
  const layout = defaultLayout({
    cache: stubCache(),
    width: 486,
  });
  expect(layout([])).toEqual([]);
});

test('one row', () => {
  const measurements = { a: 100, b: 120, c: 80 };
  const items = ['a', 'b', 'c'];
  const layout = defaultLayout({
    cache: stubCache(measurements),
    width: 736,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 0, width: 236 },
    { top: 0, height: 120, left: 250, width: 236 },
    { top: 0, height: 80, left: 500, width: 236 },
  ]);
});

test('wrapping items', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = ['a', 'b', 'c', 'd'];
  const layout = defaultLayout({
    cache: stubCache(measurements),
    width: 486,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 0, width: 236 },
    { top: 0, height: 120, left: 250, width: 236 },
    { top: 114, height: 80, left: 0, width: 236 },
    { top: 134, height: 100, left: 250, width: 236 },
  ]);
});

test('centers grid within the viewport', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = ['a', 'b', 'c', 'd'];
  const layout = defaultLayout({
    cache: stubCache(measurements),
    width: 8000,
    minCols: 2,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 7, width: 236 },
    { top: 0, height: 120, left: 257, width: 236 },
    { top: 0, height: 80, left: 507, width: 236 },
    { top: 0, height: 100, left: 757, width: 236 },
  ]);
});

test('floors values when centering', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = ['a', 'b', 'c', 'd'];
  const layout = defaultLayout({
    cache: stubCache(measurements),
    width: 501,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 7, width: 236 },
    { top: 0, height: 120, left: 257, width: 236 },
    { top: 114, height: 80, left: 7, width: 236 },
    { top: 134, height: 100, left: 257, width: 236 },
  ]);
});

test('only centers when theres extra space', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = ['a', 'b', 'c', 'd'];
  const layout = defaultLayout({
    cache: stubCache(measurements),
    width: 200,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 0, width: 236 },
    { top: 0, height: 120, left: 250, width: 236 },
    { top: 114, height: 80, left: 0, width: 236 },
    { top: 134, height: 100, left: 250, width: 236 },
  ]);
});
