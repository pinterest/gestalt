// @flow strict
import { type Align, type Layout } from 'gestalt/src//Masonry/types';
import { type Cache } from './Cache';
import mindex from './mindex';
import { type Position } from './types';

const offscreen = (width: number, height: number = Infinity) => ({
  top: -9999,
  left: -9999,
  width,
  height,
});

const calculateCenterOffset = ({
  columnCount,
  columnWidthAndGutter,
  gutter,
  justify,
  layout,
  rawItemCount,
  width,
}: {
  columnCount: number,
  columnWidthAndGutter: number,
  gutter: number,
  justify: Align,
  layout: Layout,
  rawItemCount: number,
  width: number,
}): number => {
  if (layout === 'basicCentered') {
    const contentWidth = Math.min(rawItemCount, columnCount) * columnWidthAndGutter + gutter;
    return Math.max(Math.floor((width - contentWidth) / 2), 0);
  }
  if (justify === 'center') {
    return Math.max(Math.floor((width - columnWidthAndGutter * columnCount + gutter) / 2), 0);
  }
  if (justify === 'end') {
    return width - (columnWidthAndGutter * columnCount - gutter);
  }
  return 0;
};

const defaultLayout =
  <T>({
    justify,
    cache,
    columnWidth = 236,
    gutter = 14,
    layout,
    minCols = 2,
    rawItemCount,
    width,
  }: {
    columnWidth?: number,
    gutter?: number,
    justify: Align,
    layout: Layout,
    cache: Cache<T, number>,
    minCols?: number,
    rawItemCount: number,
    width?: ?number,
  }): ((items: $ReadOnlyArray<T>) => $ReadOnlyArray<Position>) =>
  (items): $ReadOnlyArray<Position> => {
    if (width == null) {
      return items.map(() => offscreen(columnWidth));
    }

    const columnWidthAndGutter = columnWidth + gutter;
    const columnCount = Math.max(Math.floor((width + gutter) / columnWidthAndGutter), minCols);
    // the total height of each column
    const heights = new Array<number>(columnCount).fill(0);

    const centerOffset = calculateCenterOffset({
      columnCount,
      columnWidthAndGutter,
      gutter,
      justify,
      layout,
      rawItemCount,
      width,
    });

    return items.reduce((acc, item) => {
      const positions = acc;
      const height = cache.get(item);
      let position;

      if (height == null) {
        position = offscreen(columnWidth);
      } else {
        const heightAndGutter = height + gutter;
        const col = mindex(heights);
        const top = heights[col];
        const left = col * columnWidthAndGutter + centerOffset;

        heights[col] += heightAndGutter;
        position = { top, left, width: columnWidth, height };
      }
      // $FlowFixMe[prop-missing]
      positions.push(position);
      return positions;
    }, []);
  };

export default defaultLayout;
