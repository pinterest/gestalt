/**
 * debounce prevents a particular function from being called until after a given
 * cooldown period (default 100ms). Every time the function is called, it resets
 * the cooldown.
 */

// @flow strict
export default function debounce(
  // $FlowFixMe[unclear-type]
  fn: (...args: *) => void,
  threshhold: number = 100,
  // $FlowFixMe[signature-verification-failure]
) {
  let deferTimer: TimeoutID | null = null;

  // $FlowFixMe[unclear-type]
  const debounced = (...args: *) => {
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
