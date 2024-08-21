import { Cache } from './Cache';
import defaultLayout from './defaultLayout';
import fullWidthLayout from './fullWidthLayout';
import { ColumnSpanConfig } from './multiColumnLayout';
import { Align, Layout, Position } from './types';
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
  _logTwoColWhitespace?: (arg1: ReadonlyArray<number>) => void;
}): (forItems: ReadonlyArray<T>) => ReadonlyArray<Position> {
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
    });
  }
  if (layout === 'uniformRow') {
    return uniformRowLayout({
      cache: measurementStore,
      columnWidth,
      gutter,
      minCols,
      width,
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
    rawItemCount: items.length,
    width,
    _getColumnSpanConfig,
  });
}
