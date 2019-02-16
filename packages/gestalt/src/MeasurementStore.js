// @flow
import type { Cache } from './Cache.js';

export type MeasurementStoreType<T> = Cache<T, number>;

export default class MeasurementStore<T> implements Cache<T, number> {
  map: WeakMap<T, number> = new WeakMap();

  get(key: T): ?number {
    return this.map.get(key);
  }

  has(key: T): boolean {
    return this.map.has(key);
  }

  set(key: T, value: number): void {
    this.map.set(key, value);
  }

  reset(): void {
    this.map = new WeakMap();
  }
}
