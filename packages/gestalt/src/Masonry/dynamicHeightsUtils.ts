/**
 * Util functions used to update positions when an item changes the height dynamically
 */
import { type Cache } from './Cache';
import { type Position } from './types';

function isBelowArea(area: { left: number; right: number }, position: Position) {
  return position.left < area.right && position.left + position.width > area.left;
}

function recalcHeights<T>({
  items,
  changedItem,
  newHeight,
  positionStore,
  measurementStore,
}: {
  items: ReadonlyArray<T>;
  changedItem: T;
  newHeight: number;
  positionStore: Cache<T, Position>;
  measurementStore: Cache<T, number>;
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
  const heightDelta = newHeight - height;

  items
    .map((item) => {
      const position = positionStore.get(item);
      return position && position.top >= changedItemPosition.top + changedItemPosition.height
        ? { item, position }
        : undefined;
    })
    .filter((itemPosition) => !!itemPosition)
    .sort((a, b) => a.position.top - b.position.top)
    .reduce(
      (area, { item, position }) => {
        if (isBelowArea(area, position)) {
          positionStore.set(item, { ...position, top: position.top + heightDelta });
          return {
            left: Math.min(area.left, position.left),
            right: Math.max(area.right, position.left + position.width),
          };
        }
        return area;
      },
      { left, right: left + width } as { left: number; right: number },
    );

  measurementStore.set(changedItem, newHeight);
  positionStore.set(changedItem, { top, left, width, height: newHeight });

  return true;
}

export default recalcHeights;
