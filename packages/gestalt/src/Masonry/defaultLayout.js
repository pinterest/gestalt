// @flow strict
import { type Cache } from './Cache.js';
import Graph from './Graph.js';
import HeightsStore, { type HeightsStoreInterface } from './HeightsStore';
import mindex from './mindex.js';
import { type NodeData, type Position } from './types.js';

function isNil(value: mixed): boolean %checks {
  return value === null || value === undefined;
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

function getAdjacentColumnHeightDeltas(heights: $ReadOnlyArray<number>): $ReadOnlyArray<number> {
  return heights.reduce((acc, height, index) => {
    const adjacentColumnHeight = heights[index + 1];
    if (adjacentColumnHeight) {
      return [...acc, Math.abs(height - adjacentColumnHeight)];
    }
    return acc;
  }, []);
}

function getOneColumnItemPositions<T>({
  centerOffset,
  columnWidth,
  columnWidthAndGutter,
  gutter,
  heights,
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
|}): {|
  positions: $ReadOnlyArray<{| item: T, position: Position |}>,
  heights: $ReadOnlyArray<number>,
|} {
  // const heights = [...heightsArg];
  const positions = items.reduce((positionsSoFar, item) => {
    const height = measurementCache.get(item);

    const cachedPosition = positionCache.get(item);
    if (cachedPosition) {
      if (!isNil(cachedPosition.column)) {
        console.log('CACHED single column heights before', { heights: [...heights], height, item });

        const heightAndGutter = cachedPosition.height + gutter;

        if (item.columnSpan === 2) {
          const newColumnHeight =
            Math.max(heights[cachedPosition.column], heights[cachedPosition.column + 1]) +
            heightAndGutter;
          heights[cachedPosition.column] = newColumnHeight;
          heights[cachedPosition.column + 1] = newColumnHeight;
          console.log('TWO COLUMN ITEM', {
            name: item.name,
            heights: [...heights],
            height,
            cachedPosition,
            item,
          });
        } else {
          heights[cachedPosition.column] += heightAndGutter;
        }

        console.log('CACHED single column heights after', { heights: [...heights], height, item });
      }
      return [...positionsSoFar, { item, position: cachedPosition }];
    }

    if (!isNil(height)) {
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
            column: col,
          },
        },
      ];
    }

    return positionsSoFar;
  }, []);

  return { positions, heights };
}

function getTwoColItemPosition<T>({
  centerOffset,
  columnWidth,
  columnWidthAndGutter,
  gutter,
  heights,
  item,
  measurementCache,
  positionCache,
}: {|
  centerOffset: number,
  columnWidth: number,
  columnWidthAndGutter: number,
  gutter: number,
  heights: $ReadOnlyArray<number>,
  item: T,
  measurementCache: Cache<T, number>,
  positionCache: Cache<T, Position>,
|}): {| heights: $ReadOnlyArray<number>, position: Position |} {
  // const heights = [...heightsArg];
  const height = measurementCache.get(item);

  if (isNil(height)) {
    return { heights, position: offscreen(columnWidth) };
  }

  // This position will never be cached
  // const cachedPosition = positionCache.get(item);
  // if (cachedPosition) {
  //   if (!isNil(cachedPosition.column)) {
  //     const newColumnHeight =
  //       Math.max(heights[cachedPosition.column], heights[cachedPosition.column + 1]) +
  //       cachedPosition.height +
  //       gutter;
  //     heights[cachedPosition.column] = newColumnHeight;
  //     heights[cachedPosition.column + 1] = newColumnHeight;
  //   }
  //   return { heights, position: cachedPosition };
  // }

  const heightAndGutter = height + gutter;

  // Find height deltas for each column as compared to the next column
  const adjacentColumnHeightDeltas = getAdjacentColumnHeightDeltas(heights);
  const lowestAdjacentColumnHeightDeltaIndex = adjacentColumnHeightDeltas.indexOf(
    Math.min(...adjacentColumnHeightDeltas),
  );
  // Deltas can go either way, so find which of the two adjacent columns is higher
  const leftIsTaller =
    heights[lowestAdjacentColumnHeightDeltaIndex] >
    heights[lowestAdjacentColumnHeightDeltaIndex + 1];
  const tallestColumn = leftIsTaller
    ? lowestAdjacentColumnHeightDeltaIndex
    : lowestAdjacentColumnHeightDeltaIndex + 1;

  const top = heights[tallestColumn];
  const left = lowestAdjacentColumnHeightDeltaIndex * columnWidthAndGutter + centerOffset;

  console.log('two column: heights before', { name: item.name, heights: [...heights], item });

  // Increase the heights of both adjacent columns
  heights[tallestColumn] += heightAndGutter;
  heights[leftIsTaller ? tallestColumn + 1 : tallestColumn - 1] = heights[tallestColumn];

  console.log('two column: heights after', { name: item.name, heights: [...heights], item });

  return {
    heights,
    position: {
      top,
      left,
      width: columnWidth * 2 + gutter,
      height,
      column: lowestAdjacentColumnHeightDeltaIndex,
    },
  };
}

