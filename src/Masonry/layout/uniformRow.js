// @flow

import MeasurementStore from '../MeasurementStore';

/**
 * This layout allows for creating uniform rows of items,
 * using the tallest item as a minimum height for all rows.
 */
export default class UniformRowLayout<T> {
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

  calculatePosition(itemData: *, itemHeight: number, slotIdx: number) {
    const { measurementStore } = this;

    const column = slotIdx % measurementStore.columnCount;
    let top;
    if (column === 0) {
      // when a new row gets added we get the height of the previous row which is the same as the tallest column
      top = measurementStore.getColumnHeight(measurementStore.tallestColumn);
    } else {
      // we copy the top of the item to the left
      const prevColumn = column - 1;
      const row = Math.floor(slotIdx / measurementStore.columnCount);

      const leftItem = measurementStore.getGridCell(prevColumn, row);
      const leftItemPosition =
        leftItem !== null ? measurementStore.getItemPosition(leftItem) : null;
      top = (leftItemPosition && leftItemPosition.top) || 0;
    }

    const left = column * measurementStore.itemWidth;
    const bottom = top + itemHeight + this.gutterWidth;
    return { column, bottom, left, top };
  }
}
