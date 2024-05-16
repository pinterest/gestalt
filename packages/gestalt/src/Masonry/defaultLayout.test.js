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
    align: 'start',
    cache: stubCache(),
    layout: 'basic',
    rawItemCount: items.length,
    width: 486,
  });
  expect(layout(items)).toEqual([]);
});

test('one row', () => {
  const measurements = { a: 100, b: 120, c: 80 };
  const items = ['a', 'b', 'c'];
  const layout = defaultLayout({
    align: 'start',
    cache: stubCache(measurements),
    layout: 'basic',
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
    align: 'start',
    cache: stubCache(measurements),
    layout: 'basic',
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
    align: 'start',
    cache: stubCache(measurements),
    layout: 'basic',
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

test('centers grid within the viewport, left align', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = ['a', 'b', 'c', 'd'];
  const layout = defaultLayout({
    align: 'center',
    cache: stubCache(measurements),
    layout: 'basic',
    minCols: 2,
    rawItemCount: items.length,
    width: 8000,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 7, width: 236 },
    { top: 0, height: 120, left: 257, width: 236 },
    { top: 0, height: 80, left: 507, width: 236 },
    { top: 0, height: 100, left: 757, width: 236 },
  ]);
});

test('centers grid within the viewport, center align', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = ['a', 'b', 'c', 'd'];
  const layout = defaultLayout({
    align: 'center',
    cache: stubCache(measurements),
    layout: 'basicCentered',
    minCols: 2,
    rawItemCount: items.length,
    width: 8000,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 3493, width: 236 },
    { top: 0, height: 120, left: 3743, width: 236 },
    { top: 0, height: 80, left: 3993, width: 236 },
    { top: 0, height: 100, left: 4243, width: 236 },
  ]);
});

test('right-aligns grid within the viewport', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = ['a', 'b', 'c', 'd'];
  const layout = defaultLayout({
    align: 'end',
    cache: stubCache(measurements),
    layout: 'basic',
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

test('floors values when centering', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = ['a', 'b', 'c', 'd'];
  const layout = defaultLayout({
    align: 'start',
    cache: stubCache(measurements),
    layout: 'basic',
    rawItemCount: items.length,
    width: 501,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 0, width: 236 },
    { top: 0, height: 120, left: 250, width: 236 },
    { top: 114, height: 80, left: 0, width: 236 },
    { top: 134, height: 100, left: 250, width: 236 },
  ]);
});

test('only centers when theres extra space', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = ['a', 'b', 'c', 'd'];
  const layout = defaultLayout({
    cache: stubCache(measurements),
    align: 'start',
    layout: 'basic',
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

  const makeLayout = (align: 'center' | 'start') =>
    defaultLayout({
      align,
      cache: stubCache(measurements),
      columnWidth: 100,
      gutter: 0,
      layout: align === 'center' ? 'basicCentered' : 'basic',
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
