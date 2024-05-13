// @flow strict
import defaultLayout from './defaultLayout';

const stubCache = (measurements?: { [item: string]: number, ... } = {}) => {
  let cache = measurements;

  return {
    get(item: string) {
      return cache[item];
    },
    has(item: string) {
      return !!cache[item];
    },
    set(item: string, value: number) {
      cache[item] = value;
    },
    reset() {
      cache = {};
    },
  };
};

test('empty', () => {
  const items: Array<string> = [];
  const layout = defaultLayout({
    cache: stubCache(),
    justify: 'start',
    rawItemCount: items.length,
    width: 486,
  });
  expect(layout(items)).toEqual([]);
});

test('one row', () => {
  const measurements = { a: 100, b: 120, c: 80 };
  const items = ['a', 'b', 'c'];
  const layout = defaultLayout({
    cache: stubCache(measurements),
    justify: 'start',
    rawItemCount: items.length,
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
    justify: 'start',
    rawItemCount: items.length,
    width: 486,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 0, width: 236 },
    { top: 0, height: 120, left: 250, width: 236 },
    { top: 114, height: 80, left: 0, width: 236 },
    { top: 134, height: 100, left: 250, width: 236 },
  ]);
});

test('left-aligns grid within the viewport', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = ['a', 'b', 'c', 'd'];
  const layout = defaultLayout({
    cache: stubCache(measurements),
    justify: 'start',
    minCols: 2,
    rawItemCount: items.length,
    width: 8000,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 0, width: 236 },
    { top: 0, height: 120, left: 250, width: 236 },
    { top: 0, height: 80, left: 500, width: 236 },
    { top: 0, height: 100, left: 750, width: 236 },
  ]);
});

test('centers grid within the viewport', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = ['a', 'b', 'c', 'd'];
  const layout = defaultLayout({
    cache: stubCache(measurements),
    justify: 'center',
    minCols: 2,
    rawItemCount: items.length,
    width: 8000,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 3507, width: 236 },
    { top: 0, height: 120, left: 3757, width: 236 },
    { top: 0, height: 80, left: 4007, width: 236 },
    { top: 0, height: 100, left: 4257, width: 236 },
  ]);
});

test('right-aligns grid within the viewport', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = ['a', 'b', 'c', 'd'];
  const layout = defaultLayout({
    cache: stubCache(measurements),
    justify: 'end',
    minCols: 2,
    rawItemCount: items.length,
    width: 8000,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 14, width: 236 },
    { top: 0, height: 120, left: 264, width: 236 },
    { top: 0, height: 80, left: 514, width: 236 },
    { top: 0, height: 100, left: 764, width: 236 },
  ]);
});

test('only centers when theres extra space', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = ['a', 'b', 'c', 'd'];
  const layout = defaultLayout({
    cache: stubCache(measurements),
    justify: 'start',
    rawItemCount: items.length,
    width: 200,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 0, width: 236 },
    { top: 0, height: 120, left: 250, width: 236 },
    { top: 114, height: 80, left: 0, width: 236 },
    { top: 134, height: 100, left: 250, width: 236 },
  ]);
});

test('justify', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = ['a', 'b', 'c', 'd'];

  const makeLayout = (justify: 'center' | 'start') =>
    defaultLayout({
      cache: stubCache(measurements),
      columnWidth: 100,
      gutter: 0,
      justify,
      width: 1000,
      rawItemCount: items.length,
    })(items);

  const justifyStart = makeLayout('start');
  const justifyCenter = makeLayout('center');

  expect(justifyStart).toEqual([
    { top: 0, left: 0, width: 100, height: 100 },
    { top: 0, left: 100, width: 100, height: 120 },
    { top: 0, left: 200, width: 100, height: 80 },
    { top: 0, left: 300, width: 100, height: 100 },
  ]);

  expect(justifyCenter).toEqual([
    { top: 0, left: 300, width: 100, height: 100 },
    { top: 0, left: 400, width: 100, height: 120 },
    { top: 0, left: 500, width: 100, height: 80 },
    { top: 0, left: 600, width: 100, height: 100 },
  ]);
});
