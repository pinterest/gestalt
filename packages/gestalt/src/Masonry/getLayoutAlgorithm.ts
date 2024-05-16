import { Cache } from './Cache';
import defaultLayout from './defaultLayout';
import defaultTwoColumnModuleLayout from './defaultTwoColumnModuleLayout';
import fullWidthLayout from './fullWidthLayout';
import { Align, Layout, Position } from './types';
import uniformRowLayout from './uniformRowLayout';

export default function getLayoutAlgorithm<
  T extends {
    readonly [key: string]: unknown;
  },
>({
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
  align: Align;
  columnWidth: number;
  gutter?: number;
  items: ReadonlyArray<T>;
  layout: Layout;
  measurementStore: Cache<T, number>;
  minCols: number;
  positionStore: Cache<T, Position>;
  width: number | null | undefined;
  _twoColItems?: boolean;
  _logTwoColWhitespace?: (arg1: number) => void;
}): (forItems: ReadonlyArray<T>) => ReadonlyArray<Position> {
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
