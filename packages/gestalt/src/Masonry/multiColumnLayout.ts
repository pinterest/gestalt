import { Cache } from './Cache';
import Graph from './Graph';
import { getHeightAndGutter, offscreen } from './layoutHelpers';
import mindex from './mindex';
import { NodeData, Position } from './types';

// When there's a multi column item in the most recently fetched batch of items, we need to measure more items to ensure we have enough possible layouts to minimize whitespace above the 2-col item
// This may need to be tweaked to balance the tradeoff of delayed rendering vs having enough possible layouts
export const MULTI_COL_ITEMS_MEASURE_BATCH_SIZE = 5;

type GridSize = 'sm' | 'md' | 'lg' | 'xl';

export type ColumnSpanConfig = number | { [Size in GridSize]: number };

// maps the number of columns to a grid breakpoint
// sm: 2 columns
// md: 3-4 columns
// lg: 5-8 columns
// xl: 9+ columns
export function columnCountToGridSize(columnCount: number): GridSize {
  if (columnCount <= 2) {
    return 'sm';
  }
  if (columnCount <= 4) {
    return 'md';
  }
  if (columnCount <= 8) {
    return 'lg';
  }
  return 'xl';
}

function getPositionsOnly<T>(
  positions: ReadonlyArray<{
    item: T;
    position: Position;
  }>,
): ReadonlyArray<Position> {
  return positions.map(({ position }) => position);
}

function calculateActualColumnSpan<T>(props: {
  columnCount: number;
  item: T;
  _getColumnSpanConfig: (item: T) => ColumnSpanConfig;
}): number {
  const { columnCount, item, _getColumnSpanConfig } = props;
  const columnSpanConfig = _getColumnSpanConfig(item);
  const gridSize = columnCountToGridSize(columnCount);
  const columnSpan =
    typeof columnSpanConfig === 'number' ? columnSpanConfig : columnSpanConfig[gridSize] ?? 1;
  // a multi column item can never span more columns than there are in the grid
  return Math.min(columnSpan, columnCount);
}

function getAdjacentWhitespaceOnIndex(
  heights: ReadonlyArray<number>,
  columnSpan: number,
  index: number,
): ReadonlyArray<number> {
  const subArray = heights.slice(index, index + columnSpan);
  const maxHeight = Math.max(...subArray);
  return subArray.map((h) => maxHeight - h);
}

