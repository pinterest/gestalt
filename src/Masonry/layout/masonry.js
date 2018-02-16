// @flow

import MeasurementStore from '../MeasurementStore';

/**
 * Masonry layout is the classic Masonry layout, placing
 * items into the lowest available Y position within the grid.
 */
export default class MasonryLayout<T> {
  constructor({
    measurementStore,
    gutterWidth,
  }: {
    measurementStore: MeasurementStore<T>,
    gutterWidth: number,
  }) {
    this.measurementStore = measurementStore;
    this.gutterWidth = gutterWidth;
  }

  gutterWidth: number;
  measurementStore: MeasurementStore<T>;

  calculatePosition(itemData: *, itemHeight: number) {
    const { measurementStore } = this;

    const column = measurementStore.shortestColumn;
    const top = measurementStore.getColumnHeight(column);
    const left = column * measurementStore.itemWidth;
    const bottom = top + itemHeight + this.gutterWidth;

    return { column, bottom, left, top };
  }
}
