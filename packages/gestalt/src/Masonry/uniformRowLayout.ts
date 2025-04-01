import { Cache } from './Cache';
import getColumnCount from './getColumnCount';
import { Position } from './types';

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
    const columnCount = getColumnCount({
      gutter,
      columnWidth: idealColumnWidth,
      width,
      minCols,
      layout: 'uniformRowFlexible',
    });
    const columnWidth = Math.floor(width / columnCount) - gutter;
    const columnWidthAndGutter = columnWidth + gutter;
    return {
      columnCount,
      columnWidth,
      columnWidthAndGutter,
    };
  }

  const columnWidthAndGutter = idealColumnWidth + gutter;
  const columnCount = getColumnCount({
    gutter,
    columnWidth: idealColumnWidth,
    width,
    minCols,
    layout: 'uniformRow',
  });
  return {
    columnCount,
    columnWidth: idealColumnWidth,
    columnWidthAndGutter,
  };
}

const uniformRowLayout =
  <T>({
    cache,
    columnWidth: idealColumnWidth = 236,
    flexible = false,
    gutter,
    width,
    minCols = 3,
  }: {
    cache: Cache<T, number>;
    columnWidth?: number;
    flexible?: boolean;
    gutter: number;
    width?: number | null | undefined;
    minCols?: number;
  }): ((items: ReadonlyArray<T>) => ReadonlyArray<Position>) =>
  (items: ReadonlyArray<T>): ReadonlyArray<Position> => {
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
      const height = cache.get(item);

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
