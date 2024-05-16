export function addListener(
  mediaQuery: MediaQueryList,
  callback: (this: MediaQueryList, ev: MediaQueryListEvent) => void,
): void {
  // addEventListener on mediaQuery is not supported in all browsers (Edge / Safari)
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', callback);
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(callback);
  }
}

export function removeListener(
  mediaQuery: MediaQueryList,
  callback: (this: MediaQueryList, ev: MediaQueryListEvent) => void,
): void {
  if (mediaQuery.removeEventListener) {
    mediaQuery.removeEventListener('change', callback);
  } else if (mediaQuery.removeListener) {
    mediaQuery.removeListener(callback);
  }
}
