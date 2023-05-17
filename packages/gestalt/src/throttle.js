// @flow strict

/**
 * throttle limits the number of times a function can be called to a
 * given threshhold (100ms by default). The function is always called
 * on the leading and trailing edge.
 */

type Arguments = $ReadOnlyArray<Event | string | number | boolean | null>;
export type ThrottleReturn = {|
  (...args: Arguments): void,
  clearTimeout: () => void,
|};

export default function throttle(
  fn: (...args: Arguments) => void,
  threshhold: number = 100,
): ThrottleReturn {
  let last: number | void;
  let deferTimer: TimeoutID | void;
  const throttled = (...args: Arguments) => {
    const now = Date.now();
    if (last !== undefined && now - last < threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn(...args);
      }, threshhold - (now - (last ?? 0)));
    } else {
      last = now;
      fn(...args);
    }
  };

  throttled.clearTimeout = () => {
    if (deferTimer) {
      clearTimeout(deferTimer);
    }
  };

  // $FlowFixMe[incompatible-exact]
  return throttled;
}
