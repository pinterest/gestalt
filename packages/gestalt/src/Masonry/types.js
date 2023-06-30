// @flow strict
export type Position = {|
  top: number,
  left: number,
  width: number,
  height: number,
|};

export type NodeData<T> = {|
  id: 'start' | T,
  heights: $ReadOnlyArray<number>,
  positions: $ReadOnlyArray<{| item: T, position: Position |}>,
|};

export type ItemAttributes = {|
  position: Position,
  heightAdjustment?: number,
|};

export interface ItemCache<K> {
  get(key: K): ?ItemAttributes;
  getAttribute(key: K, attribute: string): $Values<ItemAttributes>;
  has(key: K): boolean;
  hasAttribute(key: K, attribute: string): boolean;
  set(key: K, value: ItemAttributes): void;
  setAttribute(key: K, attribute: string, attributeValue: $Values<ItemAttributes>): void;
  reset(): void;
}
