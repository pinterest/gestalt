// @flow
export default function throttle(fn: () => void, threshhold: number = 100) {
  let last;
  let deferTimer;
  return (...args: any) => {
    const now = Date.now();
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn(...args);
      }, threshhold);
    } else {
      last = now;
      fn(...args);
    }
  };
}
