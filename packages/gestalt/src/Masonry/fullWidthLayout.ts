import { Cache } from './Cache';
import getColumnCount, { FULL_WIDTH_LAYOUT_DEFAULT_IDEAL_COLUMN_WIDTH } from './getColumnCount';
import { getHeightAndGutter } from './layoutHelpers';
import { isLoadingStateItem, isLoadingStateItems } from './loadingStateUtils';
import mindex from './mindex';
import multiColumnLayout, { ColumnSpanConfig, ModulePositioningConfig } from './multiColumnLayout';
import { Layout, LoadingStateItem, Position } from './types';

const fullWidthLayout = <T>({
  width,
  idealColumnWidth = FULL_WIDTH_LAYOUT_DEFAULT_IDEAL_COLUMN_WIDTH,
  gutter,
  minCols = 2,
  layout,
  measurementCache,
  _getColumnSpanConfig,
  _getModulePositioningConfig,
  renderLoadingState,
  ...otherProps
}: {
  idealColumnWidth?: number;
  gutter: number;
  minCols?: number;
  layout: Layout;
  width?: number | null | undefined;
  positionCache: Cache<T, Position>;
  measurementCache: Cache<T, number>;
  _getColumnSpanConfig?: (item: T) => ColumnSpanConfig;
  _getModulePositioningConfig?: (gridSize: number, moduleSize: number) => ModulePositioningConfig;
  logWhitespace?: (
    additionalWhitespace: ReadonlyArray<number>,
    numberOfIterations: number,
    columnSpan: number,
  ) => void;
  renderLoadingState?: boolean;
}): ((items: ReadonlyArray<T> | ReadonlyArray<LoadingStateItem>) => ReadonlyArray<Position>) => {
  if (width == null) {
    return (items) =>
      items.map(() => ({
        top: Infinity,
        left: Infinity,
        width: Infinity,
        height: Infinity,
      }));
  }

  const columnCount = getColumnCount({
    gutter,
    columnWidth: idealColumnWidth,
    width,
    minCols,
    layout,
  });
  const columnWidth = Math.floor(width / columnCount) - gutter;
  const columnWidthAndGutter = columnWidth + gutter;
  const centerOffset = gutter / 2;

  return (items: ReadonlyArray<T> | ReadonlyArray<LoadingStateItem>) => {
    const heights = new Array<number>(columnCount).fill(0);
    return _getColumnSpanConfig && !isLoadingStateItems(items, renderLoadingState)
      ? multiColumnLayout({
          items,
          columnWidth,
          columnCount,
          centerOffset,
          gutter,
          measurementCache,
          _getColumnSpanConfig,
          _getModulePositioningConfig,
          ...otherProps,
        })
      : items.reduce<Array<any>>((acc, item) => {
          const positions = acc;
          const height = isLoadingStateItem(item, renderLoadingState)
            ? item.height
            : measurementCache.get(item);
          let position;

          if (height == null) {
            position = {
              top: Infinity,
              left: Infinity,
              width: columnWidth,
              height: Infinity,
            };
          } else {
            const heightAndGutter = getHeightAndGutter(height, gutter);
            const col = mindex(heights);
            const top = heights[col];
            const left = col * columnWidthAndGutter + centerOffset;

            heights[col] = (heights[col] ?? 0) + heightAndGutter;
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
