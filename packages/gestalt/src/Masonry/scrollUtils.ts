/**
 * Measuring scroll positions, element heights, etc is different between
 * different browsers and the window object vs other DOM nodes. These
 * utils abstract away these differences.
 */

export function getElementHeight(element: HTMLElement | Window): number {
  return element instanceof Window ? window.innerHeight : element.clientHeight;
}

export function getWindowScrollPos(): number {
  if (window.scrollY !== undefined) {
    // Modern browser
    return window.scrollY;
  }
  if (document.documentElement && document.documentElement.scrollTop !== undefined) {
    // IE support.
    return document.documentElement.scrollTop;
  }
  return 0;
}

export function getRelativeScrollTop(element: HTMLElement | Window): number {
  return (element === window || element instanceof Window)
    ? getWindowScrollPos()
    : element.scrollTop - element.getBoundingClientRect().top;
}

export function getScrollHeight(element: HTMLElement): number {
  // @ts-expect-error - TS2367 - This condition will always return 'false' since the types 'HTMLElement' and 'Window & typeof globalThis' have no overlap.
  return element === window && document.documentElement
    ? document.documentElement.scrollHeight
    : element.scrollHeight;
}

export function getScrollPos(element: HTMLElement | Window): number {
  return (element === window || element instanceof Window) ? getWindowScrollPos() : element.scrollTop;
}
