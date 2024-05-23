import { Cache } from './Cache';
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
  ...otherProps
}: {
  idealColumnWidth?: number;
  gutter?: number;
  minCols?: number;
  width?: number | null | undefined;
  positionCache: Cache<T, Position>;
  measurementCache: Cache<T, number>;
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

  return (items: ReadonlyArray<T>) =>
    multiColumnLayout({
      items,
      columnWidth,
      columnCount,
      centerOffset: gutter / 2,
      gutter,
      measurementCache,
      ...otherProps,
    });
};

export default fullWidthLayout;
