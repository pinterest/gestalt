import defaultLayout from './defaultLayout';
import MeasurementStore from './MeasurementStore';
import { Position } from './types';

type Item = {
  name: string;
  height: number;
  color?: string;
  columnSpan?: number;
};

const getColumnSpanConfig = (item: Item) => item.columnSpan ?? 1;

describe.each([undefined, getColumnSpanConfig])('default layout tests', (_getColumnSpanConfig) => {
  test('left-aligns grid within the viewport', () => {
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

    const layout = defaultLayout({
      align: 'start',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      minCols: 2,
      rawItemCount: items.length,
      width: 8000,
      _getColumnSpanConfig,
    });
    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 0, width: 236 },
      { top: 0, height: 120, left: 250, width: 236 },
      { top: 0, height: 80, left: 500, width: 236 },
      { top: 0, height: 100, left: 750, width: 236 },
    ]);
  });

  test('centers grid within the viewport, left align', () => {
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

    const layout = defaultLayout({
      align: 'center',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      minCols: 2,
      rawItemCount: items.length,
      width: 8000,
      _getColumnSpanConfig,
    });

    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 7, width: 236 },
      { top: 0, height: 120, left: 257, width: 236 },
      { top: 0, height: 80, left: 507, width: 236 },
      { top: 0, height: 100, left: 757, width: 236 },
    ]);
  });

  test('centers grid within the viewport, center align', () => {
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

    const layout = defaultLayout({
      align: 'center',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basicCentered',
      minCols: 2,
      rawItemCount: items.length,
      width: 8000,
      _getColumnSpanConfig,
    });

    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 3493, width: 236 },
      { top: 0, height: 120, left: 3743, width: 236 },
      { top: 0, height: 80, left: 3993, width: 236 },
      { top: 0, height: 100, left: 4243, width: 236 },
    ]);
  });

  test('right-aligns grid within the viewport', () => {
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

    const layout = defaultLayout({
      align: 'end',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      minCols: 2,
      rawItemCount: items.length,
      width: 8000,
      _getColumnSpanConfig,
    });

    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 14, width: 236 },
      { top: 0, height: 120, left: 264, width: 236 },
      { top: 0, height: 80, left: 514, width: 236 },
      { top: 0, height: 100, left: 764, width: 236 },
    ]);
  });

  test('floors values when centering', () => {
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

    const layout = defaultLayout({
      align: 'start',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      rawItemCount: items.length,
      width: 501,
      _getColumnSpanConfig,
    });

    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 0, width: 236 },
      { top: 0, height: 120, left: 250, width: 236 },
      { top: 114, height: 80, left: 0, width: 236 },
      { top: 134, height: 100, left: 250, width: 236 },
    ]);
  });

  test('only centers when theres extra space', () => {
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

    const layout = defaultLayout({
      align: 'start',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      rawItemCount: items.length,
      width: 200,
      _getColumnSpanConfig,
    });

    expect(layout(items)).toEqual([
      { top: 0, height: 100, left: 0, width: 236 },
      { top: 0, height: 120, left: 250, width: 236 },
      { top: 114, height: 80, left: 0, width: 236 },
      { top: 134, height: 100, left: 250, width: 236 },
    ]);
  });

  test('justify', () => {
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

    const makeLayout = (align: 'center' | 'start') =>
      defaultLayout({
        align,
        measurementCache: measurementStore,
        positionCache,
        columnWidth: 100,
        gutter: 0,
        layout: align === 'center' ? 'basicCentered' : 'basic',
        rawItemCount: items.length,
        width: 1000,
        _getColumnSpanConfig,
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

    const layout = defaultLayout({
      align: 'end',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      minCols: 2,
      rawItemCount: items.length,
      width: 1000,
      _getColumnSpanConfig,
    });

    const positions = layout(items);
    const pin2Position = positions[2];
    const pin3Position = positions[3];

    expect(pin2Position?.height).toBe(0);
    expect(pin2Position?.top).toBe(0);
    expect(pin3Position?.top).toBe(0);
    expect(pin2Position?.left).toBe(pin3Position?.left);
  });
});

describe('loadingStateItems', () => {
  test("uses the loadingStateItem's height", () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const loadingStateItems: ReadonlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100 },
      { 'name': 'Pin 1', 'height': 120 },
      { 'name': 'Pin 2', 'height': 80 },
      { 'name': 'Pin 3', 'height': 100 },
    ];

    const layout = defaultLayout({
      align: 'start',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      minCols: 2,
      rawItemCount: loadingStateItems.length,
      width: 8000,
      renderLoadingState: true,
    });

    expect(layout(loadingStateItems)).toEqual([
      { top: 0, height: 100, left: 0, width: 236 },
      { top: 0, height: 120, left: 250, width: 236 },
      { top: 0, height: 80, left: 500, width: 236 },
      { top: 0, height: 100, left: 750, width: 236 },
    ]);
  });

  test('uses the measurementCache height when not a loadingStateitem', () => {
    const measurementStore = new MeasurementStore<Record<any, any>, number>();
    const positionCache = new MeasurementStore<Record<any, any>, Position>();
    const items: ReadonlyArray<Item> = [
      { 'name': 'Pin 0', 'height': 100 },
      { 'name': 'Pin 1', 'height': 120 },
      { 'name': 'Pin 2', 'height': 80 },
      { 'name': 'Pin 3', 'height': 100 },
    ];
    items.forEach((item: any) => {
      /**
       * Forcing the height to be different here since we always want to get the height from the measurement cache
       * We only want to use the item's height if we are rendering loading state items
       */
      measurementStore.set(item, item.height + 1);
    });

    const layout = defaultLayout({
      align: 'start',
      measurementCache: measurementStore,
      positionCache,
      layout: 'basic',
      minCols: 2,
      rawItemCount: items.length,
      width: 8000,
    });

    expect(layout(items)).toEqual([
      { top: 0, height: 101, left: 0, width: 236 },
      { top: 0, height: 121, left: 250, width: 236 },
      { top: 0, height: 81, left: 500, width: 236 },
      { top: 0, height: 101, left: 750, width: 236 },
    ]);
  });
});
