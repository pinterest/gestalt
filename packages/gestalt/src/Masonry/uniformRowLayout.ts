import { Cache } from './Cache';
import { isLoadingStateItem } from './loadingStateUtils';
import { LoadingStateItem, Position } from './types';

const offscreen = (width: number, height: number = Infinity) => ({
  top: -9999,
  left: -9999,
  width,
  height,
});

function calculateColumnCountAndWidth({
  columnWidth: idealColumnWidth,
  flexible,
  gutter,
  minCols,
  width,
}: {
  columnWidth: number;
  flexible: boolean;
  gutter: number;
  minCols: number;
  width: number;
}) {
  if (flexible) {
    const colguess = Math.floor(width / idealColumnWidth);
    const columnCount = Math.max(Math.floor((width - colguess * gutter) / idealColumnWidth), minCols);
    const columnWidth = Math.floor(width / columnCount) - gutter;
    const columnWidthAndGutter = columnWidth + gutter;
    return {
      columnCount,
      columnWidth,
      columnWidthAndGutter,
    }
  }

  const columnWidthAndGutter = idealColumnWidth + gutter;
  const columnCount = Math.max(Math.floor((width + gutter) / columnWidthAndGutter), minCols);
  return {
    columnCount,
    columnWidth: idealColumnWidth,
    columnWidthAndGutter,
  }
}

const uniformRowLayout =
  <T>({
    cache,
    columnWidth: idealColumnWidth = 236,
    flexible = false,
    gutter = 14,
    width,
    minCols = 3,
    renderLoadingState,
  }: {
    cache: Cache<T, number>;
    columnWidth?: number;
    flexible?: boolean;
    gutter?: number;
    width?: number | null | undefined;
    minCols?: number;
    renderLoadingState?: boolean;
  }): ((items: ReadonlyArray<T> | ReadonlyArray<LoadingStateItem>) => ReadonlyArray<Position>) =>
  (items: ReadonlyArray<T> | ReadonlyArray<LoadingStateItem>): ReadonlyArray<Position> => {
    if (width == null) {
      return items.map(() => offscreen(idealColumnWidth));
    }

    const { columnWidth, columnWidthAndGutter, columnCount } = calculateColumnCountAndWidth({
      columnWidth: idealColumnWidth,
      flexible,
      gutter,
      minCols,
      width,
    });

    const heights: Array<number> = [];
    return items.map((item, i) => {
      const height = isLoadingStateItem(item, renderLoadingState) ? item.height : cache.get(item);

      if (height == null) {
        return offscreen(columnWidth);
      }
      const column = i % columnCount;
      const row = Math.floor(i / columnCount);

      if (column === 0 || height > heights[row]!) {
        heights[row] = height;
      }

      const top = row > 0 ? heights.slice(0, row).reduce((sum, y) => sum + y + gutter, 0) : 0;

      return {
        top,
        left: column * columnWidthAndGutter,
        width: columnWidth,
        height,
      };
    });
  };

export default uniformRowLayout;
