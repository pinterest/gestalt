/**
 * debounce prevents a particular function from being called until after a given
 * cooldown period (default 100ms). Every time the function is called, it resets
 * the cooldown.
 */
type Arguments = ReadonlyArray<Event | string | number | boolean | null>;
export type DebounceReturn = {
  (...args: Arguments): void;
  clearTimeout: () => void;
};
export default function debounce(
  fn: (...args: Arguments) => void,
  threshhold?: number,
): DebounceReturn;
export {};
