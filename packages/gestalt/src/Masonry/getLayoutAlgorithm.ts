import { Cache } from './Cache';
import defaultLayout from './defaultLayout';
import fullWidthLayout from './fullWidthLayout';
import { ColumnSpanConfig, ModulePositioningConfig } from './multiColumnLayout';
import { Align, Layout, LoadingStateItem, Position } from './types';
import uniformRowLayout from './uniformRowLayout';

export default function getLayoutAlgorithm<T>({
  align,
  columnWidth,
  gutter,
  items,
  layout,
  measurementStore,
  minCols,
  positionStore,
  width,
  _getColumnSpanConfig,
  _logTwoColWhitespace,
  _loadingStateItems = [],
  renderLoadingState,
  _getModulePositioningConfig,
}: {
  align: Align;
  columnWidth: number | undefined;
  gutter?: number;
  items: ReadonlyArray<T>;
  layout: Layout;
  measurementStore: Cache<T, number>;
  minCols: number;
  positionStore: Cache<T, Position>;
  width: number | null | undefined;
  _getColumnSpanConfig?: (item: T) => ColumnSpanConfig;
  _getModulePositioningConfig?: (gridSize: number, moduleSize: number) => ModulePositioningConfig;
  _logTwoColWhitespace?: (
    additionalWhitespace: ReadonlyArray<number>,
    numberOfIterations: number,
    columnSpan: number,
  ) => void;
  _loadingStateItems?: ReadonlyArray<LoadingStateItem>;
  renderLoadingState?: boolean;
}): (items: ReadonlyArray<T> | ReadonlyArray<LoadingStateItem>) => ReadonlyArray<Position> {
  if ((layout === 'flexible' || layout === 'serverRenderedFlexible') && width !== null) {
    return fullWidthLayout({
      gutter,
      layout,
      measurementCache: measurementStore,
      positionCache: positionStore,
      minCols,
      idealColumnWidth: columnWidth,
      width,
      logWhitespace: _logTwoColWhitespace,
      _getColumnSpanConfig,
      _getModulePositioningConfig,
      renderLoadingState,
    });
  }
  if (layout.startsWith('uniformRow')) {
    return uniformRowLayout({
      cache: measurementStore,
      columnWidth,
      gutter,
      flexible: layout === 'uniformRowFlexible',
      minCols,
      width,
      renderLoadingState,
    });
  }
  return defaultLayout({
    align,
    measurementCache: measurementStore,
    positionCache: positionStore,
    columnWidth,
    gutter,
    layout,
    logWhitespace: _logTwoColWhitespace,
    minCols,
    rawItemCount: renderLoadingState ? _loadingStateItems.length : items.length,
    width,
    _getColumnSpanConfig,
    _getModulePositioningConfig,
    renderLoadingState,
  });
}
