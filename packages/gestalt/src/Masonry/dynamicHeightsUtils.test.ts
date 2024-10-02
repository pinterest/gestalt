import defaultLayout from './defaultLayout';
import recalcHeights from './dynamicHeightsUtils';
import MeasurementStore from './MeasurementStore';
import { Position } from './types';

type Item = {
  name: string;
  height: number;
  color?: string;
  columnSpan?: number;
};

const getColumnSpanConfig = (item: Item) => item.columnSpan ?? 1;

describe('dynamic heights on masonry', () => {
  test('one column first item increase', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items: readonly [Item, ...Item[]] = [
      { 'name': 'Pin 0', 'height': 200, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 201, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 202, 'color': '#FAB032' },
      { 'name': 'Pin 3', 'height': 203, 'color': '#EDF21D' },
      { 'name': 'Pin 4', 'height': 204, 'color': '#CF4509' },
      { 'name': 'Pin 5', 'height': 205, 'color': '#230BAF' },
      { 'name': 'Pin 6', 'height': 206, 'color': '#67076F' },
      { 'name': 'Pin 7', 'height': 207, 'color': '#AB032E' },
      { 'name': 'Pin 8', 'height': 208, 'color': '#DF21DC' },
      { 'name': 'Pin 9', 'height': 209, 'color': '#F45098' },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultLayout({
      gutter: 0,
      columnWidth: 236,
      align: 'start',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      minCols: 2,
      rawItemCount: items.length,
      width: 236 * 4,
      _getColumnSpanConfig: getColumnSpanConfig,
    });

    const positions = layout(items);

    const changedItemIndex = 0;
    const heightDelta = 100;

    recalcHeights({
      items,
      changedItem: items[changedItemIndex],
      newHeight: items[changedItemIndex].height + heightDelta,
      positionStore: positionCache,
      measurementStore,
    });

    items.forEach((item, index) => {
      const originalPos = positions[index]!;
      const newPos = positionCache.get(item);

      const expectedPos = {
        ...originalPos,
        top:
          originalPos.left === 0 && index !== changedItemIndex
            ? originalPos.top + heightDelta
            : originalPos.top,
        height: index !== changedItemIndex ? originalPos.height : originalPos.height + heightDelta,
      };

      expect(newPos).toEqual(expectedPos);
    });
  });
});
