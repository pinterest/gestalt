// @flow strict

/**
 * debounce prevents a particular function from being called until after a given
 * cooldown period (default 100ms). Every time the function is called, it resets
 * the cooldown.
 */

type Arguments = $ReadOnlyArray<Event | string | number | boolean | null>;
export type DebounceReturn = {|
  (...args: Arguments): void,
  clearTimeout: () => void,
|};

export default function debounce(
  fn: (...args: Arguments) => void,
  threshhold: number = 100,
): DebounceReturn {
  let deferTimer: ?TimeoutID = null;

  const debounced = (...args: Arguments) => {
    if (deferTimer) {
      clearTimeout(deferTimer);
    }

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

  // $FlowFixMe[incompatible-exact]
  return debounced;
}
