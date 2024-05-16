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
  threshhold: number = 100,
): DebounceReturn {
  let deferTimer: number | null | undefined = null;

  const debounced = (...args: Arguments) => {
    if (deferTimer) {
      clearTimeout(deferTimer);
    }

    // @ts-expect-error - TS2322 - Type 'Timeout' is not assignable to type 'number'.
    deferTimer = setTimeout(() => {
      deferTimer = null;
      fn(...args);
    }, threshhold);
  };

  debounced.clearTimeout = () => {
    if (deferTimer) {
      clearTimeout(deferTimer);
    }
  };

  return debounced;
}
