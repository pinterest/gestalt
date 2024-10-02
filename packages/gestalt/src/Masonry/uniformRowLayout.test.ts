import uniformRowLayout from './uniformRowLayout';

const stubCache = (
  measurements: {
    [item: string]: number;
  } = {},
) => {
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
  const layout = uniformRowLayout({
    cache: stubCache(),
    width: 500,
  });

  expect(layout([])).toEqual([]);
});

test('one row, equal heights', () => {
  const layout = uniformRowLayout({
    cache: stubCache({
      a: 100,
      b: 100,
      c: 100,
    }),
    width: 500,
  });

  expect(layout(['a', 'b', 'c'])).toEqual([
    { top: 0, left: 0, width: 236, height: 100 },
    { top: 0, left: 250, width: 236, height: 100 },
    { top: 0, left: 500, width: 236, height: 100 },
  ]);
});

test('one column, equal heights', () => {
  const layout = uniformRowLayout({
    cache: stubCache({
      a: 100,
      b: 100,
      c: 100,
    }),
    width: 250,
    minCols: 1,
  });

  expect(layout(['a', 'b', 'c'])).toEqual([
    { top: 0, left: 0, width: 236, height: 100 },
    { top: 114, left: 0, width: 236, height: 100 },
    { top: 228, left: 0, width: 236, height: 100 },
  ]);
});

test('one row, unequal heights', () => {
  const layout = uniformRowLayout({
    cache: stubCache({
      a: 100,
      b: 120,
      c: 100,
    }),
    width: 500,
  });

  expect(layout(['a', 'b', 'c'])).toEqual([
    { top: 0, left: 0, width: 236, height: 100 },
    { top: 0, left: 250, width: 236, height: 120 },
    { top: 0, left: 500, width: 236, height: 100 },
  ]);
});

test('multiple rows, unequal heights', () => {
  const layout = uniformRowLayout({
    cache: stubCache({
      a: 100,
      b: 120,
      c: 100,
      d: 100,
    }),
    width: 750,
  });

  expect(layout(['a', 'b', 'c', 'd'])).toEqual([
    { top: 0, left: 0, width: 236, height: 100 },
    { top: 0, left: 250, width: 236, height: 120 },
    { top: 0, left: 500, width: 236, height: 100 },
    { top: 134, left: 0, width: 236, height: 100 },
  ]);
});

describe('loadingStateItems', () => {
  test("uses the loadingStateItem's height", () => {
    const loadingStateItems = [
      { 'name': 'Pin 0', 'height': 100 },
      { 'name': 'Pin 1', 'height': 120 },
      { 'name': 'Pin 2', 'height': 80 },
      { 'name': 'Pin 3', 'height': 100 },
    ];

    const layout = uniformRowLayout({
      cache: stubCache(),
      width: 500,
      renderLoadingState: true,
    });

    expect(layout(loadingStateItems)).toEqual([
      { top: 0, height: 100, left: 0, width: 236 },
      { top: 0, height: 120, left: 250, width: 236 },
      { top: 0, height: 80, left: 500, width: 236 },
      { top: 134, height: 100, left: 0, width: 236 },
    ]);
  });
});
