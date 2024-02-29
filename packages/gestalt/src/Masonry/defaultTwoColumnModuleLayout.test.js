// @flow strict
import defaultTwoColumnModuleLayout from './defaultTwoColumnModuleLayout';

type Item = {
  id: string,
  columnSpan?: number,
};

type Position = {
  top: number,
  left: number,
  width: number,
  height: number,
};

const stubCache = (measurements?: { [item: string]: number, ... } = {}) => {
  let cache = measurements;

  return {
    get(item: Item) {
      return cache[item.id];
    },
    has(item: Item) {
      return !!cache[item.id];
    },
    set(item: Item, value: number) {
      cache[item.id] = value;
    },
    reset() {
      cache = {};
    },
  };
};

const positionsStubCache = (positions?: { [item: string]: Position, ... } = {}) => {
  let cache = positions;

  return {
    get(item: Item) {
      return cache[item.id];
    },
    has(item: Item) {
      return !!cache[item.id];
    },
    set(item: Item, value: Position) {
      cache[item.id] = value;
    },
    reset() {
      cache = {};
    },
  };
};

test('empty', () => {
  const items: Array<Item> = [];
  const layout = defaultTwoColumnModuleLayout({
    measurementCache: stubCache(),
    justify: 'start',
    rawItemCount: items.length,
    width: 486,
  });
  expect(layout(items)).toEqual([]);
});

test('one row', () => {
  const measurements = { a: 100, b: 120, c: 80 };
  const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  const layout = defaultTwoColumnModuleLayout({
    measurementCache: stubCache(measurements),
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
  const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
  const layout = defaultTwoColumnModuleLayout({
    measurementCache: stubCache(measurements),
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

test('centers grid within the viewport', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
  const layout = defaultTwoColumnModuleLayout({
    measurementCache: stubCache(measurements),
    justify: 'start',
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

test('floors values when centering', () => {
  const measurements = { a: 100, b: 120, c: 80, d: 100 };
  const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
  const layout = defaultTwoColumnModuleLayout({
    measurementCache: stubCache(measurements),
    justify: 'start',
    rawItemCount: items.length,
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
  const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];
  const layout = defaultTwoColumnModuleLayout({
    measurementCache: stubCache(measurements),
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
  const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }];

  const makeLayout = (justify: 'center' | 'start') =>
    defaultTwoColumnModuleLayout({
      measurementCache: stubCache(measurements),
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

test.only('two column module', () => {
  const measurements = { a: 60, b: 120, c: 80, d: 60, e: 100, f: 120, g: 50, h: 60 };
  const positions = {
    a: { top: 0, left: 0, width: 236, height: 60 },
    b: { top: 0, left: 250, width: 236, height: 120 },
    c: { top: 0, left: 500, width: 236, height: 80 },
    d: { top: 0, left: 750, width: 236, height: 60 },
  };
  const items = [
    { id: 'a' },
    { id: 'b' },
    { id: 'c' },
    { id: 'd' },
    { id: 'e', columnSpan: 2 },
    { id: 'f' },
    { id: 'g' },
    { id: 'h' },
  ];

  const layout = defaultTwoColumnModuleLayout({
    measurementCache: stubCache(measurements),
    positionCache: positionsStubCache(positions),
    justify: 'start',
    rawItemCount: items.length,
    width: 986,
  });

  layout(items);
  const result = layout(items);

  console.log(result);
  console.log(result.length);

  expect(result).toEqual([
    { top: 0, left: 0, width: 236, height: 60 },
    { top: 0, left: 250, width: 236, height: 120 },
    { top: 0, left: 500, width: 236, height: 80 },
    { top: 0, left: 750, width: 236, height: 60 },
    { top: 94, left: 500, width: 486, height: 100 },
    { top: 74, left: 0, width: 236, height: 120 },
    { top: 134, left: 250, width: 236, height: 50 },
    { top: 188, left: 750, width: 236, height: 60 },
  ]);
});
