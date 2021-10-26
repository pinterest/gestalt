import type { Cache } from "./Cache";
export default class MeasurementStore<T extends {} | ReadonlyArray<unknown>, V>
  implements Cache<T, V> {
  map: WeakMap<T, V> = new WeakMap();

  get(key: T): V | null | undefined {
    return this.map.get(key);
  }

  has(key: T): boolean {
    return this.map.has(key);
  }

  set(key: T, value: V): void {
    this.map.set(key, value);
  }

  reset(): void {
    this.map = new WeakMap();
  }
}