// @flow
import type { Cache } from './Cache';

type Position = { top: number, left: number, width: number, height: number };

const mindex = arr => {
  let idx = 0;
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] < arr[idx]) {
      idx = i;
    }
  }
  return idx;
};

const offscreen = (width, height = Infinity) => ({
  top: -9999,
  left: -9999,
  width,
  height,
});

export default <T>({
  cache,
  columnWidth = 236,
  gutter = 14,
  minCols = 2,
  width,
}: {|
  columnWidth?: number,
  gutter?: number,
  cache: Cache<T, number>,
  minCols?: number,
  width?: ?number,
|}) => (items: Array<*>): Array<Position> => {
  if (width == null) {
    return items.map(() => offscreen(columnWidth));
  }

  const columnWidthAndGutter = columnWidth + gutter;
  const columnCount = Math.max(
    Math.floor((width + gutter) / columnWidthAndGutter),
    minCols
  );
  // the total height of each column
  const heights = new Array(columnCount).fill(0);
  const centerOffset = Math.max(
    Math.floor((width - columnWidthAndGutter * columnCount + gutter) / 2),
    0
  );

  return items.reduce((acc, item) => {
    const positions = acc;
    // $FlowFixMe
    const height = cache.get(item);
    let position;

    if (height == null) {
      position = offscreen(columnWidth);
    } else {
      const heightAndGutter = height + gutter;
      const col = mindex(heights);
      const top = heights[col];
      const left = col * columnWidthAndGutter + centerOffset;

      heights[col] += heightAndGutter;
      position = { top, left, width: columnWidth, height };
    }
    positions.push(position);
    return positions;
  }, []);
};
