// @flow strict
import { type Cache } from './Cache.js';
import Graph from './Graph.js';
import { type HeightsStoreInterface } from './HeightsStore.js';
import mindex from './mindex.js';
import { type ItemCache, type NodeData, type Position } from './types.js';

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
  itemAttributeCache,
  items,
  measurementCache,
}: {|
  centerOffset: number,
  columnWidth: number,
  columnWidthAndGutter: number,
  gutter: number,
  heights: $ReadOnlyArray<number>,
  itemAttributeCache?: ItemCache<T>,
  items: $ReadOnlyArray<T>,
  measurementCache: Cache<T, number>,
|}): {|
  positions: $ReadOnlyArray<{| item: T, position: Position |}>,
  heights: $ReadOnlyArray<number>,
|} {
  const heights = [...heightsArg];
  // $FlowFixMe[incompatible-call]
  const positions = items.reduce(
    (positionsSoFar: $ReadOnlyArray<{| item: T, position: Position |}>, item) => {
      const height = measurementCache.get(item);

      const cachedPosition = itemAttributeCache?.getAttribute(item, 'position');
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
  itemAttributeCache?: ItemCache<T>, // This is only here to have the same signature as getOneColumnItemPositions
  item: T,
  measurementCache: Cache<T, number>,
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

  const additionalWhitespace = adjacentColumnHeightDeltas[lowestAdjacentColumnHeightDeltaIndex];

  const top = heights[tallestColumn] - additionalWhitespace / 2;
  const left = lowestAdjacentColumnHeightDeltaIndex * columnWidthAndGutter + centerOffset;

  // Increase the heights of both adjacent columns
  heights[tallestColumn] += heightAndGutter - additionalWhitespace / 2;
  heights[leftIsTaller ? tallestColumn + 1 : tallestColumn - 1] = heights[tallestColumn];

  return {
    additionalWhitespace,
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
  itemAttributeCache,
  justify,
  logWhitespace,
  measurementCache,
  minCols = 2,
  rawItemCount,
  width,
}: {|
  columnWidth?: number,
  gutter?: number,
  heightsCache?: HeightsStoreInterface,
  itemAttributeCache: ItemCache<T>,
  justify: 'center' | 'start',
  logWhitespace?: (number) => void,
  measurementCache: Cache<T, number>,
  minCols?: number,
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

    const itemsWithPositions = items.filter((item) =>
      itemAttributeCache?.hasAttribute(item, 'position'),
    );
    const itemsWithoutPositions = items.filter(
      (item) => !itemAttributeCache?.hasAttribute(item, 'position'),
    );

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
      itemAttributeCache,
      measurementCache,
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
      const twoColItem = twoColumnItems[0]; // this should always only be one (for now)
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

      // Add height adjustments for the two items above the 2-col module
      const twoColModuleColLeft = twoColItemPosition.left;
      const twoColModuleColRight = twoColModuleColLeft + columnWidthAndGutter;
      // const itemToShrink = items.find((item) => {
      //   const position = itemAttributeCache?.getAttribute(item, 'position');
      //   if (!position) {
      //     return false;
      //   }
      //   // $FlowFixMe[prop-missing]
      //   const { height, left, top } = position;
      //   const isCorrectColumn = left === twoColModuleColLeft || left === twoColModuleColRight;
      //   const isAboveTwoColModuleLower = top + height + gutter === twoColItemPosition.top;
      //   // const isAboveTwoColModuleHigher =
      //   //   top + height + gutter + additionalWhitespaceAboveTwoColModule === twoColItemPosition.top;
      //   return isCorrectColumn && isAboveTwoColModuleLower;
      // });
      // const itemToGrow = items.find((item) => {
      //   const position = itemAttributeCache?.getAttribute(item, 'position');
      //   if (!position) {
      //     return false;
      //   }
      //   // $FlowFixMe[prop-missing]
      //   const { height, left, top } = position;
      //   const isCorrectColumn = left === twoColModuleColLeft || left === twoColModuleColRight;
      //   const isAboveTwoColModuleHigher =
      //     top + height + gutter + additionalWhitespaceAboveTwoColModule === twoColItemPosition.top;
      //   return isCorrectColumn && isAboveTwoColModuleHigher;
      // });
      // if (itemToShrink) {
      //   itemAttributeCache?.setAttribute(
      //     itemToShrink,
      //     'heightAdjustment',
      //     -additionalWhitespaceAboveTwoColModule / 2,
      //   );
      // }
      // if (itemToGrow) {
      //   itemAttributeCache?.setAttribute(
      //     itemToGrow,
      //     'heightAdjustment',
      //     additionalWhitespaceAboveTwoColModule / 2,
      //   );
      // }

      const itemsInTargetColumns = items.filter((item) => {
        const position = itemAttributeCache?.getAttribute(item, 'position');
        if (!position) {
          return false;
        }
        // $FlowFixMe[prop-missing]
        const { left } = position;
        return left === twoColModuleColLeft || left === twoColModuleColRight;
      });
      const targetItems = itemsInTargetColumns.filter((item) => {
        const position = itemAttributeCache?.getAttribute(item, 'position');
        if (!position) {
          return false;
        }
        // $FlowFixMe[prop-missing]
        const { top } = position;
        return top < twoColItemPosition.top;
      });
      const leftTargetItems = targetItems.filter((item) => {
        const position = itemAttributeCache?.getAttribute(item, 'position');
        if (!position) {
          return false;
        }
        // $FlowFixMe[prop-missing]
        const { left } = position;
        return left === twoColModuleColLeft;
      });
      const rightTargetItems = targetItems.filter((item) => {
        const position = itemAttributeCache?.getAttribute(item, 'position');
        if (!position) {
          return false;
        }
        // $FlowFixMe[prop-missing]
        const { left } = position;
        return left === twoColModuleColRight;
      });
      const topLeftTargetItem = [...leftTargetItems]
        .sort((a, b) => {
          const positionA = itemAttributeCache?.getAttribute(a, 'position');
          const positionB = itemAttributeCache?.getAttribute(b, 'position');
          if (!positionA || !positionB) {
            return 0;
          }
          // $FlowFixMe[prop-missing]
          const { top: topA } = positionA;
          // $FlowFixMe[prop-missing]
          const { top: topB } = positionB;
          return topA - topB;
        })
        .reverse()[0];
      const topRightTargetItem = [...rightTargetItems]
        .sort((a, b) => {
          const positionA = itemAttributeCache?.getAttribute(a, 'position');
          const positionB = itemAttributeCache?.getAttribute(b, 'position');
          if (!positionA || !positionB) {
            return 0;
          }
          // $FlowFixMe[prop-missing]
          const { top: topA } = positionA;
          // $FlowFixMe[prop-missing]
          const { top: topB } = positionB;
          return topA - topB;
        })
        .reverse()[0];

      // [topLeftTargetItem, topRightTargetItem].forEach((item) => {
      //   const position = itemAttributeCache?.getAttribute(item, 'position');
      //   if (!position) {
      //     return;
      //   }
      //   // $FlowFixMe[prop-missing]
      //   const { top } = position;
      //   const isTallerItem = top + gutter > twoColItemPosition.top;
      //   itemAttributeCache?.setAttribute(
      //     item,
      //     'heightAdjustment',
      //     isTallerItem
      //       ? -additionalWhitespaceAboveTwoColModule / 2
      //       : additionalWhitespaceAboveTwoColModule / 2,
      //   );
      // });

      const sortedTargetItems = [topLeftTargetItem, topRightTargetItem].sort((a, b) => {
        const positionA = itemAttributeCache?.getAttribute(a, 'position');
        const positionB = itemAttributeCache?.getAttribute(b, 'position');
        if (!positionA || !positionB) {
          return 0;
        }
        // $FlowFixMe[prop-missing]
        const { height: heightA, top: topA } = positionA;
        // $FlowFixMe[prop-missing]
        const { height: heightB, top: topB } = positionB;
        return topA + heightA - (topB + heightB);
      });
      const [shorterTargetItem, tallerTargetItem] = sortedTargetItems;
      itemAttributeCache?.setAttribute(
        shorterTargetItem,
        'heightAdjustment',
        additionalWhitespaceAboveTwoColModule / 2,
      );
      itemAttributeCache?.setAttribute(
        tallerTargetItem,
        'heightAdjustment',
        -additionalWhitespaceAboveTwoColModule / 2,
      );

      console.log(
        'targetItems',
        sortedTargetItems,
        sortedTargetItems.map((item) => itemAttributeCache?.getAttribute(item, 'position')),
      );

      finalPositions.forEach(({ item, position }) => {
        itemAttributeCache?.setAttribute(item, 'position', position);
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
      itemAttributeCache.setAttribute(item, 'position', position);
    });
    heightsCache?.setHeights(finalHeights);

    return getPositionsOnly<T>(itemPositions);
  };
};

export default defaultTwoColumnModuleLayout;
