// @flow strict
import { type Cache } from './Cache';
import Graph from './Graph';
import { type HeightsStoreInterface } from './HeightsStore';
import mindex from './mindex';
import { type NodeData, type Position } from './types';

// When there's a 2-col item in the most recently fetched batch of items, we need to measure more items to ensure we have enough possible layouts to minimize whitespace above the 2-col item
// This may need to be tweaked to balance the tradeoff of delayed rendering vs having enough possible layouts
export const TWO_COL_ITEMS_MEASURE_BATCH_SIZE = 6;

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
  positions: $ReadOnlyArray<{ item: T, position: Position }>,
): $ReadOnlyArray<Position> {
  return positions.map(({ position }) => position);
}

function getAdjacentColumnHeightDeltas(heights: $ReadOnlyArray<number>): $ReadOnlyArray<number> {
  return heights.reduce((acc, height, index) => {
    const adjacentColumnHeight = heights[index + 1];
    if (adjacentColumnHeight >= 0) {
      return [...acc, Math.abs(height - adjacentColumnHeight)];
    }
    return acc;
  }, []);
}

function calculateTwoColumnModuleWidth(columnWidth: number, gutter: number): number {
  return columnWidth * 2 + gutter;
}

function calculateSplitIndex<T: { +[string]: mixed }>(
  itemsWithoutPositions: $ReadOnlyArray<T>,
): number {
  // Currently we only support one two column item at the same time, more items will be supporped soon
  const twoColumnIndex = itemsWithoutPositions.findIndex((item) => item.columnSpan === 2);

  if (twoColumnIndex < TWO_COL_ITEMS_MEASURE_BATCH_SIZE) {
    return 0;
  }

  if (twoColumnIndex + TWO_COL_ITEMS_MEASURE_BATCH_SIZE > itemsWithoutPositions.length) {
    return itemsWithoutPositions.length - TWO_COL_ITEMS_MEASURE_BATCH_SIZE;
  }

  return twoColumnIndex;
}

function initializeHeightsArray<T>({
  centerOffset,
  columnCount,
  columnWidth,
  columnWidthAndGutter,
  gutter,
  items,
  positionCache,
}: {
  centerOffset: number,
  columnCount: number,
  columnWidth: number,
  columnWidthAndGutter: number,
  gutter: number,
  items: $ReadOnlyArray<T>,
  positionCache: ?Cache<T, Position>,
}): $ReadOnlyArray<number> {
  const heights = new Array<number>(columnCount).fill(0);
  items.forEach((item) => {
    const position = positionCache?.get(item);
    if (position) {
      const col = (position.left - centerOffset) / columnWidthAndGutter;
      const isTwoColumnModule =
        position.width === calculateTwoColumnModuleWidth(columnWidth, gutter);
      const heightToAdd = position.height + gutter;
      heights[col] += heightToAdd;
      if (isTwoColumnModule) {
        // if position width is greater than columnWidth
        // increment height of the neighboring column as well
        heights[col + 1] += heightToAdd;
      }
    }
  });
  return heights;
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
}: {
  centerOffset: number,
  columnWidth: number,
  columnWidthAndGutter: number,
  gutter: number,
  heights: $ReadOnlyArray<number>,
  items: $ReadOnlyArray<T>,
  measurementCache: Cache<T, number>,
  positionCache?: Cache<T, Position>,
}): {
  positions: $ReadOnlyArray<{ item: T, position: Position }>,
  heights: $ReadOnlyArray<number>,
} {
  const heights = [...heightsArg];
  const positions = items.reduce(
    (positionsSoFar: $ReadOnlyArray<{ item: T, position: Position }>, item) => {
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
}: {
  centerOffset: number,
  columnWidth: number,
  columnWidthAndGutter: number,
  gutter: number,
  heights: $ReadOnlyArray<number>,
  item: T,
  measurementCache: Cache<T, number>,
  positionCache?: Cache<T, Position>,
}): {
  additionalWhitespace: number | null,
  heights: $ReadOnlyArray<number>,
  position: Position,
} {
  const heights = [...heightsArg];
  const height = measurementCache.get(item);

  if (isNil(height)) {
    return {
      additionalWhitespace: null,
      heights,
      position: offscreen(columnWidth),
    };
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
      width: calculateTwoColumnModuleWidth(columnWidth, gutter),
      height,
    },
  };
}

