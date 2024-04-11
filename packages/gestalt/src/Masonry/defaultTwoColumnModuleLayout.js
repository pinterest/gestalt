// @flow strict
import { type Cache } from './Cache';
import Graph from './Graph';
import { type HeightsStoreInterface } from './HeightsStore';
import mindex from './mindex';
import { type NodeData, type Position } from './types';

// When there's a 2-col item in the most recently fetched batch of items, we need to measure more items to ensure we have enough possible layouts to minimize whitespace above the 2-col item
// This may need to be tweaked to balance the tradeoff of delayed rendering vs having enough possible layouts
export const TWO_COL_ITEMS_MEASURE_BATCH_SIZE = 5;

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

function calculateSplitIndex({
  oneColumnItemsLength,
  twoColumnIndex,
  emptyColumns,
  fitsFirstRow,
  replaceWithOneColItems,
}: {
  oneColumnItemsLength: number,
  twoColumnIndex: number,
  emptyColumns: number,
  fitsFirstRow: boolean,
  replaceWithOneColItems: boolean,
}): number {
  // multi column item is on its original position
  if (fitsFirstRow) {
    return twoColumnIndex;
  }

  // We use as many one col items as empty columns to fill first row
  if (replaceWithOneColItems) {
    return emptyColumns;
  }

  // If two column module is near the end of the batch
  // we move the index so it has enough items for the graph
  if (twoColumnIndex + TWO_COL_ITEMS_MEASURE_BATCH_SIZE > oneColumnItemsLength) {
    return Math.max(
      oneColumnItemsLength - TWO_COL_ITEMS_MEASURE_BATCH_SIZE,
      // We have to keep at least the items for the empty columns to fill
      emptyColumns,
    );
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

function getGraphPositions<T>({
  items,
  positions,
  heights,
  whitespaceThreshold,
  ...commonGetPositionArgs
}: {
  items: $ReadOnlyArray<T>,
  heights: $ReadOnlyArray<number>,
  positions: $ReadOnlyArray<{ item: T, position: Position }>,
  whitespaceThreshold?: number,
  centerOffset: number,
  columnWidth: number,
  columnWidthAndGutter: number,
  gutter: number,
  measurementCache: Cache<T, number>,
  positionCache?: Cache<T, Position>,
}): {
  winningNode: NodeData<T>,
  additionalWhitespace: number,
} {
  // When whitespace threshold is set this variables store the score and node if found
  let bailoutScore;
  let bailoutNode;

  // Initialize the graph
  const graph = new Graph<T>();
  // Start node will be what's been painted so far
  const startNodeData = {
    id: 'start',
    heights,
    positions,
  };
  graph.addNode(startNodeData);

  const startingAdjacentColumnHeightDeltas = getAdjacentColumnHeightDeltas(heights);
  const startingLowestAdjacentColumnHeightDelta = Math.min(...startingAdjacentColumnHeightDeltas);

  // Recursive function to add possible layouts to the graph
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
    if (bailoutNode) {
      return;
    }

    // Copy the heights array so we don't mutate
    const heightsSoFar = [...heightsArr];

    // Get the positions and heights after adding this item
    const { positions: updatedPositions, heights: updatedHeights } = getOneColumnItemPositions<T>({
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

    if (
      typeof whitespaceThreshold === 'number' &&
      lowestAdjacentColumnHeightDelta < whitespaceThreshold
    ) {
      bailoutScore = lowestAdjacentColumnHeightDelta;
      bailoutNode = paintedItemData;
      return;
    }

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
  items.forEach((item, i, arr) => {
    addPossibleLayout({
      item,
      i,
      arr,
      heightsArr: heights,
      prevNode: startNodeData,
    });
  });

  const { lowestScoreNode, lowestScore } = bailoutNode
    ? {
        lowestScoreNode: bailoutNode,
        lowestScore: bailoutScore ?? 0,
      }
    : graph.findLowestScore(startNodeData);

  // The best solution may be "no solution", i.e. laying out the 2-col item first
  return lowestScore === null || lowestScore < startingLowestAdjacentColumnHeightDelta
    ? { winningNode: lowestScoreNode, additionalWhitespace: lowestScore ?? 0 }
    : { winningNode: startNodeData, additionalWhitespace: startingLowestAdjacentColumnHeightDelta };
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
  whitespaceThreshold,
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
  whitespaceThreshold?: number,
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
      // Currently we only support one two column item at the same time, more items will be supporped soon
      const twoColumnIndex = itemsWithoutPositions.indexOf(twoColumnItems[0]);
      const oneColumnItems = itemsWithoutPositions.filter(
        (item) => !item.columnSpan || item.columnSpan === 1,
      );

      // The empty columns can be different from columnCount if there are
      // items already positioned from previous batches
      const emptyColumns = heights.reduce((acc, height) => (height === 0 ? acc + 1 : acc), 0);

      const multiColumnItemColumnSpan = parseInt(twoColumnItems[0].columnSpan, 10);

      // Skip the graph logic if the two column item can be displayed on the first row,
      // this means graphBatch is empty and multi column item is positioned on its
      // original position (twoColumnIndex)
      const fitsFirstRow = emptyColumns >= multiColumnItemColumnSpan + twoColumnIndex;

      // When multi column item is the last item of the first row but can't fit
      // we need to fill those spaces with one col items
      const replaceWithOneColItems = !fitsFirstRow && twoColumnIndex < emptyColumns;

      // Calculate how many items are on pre array and how many on graphBatch
      // pre items are positioned before the two column item
      const splitIndex = calculateSplitIndex({
        oneColumnItemsLength: oneColumnItems.length,
        twoColumnIndex,
        emptyColumns,
        fitsFirstRow,
        replaceWithOneColItems,
      });

      const pre = oneColumnItems.slice(0, splitIndex);
      const graphBatch = fitsFirstRow
        ? []
        : oneColumnItems.slice(splitIndex, splitIndex + TWO_COL_ITEMS_MEASURE_BATCH_SIZE);

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

      // Get a node with the required whitespace
      const { winningNode, additionalWhitespace } = getGraphPositions({
        items: graphBatch,
        positions: paintedItemPositions,
        heights: paintedItemHeights,
        whitespaceThreshold,
        ...commonGetPositionArgs,
      });

      // Insert 2-col item(s)
      const twoColItem = twoColumnItems[0]; // this should always only be one
      const { heights: updatedHeights, position: twoColItemPosition } = getTwoColItemPosition<T>({
        item: twoColItem,
        heights: winningNode.heights,
        ...commonGetPositionArgs,
      });

      // Combine winning positions and 2-col item position, add to cache
      const winningPositions = winningNode.positions.concat({
        item: twoColItem,
        position: twoColItemPosition,
      });

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
      logWhitespace?.(additionalWhitespace);

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
