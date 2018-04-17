/**
 * Measuring scroll positions, element heights, etc is different between
 * different browsers and the window object vs other DOM nodes. These
 * utils abstract away these differences.
 */

// @flow
export function getElementHeight(element: HTMLElement): number {
  return element === window ? window.innerHeight : element.clientHeight;
}

export function getWindowScrollPos() {
  if (window.scrollY !== undefined) {
    // Modern browser
    return window.scrollY;
  } else if (
    document.documentElement &&
    document.documentElement.scrollTop !== undefined
  ) {
    // IE support.
    return document.documentElement.scrollTop;
  }
  return 0;
}

export function getRelativeScrollTop(element: HTMLElement): number {
  return element === window
    ? getWindowScrollPos()
    : element.scrollTop - element.getBoundingClientRect().top;
}

export function getScrollHeight(element: HTMLElement): number {
  return element === window && document.documentElement
    ? document.documentElement.scrollHeight
    : element.scrollHeight;
}

export function getScrollPos(element: HTMLElement): number {
  return element === window ? getWindowScrollPos() : element.scrollTop;
}
