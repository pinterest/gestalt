import { Cache } from './Cache';
import mindex from './mindex';
import multiColumnLayout from './multiColumnLayout';
import { Position } from './types';

const fullWidthLayout = <
  T extends {
    readonly [key: string]: unknown;
  },
>({
  width,
  idealColumnWidth = 240,
  gutter = 0,
  minCols = 2,
  measurementCache,
  _twoColItems = false,
  ...otherProps
}: {
  idealColumnWidth?: number;
  gutter?: number;
  minCols?: number;
  width?: number | null | undefined;
  positionCache: Cache<T, Position>;
  measurementCache: Cache<T, number>;
  _twoColItems?: boolean;
  whitespaceThreshold?: number;
  logWhitespace?: (arg1: number) => void;
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
  const columnWidth = Math.floor(width / columnCount) - gutter;
  const columnWidthAndGutter = columnWidth + gutter;
  const centerOffset = gutter / 2;

  return (items: ReadonlyArray<T>) => {
    const heights = new Array<number>(columnCount).fill(0);
    return _twoColItems
      ? multiColumnLayout({
          items,
          columnWidth,
          columnCount,
          centerOffset,
          gutter,
          measurementCache,
          ...otherProps,
        })
      : items.reduce<Array<any>>((acc, item) => {
          const positions = acc;
          const height = measurementCache.get(item);
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
            const left = col * columnWidthAndGutter + centerOffset;

            heights[col] += height + gutter;
            position = {
              top,
              left,
              width: columnWidth,
              height,
            };
          }
          positions.push(position);
          return positions;
        }, []);
  };
};

export default fullWidthLayout;
