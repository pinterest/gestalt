// @flow strict

export function addListener(mediaQuery: MediaQueryList, callback: MediaQueryListListener): void {
  // addEventListener on mediaQuery is not supported in all browsers (Edge / Safari)
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener
  if (mediaQuery.addEventListener) {
    // $FlowFixMe[incompatible-call]
    mediaQuery.addEventListener('change', callback);
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(callback);
  }
}

export function removeListener(mediaQuery: MediaQueryList, callback: MediaQueryListListener): void {
  if (mediaQuery.removeEventListener) {
    // $FlowFixMe[incompatible-call]
    mediaQuery.removeEventListener('change', callback);
  } else if (mediaQuery.removeListener) {
    mediaQuery.removeListener(callback);
  }
}
