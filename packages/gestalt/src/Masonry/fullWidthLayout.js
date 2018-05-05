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

export default <T>({
  gutter = 0,
  cache,
  minCols = 2,
  idealColumnWidth = 240,
  width,
}: {|
  gutter?: number,
  cache: Cache<T, number>,
  minCols?: number,
  idealColumnWidth?: number,
  width?: ?number,
|}) => {
  if (width == null) {
    return (items: Array<mixed>): Array<Position> =>
      items.map(() => ({
        top: Infinity,
        left: Infinity,
        width: Infinity,
        height: Infinity,
      }));
  }

  // "This is kind of crazy!" - you
  // Yes, indeed. The "guessing" here is meant to replicate the pass that the
  // original implementation takes with CSS.
  const colguess = Math.floor(width / idealColumnWidth);
  const columnCount = Math.max(
    Math.floor((width - colguess * gutter) / idealColumnWidth),
    minCols
  );
  const columnWidth = Math.floor(width / columnCount);

  return (items: Array<T>) => {
    // the total height of each column
    const heights = new Array(columnCount).fill(0);

    return items.reduce((acc, item) => {
      const positions = acc;
      const height = cache.get(item);
      let position;

      if (height == null) {
        position = {
          top: Infinity,
          left: Infinity,
          width: columnWidth,
          height: Infinity,
        };
      } else {
        const col = mindex(heights);
        const top = heights[col];
        const left = col * columnWidth + gutter / 2;

        heights[col] += height;
        position = {
          top,
          left,
          width: columnWidth - gutter,
          height,
        };
      }

      positions.push(position);
      return positions;
    }, []);
  };
};
