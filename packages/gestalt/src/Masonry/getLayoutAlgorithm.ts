import { Cache } from './Cache';
import defaultLayout from './defaultLayout';
import fullWidthLayout from './fullWidthLayout';
import {
  ColumnSpanConfig,
  ModulePositioningConfig,
  ResponsiveModuleConfig,
} from './multiColumnLayout';
import { Align, Layout, Position } from './types';
import uniformRowLayout from './uniformRowLayout';

export function getIsFlexibleLayout({
  layout,
  width,
}: {
  layout: Layout;
  width: number | null | undefined;
}): boolean {
  return layout === 'flexible' || (layout === 'serverRenderedFlexible' && width !== null);
}

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
  _getModulePositioningConfig,
  _multiColPositionAlgoV2,
}: {
  align: Align;
  columnWidth: number | undefined;
  gutter: number;
  items: ReadonlyArray<T>;
  layout: Layout;
  measurementStore: Cache<T, number>;
  minCols: number;
  positionStore: Cache<T, Position>;
  width: number | null | undefined;
  _getColumnSpanConfig?: (item: T) => ColumnSpanConfig;
  _getModulePositioningConfig?: (gridSize: number, moduleSize: number) => ModulePositioningConfig;
  _getResponsiveModuleConfigForSecondItem?: (item: T) => ResponsiveModuleConfig;
  _logTwoColWhitespace?: (
    additionalWhitespace: ReadonlyArray<number>,
    numberOfIterations: number,
    columnSpan: number,
  ) => void;
  _multiColPositionAlgoV2?: boolean;
}): (items: ReadonlyArray<T>) => ReadonlyArray<Position> {
  if (getIsFlexibleLayout({ layout, width })) {
    return fullWidthLayout({
      gutter,
      layout,
      measurementCache: measurementStore,
      positionCache: positionStore,
      minCols,
      idealColumnWidth: columnWidth,
      width,
      originalItems: items,
      logWhitespace: _logTwoColWhitespace,
      _getColumnSpanConfig,
      _getResponsiveModuleConfigForSecondItem,
      _multiColPositionAlgoV2,
      _getModulePositioningConfig,
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
    _multiColPositionAlgoV2,
    _getModulePositioningConfig,
  });
}
