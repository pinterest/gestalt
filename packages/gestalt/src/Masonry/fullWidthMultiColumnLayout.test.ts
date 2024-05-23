// import defaultMultiColumnLayout from './multiColumnLayout';
import fullWidthLayout from './fullWidthMultiColumnLayout';
import MeasurementStore from './MeasurementStore';
import { Position } from './types';

type Item = {
  name: string;
  height: number;
  color?: string;
};

test('sets correct width and center offset when positioning', () => {
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

  const layout = fullWidthLayout({
    measurementCache: measurementStore,
    positionCache,
    gutter: 10,
    idealColumnWidth: 240,
    minCols: 2,
    width: 1000,
  });
  expect(layout(items)).toEqual([
    { top: 0, height: 100, left: 5, width: 240 },
    { top: 0, height: 120, left: 255, width: 240 },
    { top: 0, height: 80, left: 505, width: 240 },
    { top: 0, height: 100, left: 755, width: 240 },
  ]);
});
