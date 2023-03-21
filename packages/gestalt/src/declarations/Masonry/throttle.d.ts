/**
 * throttle limits the number of times a function can be called to a
 * given threshhold (100ms by default). The function is always called
 * on the leading and trailing edge.
 */
type Arguments = ReadonlyArray<Event | string | number | boolean | null>;
export type ThrottleReturn = {
  (...args: Arguments): void;
  clearTimeout: () => void;
};
export default function throttle(
  fn: (...args: Arguments) => void,
  threshhold?: number,
): ThrottleReturn;
export {};
