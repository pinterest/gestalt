// @flow strict
import { type Cache } from './Cache';
import Graph from './Graph';
import mindex from './mindex';
import { type Align, type NodeData, type Position } from './types';

// When there's a multi column item in the most recently fetched batch of items, we need to measure more items to ensure we have enough possible layouts to minimize whitespace above the 2-col item
// This may need to be tweaked to balance the tradeoff of delayed rendering vs having enough possible layouts
export const MULTI_COL_ITEMS_MEASURE_BATCH_SIZE = 5;

function isNil(value: mixed): boolean %checks {
  return value === null || value === undefined;
}

const offscreen = (width: number, height: number = Infinity) => ({
  top: -9999,
  left: -9999,
  width,
  height,
});

function getItemColumnSpan<T: { +[string]: mixed }>(item: T): number {
  return typeof item.columnSpan === 'number' ? item.columnSpan : 1;
}

function getPositionsOnly<T>(
  positions: $ReadOnlyArray<{ item: T, position: Position }>,
): $ReadOnlyArray<Position> {
  return positions.map(({ position }) => position);
}

function getAdjacentColumnHeightDeltas(
  heights: $ReadOnlyArray<number>,
  columnSpan: number,
): $ReadOnlyArray<number> {
  const adjacentHeightDeltas = [];
  for (let i = 0; i < heights.length - 1; i += 1) {
    adjacentHeightDeltas.push(Math.abs(heights[i] - heights[i + 1]));
  }

  if (columnSpan === 2) {
    return adjacentHeightDeltas;
  }

  // When column span is more than 2 the deltas are not enough to know the best placement,
  // in this case we get the avgs of the deltas required to position the module
  const adjacentDeltaAvgs = [];
  for (let i = 0; i + columnSpan - 2 < adjacentHeightDeltas.length; i += 1) {
    const sum = adjacentHeightDeltas
      .slice(i, i + columnSpan - 1)
      .reduce((acc, delta) => acc + delta, 0);
    adjacentDeltaAvgs.push(sum / (columnSpan - 1));
  }
  return adjacentDeltaAvgs;
}

function calculateMultiColumnModuleWidth(
  columnWidth: number,
  gutter: number,
  columnSpan: number,
): number {
  return columnWidth * columnSpan + gutter * (columnSpan - 1);
}

function calculateSplitIndex({
  oneColumnItemsLength,
  multiColumnIndex,
  emptyColumns,
  fitsFirstRow,
  replaceWithOneColItems,
}: {
  oneColumnItemsLength: number,
  multiColumnIndex: number,
  emptyColumns: number,
  fitsFirstRow: boolean,
  replaceWithOneColItems: boolean,
}): number {
  // multi column item is on its original position
  if (fitsFirstRow) {
    return multiColumnIndex;
  }

  // We use as many one col items as empty columns to fill first row
  if (replaceWithOneColItems) {
    return emptyColumns;
  }

  // If two column module is near the end of the batch
  // we move the index so it has enough items for the graph
  if (multiColumnIndex + MULTI_COL_ITEMS_MEASURE_BATCH_SIZE > oneColumnItemsLength) {
    return Math.max(
      oneColumnItemsLength - MULTI_COL_ITEMS_MEASURE_BATCH_SIZE,
      // We have to keep at least the items for the empty columns to fill
      emptyColumns,
    );
  }

  return multiColumnIndex;
}

