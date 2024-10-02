import { Cache } from './Cache';
import { getHeightAndGutter, offscreen } from './layoutHelpers';
import { isLoadingStateItem, isLoadingStateItems } from './loadingStateUtils';
import mindex from './mindex';
import multiColumnLayout, { ColumnSpanConfig } from './multiColumnLayout';
import { Align, Layout, LoadingStateItem, Position } from './types';

const calculateCenterOffset = ({
  align,
  columnCount,
  columnWidthAndGutter,
  gutter,
  layout,
  rawItemCount,
  width,
}: {
  align: Align;
  columnCount: number;
  columnWidthAndGutter: number;
  gutter: number;
  layout: Layout;
  rawItemCount: number;
  width: number;
}): number => {
  if (layout === 'basicCentered') {
    const contentWidth = Math.min(rawItemCount, columnCount) * columnWidthAndGutter + gutter;
    return Math.max(Math.floor((width - contentWidth) / 2), 0);
  }
  if (align === 'center') {
    return Math.max(Math.floor((width - columnWidthAndGutter * columnCount + gutter) / 2), 0);
  }
  if (align === 'end') {
    return width - (columnWidthAndGutter * columnCount - gutter);
  }
  return 0;
};

const defaultLayout =
  <T>({
    align,
    columnWidth = 236,
    gutter = 14,
    layout,
    minCols = 2,
    rawItemCount,
    width,
    measurementCache,
    _getColumnSpanConfig,
    renderLoadingState,
    ...otherProps
  }: {
    columnWidth?: number;
    gutter?: number;
    align: Align;
    layout: Layout;
    minCols?: number;
    rawItemCount: number;
    width?: number | null | undefined;
    positionCache: Cache<T, Position>;
    measurementCache: Cache<T, number>;
    _getColumnSpanConfig?: (item: T) => ColumnSpanConfig;
    whitespaceThreshold?: number;
    logWhitespace?: (arg1: ReadonlyArray<number>) => void;
    renderLoadingState?: boolean;
  }): ((items: ReadonlyArray<T> | ReadonlyArray<LoadingStateItem>) => ReadonlyArray<Position>) =>
  (items): ReadonlyArray<Position> => {
    if (width == null) {
      return items.map(() => offscreen(columnWidth));
    }

    const columnWidthAndGutter = columnWidth + gutter;
    const columnCount = Math.max(Math.floor((width + gutter) / columnWidthAndGutter), minCols);
    // the total height of each column
    const heights = new Array<number>(columnCount).fill(0);

    const centerOffset = calculateCenterOffset({
      columnCount,
      columnWidthAndGutter,
      gutter,
      align,
      layout,
      rawItemCount,
      width,
    });

    return _getColumnSpanConfig && !isLoadingStateItems(items, renderLoadingState)
      ? multiColumnLayout({
          items,
          columnWidth,
          columnCount,
          centerOffset,
          gutter,
          measurementCache,
          _getColumnSpanConfig,
          ...otherProps,
        })
      : items.map((item) => {
          const height = isLoadingStateItem(item, renderLoadingState)
            ? item.height
            : measurementCache.get(item);

          if (height == null) {
            return offscreen(columnWidth);
          }
          const heightAndGutter = getHeightAndGutter(height, gutter);
          const col = mindex(heights);
          const top = heights[col]!;
          const left = col * columnWidthAndGutter + centerOffset;

          heights[col] = heights[col]! + heightAndGutter;
          return { top, left, width: columnWidth, height };
        });
  };

export default defaultLayout;
