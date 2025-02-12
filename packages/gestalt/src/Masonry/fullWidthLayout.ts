import { Cache } from './Cache';
import { getHeightAndGutter } from './layoutHelpers';
import mindex from './mindex';
import multiColumnLayout, { ColumnSpanConfig, ResponsiveModuleConfig } from './multiColumnLayout';
import { Position } from './types';

const defaultGetColumnSpanConfig = (): ColumnSpanConfig => 1;
const defaultGetResponsiveModuleConfig = (): ResponsiveModuleConfig => undefined;

const fullWidthLayout = <T>({
  width,
  idealColumnWidth = 240,
  gutter = 0,
  minCols = 2,
  measurementCache,
  _getColumnSpanConfig,
  _getResponsiveModuleConfigForSecondItem,
  ...otherProps
}: {
  idealColumnWidth?: number;
  gutter?: number;
  minCols?: number;
  width?: number | null | undefined;
  positionCache: Cache<T, Position>;
  measurementCache: Cache<T, number>;
  _getColumnSpanConfig?: (item: T) => ColumnSpanConfig;
  _getResponsiveModuleConfigForSecondItem?: (item: T) => ResponsiveModuleConfig;
  earlyBailout?: (columnSpan: number) => number;
  logWhitespace?: (
    additionalWhitespace: ReadonlyArray<number>,
    numberOfIterations: number,
    columnSpan: number,
  ) => void;
}): ((items: ReadonlyArray<T>) => ReadonlyArray<Position>) => {
  if (width == null) {
    return (items) =>
      items.map(() => ({
        top: Infinity,
        left: Infinity,
        width: Infinity,
        height: Infinity,
      }));
  }

  // "This is kind of crazy!" - you
  // Yes, indeed. The "guessing" here is meant to replicate the pass that the
  // original implementation takes with CSS.
  const colguess = Math.floor(width / idealColumnWidth);
  const columnCount = Math.max(Math.floor((width - colguess * gutter) / idealColumnWidth), minCols);
  const columnWidth = width / columnCount - gutter;
  const columnWidthAndGutter = columnWidth + gutter;
  const centerOffset = gutter / 2;

  return (items: ReadonlyArray<T>) => {
    const heights = new Array<number>(columnCount).fill(0);
    return _getColumnSpanConfig || _getResponsiveModuleConfigForSecondItem
      ? multiColumnLayout({
          items,
          columnWidth,
          columnCount,
          centerOffset,
          gutter,
          measurementCache,
          _getColumnSpanConfig: _getColumnSpanConfig ?? defaultGetColumnSpanConfig,
          _getResponsiveModuleConfigForSecondItem:
            _getResponsiveModuleConfigForSecondItem ?? defaultGetResponsiveModuleConfig,
          ...otherProps,
        })
      : items.reduce<Array<any>>((acc, item) => {
          const positions = acc;
          const height = measurementCache.get(item);
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