export function initializeHeightsArray<T: { +[string]: mixed }>({
  centerOffset,
  columnCount,
  columnWidthAndGutter,
  gutter,
  items,
  positionCache,
}: {
  centerOffset: number,
  columnCount: number,
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
      const columnSpan = getItemColumnSpan(item);
      // the height of the column is just the sum of the top and height of the item
      const absoluteHeight = position.top + position.height + gutter;
      for (let i = col; i < col + columnSpan; i += 1) {
        // for each column the module spans -
        // if we've already set a taller height, we don't want to override it
        // otherwise, override the height of the column
        if (absoluteHeight > heights[i]) {
          heights[i] = absoluteHeight;
        }
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

function getMultiColItemPosition<T>({
  centerOffset,
  columnWidth,
  columnWidthAndGutter,
  gutter,
  heights: heightsArg,
  item,
  columnSpan,
  measurementCache,
  fitsFirstRow,
}: {
  centerOffset: number,
  columnWidth: number,
  columnWidthAndGutter: number,
  gutter: number,
  heights: $ReadOnlyArray<number>,
  item: T,
  columnSpan: number,
  measurementCache: Cache<T, number>,
  positionCache?: Cache<T, Position>,
  fitsFirstRow: boolean,
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
  const adjacentColumnHeightDeltas = getAdjacentColumnHeightDeltas(heights, columnSpan);
  const lowestAdjacentColumnHeightDeltaIndex = fitsFirstRow
    ? heights.indexOf(0)
    : adjacentColumnHeightDeltas.indexOf(Math.min(...adjacentColumnHeightDeltas));

  const lowestAdjacentColumnHeights = heights.slice(
    lowestAdjacentColumnHeightDeltaIndex,
    lowestAdjacentColumnHeightDeltaIndex + columnSpan,
  );

  // Find the tallest column on the lowest adjacent heights
  const tallestColumn =
    lowestAdjacentColumnHeightDeltaIndex +
    lowestAdjacentColumnHeights.indexOf(Math.max(...lowestAdjacentColumnHeights));

  const top = heights[tallestColumn];
  const left = lowestAdjacentColumnHeightDeltaIndex * columnWidthAndGutter + centerOffset;

  // Increase the heights of both adjacent columns
  const tallestColumnFinalHeight = heights[tallestColumn] + heightAndGutter;

  for (let i = 0; i < columnSpan; i += 1) {
    heights[i + lowestAdjacentColumnHeightDeltaIndex] = tallestColumnFinalHeight;
  }

  return {
    additionalWhitespace: adjacentColumnHeightDeltas[lowestAdjacentColumnHeightDeltaIndex],
    heights,
    position: {
      top,
      left,
      width: calculateMultiColumnModuleWidth(columnWidth, gutter, columnSpan),
      height,
    },
  };
}

function getGraphPositions<T>({
  items,
  positions,
  heights,
  whitespaceThreshold,
  columnSpan,
  ...commonGetPositionArgs
}: {
  items: $ReadOnlyArray<T>,
  heights: $ReadOnlyArray<number>,
  positions: $ReadOnlyArray<{ item: T, position: Position }>,
  whitespaceThreshold?: number,
  columnSpan: number,
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

  const startingAdjacentColumnHeightDeltas = getAdjacentColumnHeightDeltas(heights, columnSpan);
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

    const adjacentColumnHeightDeltas = getAdjacentColumnHeightDeltas(updatedHeights, columnSpan);
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

  // The best solution may be "no solution", i.e. laying out the multi column item first
  return lowestScore === null || lowestScore < startingLowestAdjacentColumnHeightDelta
    ? { winningNode: lowestScoreNode, additionalWhitespace: lowestScore ?? 0 }
    : { winningNode: startNodeData, additionalWhitespace: startingLowestAdjacentColumnHeightDelta };
}

function getPositionsWithMultiColumnItem<T: { +[string]: mixed }>({
  multiColumnItem,
  itemsToPosition,
  heights,
  prevPositions,
  whitespaceThreshold,
  columnCount,
  logWhitespace,
  ...commonGetPositionArgs
}: {
  multiColumnItem: T,
  itemsToPosition: $ReadOnlyArray<T>,
  heights: $ReadOnlyArray<number>,
  prevPositions: $ReadOnlyArray<{ item: T, position: Position }>,
  whitespaceThreshold?: number,
  logWhitespace?: (number) => void,
  columnCount: number,
  centerOffset: number,
  columnWidth: number,
  columnWidthAndGutter: number,
  gutter: number,
  measurementCache: Cache<T, number>,
  positionCache: Cache<T, Position>,
}): {
  positions: $ReadOnlyArray<{ item: T, position: Position }>,
  heights: $ReadOnlyArray<number>,
} {
  const { positionCache } = commonGetPositionArgs;

  // This is the index inside the items to position array
  const multiColumnIndex = itemsToPosition.indexOf(multiColumnItem);
  const oneColumnItems = itemsToPosition.filter(
    (item) => !item.columnSpan || item.columnSpan === 1,
  );

  // The empty columns can be different from columnCount if there are
  // items already positioned from previous batches
  const emptyColumns = heights.reduce((acc, height) => (height === 0 ? acc + 1 : acc), 0);

  const multiColumnItemColumnSpan = Math.min(parseInt(multiColumnItem.columnSpan, 10), columnCount);

  // Skip the graph logic if the two column item can be displayed on the first row,
  // this means graphBatch is empty and multi column item is positioned on its
  // original position (twoColumnIndex)
  const fitsFirstRow = emptyColumns >= multiColumnItemColumnSpan + multiColumnIndex;

  // When multi column item is the last item of the first row but can't fit
  // we need to fill those spaces with one col items
  const replaceWithOneColItems = !fitsFirstRow && multiColumnIndex < emptyColumns;

  // Calculate how many items are on pre array and how many on graphBatch
  // pre items are positioned before the two column item
  const splitIndex = calculateSplitIndex({
    oneColumnItemsLength: oneColumnItems.length,
    multiColumnIndex,
    emptyColumns,
    fitsFirstRow,
    replaceWithOneColItems,
  });

  const pre = oneColumnItems.slice(0, splitIndex);
  const graphBatch = fitsFirstRow
    ? []
    : oneColumnItems.slice(splitIndex, splitIndex + MULTI_COL_ITEMS_MEASURE_BATCH_SIZE);

  // Get positions and heights for painted items
  const { positions: paintedItemPositions, heights: paintedItemHeights } =
    getOneColumnItemPositions({
      items: pre,
      heights,
      ...commonGetPositionArgs,
    });

  // Adding the extra prev column items to the position cache
  paintedItemPositions.forEach(({ item, position }) => {
    positionCache.set(item, position);
  });

  // Get a node with the required whitespace
  const { winningNode, additionalWhitespace } = getGraphPositions({
    items: graphBatch,
    positions: paintedItemPositions,
    heights: paintedItemHeights,
    whitespaceThreshold,
    columnSpan: multiColumnItemColumnSpan,
    ...commonGetPositionArgs,
  });

  // Insert multi column item(s)
  const { heights: updatedHeights, position: multiColItemPosition } = getMultiColItemPosition<T>({
    item: multiColumnItem,
    heights: winningNode.heights,
    columnSpan: multiColumnItemColumnSpan,
    fitsFirstRow,
    ...commonGetPositionArgs,
  });

  // Combine winning positions and multi column item position, add to cache
  const winningPositions = winningNode.positions.concat({
    item: multiColumnItem,
    position: multiColItemPosition,
  });

  const positionedItems = new Set(winningPositions.map(({ item }) => item));
  // depending on where the multi column item is positioned, there may be items that are still not positioned
  // calculate the remaining items and add them to the list of final positions
  const remainingItems = itemsToPosition.filter((item) => !positionedItems.has(item));
  const { heights: finalHeights, positions: remainingItemPositions } = getOneColumnItemPositions<T>(
    {
      items: remainingItems,
      heights: updatedHeights,
      ...commonGetPositionArgs,
    },
  );
  const finalPositions = winningPositions.concat(remainingItemPositions);

  // Log additional whitespace shown above the multi column module
  // This may need to be tweaked or removed if pin leveling is implemented
  logWhitespace?.(additionalWhitespace);

  finalPositions.forEach(({ item, position }) => {
    positionCache.set(item, position);
  });

  // FUTURE OPTIMIZATION - do we want a min threshold for an acceptably low score?
  // If so, we could save the multi column item somehow and try again with the next batch of items
  return { positions: prevPositions.concat(finalPositions), heights: finalHeights };
}

const defaultTwoColumnModuleLayout = <T: { +[string]: mixed }>({
  align,
  columnWidth = 236,
  gutter = 14,
  logWhitespace,
  measurementCache,
  minCols = 2,
  positionCache,
  rawItemCount,
  width,
  whitespaceThreshold,
}: {
  align: Align,
  columnWidth?: number,
  gutter?: number,
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
      return items.map((item) => {
        if (typeof item.columnSpan === 'number' && item.columnSpan > 1) {
          const columnSpan = Math.min(item.columnSpan, columnCount);
          return offscreen(columnWidth * columnSpan + gutter * (columnSpan - 1));
        }
        return offscreen(columnWidth);
      });
    }

    const centerOffset =
      align === 'center'
        ? Math.max(
            Math.floor(
              (width - (Math.min(rawItemCount, columnCount) * columnWidthAndGutter + gutter)) / 2,
            ),
            0,
          )
        : Math.max(Math.floor((width - columnWidthAndGutter * columnCount + gutter) / 2), 0);

    // the total height of each column
    const heights = initializeHeightsArray({
      centerOffset,
      columnCount,
      columnWidthAndGutter,
      gutter,
      items,
      positionCache,
    });

    const itemsWithPositions = items.filter((item) => positionCache?.has(item));
    const itemsWithoutPositions = items.filter((item) => !positionCache?.has(item));

    const multiColumnItems = itemsWithoutPositions.filter(
      (item) => typeof item.columnSpan === 'number' && item.columnSpan > 1,
    );

    const commonGetPositionArgs = {
      centerOffset,
      columnWidth,
      columnWidthAndGutter,
      gutter,
      measurementCache,
      positionCache,
    };

    if (multiColumnItems.length > 0) {
      const batchSize = multiColumnItems.length;
      const batches = Array.from({ length: batchSize }, (): $ReadOnlyArray<T> => []).map(
        (batch, i) => {
          const startIndex = i === 0 ? 0 : items.indexOf(multiColumnItems[i]);
          const endIndex =
            i + 1 === multiColumnItems.length
              ? items.length
              : items.indexOf(multiColumnItems[i + 1]);
          return items.slice(startIndex, endIndex);
        },
      );
      const { positions: paintedItemPositions, heights: paintedItemHeights } =
        getOneColumnItemPositions({
          items: itemsWithPositions,
          heights,
          ...commonGetPositionArgs,
        });

      const {
        positions: currentPositions,
      }: {
        heights: $ReadOnlyArray<number>,
        positions: $ReadOnlyArray<{ item: T, position: Position }>,
      } = batches.reduce(
        (acc, itemsToPosition, i) =>
          getPositionsWithMultiColumnItem({
            multiColumnItem: multiColumnItems[i],
            itemsToPosition,
            heights: acc.heights,
            prevPositions: acc.positions,
            whitespaceThreshold,
            logWhitespace,
            columnCount,
            ...commonGetPositionArgs,
          }),
        { heights: paintedItemHeights, positions: paintedItemPositions },
      );

      return getPositionsOnly<T>(currentPositions);
    }

    const { positions: itemPositions } = getOneColumnItemPositions<T>({
      items,
      heights,
      ...commonGetPositionArgs,
    });
    itemPositions.forEach(({ item, position }) => {
      positionCache?.set(item, position);
    });

    return getPositionsOnly<T>(itemPositions);
  };
};

export default defaultTwoColumnModuleLayout;