const defaultLayout = <T>({
  columnWidth = 236,
  gutter = 14,
  heightsCache,
  justify,
  measurementCache,
  minCols = 2,
  positionCache,
  rawItemCount,
  width,
}: {|
  columnWidth?: number,
  gutter?: number,
  heightsCache: HeightsStoreInterface,
  justify: 'center' | 'start',
  measurementCache: Cache<T, number>,
  minCols?: number,
  positionCache: Cache<T, Position>,
  rawItemCount: number,
  width?: ?number,
|}): ({|
  columnCount: number | null,
  getPositions: (items: $ReadOnlyArray<T>) => {|
    heights: $ReadOnlyArray<number>,
    positions: $ReadOnlyArray<Position>,
  |},
|}) => {
  const columnWidthAndGutter = columnWidth + gutter;
  const columnCount = isNil(width)
    ? minCols
    : Math.max(Math.floor((width + gutter) / columnWidthAndGutter), minCols);

  return {
    columnCount,
    getPositions: (
      items,
    ): {| heights: $ReadOnlyArray<number>, positions: $ReadOnlyArray<Position> |} => {
      // the total height of each column
      // const heights =
      //   heightsCache.getHeights().length > 0
      //     ? heightsCache.getHeights()
      //     : new Array(columnCount).fill(0);
      let heights = new Array(columnCount).fill(0);

      if (isNil(width) || !items.every((item) => measurementCache.has(item))) {
        return { heights, positions: items.map(() => offscreen(columnWidth)) };
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
        const { positions: paintedItemPositions, heights: paintedItemHeights } =
          getOneColumnItemPositions({
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
          const { positions: updatedPositions, heights: updatedHeights } =
            getOneColumnItemPositions<T>({
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

          const adjacentColumnHeightDeltas = getAdjacentColumnHeightDeltas(updatedHeights);
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

        const { lowestScoreNode } = graph.findLowestScore(startNodeData);

        const { positions: winningPositions } = lowestScoreNode;

        // IMPLEMENT PIN LEVELING ON WINNING POSITIONS

        // Insert 2-col item(s)
        const twoColItem = twoColumnItems[0]; // this should always only be one
        heights = lowestScoreNode.heights;
        const { heights: finalHeights, position: twoColItemPosition } = getTwoColItemPosition<T>({
          item: twoColItem,
          heights,
          ...commonGetPositionArgs,
        });

        // Combine winning positions and 2-col item position, add to cache
        const finalPositions = [
          ...winningPositions,
          { item: twoColItem, position: twoColItemPosition },
        ];
        finalPositions.forEach(({ item, position }) => {
          positionCache.set(item, position);
        });

        // FUTURE OPTIMIZATION - do we want a min threshold for an acceptably low score?
        // If so, we could save the 2-col item somehow and try again with the next batch of items

        return { heights: finalHeights, positions: getPositionsOnly(finalPositions) };
      }

      const { heights: finalHeights, positions: itemPositions } = getOneColumnItemPositions<T>({
        items,
        heights,
        ...commonGetPositionArgs,
      });
      itemPositions.forEach(({ item, position }) => {
        positionCache.set(item, position);
      });
      const positionsOnly = getPositionsOnly<T>(itemPositions);

      return { heights: finalHeights, positions: positionsOnly };
    },
  };
};

export default defaultLayout;
