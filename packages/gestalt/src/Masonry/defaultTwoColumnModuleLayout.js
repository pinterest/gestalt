// @flow strict
import { type Cache } from './Cache.js';
import Graph from './Graph.js';
import { type HeightsStoreInterface } from './HeightsStore.js';
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
  positionCache?: Cache<T, Position>,
|}): {|
  positions: $ReadOnlyArray<{| item: T, position: Position |}>,
  heights: $ReadOnlyArray<number>,
|} {
  const heights = [...heightsArg];
  const positions = items.reduce(
    (positionsSoFar: $ReadOnlyArray<{| item: T, position: Position |}>, item) => {
      const height = measurementCache.get(item);

      const cachedPosition = positionCache?.get(item);
      if (cachedPosition) {
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
            },
          },
        ];
      }

      return positionsSoFar;
    },
    [],
  );

  return { positions, heights };
}

function getTwoColItemPosition<T>({
  centerOffset,
  columnWidth,
  columnWidthAndGutter,
  gutter,
  heights: heightsArg,
  item,
  measurementCache,
}: {|
  centerOffset: number,
  columnWidth: number,
  columnWidthAndGutter: number,
  gutter: number,
  heights: $ReadOnlyArray<number>,
  item: T,
  measurementCache: Cache<T, number>,
  positionCache?: Cache<T, Position>,
|}): {|
  additionalWhitespace: number | null,
  heights: $ReadOnlyArray<number>,
  position: Position,
|} {
  const heights = [...heightsArg];
  const height = measurementCache.get(item);

  if (isNil(height)) {
    return { additionalWhitespace: null, heights, position: offscreen(columnWidth) };
  }

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

  // Increase the heights of both adjacent columns
  heights[tallestColumn] += heightAndGutter;
  heights[leftIsTaller ? tallestColumn + 1 : tallestColumn - 1] = heights[tallestColumn];

  return {
    additionalWhitespace: adjacentColumnHeightDeltas[lowestAdjacentColumnHeightDeltaIndex],
    heights,
    position: {
      top,
      left,
      width: columnWidth * 2 + gutter,
      height,
    },
  };
}

const defaultTwoColumnModuleLayout = <T>({
  columnWidth = 236,
  gutter = 14,
  heightsCache,
  justify,
  logWhitespace,
  measurementCache,
  minCols = 2,
  positionCache,
  rawItemCount,
  width,
}: {|
  columnWidth?: number,
  gutter?: number,
  heightsCache?: HeightsStoreInterface,
  justify: 'center' | 'start',
  logWhitespace?: (number) => void,
  measurementCache: Cache<T, number>,
  minCols?: number,
  positionCache?: Cache<T, Position>,
  rawItemCount: number,
  width?: ?number,
|}): ((items: $ReadOnlyArray<T>) => $ReadOnlyArray<Position>) => {
  const columnWidthAndGutter = columnWidth + gutter;
  const columnCount = isNil(width)
    ? minCols
    : Math.max(Math.floor((width + gutter) / columnWidthAndGutter), minCols);

  return (items): $ReadOnlyArray<Position> => {
    // the total height of each column
    const heights =
      heightsCache && heightsCache.getHeights().length > 0
        ? heightsCache.getHeights()
        : new Array<number>(columnCount).fill(0);

    if (isNil(width) || !items.every((item) => measurementCache.has(item))) {
      return items.map(() => offscreen(columnWidth));
    }

    const itemsWithPositions = items.filter((item) => positionCache?.has(item));
    const itemsWithoutPositions = items.filter((item) => !positionCache?.has(item));

    // $FlowFixMe[incompatible-use] We're assuming `columnSpan` exists
    const twoColumnItems = itemsWithoutPositions.filter((item) => item.columnSpan > 1);
    const hasTwoColumnItems = twoColumnItems.length > 0;
    const oneColumnItems = itemsWithoutPositions.filter(
      // $FlowFixMe[incompatible-type] We're assuming `columnSpan` exists
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
      const graph = new Graph<T>();
      // Start node will be what's been painted so far
      const startNodeData = {
        id: 'start',
        heights: paintedItemHeights,
        positions: paintedItemPositions,
      };
      graph.addNode(startNodeData);

      const startingAdjacentColumnHeightDeltas = getAdjacentColumnHeightDeltas(paintedItemHeights);
      const startingLowestAdjacentColumnHeightDelta = Math.min(
        ...startingAdjacentColumnHeightDeltas,
      );

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
        // Copy the heights array so we don't mutate
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
              heightsArr,
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

      const { lowestScore, lowestScoreNode } = graph.findLowestScore(startNodeData);

      // The best solution may be "no solution", i.e. laying out the 2-col item first
      const winningNode =
        lowestScore === null || lowestScore < startingLowestAdjacentColumnHeightDelta
          ? lowestScoreNode
          : startNodeData;

      const { positions: winningPositions } = winningNode;

      // Insert 2-col item(s)
      const twoColItem = twoColumnItems[0]; // this should always only be one
      const {
        additionalWhitespace,
        heights: finalHeights,
        position: twoColItemPosition,
      } = getTwoColItemPosition<T>({
        item: twoColItem,
        heights: lowestScoreNode.heights,
        ...commonGetPositionArgs,
      });

      // Combine winning positions and 2-col item position, add to cache
      const finalPositions = [
        ...winningPositions,
        { item: twoColItem, position: twoColItemPosition },
      ];

      // Log additional whitespace shown above the 2-col module
      // This may need to be tweaked or removed if pin leveling is implemented
      const additionalWhitespaceAboveTwoColModule = additionalWhitespace
        ? Math.min(additionalWhitespace, startingLowestAdjacentColumnHeightDelta)
        : startingLowestAdjacentColumnHeightDelta;
      logWhitespace?.(additionalWhitespaceAboveTwoColModule);

      finalPositions.forEach(({ item, position }) => {
        positionCache?.set(item, position);
      });
      heightsCache?.setHeights(finalHeights);

      // FUTURE OPTIMIZATION - do we want a min threshold for an acceptably low score?
      // If so, we could save the 2-col item somehow and try again with the next batch of items

      return getPositionsOnly(finalPositions);
    }

    const { heights: finalHeights, positions: itemPositions } = getOneColumnItemPositions<T>({
      items,
      heights,
      ...commonGetPositionArgs,
    });
    itemPositions.forEach(({ item, position }) => {
      positionCache?.set(item, position);
    });
    heightsCache?.setHeights(finalHeights);

    return getPositionsOnly<T>(itemPositions);
  };
};

export default defaultTwoColumnModuleLayout;
