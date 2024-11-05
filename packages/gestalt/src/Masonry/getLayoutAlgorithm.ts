import { Cache } from './Cache';
import defaultLayout from './defaultLayout';
import fullWidthLayout from './fullWidthLayout';
import { ColumnSpanConfig } from './multiColumnLayout';
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
  _earlyBailout,
}: {
  align: Align;
  columnWidth: number;
  gutter?: number;
  items: ReadonlyArray<T>;
  layout: Layout;
  measurementStore: Cache<T, number>;
  minCols: number;
  positionStore: Cache<T, Position>;
  width: number | null | undefined;
  _getColumnSpanConfig?: (item: T) => ColumnSpanConfig;
  _logTwoColWhitespace?: (
    additionalWhitespace: ReadonlyArray<number>,
    numberOfIterations: number,
    columnSpan: number,
  ) => void;
  _loadingStateItems?: ReadonlyArray<LoadingStateItem>;
  renderLoadingState?: boolean;
  _earlyBailout?: boolean;
}): (items: ReadonlyArray<T> | ReadonlyArray<LoadingStateItem>) => ReadonlyArray<Position> {
  if ((layout === 'flexible' || layout === 'serverRenderedFlexible') && width !== null) {
    return fullWidthLayout({
      gutter,
      measurementCache: measurementStore,
      positionCache: positionStore,
      minCols,
      idealColumnWidth: columnWidth,
      width,
      logWhitespace: _logTwoColWhitespace,
      _getColumnSpanConfig,
      renderLoadingState,
      earlyBailout: _earlyBailout,
    });
  }
  if (layout === 'uniformRow') {
    return uniformRowLayout({
      cache: measurementStore,
      columnWidth,
      gutter,
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
    renderLoadingState,
    earlyBailout: _earlyBailout,
  });
}
