import MeasurementStore from './MeasurementStore';
import multiColumnLayout, { initializeHeightsArray } from './multiColumnLayout';
import { Position } from './types';

type Item = {
  name: string;
  height: number;
  color?: string;
  columnSpan?: number;
};

const getColumnSpanConfig = (item: Item) => item.columnSpan ?? 1;

describe('one column layout test cases', () => {
  test('empty', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items: ReadonlyArray<Item> = [];

    const positions = multiColumnLayout({
      items,
      measurementCache: measurementStore,
      positionCache,
      _getColumnSpanConfig: getColumnSpanConfig,
    });
    expect(positions).toEqual([]);
  });

  test('one row', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items: ReadonlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 120, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 80, 'color': '#FAB032' },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const positions = multiColumnLayout({
      items,
      columnCount: 3,
      measurementCache: measurementStore,
      positionCache,
      _getColumnSpanConfig: getColumnSpanConfig,
    });
    expect(positions).toEqual([
      { top: 0, height: 100, left: 0, width: 236 },
      { top: 0, height: 120, left: 250, width: 236 },
      { top: 0, height: 80, left: 500, width: 236 },
    ]);
  });

  test('wrapping items', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items: ReadonlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100 },
      { 'name': 'Pin 1', 'height': 120 },
      { 'name': 'Pin 2', 'height': 80 },
      { 'name': 'Pin 3', 'height': 100 },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const positions = multiColumnLayout({
      items,
      columnCount: 2,
      measurementCache: measurementStore,
      positionCache,
      _getColumnSpanConfig: getColumnSpanConfig,
    });
    expect(positions).toEqual([
      { top: 0, height: 100, left: 0, width: 236 },
      { top: 0, height: 120, left: 250, width: 236 },
      { top: 114, height: 80, left: 0, width: 236 },
      { top: 134, height: 100, left: 250, width: 236 },
    ]);
  });

  test('correctly positions items with no height', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items: ReadonlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100 },
      { 'name': 'Pin 1', 'height': 120 },
      { 'name': 'Pin 2', 'height': 0 },
      { 'name': 'Pin 3', 'height': 100 },
      { 'name': 'Pin 4', 'height': 100 },
      { 'name': 'Pin 5', 'height': 120 },
      { 'name': 'Pin 6', 'height': 80 },
      { 'name': 'Pin 7', 'height': 100 },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const positions = multiColumnLayout({
      items,
      columnCount: 4,
      measurementCache: measurementStore,
      positionCache,
      _getColumnSpanConfig: getColumnSpanConfig,
    });

    const pin2Position = positions[2];
    const pin3Position = positions[3];

    expect(pin2Position?.height).toBe(0);
    expect(pin2Position?.top).toBe(0);
    expect(pin3Position?.top).toBe(0);
    expect(pin2Position?.left).toBe(pin3Position?.left);
  });
});

