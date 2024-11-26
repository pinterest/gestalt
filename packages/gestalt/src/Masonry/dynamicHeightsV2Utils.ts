/**
 * Util functions used to update positions when an item changes the height dynamically
 */
import { Cache } from './Cache';
import { Position } from './types';

function isBelowArea(area: { left: number; right: number }, position: Position) {
  return position.left < area.right && position.left + position.width > area.left;
}

/*
 * getColumnWidth
 * This is a naive form of knowing the width of a column, so we can use it to know and item is
 * multicolumn (has a bigger width than columnWidth). We can't use columnWidth prop because
 * of flexible layouts (and that's an optional param)-
 * TODO: We could standardize this by using _getColumnSpan, as in multicolumn modules
 */
function getColumnWidth<T>(items: ReadonlyArray<T>, positionStore: Cache<T, Position>): number {
  let columnWidth = Infinity;
  items.forEach((item) => {
    const position = positionStore.get(item);
    if (position) {
      columnWidth = Math.min(columnWidth, position.width);
    }
  });
  return columnWidth;
}

function getDelta(
  deltasStack: Array<{
    left: number;
    right: number;
    delta: number;
  }>,
  position: Position,
): number {
  for (let i = deltasStack.length - 1; i >= 0; i -= 1) {
    const { left, right, delta } = deltasStack[i]!;
    if (isBelowArea({ left, right }, position)) {
      return delta;
    }
  }

  return 0;
}

function getNewDelta<T>({
  multicolumCurrentPosition,
  allPreviousItems,
  gutter,
}: {
  multicolumCurrentPosition: Position;
  allPreviousItems: ReadonlyArray<{ item: T; position: Position }>;
  gutter: number;
}): number {
  let closestItem: { item: T; position: Position };
  allPreviousItems.forEach(({ item, position }) => {
    const multiColumnLeftLimit = multicolumCurrentPosition.left;
    const multiColumnRightLimit = multicolumCurrentPosition.left + multicolumCurrentPosition.width;
    const currentItemLeftLimit = position.left;
    const currentItemRightLimit = position.left + position.width;
    const itemIsAboveMulticolumn =
      multiColumnLeftLimit <= currentItemLeftLimit &&
      multiColumnRightLimit >= currentItemRightLimit;

    if (itemIsAboveMulticolumn) {
      if (
        (closestItem &&
          position.top + position.height >
            closestItem!.position.top + closestItem!.position.height) ||
        !closestItem
      ) {
        closestItem = { item, position };
      }
    }

    return itemIsAboveMulticolumn;
  });
  const actualDelta =
    closestItem!.position.top +
    closestItem!.position.height -
    multicolumCurrentPosition.top +
    gutter;
  return actualDelta;
}

function recalcHeights<T>({
  items,
  changedItem,
  newHeight,
  positionStore,
  measurementStore,
  gutter,
}: {
  items: ReadonlyArray<T>;
  changedItem: T;
  newHeight: number;
  positionStore: Cache<T, Position>;
  measurementStore: Cache<T, number>;
  gutter: number;
}): boolean {
  const changedItemPosition = positionStore.get(changedItem);

  if (
    !changedItemPosition ||
    newHeight === 0 ||
    Math.floor(changedItemPosition.height) === Math.floor(newHeight)
  ) {
    return false;
  }

  const { top, left, width, height } = changedItemPosition;
  const oneColumnWidth = getColumnWidth(items.slice(0, 10), positionStore); // We don't need much items to know the column width

  // We use a stack in case we found multicolumn items that changes the deltas for their columns below
  const deltasStack = [
    {
      left,
      right: left + width,
      delta: newHeight - height,
    },
  ];

  const itemsFilteredAndSorted = items
    .map((item) => {
      const position = positionStore.get(item);
      return position && position.top >= changedItemPosition.top + changedItemPosition.height
        ? { item, position }
        : undefined;
    })
    .filter((itemPosition) => !!itemPosition)
    .sort((a, b) => a.position.top - b.position.top);

  measurementStore.set(changedItem, newHeight);
  positionStore.set(changedItem, { top, left, width, height: newHeight });

  itemsFilteredAndSorted.reduce(
    (area, { item, position }) => {
      if (isBelowArea(area, position)) {
        const itemIsMulticolumn = position.width > oneColumnWidth;
        if (itemIsMulticolumn) {
          // If it's a multicolumn module, we don't always use the same delta, because items above
          // can limit the movement of the multicolumn module. We need to find the correct delta.
          const multicolumCurrentPosition = position;

          // Check all items above to check if movement is necessary
          const allPreviousItems = items
            .map((i) => {
              const p = positionStore.get(i);
              return p && p.top < multicolumCurrentPosition.top
                ? { item: i, position: p }
                : undefined;
            })
            .filter((itemPosition) => !!itemPosition)
            .sort((a, b) => a.position.top - b.position.top);

          const newDelta = getNewDelta({
            multicolumCurrentPosition,
            allPreviousItems,
            gutter,
          });
          deltasStack.push({
            left: position.left,
            right: position.left + position.width,
            delta: newDelta,
          });
        }

        const currentDelta = getDelta(deltasStack, position);
        positionStore.set(item, { ...position, top: position.top + currentDelta });
        return {
          left: Math.min(area.left, position.left),
          right: Math.max(area.right, position.left + position.width),
        };
      }
      return area;
    },
    { left, right: left + width } as { left: number; right: number },
  );

  return true;
}

export default recalcHeights;
