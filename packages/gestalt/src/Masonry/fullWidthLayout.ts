import { Cache } from './Cache';
import mindex from './mindex';
import { Position } from './types';

const fullWidthLayout = <T>({
  gutter = 0,
  cache,
  minCols = 2,
  idealColumnWidth = 240,
  width,
}: {
  gutter?: number;
  cache: Cache<T, number>;
  minCols?: number;
  idealColumnWidth?: number;
  width?: number | null | undefined;
}): ((items: ReadonlyArray<T>) => ReadonlyArray<Position>) => {
  if (width == null) {
    return (items) =>
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
  const columnCount = Math.max(Math.floor((width - colguess * gutter) / idealColumnWidth), minCols);
  const columnWidth = Math.floor(width / columnCount);

  return (items: ReadonlyArray<T>) => {
    // the total height of each column
    const heights = new Array<number>(columnCount).fill(0);

    return items.reduce<Array<any>>((acc, item) => {
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

export default fullWidthLayout;
