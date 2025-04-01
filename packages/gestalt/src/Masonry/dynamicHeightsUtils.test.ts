import defaultLayout from './defaultLayout';
import recalcHeights from './dynamicHeightsV2Utils';
import MeasurementStore from './MeasurementStore';
import { Position } from './types';

type Item = {
  name: string;
  height: number;
  color?: string;
  columnSpan?: number;
};

const getColumnSpanConfig = (item: Item) => item.columnSpan ?? 1;

const gutter = 0;

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
      gutter,
      columnWidth: 236,
      align: 'start',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      minCols: 2,
      rawItemCount: items.length,
      width: 236 * 4,
      originalItems: items,
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
      gutter,
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

  test('one of two same height columns decrease its height, 2-col module should not move', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items: readonly [Item, ...Item[]] = [
      { 'name': 'Pin 0', 'height': 211, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 211, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 100, 'color': '#FAB032', columnSpan: 2 },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultLayout({
      gutter,
      columnWidth: 236,
      align: 'start',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      minCols: 2,
      rawItemCount: items.length,
      width: 236 * 2,
      originalItems: items,
      _getColumnSpanConfig: getColumnSpanConfig,
    });

    const positions = layout(items);

    const changedItemIndex = 0;
    const heightDelta = 11;

    recalcHeights({
      items,
      changedItem: items[changedItemIndex],
      newHeight: items[changedItemIndex].height - heightDelta,
      positionStore: positionCache,
      measurementStore,
      gutter,
    });

    items.forEach((item, index) => {
      const originalPos = positions[index]!;
      const newPos = positionCache.get(item);

      const expectedPos = {
        ...originalPos,
        height: index !== changedItemIndex ? originalPos.height : originalPos.height - heightDelta,
      };
      expect(newPos).toEqual(expectedPos);
    });
  });

  test('one of two diff height columns decrease its height, 2-col module should move to the closest item above', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const secondItemHeight = 205;
    const items: readonly [Item, ...Item[]] = [
      { 'name': 'Pin 0', 'height': 211, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': secondItemHeight, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 100, 'color': '#FAB032', columnSpan: 2 },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultLayout({
      gutter,
      columnWidth: 236,
      align: 'start',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      minCols: 2,
      rawItemCount: items.length,
      width: 236 * 2,
      originalItems: items,
      _getColumnSpanConfig: getColumnSpanConfig,
    });

    const positions = layout(items);

    const changedItemIndex = 0;
    const heightDelta = 11;

    const twoColItemIndex = 2;

    recalcHeights({
      items,
      changedItem: items[changedItemIndex],
      newHeight: items[changedItemIndex].height - heightDelta,
      positionStore: positionCache,
      measurementStore,
      gutter,
    });

    items.forEach((item, index) => {
      const originalPos = positions[index]!;
      const newPos = positionCache.get(item);

      const expectedPos = {
        ...originalPos,
        top: index !== twoColItemIndex ? originalPos.top : secondItemHeight,
        height: index !== changedItemIndex ? originalPos.height : originalPos.height - heightDelta,
      };

      expect(newPos).toEqual(expectedPos);
    });
  });

  test('two diff height columns increase its height, 2-col module should follow the adjacent item only', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const firstItemHeight = 211;
    const items: readonly [Item, Item, ...Item[]] = [
      { 'name': 'Pin 0', 'height': firstItemHeight, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 205, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 100, 'color': '#FAB032', columnSpan: 2 },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultLayout({
      gutter,
      columnWidth: 236,
      align: 'start',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      minCols: 2,
      rawItemCount: items.length,
      width: 236 * 2,
      originalItems: items,
      _getColumnSpanConfig: getColumnSpanConfig,
    });

    const positions = layout(items);

    const changedItemIndex1 = 0;
    const heightDelta = 10;
    const firstItemNewHeight = firstItemHeight + heightDelta;

    recalcHeights({
      items,
      changedItem: items[changedItemIndex1],
      newHeight: firstItemNewHeight,
      positionStore: positionCache,
      measurementStore,
      gutter,
    });

    const changedItemIndex2 = 1;

    recalcHeights({
      items,
      changedItem: items[changedItemIndex2],
      newHeight: items[changedItemIndex2].height + heightDelta,
      positionStore: positionCache,
      measurementStore,
      gutter,
    });

    const twoColItemIndex = 2;

    items.forEach((item, index) => {
      const originalPos = positions[index]!;
      const newPos = positionCache.get(item);

      let newHeight = originalPos.height;
      if (index === changedItemIndex1) {
        newHeight = firstItemNewHeight;
      } else if (index === changedItemIndex2) {
        newHeight = originalPos.height + heightDelta;
      }

      const expectedPos = {
        ...originalPos,
        top: index !== twoColItemIndex ? originalPos.top : firstItemNewHeight,
        height: newHeight,
      };

      expect(newPos).toEqual(expectedPos);
    });
  });

  test('module moves, all items should move properly, even on items joined by another module in the row', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items: readonly [Item, Item, ...Item[]] = [
      { 'name': 'Pin 0', 'height': 230, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 201, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 200, 'color': '#F67076' },
      { 'name': 'Pin 3', 'height': 120, 'color': '#FAB032', columnSpan: 2 },
      { 'name': 'Pin 4', 'height': 202, 'color': '#F67076' },
      { 'name': 'Pin 5', 'height': 90, 'color': '#F67076' },
      { 'name': 'Pin 6', 'height': 60, 'color': '#F67076' },
      { 'name': 'Pin 7', 'height': 100, 'color': '#F67076', columnSpan: 2 },
      { 'name': 'Pin 8', 'height': 400, 'color': '#F67076' },
      { 'name': 'Pin 9', 'height': 400, 'color': '#F67076' },
      { 'name': 'Pin 10', 'height': 400, 'color': '#F67076' },
      { 'name': 'Pin 11', 'height': 400, 'color': '#F67076' },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultLayout({
      gutter,
      columnWidth: 236,
      align: 'start',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      minCols: 3,
      rawItemCount: items.length,
      width: 236 * 3,
      originalItems: items,
      _getColumnSpanConfig: getColumnSpanConfig,
    });

    const positions = layout(items);

    const expectedOriginalPos = [
      { width: 236, left: 0, 'height': 230, 'top': 0 },
      { width: 236, left: 236, 'height': 201, 'top': 0 },
      { width: 236, left: 472, 'height': 200, 'top': 0 },
      { width: 472, left: 236, 'height': 120, 'top': 201 },
      { width: 236, left: 0, 'height': 202, 'top': 230 },
      { width: 236, left: 236, 'height': 90, 'top': 321 },
      { width: 236, left: 472, 'height': 60, 'top': 321 },
      { width: 472, left: 0, 'height': 100, 'top': 432 },
      { width: 236, left: 472, 'height': 400, 'top': 381 },
      { width: 236, left: 0, 'height': 400, 'top': 532 },
      { width: 236, left: 236, 'height': 400, 'top': 532 },
      { width: 236, left: 472, 'height': 400, 'top': 781 },
    ];

    items.forEach((_, index) => {
      const originalPos = positions[index]!;
      expect(originalPos).toEqual(expectedOriginalPos[index]);
    });

    const changedItemIndex = 2; // Pin 2
    const heightDelta = 20;
    const changedItemIndexNewHeight = 200 + heightDelta;

    recalcHeights({
      items,
      changedItem: items[changedItemIndex],
      newHeight: changedItemIndexNewHeight,
      positionStore: positionCache,
      measurementStore,
      gutter,
    });

    const expectedPos = [
      { width: 236, left: 0, 'height': 230, 'top': 0 },
      { width: 236, left: 236, 'height': 201, 'top': 0 },
      { width: 236, left: 472, 'height': 220, 'top': 0 },
      { width: 472, left: 236, 'height': 120, 'top': 220 },
      { width: 236, left: 0, 'height': 202, 'top': 230 },
      { width: 236, left: 236, 'height': 90, 'top': 340 },
      { width: 236, left: 472, 'height': 60, 'top': 340 },
      { width: 472, left: 0, 'height': 100, 'top': 432 },
      { width: 236, left: 472, 'height': 400, 'top': 400 },
      { width: 236, left: 0, 'height': 400, 'top': 532 },
      { width: 236, left: 236, 'height': 400, 'top': 532 },
      { width: 236, left: 472, 'height': 400, 'top': 800 },
    ];

    items.forEach((item, index) => {
      const newPos = positionCache.get(item);
      expect(newPos).toEqual(expectedPos[index]);
    });
  });

  test('smaller module item that is above and in the area of a bigger module should be repositioned when the bigger module shrinks', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items: readonly [Item, Item, ...Item[]] = [
      { 'name': 'Pin 0', 'height': 200, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 201, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 202, 'color': '#FAB032' },
      { 'name': 'Pin 3', 'height': 200, 'color': '#A52019', columnSpan: 3 },
      { 'name': 'Pin 4', 'height': 350, 'color': '#CF3476', columnSpan: 2 },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultLayout({
      gutter,
      columnWidth: 236,
      align: 'start',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      minCols: 3,
      rawItemCount: items.length,
      width: 236 * 3,
      _getColumnSpanConfig: getColumnSpanConfig,
      originalItems: items,
    });

    const positions = layout(items);

    const expectedOriginalPos = [
      { top: 0, left: 0, width: 236, height: 200 },
      { top: 0, left: 236, width: 236, height: 201 },
      { top: 0, left: 472, width: 236, height: 202 },
      { top: 202, left: 0, width: 708, height: 200 },
      { top: 402, left: 0, width: 472, height: 350 },
    ];

    items.forEach((_, index) => {
      const originalPos = positions[index]!;
      expect(originalPos).toEqual(expectedOriginalPos[index]);
    });

    const changedItemIndex = 3; // Pin 3
    const heightDelta = -199;
    const changedItemIndexNewHeight = 200 + heightDelta;

    recalcHeights({
      items,
      changedItem: items[changedItemIndex],
      newHeight: changedItemIndexNewHeight,
      positionStore: positionCache,
      measurementStore,
      gutter,
    });

    const expectedPos = [
      { top: 0, left: 0, width: 236, height: 200 },
      { top: 0, left: 236, width: 236, height: 201 },
      { top: 0, left: 472, width: 236, height: 202 },
      { top: 202, left: 0, width: 708, height: 1 },
      { top: 203, left: 0, width: 472, height: 350 },
    ];

    items.forEach((item, index) => {
      const newPos = positionCache.get(item);
      expect(newPos).toEqual(expectedPos[index]);
    });
  });

  test('smaller module item that is above and in the area of a bigger module should be repositioned when the bigger module increases', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items: readonly [Item, Item, ...Item[]] = [
      { 'name': 'Pin 0', 'height': 200, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 201, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 202, 'color': '#FAB032' },
      { 'name': 'Pin 3', 'height': 1, 'color': '#A52019', columnSpan: 3 },
      { 'name': 'Pin 4', 'height': 350, 'color': '#CF3476', columnSpan: 2 },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultLayout({
      gutter,
      columnWidth: 236,
      align: 'start',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      minCols: 3,
      rawItemCount: items.length,
      width: 236 * 3,
      _getColumnSpanConfig: getColumnSpanConfig,
      originalItems: items,
    });

    const positions = layout(items);

    const expectedOriginalPos = [
      { top: 0, left: 0, width: 236, height: 200 },
      { top: 0, left: 236, width: 236, height: 201 },
      { top: 0, left: 472, width: 236, height: 202 },
      { top: 202, left: 0, width: 708, height: 1 },
      { top: 203, left: 0, width: 472, height: 350 },
    ];

    items.forEach((_, index) => {
      const originalPos = positions[index]!;
      expect(originalPos).toEqual(expectedOriginalPos[index]);
    });

    const changedItemIndex = 3; // Pin 3
    const heightDelta = 500;
    const changedItemIndexNewHeight = 1 + heightDelta;

    recalcHeights({
      items,
      changedItem: items[changedItemIndex],
      newHeight: changedItemIndexNewHeight,
      positionStore: positionCache,
      measurementStore,
      gutter,
    });

    const expectedPos = [
      { top: 0, left: 0, width: 236, height: 200 },
      { top: 0, left: 236, width: 236, height: 201 },
      { top: 0, left: 472, width: 236, height: 202 },
      { top: 202, left: 0, width: 708, height: 501 },
      { top: 703, left: 0, width: 472, height: 350 },
    ];

    items.forEach((item, index) => {
      const newPos = positionCache.get(item);
      expect(newPos).toEqual(expectedPos[index]);
    });
  });

  test('item height increases more than next item height, should not cause an overlap when there is a multi-column affected', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items: readonly [Item, Item, ...Item[]] = [
      { 'name': 'Pin 0', 'height': 250, 'color': '#EAE6CA' },
      { 'name': 'Pin 1', 'height': 150, 'color': '#AEA04B' },
      { 'name': 'Pin 2', 'height': 400, 'color': '#C51D34' },
      { 'name': 'Pin 3', 'height': 200, 'color': '#063971' },
      { 'name': 'Pin 4', 'height': 250, 'color': '#7F7679' },
      { 'name': 'Pin 5', 'height': 250, 'color': '#CDA434' },
      { 'name': 'Pin 6', 'height': 200, 'color': '#FF2301' },
      { 'name': 'Pin 7', 'height': 400, 'color': '#F44611' },
      { 'name': 'Pin 8', 'height': 450, 'color': '#D0D0D0' },
      { 'name': 'Pin 9', 'height': 150, 'color': '#A52019', columnSpan: 3 },
      { 'name': 'Pin 10', 'height': 350, 'color': '#CF3476' },
      { 'name': 'Pin 11', 'height': 400, 'color': '#474B4E' },
      { 'name': 'Pin 12', 'height': 250, 'color': '#F6F6F6' },
      { 'name': 'Pin 13', 'height': 315, 'color': '#2F4538' },
      { 'name': 'Pin 14', 'height': 255, 'color': '#D84B20' },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultLayout({
      gutter,
      columnWidth: 236,
      align: 'start',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      minCols: 5,
      rawItemCount: items.length,
      width: 236 * 5,
      _getColumnSpanConfig: getColumnSpanConfig,
      originalItems: items,
    });

    const positions = layout(items);

    const expectedOriginalPos = [
      { top: 0, left: 0, width: 236, height: 250 },
      { top: 0, left: 236, width: 236, height: 150 },
      { top: 0, left: 472, width: 236, height: 400 },
      { top: 0, left: 708, width: 236, height: 200 },
      { top: 0, left: 944, width: 236, height: 250 },
      { top: 150, left: 236, width: 236, height: 250 },
      { top: 200, left: 708, width: 236, height: 200 },
      { top: 250, left: 0, width: 236, height: 400 },
      { top: 250, left: 944, width: 236, height: 450 },
      { top: 400, left: 236, width: 708, height: 150 },
      { top: 550, left: 236, width: 236, height: 350 },
      { top: 550, left: 472, width: 236, height: 400 },
      { top: 550, left: 708, width: 236, height: 250 },
      { top: 650, left: 0, width: 236, height: 315 },
      { top: 700, left: 944, width: 236, height: 255 },
    ];

    items.forEach((_, index) => {
      const originalPos = positions[index]!;
      expect(originalPos).toEqual(expectedOriginalPos[index]);
    });

    const changedItemIndex = 3; // Pin 3
    const heightDelta = 400;
    const itemHeight = items[changedItemIndex]!.height;
    const changedItemIndexNewHeight = itemHeight + heightDelta;

    recalcHeights({
      items,
      changedItem: items[changedItemIndex],
      newHeight: changedItemIndexNewHeight,
      positionStore: positionCache,
      measurementStore,
      gutterWidth: gutter,
    });

    const expectedPos = [
      { top: 0, left: 0, width: 236, height: 250 },
      { top: 0, left: 236, width: 236, height: 150 },
      { top: 0, left: 472, width: 236, height: 400 },
      { top: 0, left: 708, width: 236, height: 600 },
      { top: 0, left: 944, width: 236, height: 250 },
      { top: 150, left: 236, width: 236, height: 250 },
      { top: 600, left: 708, width: 236, height: 200 },
      { top: 250, left: 0, width: 236, height: 400 },
      { top: 250, left: 944, width: 236, height: 450 },
      { top: 800, left: 236, width: 708, height: 150 },
      { top: 950, left: 236, width: 236, height: 350 },
      { top: 950, left: 472, width: 236, height: 400 },
      { top: 950, left: 708, width: 236, height: 250 },
      { top: 650, left: 0, width: 236, height: 315 },
      { top: 700, left: 944, width: 236, height: 255 },
    ];

    items.forEach((item, index) => {
      const newPos = positionCache.get(item);
      expect(newPos).toEqual(expectedPos[index]);
    });
  });
});
