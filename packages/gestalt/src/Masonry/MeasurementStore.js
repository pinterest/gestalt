// @flow
type DimensionType = {
  columnCount: number,
  itemWidth: number,
};

type ItemMeasurementType = {
  height: number,
};

export type ItemPositionInputType = {
  bottom?: number,
  column?: number,
  left?: number,
  top?: number,
  row?: number,
};

export type ItemPositionType = {
  bottom: number,
  column: number,
  left: number,
  top: number,
  row: number,
};

export default class MeasurementStore<T> {
  itemMeasurementMap: WeakMap<T, ItemMeasurementType> = new WeakMap();
  itemPositionMap: WeakMap<T, ItemPositionType> = new WeakMap();

  columnHeights: Array<number> = [];
  gridItemMap: Array<Array<T>> = [[]];

  columnCount: number = 0;
  itemWidth = 0;

  getColumnHeight(column: number): number {
    return this.columnHeights[column] || 0;
  }

  getGridCell(column: number, row: number): T | null {
    return column < this.gridItemMap.length &&
      row < this.gridItemMap[column].length
      ? this.gridItemMap[column][row]
      : null;
  }

  get itemCount(): number {
    return this.gridItemMap.reduce((sum, column) => sum + column.length, 0);
  }

  getItemMeasurement(itemKey: T): ItemMeasurementType | null {
    return this.itemMeasurementMap.get(itemKey) || null;
  }

  getItemPosition(itemKey: T): ItemPositionType | null {
    return this.itemPositionMap.get(itemKey) || null;
  }

  get shortestColumn(): number {
    return this.columnHeights.reduce(
      (minIndex, value, idx) =>
        this.columnHeights[minIndex] <= value ? minIndex : idx,
      0
    );
  }

  get tallestColumn(): number {
    return this.columnHeights.reduce(
      (minIndex, value, idx) =>
        this.columnHeights[minIndex] >= value ? minIndex : idx,
      0
    );
  }

  hasItemMeasurement(itemKey: T): boolean {
    return this.itemMeasurementMap.has(itemKey);
  }

  hasItemPosition(itemKey: T): boolean {
    return this.itemPositionMap.has(itemKey);
  }

  isEmpty(): boolean {
    return !this.columnHeights.length && !this.gridItemMap[0].length;
  }

  setItemMeasurement(itemKey: T, itemMeasurement: ItemMeasurementType): void {
    const currentItemMeasurement = this.itemMeasurementMap.get(itemKey) || {};
    const newItemMeasurement = {
      ...currentItemMeasurement,
      ...itemMeasurement,
    };
    this.itemMeasurementMap.set(itemKey, newItemMeasurement);
  }

  updateColumnHeight(column?: number): void {
    if (typeof column === 'undefined') {
      return;
    }
    const currentColumnHeight = this.getColumnHeight(column);
    const columnHeight = this.gridItemMap[column].reduce(
      (maxBottom, itemKey) => {
        const { bottom = 0 } = this.getItemPosition(itemKey) || {};
        return Math.max(maxBottom, bottom);
      },
      0
    );

    if (columnHeight === currentColumnHeight) {
      return;
    }
    this.columnHeights[column] = columnHeight;
  }

  setItemPosition(itemKey: T, itemPosition: ItemPositionInputType): void {
    const currentItemPosition = this.itemPositionMap.get(itemKey) || {};
    const newItemPosition = {
      ...currentItemPosition,
      ...itemPosition,
    };
    const { column } = newItemPosition;
    // row wasn't passed in - add to end of column
    if (
      typeof newItemPosition.row === 'undefined' &&
      typeof column !== 'undefined'
    ) {
      if (!this.gridItemMap[column]) {
        this.gridItemMap[column] = [];
      }
      this.gridItemMap[column].push(itemKey);
      newItemPosition.row = this.gridItemMap[column].length - 1;
    }

    // insert in a specific row
    if (
      typeof itemPosition.row !== 'undefined' &&
      itemPosition.row !== currentItemPosition.row
    ) {
      const { row } = newItemPosition;
      // update other items in column
      const offset = newItemPosition.bottom - newItemPosition.top;

      this.gridItemMap[column].forEach((gridItemKey, rowIdx) => {
        const currentPosition = this.getItemPosition(gridItemKey);
        if (rowIdx < row || !currentPosition) {
          return;
        }
        const newPosition = {
          top: currentPosition.top + offset,
          bottom: currentPosition.bottom + offset,
          row: currentPosition.row + 1,
        };
        this.itemPositionMap.set(gridItemKey, {
          ...currentPosition,
          ...newPosition,
        });
      });
      // splice if we're adding an item
      if (!this.itemPositionMap.has(itemKey)) {
        this.gridItemMap[column].splice(row, 0, itemKey);
      }
    }
    this.itemPositionMap.set(itemKey, newItemPosition);
    this.updateColumnHeight(newItemPosition.column);
  }

  resetItemMeasurements(): void {
    this.itemMeasurementMap = new WeakMap();
  }

  resetItemPositions(): void {
    this.columnHeights = Array.from(new Array(this.columnCount)).fill(0);
    this.gridItemMap = [[]];
    this.itemPositionMap = new WeakMap();
  }

  setDimensions({
    columnCount: newColumnCount,
    itemWidth: newItemWidth,
  }: DimensionType): void {
    const { columnCount, itemWidth } = this;
    if (newColumnCount === columnCount && newItemWidth === itemWidth) {
      return;
    }
    // reset all the things - except measurements
    this.columnCount = newColumnCount;
    this.resetItemPositions();

    if (itemWidth !== newItemWidth) {
      // reset measurements if item width changes
      this.resetItemMeasurements();
      this.itemWidth = newItemWidth;
    }
  }
}