const defaultTwoColumnModuleLayout = <T: { +[string]: mixed }>({
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
}: {
  columnWidth?: number,
  gutter?: number,
  heightsCache?: HeightsStoreInterface,
  justify: 'center' | 'start',
  logWhitespace?: (number) => void,
  measurementCache: Cache<T, number>,
  minCols?: number,
  positionCache: Cache<T, Position>,
  rawItemCount: number,
  width?: ?number,
}): ((items: $ReadOnlyArray<T>) => $ReadOnlyArray<Position>) => {
  const columnWidthAndGutter = columnWidth + gutter;
  const columnCount = isNil(width)
    ? minCols
    : Math.max(Math.floor((width + gutter) / columnWidthAndGutter), minCols);

  return (items): $ReadOnlyArray<Position> => {
    if (isNil(width) || !items.every((item) => measurementCache.has(item))) {
      return items.map((item) =>
        offscreen(
          typeof item.columnSpan === 'number'
            ? columnWidth * item.columnSpan + gutter * (item.columnSpan - 1)
            : columnWidth,
        ),
      );
    }

    const centerOffset =
      justify === 'center'
        ? Math.max(
            Math.floor(
              (width - (Math.min(rawItemCount, columnCount) * columnWidthAndGutter + gutter)) / 2,
            ),
            0,
          )
        : Math.max(Math.floor((width - columnWidthAndGutter * columnCount + gutter) / 2), 0);

    // the total height of each column
    const heights =
      heightsCache && heightsCache.getHeights().length > 0
        ? heightsCache.getHeights()
        : initializeHeightsArray({
            centerOffset,
            columnCount,
            columnWidth,
            columnWidthAndGutter,
            gutter,
            items,
            positionCache,
          });

    const itemsWithPositions = items.filter((item) => positionCache?.has(item));
    const itemsWithoutPositions = items.filter((item) => !positionCache?.has(item));

    const twoColumnItems = itemsWithoutPositions.filter((item) => item.columnSpan === 2);
    const hasTwoColumnItems = twoColumnItems.length > 0;

    const commonGetPositionArgs = {
      centerOffset,
      columnWidth,
      columnWidthAndGutter,
      gutter,
      measurementCache,
      positionCache,
    };

    if (hasTwoColumnItems) {
      // If the number of items to position is greater that the batch size
      // we identify the batch with the two column item and apply the graph only to those items
      const twoColumnIndex = itemsWithoutPositions.indexOf(twoColumnItems[0]);

      const skipGraph =
        heights.every((height) => height === 0) && twoColumnIndex < heights.length - 1;
      const shouldBatchItems =
        skipGraph || itemsWithoutPositions.length > TWO_COL_ITEMS_MEASURE_BATCH_SIZE;

      const splitIndex =
        twoColumnIndex + TWO_COL_ITEMS_MEASURE_BATCH_SIZE > itemsWithoutPositions.length
          ? itemsWithoutPositions.length - TWO_COL_ITEMS_MEASURE_BATCH_SIZE
          : twoColumnIndex;
      const pre = shouldBatchItems ? itemsWithoutPositions.slice(0, splitIndex) : [];
      const batchWithTwoColumnItems = shouldBatchItems
        ? itemsWithoutPositions.slice(splitIndex, splitIndex + TWO_COL_ITEMS_MEASURE_BATCH_SIZE)
        : itemsWithoutPositions;

      // Get positions and heights for painted items
      const { positions: paintedItemPositions, heights: paintedItemHeights } =
        getOneColumnItemPositions({
          items: [...itemsWithPositions, ...pre],
          heights,
          ...commonGetPositionArgs,
        });

      // Adding the extra prev column items to the position cache
      if (paintedItemPositions.length > itemsWithPositions.length) {
        paintedItemPositions.forEach(({ item, position }) => {
          positionCache.set(item, position);
        });
      }

      const oneColumnItems = batchWithTwoColumnItems.filter(
        (item) => !item.columnSpan || item.columnSpan === 1,
      );

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
      }: {
        item: T,
        i: number,
        arr: $ReadOnlyArray<T>,
        prevNode: NodeData<T>,
        heightsArr: $ReadOnlyArray<number>,
        itemsSoFar?: $ReadOnlyArray<T>,
      }) {
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
      if (!skipGraph) {
        oneColumnItems.forEach((item, i, arr) => {
          addPossibleLayout({
            item,
            i,
            arr,
            heightsArr: paintedItemHeights,
            prevNode: startNodeData,
          });
        });
      }

      const { lowestScore, lowestScoreNode } = graph.findLowestScore(startNodeData);

      // The best solution may be "no solution", i.e. laying out the 2-col item first
      const winningNode =
        lowestScore === null || lowestScore < startingLowestAdjacentColumnHeightDelta
          ? lowestScoreNode
          : startNodeData;

      const { positions } = winningNode;

      // Insert 2-col item(s)
      const twoColItem = twoColumnItems[0]; // this should always only be one
      const {
        additionalWhitespace,
        heights: updatedHeights,
        position: twoColItemPosition,
      } = getTwoColItemPosition<T>({
        item: twoColItem,
        heights: winningNode.heights,
        ...commonGetPositionArgs,
      });

      // Combine winning positions and 2-col item position, add to cache
      const winningPositions = positions.concat({ item: twoColItem, position: twoColItemPosition });

      const positionedItems = new Set(winningPositions.map(({ item }) => item));
      // depending on where the 2-col item is positioned, there may be items that are still not positioned
      // calculate the remaining items and add them to the list of final positions
      const remainingItems = items.filter((item) => !positionedItems.has(item));
      const { heights: finalHeights, positions: remainingItemPositions } =
        getOneColumnItemPositions<T>({
          items: remainingItems,
          heights: updatedHeights,
          ...commonGetPositionArgs,
        });
      const finalPositions = winningPositions.concat(remainingItemPositions);

      // Log additional whitespace shown above the 2-col module
      // This may need to be tweaked or removed if pin leveling is implemented
      const additionalWhitespaceAboveTwoColModule = additionalWhitespace
        ? Math.min(additionalWhitespace, startingLowestAdjacentColumnHeightDelta)
        : startingLowestAdjacentColumnHeightDelta;
      logWhitespace?.(additionalWhitespaceAboveTwoColModule);

      finalPositions.forEach(({ item, position }) => {
        positionCache.set(item, position);
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
