// @flow strict
import { type Cache } from './Cache.js';
import Graph from './Graph.js';
import mindex from './mindex.js';
import { type NodeData, type Position } from './types.js';

const offscreen = (width: number, height: number = Infinity) => ({
  top: -9999,
  left: -9999,
  width,
  height,
});

function getPositions<T>({
  centerOffset,
  columnWidth,
  columnWidthAndGutter,
  gutter,
  heights: heightsArg,
  items,
  measurementCache,
  positionCache,
}: {|
  centerOffset: number,
  columnWidth: number,
  columnWidthAndGutter: number,
  gutter: number,
  heights: $ReadOnlyArray<number>,
  items: $ReadOnlyArray<T>,
  measurementCache: Cache<T, number>,
  positionCache: Cache<T, Position>,
|}): {| positions: $ReadOnlyArray<Position>, heights: $ReadOnlyArray<number> |} {
  const heights = [...heightsArg];
  const positions = items.reduce((acc, item) => {
    const positionsSoFar = acc;
    const height = measurementCache.get(item);
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
      positionCache.set(item, position);
    }
    positionsSoFar.push(position);
    return positionsSoFar;
  }, []);
  return { positions, heights };
}

const defaultLayout =
  <T>({
    columnWidth = 236,
    gutter = 14,
    justify,
    measurementCache,
    positionCache,
    minCols = 2,
    rawItemCount,
    width,
  }: {|
    columnWidth?: number,
    gutter?: number,
    justify: 'center' | 'start',
    measurementCache: Cache<T, number>,
    positionCache: Cache<T, Position>,
    minCols?: number,
    rawItemCount: number,
    width?: ?number,
  |}): ((items: $ReadOnlyArray<T>) => $ReadOnlyArray<Position>) =>
  (items): $ReadOnlyArray<Position> => {
    if (width == null) {
      return items.map(() => offscreen(columnWidth));
    }

    const itemsWithPositions = items.filter((item) => positionCache.has(item));
    const itemsWithoutPositions = items.filter((item) => !positionCache.has(item));

    // $FlowFixMe[incompatible-use] clearly I don't understand how the `T` type works
    const twoColumnItems = itemsWithoutPositions.filter((item) => item.columnSpan > 1);
    const hasTwoColumnItems = twoColumnItems.length > 0;
    const oneColumnItems = itemsWithoutPositions.filter(
      // $FlowFixMe[incompatible-type] clearly I don't understand how the `T` type works
      (item) => !item.columnSpan || item.columnSpan === 1,
    );

    const columnWidthAndGutter = columnWidth + gutter;
    const columnCount = Math.max(Math.floor((width + gutter) / columnWidthAndGutter), minCols);
    // the total height of each column
    const heights = new Array(columnCount).fill(0);

    let centerOffset;
    if (justify === 'center') {
      const contentWidth = Math.min(rawItemCount, columnCount) * columnWidthAndGutter + gutter;

      centerOffset = Math.max(Math.floor((width - contentWidth) / 2), 0);
    } else {
      centerOffset = Math.max(
        Math.floor((width - columnWidthAndGutter * columnCount + gutter) / 2),
        0,
      );
    }

    const commonGetPositionArgs = {
      centerOffset,
      columnWidth,
      columnWidthAndGutter,
      gutter,
      measurementCache,
      positionCache,
    };

    if (hasTwoColumnItems) {
      // Get positions and heights for painted items
      const { positions: paintedItemPositions, heights: paintedItemHeights } = getPositions({
        items: itemsWithPositions,
        heights,
        ...commonGetPositionArgs,
      });

      // Initialize the graph
      const graph = new Graph();
      // Start node will be what's been painted so far
      const startNodeData = {
        id: 'start',
        heights: paintedItemHeights,
        positions: paintedItemPositions,
      };
      graph.addNode(startNodeData);

      // Recursive function to add possible layouts to the graph
      // eslint-disable-next-line no-inner-declarations
      function addPossibleLayout({
        item,
        i,
        arr,
        prevNode,
        heightsArr,
      }: {|
        item: T,
        i: number,
        arr: $ReadOnlyArray<T>,
        prevNode: NodeData,
        heightsArr: $ReadOnlyArray<number>,
      |}) {
        // Copy the heights array so we don't mutate it
        const heightsSoFar = [...heightsArr];

        // Get the positions and heights after adding this item
        const { positions: updatedPositions, heights: updatedHeights } = getPositions<T>({
          items: [item],
          heights: heightsSoFar,
          ...commonGetPositionArgs,
        });

        // Add the new node to the graph
        const paintedItemData = {
          id: item,
          heights: updatedHeights,
          positions: updatedPositions,
        };
        graph.addNode(paintedItemData);
        graph.addEdge(prevNode, paintedItemData);

        // If there are items remaining in the array that haven't yet been laid out, keep going
        if (arr.length > 1) {
          const otherItems = [...arr];
          otherItems.splice(i, 1);
          otherItems.forEach((otherItem, index, array) => {
            addPossibleLayout({
              item: otherItem,
              i: index,
              arr: array,
              heightsArr: updatedHeights,
              prevNode: paintedItemData,
            });
          });
        }
      }

      // For each unpainted item, start generating possible layouts
      oneColumnItems.forEach((item, i, arr) => {
        addPossibleLayout({
          item,
          i,
          arr,
          heightsArr: paintedItemHeights,
          prevNode: startNodeData,
        });
      });

      console.log('graph', graph.prettyPrintGraph(startNodeData, 'name'));
      return [...paintedItemPositions];
    }

    const { positions: itemPositions } = getPositions<T>({
      items,
      heights,
      ...commonGetPositionArgs,
    });

    return itemPositions;
  };

export default defaultLayout;
