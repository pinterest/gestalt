// @flow strict
import { type Cache } from './Cache';
import defaultLayout from './defaultLayout';
import defaultTwoColumnModuleLayout from './defaultTwoColumnModuleLayout';
import fullWidthLayout from './fullWidthLayout';
import { type Layout, type Position } from './types';
import uniformRowLayout from './uniformRowLayout';

export default function getLayoutAlgorithm<T: { +[string]: mixed }>({
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
      measurementCache: measurementStore,
      positionCache: positionStore,
      columnWidth,
      gutter,
      justify: layout === 'basicCentered' ? 'center' : 'start',
      logWhitespace: _logTwoColWhitespace,
      minCols,
      rawItemCount: items.length,
      width,
    });
  }
  return defaultLayout({
    cache: measurementStore,
    columnWidth,
    gutter,
    justify: layout === 'basicCentered' ? 'center' : 'start',
    minCols,
    rawItemCount: items.length,
    width,
  });
}
