// @flow strict
import { type Cache } from './Cache';
import defaultLayout from './defaultLayout';
import defaultTwoColumnModuleLayout from './defaultTwoColumnModuleLayout';
import fullWidthLayout from './fullWidthLayout';
import { type Align, type Layout, type Position } from './types';
import uniformRowLayout from './uniformRowLayout';

export default function getLayoutAlgorithm<T: { +[string]: mixed }>({
  align,
  columnWidth,
  gutter,
  items,
  layout,
  measurementStore,
  minCols,
  positionStore,
  width,
  _twoColItems,
  _logTwoColWhitespace,
}: {
  align: Align,
  columnWidth: number,
  gutter?: number,
  items: $ReadOnlyArray<T>,
  layout: Layout,
  measurementStore: Cache<T, number>,
  minCols: number,
  positionStore: Cache<T, Position>,
  width: ?number,
  _twoColItems?: boolean,
  _logTwoColWhitespace?: (number) => void,
}): (items: $ReadOnlyArray<T>) => $ReadOnlyArray<Position> {
  if ((layout === 'flexible' || layout === 'serverRenderedFlexible') && width !== null) {
    return fullWidthLayout({
      gutter,
      cache: measurementStore,
      minCols,
      idealColumnWidth: columnWidth,
      width,
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
  if (_twoColItems === true) {
    return defaultTwoColumnModuleLayout({
      align: layout === 'basicCentered' ? 'center' : 'start',
      measurementCache: measurementStore,
      positionCache: positionStore,
      columnWidth,
      gutter,
      logWhitespace: _logTwoColWhitespace,
      minCols,
      rawItemCount: items.length,
      width,
    });
  }
  return defaultLayout({
    align,
    cache: measurementStore,
    columnWidth,
    gutter,
    layout,
    minCols,
    rawItemCount: items.length,
    width,
  });
}
