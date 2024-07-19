/**
 * Util functions used to update positions when an item changes the height dynamically
 */
import { Cache } from './Cache';
import { ColumnSpanConfig } from './multiColumnLayout';
import { Position } from './types';

function shouldExtendArea(area: { top: number; left: number; right: number }, position: Position) {
  return position.left < area.left || position.left + position.width > area.right;
}

function isBelowArea(area: { top: number; left: number; right: number }, position: Position) {
  return (
    position.left < area.right &&
    position.left + position.width > area.left &&
    position.top > area.top
  );
}

function recalcHeights<T>({
  items,
  changedItem,
  newHeight,
  positionStore,
  measurementStore,
  getColumnSpanConfig,
}: {
  items: ReadonlyArray<T>;
  changedItem: T;
  newHeight: number;
  positionStore: Cache<T, Position>;
  measurementStore: Cache<T, number>;
  getColumnSpanConfig?: (item: T) => ColumnSpanConfig;
}) {
  const changedItemPosition = positionStore.get(changedItem);

  if (!changedItemPosition || changedItemPosition.height === newHeight) {
    return;
  }

  measurementStore.set(changedItem, newHeight);

  const { top, left, width, height } = changedItemPosition;
  const itemsWithPositions = items.filter((item) => item && positionStore.has(item));
  const multiColumnItemsPositions = getColumnSpanConfig
    ? itemsWithPositions
        .filter((item) => getColumnSpanConfig(item) !== 1)
        .map((item) => {
          const position = positionStore.get(item);
          return position ? { item, position } : undefined;
        })
        .filter((itemPosition) => !!itemPosition)
        .sort((a, b) => a.position.top - b.position.top)
    : [];

  const areas = multiColumnItemsPositions.reduce(
    (acc, itemPosition) => {
      const { position } = itemPosition;
      const lastArea = acc[acc.length - 1];

      for (let i = 0; i < acc.length; i += 1) {
        if (position && isBelowArea(acc[i], position) && shouldExtendArea(acc[i], position)) {
          return lastArea.top === position.top
            ? [
                ...acc.slice(-1),
                {
                  top: position.top,
                  left: Math.min(lastArea.left, position.left),
                  right: Math.max(lastArea.right, position.left + position.width),
                },
              ]
            : [
                ...acc,
                { top: position.top, left: position.left, right: position.left + position.width },
              ];
        }
      }

      return acc;
    },
    [{ top, left, right: left + width }],
  );

  positionStore.set(changedItem, { top, left, width, height: newHeight });
  const heightDelta = newHeight - height;

  itemsWithPositions.forEach((item) => {
    const position = positionStore.get(item);

    if (position && areas.some((area) => isBelowArea(area, position))) {
      positionStore.set(item, { ...position, top: position.top + heightDelta });
    }
  });
}

export default recalcHeights;
