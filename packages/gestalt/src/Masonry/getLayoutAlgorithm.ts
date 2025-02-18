import { Cache } from './Cache';
import defaultLayout from './defaultLayout';
import fullWidthLayout from './fullWidthLayout';
import { ColumnSpanConfig, ResponsiveModuleConfig } from './multiColumnLayout';
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
  _getResponsiveModuleConfigForSecondItem,
  _logTwoColWhitespace,
  _earlyBailout,
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
  _getResponsiveModuleConfigForSecondItem?: (item: T) => ResponsiveModuleConfig;
  _logTwoColWhitespace?: (
    additionalWhitespace: ReadonlyArray<number>,
    numberOfIterations: number,
    columnSpan: number,
  ) => void;
  _earlyBailout?: (columnSpan: number) => number;
}): (items: ReadonlyArray<T>) => ReadonlyArray<Position> {
  if ((layout === 'flexible' || layout === 'serverRenderedFlexible') && width !== null) {
    return fullWidthLayout({
      gutter,
      measurementCache: measurementStore,
      positionCache: positionStore,
      minCols,
      idealColumnWidth: columnWidth,
      width,
      originalItems: items,
      logWhitespace: _logTwoColWhitespace,
      _getColumnSpanConfig,
      _getResponsiveModuleConfigForSecondItem,
      earlyBailout: _earlyBailout,
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
    originalItems: items,
    _getColumnSpanConfig,
    _getResponsiveModuleConfigForSecondItem,
    earlyBailout: _earlyBailout,
  });
}