function getAdjacentColumnHeightDeltas(
  heights: ReadonlyArray<number>,
  columnSpan: number,
): ReadonlyArray<number> {
  const adjacentHeightDeltas = [];
  for (let i = 0; i < heights.length - 1; i += 1) {
    adjacentHeightDeltas.push(Math.abs(heights[i]! - heights[i + 1]!));
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
  oneColumnItemsLength: number;
  multiColumnIndex: number;
  emptyColumns: number;
  fitsFirstRow: boolean;
  replaceWithOneColItems: boolean;
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

export function initializeHeightsArray<T>({
  centerOffset,
  columnCount,
  columnWidthAndGutter,
  gutter,
  items,
  positionCache,
  _getColumnSpanConfig,
}: {
  centerOffset: number;
  columnCount: number;
  columnWidthAndGutter: number;
  gutter: number;
  items: ReadonlyArray<T>;
  positionCache: Cache<T, Position> | null | undefined;
  _getColumnSpanConfig: (item: T) => ColumnSpanConfig;
}): ReadonlyArray<number> {
  const heights = new Array<number>(columnCount).fill(0);
  items.forEach((item) => {
    const position = positionCache?.get(item);
    if (position) {
      const col = (position.left - centerOffset) / columnWidthAndGutter;
      const columnSpan = calculateActualColumnSpan({ columnCount, item, _getColumnSpanConfig });
      // the height of the column is just the sum of the top and height of the item
      const absoluteHeight = position.top + position.height + gutter;
      for (let i = col; i < col + columnSpan; i += 1) {
        // for each column the module spans -
        // if we've already set a taller height, we don't want to override it
        // otherwise, override the height of the column
        if (absoluteHeight > heights[i]!) {
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
  centerOffset: number;
  columnWidth: number;
  columnWidthAndGutter: number;
  gutter: number;
  heights: ReadonlyArray<number>;
  items: ReadonlyArray<T>;
  measurementCache: Cache<T, number>;
  positionCache?: Cache<T, Position>;
}): {
  positions: ReadonlyArray<{
    item: T;
    position: Position;
  }>;
  heights: ReadonlyArray<number>;
} {
  const heights = [...heightsArg];
  const positions = items.reduce<
    ReadonlyArray<{
      item: T;
      position: Position;
    }>
  >(
    (
      positionsSoFar: ReadonlyArray<{
        item: T;
        position: Position;
      }>,
      item,
    ) => {
      const height = measurementCache.get(item);

      const cachedPosition = positionCache?.get(item);
      if (cachedPosition) {
        return [...positionsSoFar, { item, position: cachedPosition }];
      }

      if (height != null) {
        const heightAndGutter = getHeightAndGutter(height, gutter);
        const col = mindex(heights);
        const top = heights[col]!;
        const left = col * columnWidthAndGutter + centerOffset;
        heights[col] = heights[col]! + heightAndGutter;

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
  centerOffset: number;
  columnWidth: number;
  columnWidthAndGutter: number;
  gutter: number;
  heights: ReadonlyArray<number>;
  item: T;
  columnSpan: number;
  measurementCache: Cache<T, number>;
  positionCache?: Cache<T, Position>;
  fitsFirstRow: boolean;
}): {
  additionalWhitespace: ReadonlyArray<number> | null;
  heights: ReadonlyArray<number>;
  position: Position;
} {
  const heights = [...heightsArg];
  const height = measurementCache.get(item);

  if (height == null) {
    return {
      additionalWhitespace: null,
      heights,
      position: offscreen(columnWidth),
    };
  }

  const heightAndGutter = getHeightAndGutter(height, gutter);

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

  const top = heights[tallestColumn]!;
  const left = lowestAdjacentColumnHeightDeltaIndex * columnWidthAndGutter + centerOffset;

  // Increase the heights of both adjacent columns
  const tallestColumnFinalHeight = heights[tallestColumn]! + heightAndGutter;

  const additionalWhitespace = getAdjacentWhitespaceOnIndex(
    heights,
    columnSpan,
    lowestAdjacentColumnHeightDeltaIndex,
  );

  for (let i = 0; i < columnSpan; i += 1) {
    heights[i + lowestAdjacentColumnHeightDeltaIndex] = tallestColumnFinalHeight;
  }

  return {
    additionalWhitespace,
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
  items: ReadonlyArray<T>;
  heights: ReadonlyArray<number>;
  positions: ReadonlyArray<{
    item: T;
    position: Position;
  }>;
  whitespaceThreshold?: number;
  columnSpan: number;
  centerOffset: number;
  columnWidth: number;
  columnWidthAndGutter: number;
  gutter: number;
  measurementCache: Cache<T, number>;
  positionCache?: Cache<T, Position>;
}): NodeData<T> {
  // When whitespace threshold is set this variables store the score and node if found
  let bailoutScore;
  let bailoutNode: NodeData<T> | undefined;

  // Initialize the graph
  const graph = new Graph<T>();
  // Start node will be what's been painted so far
  const startNodeData = {
    id: 'start',
    heights,
    positions,
  } as const;
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
    item: T;
    i: number;
    arr: ReadonlyArray<T>;
    prevNode: NodeData<T>;
    heightsArr: ReadonlyArray<number>;
    itemsSoFar?: ReadonlyArray<T>;
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
    } as const;

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
  // const { lowestScoreNode, lowestScore } = graph.findLowestScore(startNodeData);

  // The best solution may be "no solution", i.e. laying out the multi column item first
  return lowestScore === null || lowestScore < startingLowestAdjacentColumnHeightDelta
    ? lowestScoreNode
    : startNodeData;
}

function getPositionsWithMultiColumnItem<T>({
  multiColumnItem,
  itemsToPosition,
  heights,
  prevPositions,
  whitespaceThreshold,
  columnCount,
  logWhitespace,
  _getColumnSpanConfig,
  ...commonGetPositionArgs
}: {
  multiColumnItem: T;
  itemsToPosition: ReadonlyArray<T>;
  heights: ReadonlyArray<number>;
  prevPositions: ReadonlyArray<{
    item: T;
    position: Position;
  }>;
  whitespaceThreshold?: number;
  logWhitespace?: (arg1: ReadonlyArray<number>) => void;
  columnCount: number;
  centerOffset: number;
  columnWidth: number;
  columnWidthAndGutter: number;
  gutter: number;
  measurementCache: Cache<T, number>;
  positionCache: Cache<T, Position>;
  _getColumnSpanConfig: (item: T) => ColumnSpanConfig;
}): {
  positions: ReadonlyArray<{
    item: T;
    position: Position;
  }>;
  heights: ReadonlyArray<number>;
} {
  const { positionCache } = commonGetPositionArgs;

  // This is the index inside the items to position array
  const multiColumnIndex = itemsToPosition.indexOf(multiColumnItem);
  const oneColumnItems = itemsToPosition.filter(
    (item) => calculateActualColumnSpan({ columnCount, item, _getColumnSpanConfig }) === 1,
  );

  // The empty columns can be different from columnCount if there are
  // items already positioned from previous batches
  const emptyColumns = heights.reduce((acc, height) => (height === 0 ? acc + 1 : acc), 0);

  const multiColumnItemColumnSpan = calculateActualColumnSpan({
    columnCount,
    item: multiColumnItem,
    _getColumnSpanConfig,
  });

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
  const winningNode = getGraphPositions({
    items: graphBatch,
    positions: paintedItemPositions,
    heights: paintedItemHeights,
    whitespaceThreshold,
    columnSpan: multiColumnItemColumnSpan,
    ...commonGetPositionArgs,
  });

  // Insert multi column item(s)
  const {
    heights: updatedHeights,
    position: multiColItemPosition,
    additionalWhitespace,
  } = getMultiColItemPosition<T>({
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
  if (additionalWhitespace) {
    logWhitespace?.(additionalWhitespace);
  }

  finalPositions.forEach(({ item, position }) => {
    positionCache.set(item, position);
  });

  // FUTURE OPTIMIZATION - do we want a min threshold for an acceptably low score?
  // If so, we could save the multi column item somehow and try again with the next batch of items
  return { positions: prevPositions.concat(finalPositions), heights: finalHeights };
}

const multiColumnLayout = <T>({
  items,
  gutter = 14,
  columnWidth = 236,
  columnCount = 2,
  centerOffset = 0,
  logWhitespace,
  measurementCache,
  positionCache,
  whitespaceThreshold,
  _getColumnSpanConfig,
}: {
  items: ReadonlyArray<T>;
  gutter?: number;
  columnWidth?: number;
  columnCount?: number;
  centerOffset?: number;
  positionCache: Cache<T, Position>;
  measurementCache: Cache<T, number>;
  whitespaceThreshold?: number;
  logWhitespace?: (arg1: ReadonlyArray<number>) => void;
  _getColumnSpanConfig: (item: T) => ColumnSpanConfig;
}): ReadonlyArray<Position> => {
  if (!items.every((item) => measurementCache.has(item))) {
    return items.map((item) => {
      const itemColumnSpan = calculateActualColumnSpan({ columnCount, item, _getColumnSpanConfig });
      if (itemColumnSpan > 1) {
        const columnSpan = Math.min(itemColumnSpan, columnCount);
        return offscreen(columnWidth * columnSpan + gutter * (columnSpan - 1));
      }
      return offscreen(columnWidth);
    });
  }

  const columnWidthAndGutter = columnWidth + gutter;

  // the total height of each column
  const heights = initializeHeightsArray({
    centerOffset,
    columnCount,
    columnWidthAndGutter,
    gutter,
    items,
    positionCache,
    _getColumnSpanConfig,
  });

  const itemsWithPositions = items.filter((item) => positionCache?.has(item));
  const itemsWithoutPositions = items.filter((item) => !positionCache?.has(item));

  const multiColumnItems = itemsWithoutPositions.filter(
    (item) => calculateActualColumnSpan({ columnCount, item, _getColumnSpanConfig }) > 1,
  );

  const commonGetPositionArgs = {
    centerOffset,
    columnWidth,
    columnWidthAndGutter,
    gutter,
    measurementCache,
    positionCache,
  } as const;

  if (multiColumnItems.length > 0) {
    const batchSize = multiColumnItems.length;
    const batches = Array.from({ length: batchSize }, (): ReadonlyArray<T> => []).map(
      (batch, i) => {
        const startIndex = i === 0 ? 0 : itemsWithoutPositions.indexOf(multiColumnItems[i]!);
        const endIndex =
          i + 1 === multiColumnItems.length
            ? itemsWithoutPositions.length
            : itemsWithoutPositions.indexOf(multiColumnItems[i + 1]!);
        return itemsWithoutPositions.slice(startIndex, endIndex);
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
      heights: ReadonlyArray<number>;
      positions: ReadonlyArray<{
        item: T;
        position: Position;
      }>;
    } = batches.reduce(
      (acc, itemsToPosition, i) =>
        getPositionsWithMultiColumnItem({
          multiColumnItem: multiColumnItems[i]!,
          itemsToPosition,
          heights: acc.heights,
          prevPositions: acc.positions,
          whitespaceThreshold,
          logWhitespace,
          columnCount,
          _getColumnSpanConfig,
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

export default multiColumnLayout;