describe('multi column layout test cases', () => {
  test('returns positions for all items', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
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
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = (itemsToLayout: Item[]) =>
      multiColumnLayout({
        items: itemsToLayout,
        columnWidth: 240,
        columnCount: 4,
        centerOffset: 99,
        measurementCache: measurementStore,
        positionCache,
        _getColumnSpanConfig: getColumnSpanConfig,
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
    newItems.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });
    let updatedItems = items.concat(newItems);

    // perform positioning of batch with two column item
    layout(updatedItems);

    const newItems2 = [
      { name: 'Pin 15', height: 210, color: '#30BAF6' },
      { name: 'Pin 16', height: 211, color: '#7076FA' },
      { name: 'Pin 17', height: 212, color: '#B032ED' },
      { name: 'Pin 18', height: 213, color: '#F21DCF', columnSpan: 3 },
      { name: 'Pin 19', height: 214, color: '#45098F' },
    ];
    newItems2.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });
    updatedItems = updatedItems.concat(newItems2);

    // perform positioning of batch with multi column item
    layout(updatedItems);

    const positions = updatedItems.map((item: any) => positionCache.get(item));
    expect(positions.length).toEqual(updatedItems.length);
    expect(positions).toEqual([
      { 'top': 0, 'left': 99, 'width': 240, 'height': 200 },
      { 'top': 0, 'left': 353, 'width': 240, 'height': 201 },
      { 'top': 0, 'left': 607, 'width': 240, 'height': 202 },
      { 'top': 0, 'left': 861, 'width': 240, 'height': 203 },
      { 'top': 214, 'left': 99, 'width': 240, 'height': 204 },
      { 'top': 215, 'left': 353, 'width': 240, 'height': 205 },
      { 'top': 216, 'left': 607, 'width': 240, 'height': 206 },
      { 'top': 217, 'left': 861, 'width': 240, 'height': 207 },
      { 'top': 432, 'left': 99, 'width': 240, 'height': 208 },
      { 'top': 434, 'left': 353, 'width': 240, 'height': 209 },
      // Two column batch
      { 'top': 436, 'left': 607, 'width': 240, 'height': 210 },
      { 'top': 657, 'left': 353, 'width': 240, 'height': 211 },
      { 'top': 438, 'left': 861, 'width': 240, 'height': 212 },
      { 'top': 882, 'left': 99, 'width': 494, 'height': 213 }, // Two col item position
      { 'top': 654, 'left': 99, 'width': 240, 'height': 214 },
      // Multi column batch
      { 'top': 660, 'left': 607, 'width': 240, 'height': 210 },
      { 'top': 884, 'left': 607, 'width': 240, 'height': 211 },
      { 'top': 664, 'left': 861, 'width': 240, 'height': 212 },
      { 'top': 1109, 'left': 99, 'width': 748, 'height': 213 }, // Multi col item position
      { 'top': 890, 'left': 861, 'width': 240, 'height': 214 },
    ]);
  });

  test('correctly positions two column items regardless of on where they are in the batch', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();

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
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = (itemsToLayout: Item[]) =>
      multiColumnLayout({
        items: itemsToLayout,
        columnWidth: 240,
        columnCount: 4,
        centerOffset: 99,
        measurementCache: measurementStore,
        positionCache,
        _getColumnSpanConfig: getColumnSpanConfig,
      });

    let mockItems: any;
    let twoColumnModuleIndex: any;

    // Correct position when two column module is on the end of the batch
    twoColumnModuleIndex = 13;
    mockItems = [
      ...items.slice(0, twoColumnModuleIndex),
      { ...items[twoColumnModuleIndex], columnSpan: 2 },
      ...items.slice(twoColumnModuleIndex + 1),
    ];
    mockItems.forEach((item: any) => {
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

    twoColumnModuleIndex = 7;
    mockItems = [
      ...items.slice(0, twoColumnModuleIndex),
      { ...items[twoColumnModuleIndex], columnSpan: 2 },
      ...items.slice(twoColumnModuleIndex + 1),
    ];
    mockItems.forEach((item: any) => {
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

    twoColumnModuleIndex = 5;
    mockItems = [
      ...items.slice(0, twoColumnModuleIndex),
      { ...items[twoColumnModuleIndex], columnSpan: 2 },
      ...items.slice(twoColumnModuleIndex + 1),
    ];
    mockItems.forEach((item: any) => {
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

  test('bails out graph when whitespace threshold is found', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();

    // Placing the first one col item after first line we have a whitespace of 10
    // so we break early although the next combination has 0 whitespace
    const items: readonly [Item, Item, Item, Item, Item, ...Item[]] = [
      { 'name': 'Pin 0', 'height': 300, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 150, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 350, 'color': '#FAB032' },
      { 'name': 'Pin 3', 'height': 140, 'color': '#EDF21D' },
      { 'name': 'Pin 4', 'height': 200, 'color': '#CF4509', columnSpan: 2 },
      { 'name': 'Pin 5', 'height': 200, 'color': '#230BAF' },
      { 'name': 'Pin 6', 'height': 150, 'color': '#67076F' },
      { 'name': 'Pin 7', 'height': 207, 'color': '#AB032E' },
      { 'name': 'Pin 8', 'height': 209, 'color': '#DF21DC' },
      { 'name': 'Pin 9', 'height': 200, 'color': '#F45098' },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = (itemsToLayout: readonly Item[]) =>
      multiColumnLayout({
        items: itemsToLayout,
        gutter: 0,
        columnWidth: 240,
        columnCount: 4,
        centerOffset: 20,
        measurementCache: measurementStore,
        positionCache,
        whitespaceThreshold: 11,
        _getColumnSpanConfig: getColumnSpanConfig,
      });

    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });
    layout(items);

    expect(positionCache.get(items[4])).toEqual({
      height: 200,
      left: 500,
      top: 350,
      width: 480,
    });
  });

  test('correctly position two column item when initial heights are 0', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items = [
      { 'name': 'Pin 0', 'height': 200, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 201, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 202, 'color': '#FAB032' },
      { 'name': 'Pin 3', 'height': 203, 'color': '#EDF21D' },
      { 'name': 'Pin 4', 'height': 204, 'color': '#CF4509' },
      { 'name': 'Pin 5', 'height': 205, 'color': '#230BAF' },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = (itemsToLayout: Item[]) =>
      multiColumnLayout({
        items: itemsToLayout,
        columnWidth: 240,
        columnCount: 4,
        centerOffset: 99,
        measurementCache: measurementStore,
        positionCache,
        _getColumnSpanConfig: getColumnSpanConfig,
      });

    let mockItems: any;
    let twoColumnModuleIndex: any;

    // Correct position when two column module is on the start of the batch
    twoColumnModuleIndex = 0;
    mockItems = [
      ...items.slice(0, twoColumnModuleIndex),
      { ...items[twoColumnModuleIndex], columnSpan: 2 },
      ...items.slice(twoColumnModuleIndex + 1),
    ];
    mockItems.forEach((item: any) => {
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

    twoColumnModuleIndex = 2;
    mockItems = [
      ...items.slice(0, twoColumnModuleIndex),
      { ...items[twoColumnModuleIndex], columnSpan: 2 },
      ...items.slice(twoColumnModuleIndex + 1),
    ];
    mockItems.forEach((item: any) => {
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

  test('correctly position multi column item when initial heights are 0', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items = [
      { 'name': 'Pin 0', 'height': 200, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 201, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 202, 'color': '#FAB032' },
      { 'name': 'Pin 3', 'height': 203, 'color': '#EDF21D' },
      { 'name': 'Pin 4', 'height': 204, 'color': '#CF4509' },
      { 'name': 'Pin 5', 'height': 205, 'color': '#230BAF' },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = (itemsToLayout: Item[]) =>
      multiColumnLayout({
        items: itemsToLayout,
        columnWidth: 240,
        columnCount: 5,
        centerOffset: 92,
        measurementCache: measurementStore,
        positionCache,
        _getColumnSpanConfig: getColumnSpanConfig,
      });

    let mockItems: any;
    let multiColumnModuleIndex: any;
    let columnSpan: any;

    // Correct position when multi column module is on the start of the first row
    multiColumnModuleIndex = 0;
    columnSpan = 3;

    mockItems = [
      ...items.slice(0, multiColumnModuleIndex),
      { ...items[multiColumnModuleIndex], columnSpan },
      ...items.slice(multiColumnModuleIndex + 1),
    ];
    mockItems.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });
    layout(mockItems);
    // First slot
    expect(positionCache.get(mockItems[multiColumnModuleIndex])).toEqual({
      height: 200,
      left: 92,
      top: 0,
      width: 748,
    });

    // Correct position when multi column module is at the end of the first row
    measurementStore.reset();
    positionCache.reset();

    multiColumnModuleIndex = 1;
    columnSpan = 4;
    mockItems = [
      ...items.slice(0, multiColumnModuleIndex),
      { ...items[multiColumnModuleIndex], columnSpan },
      ...items.slice(multiColumnModuleIndex + 1),
    ];
    mockItems.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });
    layout(mockItems);
    // Starting on second position until end of first row
    expect(positionCache.get(mockItems[multiColumnModuleIndex])).toEqual({
      height: 201,
      left: 346,
      top: 0,
      width: 1002,
    });
  });

  test('set correct offscreen position when multi column item has to be scaled to fit', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items = [
      { 'name': 'Pin 0', 'height': 200, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 201, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 202, 'color': '#FAB032', columnSpan: 5 },
      { 'name': 'Pin 3', 'height': 203, 'color': '#EDF21D' },
      { 'name': 'Pin 4', 'height': 204, 'color': '#CF4509' },
      { 'name': 'Pin 5', 'height': 205, 'color': '#230BAF' },
    ];

    const layout = (itemsToLayout: Item[]) =>
      multiColumnLayout({
        items: itemsToLayout,
        columnWidth: 240,
        columnCount: 4,
        measurementCache: measurementStore,
        positionCache,
        _getColumnSpanConfig: getColumnSpanConfig,
      });

    const multiColumnModuleIndex = 2;

    // Correct position when two column module is on the start of the batch
    const positions = layout(items);

    expect(positions[multiColumnModuleIndex]?.width).toEqual(1002);
  });

  test('set correct width for multi col item that is scaled to fit', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items = [
      { 'name': 'Pin 0', 'height': 200, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 201, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 202, 'color': '#FAB032' },
      { 'name': 'Pin 3', 'height': 203, 'color': '#EDF21D' },
      { 'name': 'Pin 4', 'height': 204, 'color': '#CF4509' },
      { 'name': 'Pin 5', 'height': 205, 'color': '#230BAF' },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = (itemsToLayout: Item[]) =>
      multiColumnLayout({
        items: itemsToLayout,
        columnWidth: 240,
        columnCount: 4,
        centerOffset: 99,
        measurementCache: measurementStore,
        positionCache,
        _getColumnSpanConfig: getColumnSpanConfig,
      });

    const columnSpan = 5;
    let mockItems: any;
    let multiColumnModuleIndex: any;

    // Correct position when two column module is on the start of the batch
    multiColumnModuleIndex = 0;
    mockItems = [
      ...items.slice(0, multiColumnModuleIndex),
      { ...items[multiColumnModuleIndex], columnSpan },
      ...items.slice(multiColumnModuleIndex + 1),
    ];
    mockItems.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });
    layout(mockItems);
    // First slot
    expect(positionCache.get(mockItems[multiColumnModuleIndex])?.width).toEqual(1002);

    // Correct position when two column module is at the middle of the batch and fits on the row
    measurementStore.reset();
    positionCache.reset();

    multiColumnModuleIndex = 4;
    mockItems = [
      ...items.slice(0, multiColumnModuleIndex),
      { ...items[multiColumnModuleIndex], columnSpan },
      ...items.slice(multiColumnModuleIndex + 1),
    ];
    mockItems.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });
    layout(mockItems);
    // First row third position
    expect(positionCache.get(mockItems[multiColumnModuleIndex])?.width).toEqual(1002);
  });

  test('correctly position multiple multi column items', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items: readonly [Item, Item, Item, Item, Item, ...Item[]] = [
      { 'name': 'Pin 0', 'height': 200, 'color': '#E230BA' },
      { 'name': 'Pin 1', 'height': 201, 'color': '#F67076' },
      { 'name': 'Pin 2', 'height': 202, 'color': '#FAB032', columnSpan: 2 },
      { 'name': 'Pin 3', 'height': 203, 'color': '#EDF21D' },
      { 'name': 'Pin 4', 'height': 204, 'color': '#CF4509', columnSpan: 2 },
      { 'name': 'Pin 5', 'height': 205, 'color': '#230BAF' },
      { 'name': 'Pin 6', 'height': 300, 'color': '#AB032E' },
      { 'name': 'Pin 7', 'height': 310, 'color': '#DF21DC' },
      { 'name': 'Pin 8', 'height': 280, 'color': '#F45098' },
      { 'name': 'Pin 9', 'height': 170, 'color': '#F67076' },
      { 'name': 'Pin 10', 'height': 220, 'color': '#67076F' },
      { 'name': 'Pin 11', 'height': 280, 'color': '#AB032E' },
      { 'name': 'Pin 12', 'height': 150, 'color': '#DF21DC' },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = (itemsToLayout: readonly Item[]) =>
      multiColumnLayout({
        items: itemsToLayout,
        columnWidth: 240,
        columnCount: 5,
        centerOffset: 92,
        measurementCache: measurementStore,
        positionCache,
        _getColumnSpanConfig: getColumnSpanConfig,
      });

    const positions = layout(items);
    expect(positions.length).toEqual(13);

    // Confirm that the second multi column item had the correct width
    expect(positionCache.get(items[4])).toEqual({
      height: 204,
      left: 600,
      top: 216,
      width: 494,
    });
  });

  test.each([
    [5, 2],
    [4, 3],
    [3, 4],
  ])(
    'fills in remaining columns in the first row when multi column item cannot fit',
    (multiColumnModuleIndex: any, columnSpan: any) => {
      const measurementStore = new MeasurementStore<Record<any, any>, number>();
      const positionCache = new MeasurementStore<Record<any, any>, Position>();
      const items = [
        { name: 'Pin 0', height: 250, color: '#E230BA' },
        { name: 'Pin 1', height: 202, color: '#FAB032' },
        { name: 'Pin 2', height: 210, color: '#EDF21D' },
        { name: 'Pin 3', height: 300, color: '#CF4509' },
        { name: 'Pin 4', height: 150, color: '#230BAF' },
        { name: 'Pin 5', height: 500, color: '#67076F' },
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

      const mockItems = [
        ...items.slice(0, multiColumnModuleIndex),
        { ...items[multiColumnModuleIndex]!, columnSpan },
        ...items.slice(multiColumnModuleIndex + 1),
      ];
      mockItems.forEach((item: any) => {
        measurementStore.set(item, item.height);
      });

      const columnWidth = 240;
      const screenWidth = 1500;

      const layout = (itemsToLayout: Item[]) =>
        multiColumnLayout({
          items: itemsToLayout,
          gutter: 0,
          columnWidth: 240,
          columnCount: 6,
          centerOffset: 30,
          measurementCache: measurementStore,
          positionCache,
          _getColumnSpanConfig: getColumnSpanConfig,
        });

      // perform single column layout first since we expect two column items on second page+ currently
      layout(mockItems);

      // there should be 6 rows (1500 / 240)
      // the first row items should be Pin 0, Pin 1, Pin 2, Pin 3, Pin 4, Pin 6
      const columnCount = Math.floor(screenWidth / columnWidth);
      const firstRowItems = mockItems.filter((i: any) => !i.columnSpan).slice(0, columnCount);
      // const margin = (screenWidth - columnWidth * columnCount) / 2;
      const margin = 30;
      firstRowItems.forEach((item: any, i: any) => {
        const position = positionCache.get(item);
        expect(position?.top).toBe(0);
        expect(position?.left).toBe(i * columnWidth + margin);
      });
    },
  );

  test.each([
    [2, 2],
    [1, 3],
  ])(
    'fills in remaining columns in the first row when multi column item cannot fit on small batch',
    (multiColumnModuleIndex: any, columnSpan: any) => {
      const measurementStore = new MeasurementStore<Record<any, any>, number>();
      const positionCache = new MeasurementStore<Record<any, any>, Position>();
      const items = [
        { name: 'Pin 0', height: 250, color: '#E230BA' },
        { name: 'Pin 1', height: 202, color: '#FAB032' },
        { name: 'Pin 2', height: 210, color: '#EDF21D' },
        { name: 'Pin 3', height: 300, color: '#CF4509' },
        { name: 'Pin 4', height: 150, color: '#230BAF' },
        { name: 'Pin 5', height: 500, color: '#67076F' },
      ];

      const mockItems = [
        ...items.slice(0, multiColumnModuleIndex),
        { ...items[multiColumnModuleIndex]!, columnSpan },
        ...items.slice(multiColumnModuleIndex + 1),
      ];
      mockItems.forEach((item: any) => {
        measurementStore.set(item, item.height);
      });

      const columnWidth = 240;
      const screenWidth = 720;

      const layout = (itemsToLayout: Item[]) =>
        multiColumnLayout({
          items: itemsToLayout,
          gutter: 0,
          columnWidth: 240,
          columnCount: 3,
          centerOffset: 0,
          measurementCache: measurementStore,
          positionCache,
          _getColumnSpanConfig: getColumnSpanConfig,
        });

      layout(mockItems);

      // there should be 3 rows (720 / 240)
      // the first row items should be Pin 0, Pin 1, Pin 2
      const columnCount = Math.floor(screenWidth / columnWidth);
      const firstRowItems = mockItems.filter((i: any) => !i.columnSpan).slice(0, columnCount);
      const margin = (screenWidth - columnWidth * columnCount) / 2;
      firstRowItems.forEach((item: any, i: any) => {
        const position = positionCache.get(item);
        expect(position?.top).toBe(0);
        expect(position?.left).toBe(i * columnWidth + margin);
      });
    },
  );

  test.each([
    // This will be on top row so we expect 0 whitespace
    [1, 2, [0, 0]],
    // This will be on second row first column
    [5, 3, [0, 5, 5]],
    // This will be on second row first column
    [5, 4, [35, 40, 40, 0]],
  ])(
    'logging function returns whitespace deltas correctly',
    (
      multiColumnModuleIndex: number,
      columnSpan: number,
      expectedWhitespace: ReadonlyArray<number>,
    ) => {
      const measurementStore = new MeasurementStore<Record<any, any>, number>();
      const positionCache = new MeasurementStore<Record<any, any>, Position>();
      const items = [
        { name: 'Pin 0', height: 105, color: '#E230BA' },
        { name: 'Pin 1', height: 100, color: '#FAB032' },
        { name: 'Pin 2', height: 100, color: '#EDF21D' },
        { name: 'Pin 3', height: 140, color: '#CF4509' },
        { name: 'Pin 4', height: 180, color: '#230BAF' },
        { name: 'Pin 5', height: 100, color: '#67076F' },
        { name: 'Pin 6', height: 100, color: '#AB032E' },
        { name: 'Pin 7', height: 100, color: '#DF21DC' },
        { name: 'Pin 8', height: 100, color: '#F45098' },
        { name: 'Pin 9', height: 100, color: '#F67076' },
      ];

      const mockItems = [
        ...items.slice(0, multiColumnModuleIndex),
        { ...items[multiColumnModuleIndex]!, columnSpan },
        ...items.slice(multiColumnModuleIndex + 1),
      ];
      mockItems.forEach((item: any) => {
        measurementStore.set(item, item.height);
      });

      const logWhitespace = jest.fn();

      const layout = (itemsToLayout: Item[]) =>
        multiColumnLayout({
          items: itemsToLayout,
          gutter: 0,
          columnWidth: 240,
          columnCount: 5,
          centerOffset: 0,
          measurementCache: measurementStore,
          positionCache,
          _getColumnSpanConfig: getColumnSpanConfig,
          logWhitespace,
        });

      layout(mockItems);

      expect(logWhitespace.mock.calls).toHaveLength(1);
      expect(logWhitespace.mock.calls[0][0]).toHaveLength(columnSpan);
      expect(logWhitespace.mock.calls[0][0]).toStrictEqual(expectedWhitespace);
    },
  );
});

describe('responsive module layout test cases', () => {
  test('sets the correct column width for fixed column span', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items: readonly [Item, Item, Item, Item, Item, Item, Item, Item, Item, Item, Item] = [
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
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = (columnCount: number) =>
      multiColumnLayout({
        items,
        columnWidth: 240,
        columnCount,
        gutter: 0,
        measurementCache: measurementStore,
        positionCache,
        _getColumnSpanConfig: (item: Item) => (item.name === 'Pin 10' ? 2 : 1),
      });

    const columnCounts = [2, 3, 4, 5, 6, 7, 8, 9, 10];

    columnCounts.forEach((columnCount) => {
      layout(columnCount);
      expect(positionCache.get(items[10])?.width).toEqual(480);
      positionCache.reset();
    });
  });
  test('sets the correct column width for responsive column span', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items: readonly [Item, Item, Item, Item, Item, Item, Item, Item, Item, Item, Item] = [
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
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    const layout = (columnCount: number) =>
      multiColumnLayout({
        items,
        columnWidth: 240,
        columnCount,
        gutter: 0,
        measurementCache: measurementStore,
        positionCache,
        _getColumnSpanConfig: (item: Item) =>
          item.name === 'Pin 10'
            ? {
                sm: 2,
                md: 3,
                lg: 5,
                xl: 9,
              }
            : 1,
      });

    const breakpoints = [2, 3, 4, 5, 6, 7, 8, 9, 10].map((columnCount) => ({
      columnCount,
      // eslint-disable-next-line no-nested-ternary
      expectedColumnSpan: columnCount < 3 ? 2 : columnCount < 5 ? 3 : columnCount < 9 ? 5 : 9,
    }));

    breakpoints.forEach(({ columnCount, expectedColumnSpan }) => {
      layout(columnCount);
      expect(positionCache.get(items[10])?.width).toEqual(240 * expectedColumnSpan);
      positionCache.reset();
    });
  });
});

describe('initializeHeightsArray', () => {
  test('correctly determines column heights before laying out new items (default layout)', () => {
    const gutter = 16;
    const columnWidth = 236;
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items: Array<Item> = [
      { name: 'Pin 0', height: 476 },
      { name: 'Pin 1', height: 381 },
      { name: 'Pin 2', height: 274 },
      { name: 'Pin 3', height: 303 },
      { name: 'Pin 4', height: 475 },
      { name: 'Pin 5', height: 496 },
      { name: 'Pin 6', height: 177 },
      { name: 'Pin 7', height: 440 },
      { name: 'Pin 8', height: 497 },
      { name: 'Pin 9', height: 430 },
      { name: 'Pin 10', height: 409 },
      { name: 'Pin 11', height: 452 },
      { name: 'Pin 12', height: 458 },
      { name: 'Pin 13', height: 510 },
      { name: 'Pin 14', height: 336 },
      { name: 'Pin 15', height: 293 },
      { name: 'Pin 16', height: 416 },
      { name: 'Pin 17', height: 92 },
      { name: 'Pin 18', height: 475 },
      { name: 'Pin 19', height: 457 },
      { name: 'Pin 20', height: 300 },
      { name: 'Pin 21', height: 322 },
      { name: 'Pin 22', height: 417 },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });
    const layout = (itemsToLayout: Item[]) =>
      multiColumnLayout({
        items: itemsToLayout,
        gutter,
        columnWidth,
        columnCount: 9,
        centerOffset: 1,
        measurementCache: measurementStore,
        positionCache,
        _getColumnSpanConfig: getColumnSpanConfig,
      });
    const positions = layout(items);
    expect(positions).toEqual([
      { height: 476, left: 1, top: 0, width: 236 },
      { height: 381, left: 253, top: 0, width: 236 },
      { height: 274, left: 505, top: 0, width: 236 },
      { height: 303, left: 757, top: 0, width: 236 },
      { height: 475, left: 1009, top: 0, width: 236 },
      { height: 496, left: 1261, top: 0, width: 236 },
      { height: 177, left: 1513, top: 0, width: 236 },
      { height: 440, left: 1765, top: 0, width: 236 },
      { height: 497, left: 2017, top: 0, width: 236 },
      { height: 430, left: 1513, top: 193, width: 236 },
      { height: 409, left: 505, top: 290, width: 236 },
      { height: 452, left: 757, top: 319, width: 236 },
      { height: 458, left: 253, top: 397, width: 236 },
      { height: 510, left: 1765, top: 456, width: 236 },
      { height: 336, left: 1009, top: 491, width: 236 },
      { height: 293, left: 1, top: 492, width: 236 },
      { height: 416, left: 1261, top: 512, width: 236 },
      { height: 92, left: 2017, top: 513, width: 236 },
      { height: 475, left: 2017, top: 621, width: 236 },
      { height: 457, left: 1513, top: 639, width: 236 },
      { height: 300, left: 505, top: 715, width: 236 },
      { height: 322, left: 757, top: 787, width: 236 },
      { height: 417, left: 1, top: 801, width: 236 },
    ]);

    const heights = initializeHeightsArray({
      centerOffset: 1,
      columnCount: 9,
      columnWidthAndGutter: columnWidth + gutter,
      gutter,
      items,
      positionCache,
      _getColumnSpanConfig: getColumnSpanConfig,
    });

    expect(heights.length).toEqual(9);
    expect(heights).toEqual([1234, 871, 1031, 1125, 843, 944, 1112, 982, 1112]);
  });

  test('correctly determines column heights before laying out new items (multi column layout)', () => {
    const gutter = 16;
    const columnWidth = 236;
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items = [
      { name: 'Pin 0', height: 476 },
      { name: 'Pin 1', height: 381 },
      { name: 'Pin 2', height: 274 },
      { name: 'Pin 3', height: 303 },
      { name: 'Pin 4', height: 475 },
      { name: 'Pin 5', height: 496 },
      { name: 'Pin 6', height: 177 },
      { name: 'Pin 7', height: 440 },
      { name: 'Pin 8', height: 497 },
      { name: 'Pin 9', height: 430 },
      { name: 'Pin 10', height: 409 },
      { name: 'Pin 11', height: 452 },
      { name: 'Pin 12', height: 458 },
      { name: 'Pin 13', height: 510 },
      { name: 'Pin 14', height: 336 },
      { name: 'Pin 15', height: 293, columnSpan: 2 },
      { name: 'Pin 16', height: 416 },
      { name: 'Pin 17', height: 92 },
      { name: 'Pin 18', height: 475 },
      { name: 'Pin 19', height: 457 },
      { name: 'Pin 20', height: 300 },
      { name: 'Pin 21', height: 322 },
      { name: 'Pin 22', height: 417 },
    ];
    items.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });
    const layout = (itemsToLayout: Item[]) =>
      multiColumnLayout({
        items: itemsToLayout,
        gutter,
        columnWidth,
        columnCount: 9,
        centerOffset: 1,
        measurementCache: measurementStore,
        positionCache,
        _getColumnSpanConfig: getColumnSpanConfig,
      });
    const positions = layout(items);
    expect(positions).toEqual([
      { top: 492, left: 1, width: 236, height: 416 },
      { top: 512, left: 1261, width: 236, height: 92 },
      { top: 513, left: 2017, width: 236, height: 300 },
      { top: 620, left: 1261, width: 236, height: 475 },
      { top: 639, left: 1513, width: 236, height: 457 },
      { top: 1112, left: 1261, width: 488, height: 293 },
      { top: 0, left: 1, width: 236, height: 476 },
      { top: 0, left: 253, width: 236, height: 381 },
      { top: 0, left: 505, width: 236, height: 274 },
      { top: 0, left: 757, width: 236, height: 303 },
      { top: 0, left: 1009, width: 236, height: 475 },
      { top: 0, left: 1261, width: 236, height: 496 },
      { top: 0, left: 1513, width: 236, height: 177 },
      { top: 0, left: 1765, width: 236, height: 440 },
      { top: 0, left: 2017, width: 236, height: 497 },
      { top: 193, left: 1513, width: 236, height: 430 },
      { top: 290, left: 505, width: 236, height: 409 },
      { top: 319, left: 757, width: 236, height: 452 },
      { top: 397, left: 253, width: 236, height: 458 },
      { top: 456, left: 1765, width: 236, height: 510 },
      { top: 491, left: 1009, width: 236, height: 336 },
      { top: 715, left: 505, width: 236, height: 322 },
      { top: 787, left: 757, width: 236, height: 417 },
    ]);

    const heights = initializeHeightsArray({
      centerOffset: 1,
      columnCount: 9,
      columnWidthAndGutter: columnWidth + gutter,
      gutter,
      items,
      positionCache,
      _getColumnSpanConfig: getColumnSpanConfig,
    });

    expect(heights.length).toEqual(9);
    expect(heights).toEqual([924, 871, 1053, 1220, 843, 1421, 1421, 982, 829]);

    const additionalItems = [
      { name: 'Pin 23', height: 428 },
      { name: 'Pin 24', height: 340 },
      { name: 'Pin 25', height: 458 },
      { name: 'Pin 26', height: 475 },
      { name: 'Pin 27', height: 303 },
      { name: 'Pin 28', height: 519 },
      { name: 'Pin 29', height: 440 },
      { name: 'Pin 30', height: 391 },
      { name: 'Pin 31', height: 475 },
      { name: 'Pin 32', height: 458 },
      { name: 'Pin 33', height: 292 },
      { name: 'Pin 34', height: 215 },
      { name: 'Pin 35', height: 400 },
      { name: 'Pin 36', height: 153 },
    ];
    additionalItems.forEach((item: any) => {
      measurementStore.set(item, item.height);
    });

    layout(items.concat(additionalItems));

    const newPositions = additionalItems.map((item: any) => positionCache.get(item));

    const newPositionsByColumns = newPositions
      .reduce<Array<any>>((acc: any, position: any) => {
        const column = Math.floor((position?.left ?? 0) / (columnWidth + gutter));
        if (!acc[column]) {
          acc[column] = [];
        }
        acc[column].push(position);
        return acc;
      }, [])
      .map((column: any) => column.sort((a: any, b: any) => (a?.top ?? 0) - (b?.top ?? 0)));

    // initializeHeights is run for each layout so this helps validate that running initializeHeights against the new set of items
    // yields the correct positions based on the heights we validated above.
    const newTops = newPositionsByColumns.map((column: any) => column[0].top);
    expect(newTops).toEqual(heights);
  });
});
