import { Cache } from './Cache';
import { isLoadingStateItem } from './loadingStateUtils';
import { LoadingStateItem, Position } from './types';

const offscreen = (width: number, height: number = Infinity) => ({
  top: -9999,
  left: -9999,
  width,
  height,
});

const uniformRowLayout =
  <T>({
    cache,
    columnWidth = 236,
    gutter = 14,
    width,
    minCols = 3,
    renderLoadingState,
  }: {
    cache: Cache<T, number>;
    columnWidth?: number;
    gutter?: number;
    width?: number | null | undefined;
    minCols?: number;
    renderLoadingState?: boolean;
  }): ((items: ReadonlyArray<T> | ReadonlyArray<LoadingStateItem>) => ReadonlyArray<Position>) =>
  (items: ReadonlyArray<T> | ReadonlyArray<LoadingStateItem>): ReadonlyArray<Position> => {
    if (width == null) {
      return items.map(() => offscreen(columnWidth));
    }

    const columnWidthAndGutter = columnWidth + gutter;
    const columnCount = Math.max(Math.floor((width + gutter) / columnWidthAndGutter), minCols);

    const positions = [];
    const heights = [];

    for (let i = 0; i < items.length; i += 1) {
      let position;
      const item = items[i];
      const height = isLoadingStateItem(item, renderLoadingState) ? item.height : cache.get(item);

      if (height == null) {
        position = offscreen(columnWidth);
      } else {
        const column = i % columnCount;
        const row = Math.floor(i / columnCount);

        if (column === 0 || height > heights[row]) {
          heights[row] = height;
        }

        const top = row > 0 ? heights.slice(0, row).reduce((sum, y) => sum + y + gutter, 0) : 0;

        position = {
          top,
          left: column * columnWidthAndGutter,
          width: columnWidth,
          height,
        };
      }
      positions.push(position);
    }
    return positions;
  };

export default uniformRowLayout;
