// @flow strict
import defaultTwoColumnModuleLayout from './defaultTwoColumnModuleLayout';
import HeightsStore from './HeightsStore';
import MeasurementStore from './MeasurementStore';
import { type Position } from './types';

type Item = {
  name: string,
  height: number,
  color?: string,
};

// Tests copied from defaultLayout to ensure we don't break default cases
describe('defaultLayout test cases', () => {
  test('empty', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const items: $ReadOnlyArray<Item> = [];

    const layout = defaultTwoColumnModuleLayout({
      measurementCache: measurementStore,
      positionCache,
      justify: 'start',
      rawItemCount: items.length,
      width: 486,
    });
    expect(layout(items)).toEqual([]);
  });

  test('one row', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const items: $ReadOnlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 120, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 80, 'color': '#FAB032' },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultTwoColumnModuleLayout({
      measurementCache: measurementStore,
      positionCache,
      justify: 'start',
      rawItemCount: items.length,
      width: 736,
    });
    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 0, width: 236 },
      { top: 0, height: 120, left: 250, width: 236 },
      { top: 0, height: 80, left: 500, width: 236 },
    ]);
  });

  test('wrapping items', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const items: $ReadOnlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100 },
      { 'name': 'Pin 1', 'height': 120 },
      { 'name': 'Pin 2', 'height': 80 },
      { 'name': 'Pin 3', 'height': 100 },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultTwoColumnModuleLayout({
      measurementCache: measurementStore,
      positionCache,
      justify: 'start',
      rawItemCount: items.length,
      width: 486,
    });
    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 0, width: 236 },
      { top: 0, height: 120, left: 250, width: 236 },
      { top: 114, height: 80, left: 0, width: 236 },
      { top: 134, height: 100, left: 250, width: 236 },
    ]);
  });

  test('centers grid within the viewport', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const items: $ReadOnlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100 },
      { 'name': 'Pin 1', 'height': 120 },
      { 'name': 'Pin 2', 'height': 80 },
      { 'name': 'Pin 3', 'height': 100 },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultTwoColumnModuleLayout({
      measurementCache: measurementStore,
      positionCache,
      justify: 'start',
      minCols: 2,
      rawItemCount: items.length,
      width: 8000,
    });

    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 7, width: 236 },
      { top: 0, height: 120, left: 257, width: 236 },
      { top: 0, height: 80, left: 507, width: 236 },
      { top: 0, height: 100, left: 757, width: 236 },
    ]);
  });

  test('floors values when centering', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const items: $ReadOnlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100 },
      { 'name': 'Pin 1', 'height': 120 },
      { 'name': 'Pin 2', 'height': 80 },
      { 'name': 'Pin 3', 'height': 100 },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });
    const layout = defaultTwoColumnModuleLayout({
      measurementCache: measurementStore,
      positionCache,
      justify: 'start',
      rawItemCount: items.length,
      width: 501,
    });

    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 7, width: 236 },
      { top: 0, height: 120, left: 257, width: 236 },
      { top: 114, height: 80, left: 7, width: 236 },
      { top: 134, height: 100, left: 257, width: 236 },
    ]);
  });

  test('only centers when theres extra space', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const items: $ReadOnlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100 },
      { 'name': 'Pin 1', 'height': 120 },
      { 'name': 'Pin 2', 'height': 80 },
      { 'name': 'Pin 3', 'height': 100 },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });
    const layout = defaultTwoColumnModuleLayout({
      measurementCache: measurementStore,
      positionCache,
      justify: 'start',
      rawItemCount: items.length,
      width: 200,
    });

    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 0, width: 236 },
      { top: 0, height: 120, left: 250, width: 236 },
      { top: 114, height: 80, left: 0, width: 236 },
      { top: 134, height: 100, left: 250, width: 236 },
    ]);
  });

  test('justify', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const items: $ReadOnlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100 },
      { 'name': 'Pin 1', 'height': 120 },
      { 'name': 'Pin 2', 'height': 80 },
      { 'name': 'Pin 3', 'height': 100 },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const makeLayout = (justify: 'center' | 'start') =>
      defaultTwoColumnModuleLayout({
        measurementCache: measurementStore,
        positionCache,
        columnWidth: 100,
        gutter: 0,
        justify,
        width: 1000,
        rawItemCount: items.length,
      })(items);

    const justifyStart = makeLayout('start');
    positionCache.reset();
    const justifyCenter = makeLayout('center');

    expect(justifyStart).toEqual([
      { top: 0, left: 0, width: 100, height: 100 },
      { top: 0, left: 100, width: 100, height: 120 },
      { top: 0, left: 200, width: 100, height: 80 },
      { top: 0, left: 300, width: 100, height: 100 },
    ]);

    expect(justifyCenter).toEqual([
      { top: 0, left: 300, width: 100, height: 100 },
      { top: 0, left: 400, width: 100, height: 120 },
      { top: 0, left: 500, width: 100, height: 80 },
      { top: 0, left: 600, width: 100, height: 100 },
    ]);
  });
});

