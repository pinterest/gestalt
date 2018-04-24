/**
 * debounce prevents a particular function from being called until after a given
 * cooldown period (default 100ms). Every time the function is called, it resets
 * the cooldown.
 */

// @flow
export default function debounce(fn: () => void, threshhold: number = 100) {
  let deferTimer: TimeoutID | null = null;

  const debounced = (...args: any) => {
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

  return debounced;
}
