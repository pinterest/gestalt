import type { Cache } from './Cache';
import './Cache';
export default class MeasurementStore<T extends {} | ReadonlyArray<unknown>, V>
  implements Cache<T, V>
{
  map: WeakMap<T, V>;
  get(key: T): V | null | undefined;
  has(key: T): boolean;
  set(key: T, value: V): void;
  reset(): void;
}