describe('two column layout test cases', () => {
  test('returns positions for all items', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const heightsCache = new HeightsStore();
    const items = [
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
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultTwoColumnModuleLayout({
      columnWidth: 240,
      measurementCache: measurementStore,
      heightsCache,
      justify: 'start',
      minCols: 3,
      positionCache,
      rawItemCount: items.length,
      width: 1200,
    });
    // perform single column layout first since we expect two column items on second page+ currently
    layout(items);

    const newItems = [
      { name: 'Pin 10', height: 210, color: '#30BAF6' },
      { name: 'Pin 11', height: 211, color: '#7076FA' },
      { name: 'Pin 12', height: 212, color: '#B032ED' },
      { name: 'Pin 13', height: 213, color: '#F21DCF', columnSpan: 2 },
      { name: 'Pin 14', height: 214, color: '#45098F' },
    ];
    newItems.forEach((item) => {
      measurementStore.set(item, item.height);
    });
    const updatedItems = items.concat(newItems);
    const positions = layout(updatedItems);
    expect(positions.length).toEqual(updatedItems.length);
    expect(positions).toEqual([
      { 'height': 210, 'left': 607, 'top': 436, 'width': 240 },
      { 'height': 212, 'left': 861, 'top': 438, 'width': 240 },
      { 'height': 214, 'left': 99, 'top': 654, 'width': 240 },
      { 'height': 213, 'left': 353, 'top': 660, 'width': 494 },
      { 'height': 200, 'left': 99, 'top': 0, 'width': 240 },
      { 'height': 201, 'left': 353, 'top': 0, 'width': 240 },
      { 'height': 202, 'left': 607, 'top': 0, 'width': 240 },
      { 'height': 203, 'left': 861, 'top': 0, 'width': 240 },
      { 'height': 204, 'left': 99, 'top': 214, 'width': 240 },
      { 'height': 205, 'left': 353, 'top': 215, 'width': 240 },
      { 'height': 206, 'left': 607, 'top': 216, 'width': 240 },
      { 'height': 207, 'left': 861, 'top': 217, 'width': 240 },
      { 'height': 208, 'left': 99, 'top': 432, 'width': 240 },
      { 'height': 209, 'left': 353, 'top': 434, 'width': 240 },
      { 'height': 211, 'left': 861, 'top': 664, 'width': 240 },
    ]);
  });

  test('correctly positions two column items regardless of on where they are in the batch', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const heightsCache = new HeightsStore();

    // We use same height so the two column item is always at the start of the two column batch
    const items = [
      { 'name': 'Pin 0', 'height': 200, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 200, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 200, 'color': '#FAB032' },
      { 'name': 'Pin 3', 'height': 200, 'color': '#EDF21D' },
      { 'name': 'Pin 4', 'height': 200, 'color': '#CF4509' },
      { 'name': 'Pin 5', 'height': 200, 'color': '#230BAF' },
      { 'name': 'Pin 6', 'height': 200, 'color': '#67076F' },
      { 'name': 'Pin 7', 'height': 200, 'color': '#AB032E' },
      { 'name': 'Pin 8', 'height': 200, 'color': '#DF21DC' },
      { 'name': 'Pin 9', 'height': 200, 'color': '#F45098' },
      { 'name': 'Pin 10', 'height': 200, 'color': '#30BAF6' },
      { 'name': 'Pin 11', 'height': 200, 'color': '#7076FA' },
      { 'name': 'Pin 12', 'height': 200, 'color': '#B032ED' },
      { 'name': 'Pin 13', 'height': 200, 'color': '#F21DCF' },
      { 'name': 'Pin 14', 'height': 200, 'color': '#45098F' },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultTwoColumnModuleLayout({
      columnWidth: 240,
      measurementCache: measurementStore,
      heightsCache,
      justify: 'start',
      minCols: 3,
      positionCache,
      rawItemCount: items.length,
      width: 1200,
    });

    let mockItems;
    let twoColumnModuleIndex;

    // Correct position when two column module is on the end of the batch
    twoColumnModuleIndex = 13;
    mockItems = [
      ...items.slice(0, twoColumnModuleIndex),
      { ...items[twoColumnModuleIndex], columnSpan: 2 },
      ...items.slice(twoColumnModuleIndex + 1),
    ];
    mockItems.forEach((item) => {
      measurementStore.set(item, item.height);
    });
    layout(mockItems);
    expect(positionCache.get(mockItems[twoColumnModuleIndex])).toEqual({
      height: 200,
      left: 353,
      top: 428,
      width: 494,
    });

    // Correct position when two column module is on the middle of the batch
    measurementStore.reset();
    positionCache.reset();
    heightsCache.reset();

    twoColumnModuleIndex = 7;
    mockItems = [
      ...items.slice(0, twoColumnModuleIndex),
      { ...items[twoColumnModuleIndex], columnSpan: 2 },
      ...items.slice(twoColumnModuleIndex + 1),
    ];
    mockItems.forEach((item) => {
      measurementStore.set(item, item.height);
    });
    layout(mockItems);
    // third row, first column
    expect(positionCache.get(mockItems[twoColumnModuleIndex])).toEqual({
      height: 200,
      left: 99,
      top: 428,
      width: 494,
    });

    // Correct position when two column module is at the start of the batch
    measurementStore.reset();
    positionCache.reset();
    heightsCache.reset();

    twoColumnModuleIndex = 5;
    mockItems = [
      ...items.slice(0, twoColumnModuleIndex),
      { ...items[twoColumnModuleIndex], columnSpan: 2 },
      ...items.slice(twoColumnModuleIndex + 1),
    ];
    mockItems.forEach((item) => {
      measurementStore.set(item, item.height);
    });
    layout(mockItems);
    // item 5 so second row, second column
    expect(positionCache.get(mockItems[twoColumnModuleIndex])).toEqual({
      height: 200,
      left: 353,
      top: 214,
      width: 494,
    });
  });

  test('correctly position two column item when initial heights are 0', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const heightsCache = new HeightsStore();
    const items = [
      { 'name': 'Pin 0', 'height': 200, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 201, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 202, 'color': '#FAB032' },
      { 'name': 'Pin 3', 'height': 203, 'color': '#EDF21D' },
      { 'name': 'Pin 4', 'height': 204, 'color': '#CF4509' },
      { 'name': 'Pin 5', 'height': 205, 'color': '#230BAF' },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const layout = defaultTwoColumnModuleLayout({
      columnWidth: 240,
      measurementCache: measurementStore,
      heightsCache,
      justify: 'start',
      minCols: 3,
      positionCache,
      rawItemCount: items.length,
      width: 1200,
    });

    let mockItems;
    let twoColumnModuleIndex;

    // Correct position when two column module is on the start of the batch
    twoColumnModuleIndex = 0;
    mockItems = [
      ...items.slice(0, twoColumnModuleIndex),
      { ...items[twoColumnModuleIndex], columnSpan: 2 },
      ...items.slice(twoColumnModuleIndex + 1),
    ];
    mockItems.forEach((item) => {
      measurementStore.set(item, item.height);
    });
    layout(mockItems);
    // First slot
    expect(positionCache.get(mockItems[twoColumnModuleIndex])).toEqual({
      height: 200,
      left: 99,
      top: 0,
      width: 494,
    });

    // Correct position when two column module is at the middle of the batch and fits on the row
    measurementStore.reset();
    positionCache.reset();
    heightsCache.reset();

    twoColumnModuleIndex = 2;
    mockItems = [
      ...items.slice(0, twoColumnModuleIndex),
      { ...items[twoColumnModuleIndex], columnSpan: 2 },
      ...items.slice(twoColumnModuleIndex + 1),
    ];
    mockItems.forEach((item) => {
      measurementStore.set(item, item.height);
    });
    layout(mockItems);
    // First row third position
    expect(positionCache.get(mockItems[twoColumnModuleIndex])).toEqual({
      height: 202,
      left: 607,
      top: 0,
      width: 494,
    });
  });

  test('fills in remaining columns in the first row when multi column item cannot fit', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const heightsCache = new HeightsStore();
    const items = [
      { name: 'Pin 0', height: 250, color: '#E230BA' },
      { name: 'Pin 1', height: 202, color: '#FAB032' },
      { name: 'Pin 2', height: 210, color: '#EDF21D' },
      { name: 'Pin 3', height: 300, color: '#CF4509' },
      { name: 'Pin 4', height: 150, color: '#230BAF' },
      { name: 'Pin 5', height: 500, color: '#67076F', columnSpan: 2 },
      { name: 'Pin 6', height: 300, color: '#AB032E' },
      { name: 'Pin 7', height: 310, color: '#DF21DC' },
      { name: 'Pin 8', height: 280, color: '#F45098' },
      { name: 'Pin 9', height: 170, color: '#F67076' },
      { name: 'Pin 10', height: 220, color: '#67076F' },
      { name: 'Pin 11', height: 280, color: '#AB032E' },
      { name: 'Pin 12', height: 150, color: '#DF21DC' },
      { name: 'Pin 13', height: 200, color: '#F45098' },
      { name: 'Pin 14', height: 250, color: '#E230BA' },
      { name: 'Pin 15', height: 300, color: '#FAB032' },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const columnWidth = 240;
    const screenWidth = 1500;

    const layout = defaultTwoColumnModuleLayout({
      columnWidth,
      gutter: 0,
      measurementCache: measurementStore,
      heightsCache,
      justify: 'start',
      minCols: 3,
      positionCache,
      rawItemCount: items.length,
      width: screenWidth, // 6 rows
    });
    // perform single column layout first since we expect two column items on second page+ currently
    layout(items);

    // there should be 6 rows (1500 / 240)
    // the first row items should be Pin 0, Pin 1, Pin 2, Pin 3, Pin 4, Pin 6
    const columnCount = Math.floor(screenWidth / columnWidth);
    const firstRowItems = items.filter((i) => !i.columnSpan).slice(0, columnCount);
    const margin = (screenWidth - columnWidth * columnCount) / 2;
    firstRowItems.forEach((item, i) => {
      const position = positionCache.get(item);
      expect(position?.top).toBe(0);
      expect(position?.left).toBe(i * columnWidth + margin);
    });
  });

  test('fills in remaining columns in the first row when multi column item cannot fit on small batch', () => {
    const measurementStore = new MeasurementStore<{ ... }, number>();
    const positionCache = new MeasurementStore<{ ... }, Position>();
    const heightsCache = new HeightsStore();
    const items = [
      { name: 'Pin 0', height: 250, color: '#E230BA' },
      { name: 'Pin 1', height: 202, color: '#FAB032' },
      { name: 'Pin 2', height: 210, color: '#EDF21D' },
      { name: 'Pin 3', height: 300, color: '#CF4509', columnSpan: 2 },
      { name: 'Pin 4', height: 150, color: '#230BAF' },
      { name: 'Pin 5', height: 500, color: '#67076F' },
    ];
    items.forEach((item) => {
      measurementStore.set(item, item.height);
    });

    const columnWidth = 240;
    const screenWidth = 720;

    const layout = defaultTwoColumnModuleLayout({
      columnWidth,
      gutter: 0,
      measurementCache: measurementStore,
      heightsCache,
      justify: 'start',
      minCols: 3,
      positionCache,
      rawItemCount: items.length,
      width: screenWidth, // 3 rows
    });

    layout(items);

    // there should be 3 rows (720 / 240)
    // the first row items should be Pin 0, Pin 1, Pin 2
    const columnCount = Math.floor(screenWidth / columnWidth);
    const firstRowItems = items.filter((i) => !i.columnSpan).slice(0, columnCount);
    const margin = (screenWidth - columnWidth * columnCount) / 2;
    firstRowItems.forEach((item, i) => {
      const position = positionCache.get(item);
      expect(position?.top).toBe(0);
      expect(position?.left).toBe(i * columnWidth + margin);
    });
  });
});
