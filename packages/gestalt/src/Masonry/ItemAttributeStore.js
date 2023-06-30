// @flow strict
import { type ItemAttributes, type ItemCache } from './types.js';

export default class MeasurementStore<T: { ... } | $ReadOnlyArray<mixed>> implements ItemCache<T> {
  map: WeakMap<T, ItemAttributes> = new WeakMap();

  get(key: T): ?ItemAttributes {
    return this.map.get(key);
  }

  getAttribute(key: T, attribute: string): $Values<ItemAttributes> {
    const value = this.map.get(key);
    return value ? value[attribute] : undefined;
  }

  has(key: T): boolean {
    return this.map.has(key);
  }

  hasAttribute(key: T, attribute: string): boolean {
    const value = this.map.get(key);
    return value ? Boolean(value[attribute]) : false;
  }

  set(key: T, value: ItemAttributes): void {
    this.map.set(key, value);
  }

  setAttribute(key: T, attribute: string, attributeValue: $Values<ItemAttributes>): void {
    const value = this.map.get(key);
    const newValue = { ...value };
    // $FlowFixMe[prop-missing]
    newValue[attribute] = attributeValue;
    // $FlowFixMe[prop-missing]
    this.map.set(key, newValue);
  }

  reset(): void {
    this.map = new WeakMap();
  }
}
