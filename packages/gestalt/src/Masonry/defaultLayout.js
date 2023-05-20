// @flow strict
import { type Cache } from './Cache.js';
import Graph from './Graph.js';
import mindex from './mindex.js';
import { type NodeData, type Position } from './types.js';

function isNotNil(value: mixed): boolean %checks {
  return value !== null && value !== undefined;
}

const offscreen = (width: number, height: number = Infinity) => ({
  top: -9999,
  left: -9999,
  width,
  height,
});

function getPositionsOnly<T>(
  positions: $ReadOnlyArray<{| item: T, position: Position |}>,
): $ReadOnlyArray<Position> {
  return positions.map(({ position }) => position);
}

function getPositions<T>({
  centerOffset,
  columnWidth,
  columnWidthAndGutter,
  gutter,
  heights: heightsArg,
  items,
  measurementCache,
}: {|
  centerOffset: number,
  columnWidth: number,
  columnWidthAndGutter: number,
  gutter: number,
  heights: $ReadOnlyArray<number>,
  items: $ReadOnlyArray<T>,
  measurementCache: Cache<T, number>,
|}): {|
  positions: $ReadOnlyArray<{| item: T, position: Position |}>,
  heights: $ReadOnlyArray<number>,
|} {
  const heights = [...heightsArg];
  const positions = items.reduce((positionsSoFar, item) => {
    const height = measurementCache.get(item);

    if (isNotNil(height)) {
      const heightAndGutter = height + gutter;
      const col = mindex(heights);
      const top = heights[col];
      const left = col * columnWidthAndGutter + centerOffset;

      heights[col] += heightAndGutter;
      return [
        ...positionsSoFar,
        {
          item,
          position: {
            top,
            left,
            width: columnWidth,
            height,
          },
        },
      ];
    }

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
    if (width == null || !items.every((item) => measurementCache.has(item))) {
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
    };

    // if (false) {
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
        itemsSoFar = [],
      }: {|
        item: T,
        i: number,
        arr: $ReadOnlyArray<T>,
        prevNode: NodeData<T>,
        heightsArr: $ReadOnlyArray<number>,
        itemsSoFar?: $ReadOnlyArray<T>,
      |}) {
        // Copy the heights and positions arrays so we don't mutate them
        const heightsSoFar = [...heightsArr];

        // Get the positions and heights after adding this item
        const { positions: updatedPositions, heights: updatedHeights } = getPositions<T>({
          items: [...itemsSoFar, item],
          heights: heightsSoFar,
          ...commonGetPositionArgs,
        });

        // Add the new node to the graph
        const paintedItemData = {
          id: item,
          heights: updatedHeights,
          positions: updatedPositions,
        };

        const adjacentColumnHeightDeltas = updatedHeights.reduce((acc, height, index) => {
          const adjacentColumnHeight = updatedHeights[index + 1];
          if (adjacentColumnHeight) {
            return [...acc, Math.abs(height - adjacentColumnHeight)];
          }
          return acc;
        }, []);
        const lowestAdjacentColumnHeightDelta = Math.min(...adjacentColumnHeightDeltas);

        graph.addNode(paintedItemData);
        graph.addEdge(prevNode, paintedItemData, lowestAdjacentColumnHeightDelta);

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
              itemsSoFar: [...itemsSoFar, item],
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

      console.log('graph', graph.prettyPrintGraph(startNodeData));

      const { lowestScore, lowestScoreNode } = graph.findLowestScore(startNodeData);
      console.log('lowestScore', lowestScore);
      console.log('lowestScoreNode', lowestScoreNode);

      const { positions: finalPositions } = lowestScoreNode;

      // INSERT 2-COL ITEM

      // LAYOUT REMAINING ITEMS

      // FUTURE OPTIMIZATION - do we want a min threshold for an acceptably low score?
      // If so, we could save the 2-col item somehow and try again with the next batch of items

      return getPositionsOnly(finalPositions);
    }

    const { positions: itemPositions } = getPositions<T>({
      items,
      heights,
      ...commonGetPositionArgs,
    });
    itemPositions.forEach(({ item, position }) => {
      positionCache.set(item, position);
    });
    const positionsOnly = getPositionsOnly<T>(itemPositions);

    return positionsOnly;
  };

export default defaultLayout;
