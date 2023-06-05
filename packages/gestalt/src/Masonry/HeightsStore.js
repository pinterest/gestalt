// @flow strict
export interface HeightsStoreInterface {
  getHeights(): $ReadOnlyArray<number>;
  setHeights(newHeights: $ReadOnlyArray<number>): void;
  reset(): void;
}

export default class HeightsStore implements HeightsStoreInterface {
  heights: $ReadOnlyArray<number> = [];

  getHeights(): $ReadOnlyArray<number> {
    return this.heights;
  }

  setHeights(newHeights: $ReadOnlyArray<number>): void {
    this.heights = newHeights;
  }

  reset(): void {
    this.heights = [];
  }
}
