import { Align, Layout } from 'gestalt/src//Masonry/types';
import { Cache } from './Cache';
import mindex from './mindex';
import multiColumnLayout, { ColumnSpanConfig } from './multiColumnLayout';
import { Position } from './types';

const offscreen = (width: number, height: number = Infinity) => ({
  top: -9999,
  left: -9999,
  width,
  height,
});

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
    logWhitespace?: (arg1: number) => void;
    renderLoadingState?: boolean;
  }): ((items: ReadonlyArray<T>) => ReadonlyArray<Position>) =>
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

    return _getColumnSpanConfig
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
      : items.reduce<Array<any>>((acc, item) => {
          const positions = acc;
          let height = measurementCache.get(item);
          let position;

          if (renderLoadingState) {
            // Height is a required key for _loadingStateItems
            height = (item as { height: number }).height;
          }

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

export default defaultLayout;
