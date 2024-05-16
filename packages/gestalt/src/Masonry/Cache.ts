export interface Cache<K, V> {
  get(key: K): V | null | undefined;
  has(key: K): boolean;
  set(key: K, value: V): void;
  reset(): void;
}
