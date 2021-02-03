// @flow strict
import type {
  CaretDir,
  CaretOffset,
  ClientRect,
  Coordinates,
  Dimensions,
  EdgeShift,
  FlyoutDir,
  MainDirections,
  Window,
  Offset,
} from './positioningTypes.js';

// CONSTANTS
export const CARET_HEIGHT = 4;
export const BORDER_RADIUS = 8;
export const CARET_WIDTH = 12;
const MARGIN = 24;
const CARET_OFFSET_FROM_SIDE = 24;

const SPACES_INDEX_MAP = {
  '0': 'up',
  '1': 'right',
  '2': 'down',
  '3': 'left',
};

const DIR_INDEX_MAP = {
  up: 0,
  right: 1,
  down: 2,
  left: 3,
};

export const getContainerNode = ({
  scrollableContainerRef,
  initialPositionRef,
}: {|
  scrollableContainerRef: ?HTMLDivElement,
  initialPositionRef: ?HTMLElement,
|}): ?HTMLDivElement => {
  // containerNode references the ScrollableContainer node to which
  // append the portal
  let containerNode = null;
  // currentNode references the DOM node used while traversing up nodes in the DOM tree
  let currentNode = initialPositionRef;

  while (!containerNode) {
    // To find ScrollableContainer parents, currentNode is traversed up accessing its parent node
    // until matching with the ScrollableContainer ref passed via context
    // or until reaching the HTML document (loop break)
    if (scrollableContainerRef && currentNode && currentNode.parentNode) {
      if (
        currentNode instanceof HTMLDivElement &&
        scrollableContainerRef?.isSameNode(currentNode)
      ) {
        containerNode = scrollableContainerRef;
      }
      currentNode = currentNode.parentNode;
    } else {
      break;
    }
  }
  return containerNode;
};

/**
 * Controller
 */
export const getTriggerRect = ({
  anchor,
  positionRelativeToAnchor,
  scrollableContainerRef,
}: {|
  anchor: HTMLElement,
  positionRelativeToAnchor: boolean,
  scrollableContainerRef: ?HTMLDivElement,
|}): * => {
  let triggerBoundingRect;
  let relativeOffset;

  if (!anchor) {
    return { relativeOffset, triggerBoundingRect };
  }

  const containerNode = getContainerNode({ scrollableContainerRef, initialPositionRef: anchor });

  const boundingAnchorRect = anchor.getBoundingClientRect();
  // triggerBoundingRect is passed to Contents.js where this data will be used for positioning
  triggerBoundingRect = {
    bottom: boundingAnchorRect.bottom,
    left: boundingAnchorRect.left,
    right: boundingAnchorRect.right,
    top: boundingAnchorRect.top,
    height: boundingAnchorRect.height,
    width: boundingAnchorRect.width,
  };

  if (containerNode) {
    // If there's a parent ScrollableContainer, ScrollableContainer's top/left
    // coordinates are the new reference (rather than the browser's window top and left edges)
    // and triggerBoundingRect must be corrected
    const boundingContainerRect = containerNode.getBoundingClientRect();
    // The differencial from trigger bottom/right to container top/left
    triggerBoundingRect.bottom = boundingAnchorRect.bottom - boundingContainerRect.top;
    triggerBoundingRect.right = boundingAnchorRect.right - boundingContainerRect.left;
    // The differencial from trigger top/left to container top/left
    triggerBoundingRect.top = boundingAnchorRect.top - boundingContainerRect.top;
    triggerBoundingRect.left = boundingAnchorRect.left - boundingContainerRect.left;
  }
  // relativeOffset is used for correct positioning within Contents.js
  relativeOffset = {
    x: positionRelativeToAnchor ? triggerBoundingRect.left - anchor.offsetLeft : 0,
    y: positionRelativeToAnchor ? triggerBoundingRect.top - anchor.offsetTop : 0,
  };

  return { relativeOffset, triggerBoundingRect };
};

/**
 * Determines the main direction the flyout opens
 */
export function getFlyoutDir({
  flyoutSize,
  idealDirection,
  triggerRect,
  windowSize,
  isScrollableContainer,
}: {|
  flyoutSize: Dimensions,
  idealDirection: FlyoutDir,
  triggerRect: ClientRect,
  windowSize: Window,
  isScrollableContainer?: boolean,
|}): MainDirections {
  // Calculates the available space if we were to place the flyout in the 4 main directions
  // to determine which 'quadrant' to position the flyout inside of
  let up = triggerRect.top - flyoutSize.height - CARET_HEIGHT;
  let right = windowSize.width - flyoutSize.width - CARET_HEIGHT - triggerRect.right;
  let down = windowSize.height - flyoutSize.height - CARET_HEIGHT - triggerRect.bottom;
  let left = triggerRect.left - flyoutSize.width - CARET_HEIGHT;

  // TOO CLOSE TO EDGE overrides available space when the trigger is close to the edge of the screen

  // TOP or BOTTOM: trigger is too close to top/bottom of screen for left & right flyouts
  const nonTopEdge = triggerRect.top < BORDER_RADIUS;
  const nonBottomEdge = windowSize.height - triggerRect.bottom < BORDER_RADIUS;
  const nonLeftEdge = triggerRect.left < BORDER_RADIUS;
  const nonRightEdge = windowSize.width - triggerRect.right < BORDER_RADIUS;

  // skipNoEdgeCondition is mostly an edge case within ScrollableContainers because trigger elements are more likely
  // to touch both edges of the parent ScrollableContainers without margins/paddings
  const skipNoEdgeCondition =
    isScrollableContainer && (nonTopEdge || nonBottomEdge) && (nonLeftEdge || nonRightEdge);

  if (!skipNoEdgeCondition && (nonTopEdge || nonBottomEdge)) {
    left = 0;
    right = 0;
  }

  // LEFT or RIGHT: trigger is too close to the left/right of screen for up & down flyouts\
  if (!skipNoEdgeCondition && (nonLeftEdge || nonRightEdge)) {
    up = 0;
    down = 0;
  }
  const spaces = [up, right, down, left];

  // Identify best direction of available spaces
  const max = Math.max(...spaces);
  // Chose the main direction for the flyout based on available spaces & user preference
  let flyoutDir;
  if (idealDirection && spaces[DIR_INDEX_MAP[idealDirection]] > 0) {
    // user pref
    flyoutDir = idealDirection;
  } else {
    // If no direction pref, chose the direction in which there is the most space available
    flyoutDir = SPACES_INDEX_MAP[spaces.indexOf(max)];
  }

  return flyoutDir;
}

/**
 * Determines the sub direction of how the flyout is positioned within the main dir
 */
export function getCaretDir({
  flyoutSize,
  flyoutDir,
  triggerRect,
  windowSize,
}: {|
  flyoutSize: Dimensions,
  flyoutDir: FlyoutDir,
  triggerRect: ClientRect,
  windowSize: Window,
|}): CaretDir {
  // Now that we have the main direction, chose from 3 caret placements for that direction
  let offset;
  let triggerMid;
  let windowSpaceAvailable;

  if (flyoutDir === 'right' || flyoutDir === 'left') {
    offset = flyoutSize.height / 2;
    triggerMid = triggerRect.top + (triggerRect.bottom - triggerRect.top) / 2;
    windowSpaceAvailable = windowSize.height;
  } else {
    // (flyoutDir === 'up' || flyoutDir === 'down')
    offset = flyoutSize.width / 2;
    triggerMid = triggerRect.left + (triggerRect.right - triggerRect.left) / 2;
    windowSpaceAvailable = windowSize.width;
  }

  const aboveOrLeft = triggerMid - offset - MARGIN;
  const belowOrRight = windowSpaceAvailable - triggerMid - offset - MARGIN;
  let caretDir;
  if (aboveOrLeft > 0 && belowOrRight > 0) {
    // caret should go in middle b/c it can
    caretDir = 'middle';
  } else if (belowOrRight > 0) {
    // caret should go at top for left/right and left for up/down
    caretDir = flyoutDir === 'left' || flyoutDir === 'right' ? 'up' : 'left';
  } else {
    // caret should go at bottom for left/right and right for up/down
    caretDir = flyoutDir === 'left' || flyoutDir === 'right' ? 'down' : 'right';
  }
  return caretDir;
}

/**
 * Calculates the amount the flyout & caret need to shift over to align with designs
 */
export function calcEdgeShifts({
  triggerRect,
  windowSize,
  isScrollableContainer,
}: {|
  triggerRect: ClientRect,
  windowSize: Window,
  isScrollableContainer: boolean,
|}): {| caret: Coordinates, flyout: Coordinates |} {
  // Target values for flyout and caret shifts
  let flyoutVerticalShift = CARET_OFFSET_FROM_SIDE - (triggerRect.height - CARET_HEIGHT) / 2;
  let flyoutHorizontalShift = CARET_OFFSET_FROM_SIDE - (triggerRect.width - CARET_HEIGHT) / 2;
  let caretVerticalShift = CARET_WIDTH;
  let caretHorizontalShift = CARET_WIDTH;

  // Covers edge case where trigger is in a corner and we need to adjust the offset of the caret
  // to something smaller than normal in order
  const isCloseVertically =
    triggerRect.top - flyoutVerticalShift < 0 ||
    triggerRect.bottom + flyoutVerticalShift > windowSize.height;
  const isCloseHorizontally =
    triggerRect.left - flyoutHorizontalShift < 0 ||
    triggerRect.right + flyoutHorizontalShift > windowSize.width;

  // If there's a parent ScrollableContainer and trigger is close vertically and/or horizontally,
  // skip the flyout shift adjusments so that the flyout is right in the edge.
  if (isCloseVertically) {
    flyoutVerticalShift = isScrollableContainer
      ? 0
      : BORDER_RADIUS - (triggerRect.height - CARET_HEIGHT) / 2;
    caretVerticalShift = BORDER_RADIUS;
  }

  if (isCloseHorizontally) {
    flyoutHorizontalShift = isScrollableContainer
      ? 0
      : BORDER_RADIUS - (triggerRect.width - CARET_HEIGHT) / 2;
    caretHorizontalShift = BORDER_RADIUS;
  }

  return {
    flyout: {
      x: flyoutHorizontalShift,
      y: flyoutVerticalShift,
    },
    caret: {
      x: caretHorizontalShift,
      y: caretVerticalShift,
    },
  };
}

/**
 * Calculates flyout and caret offsets for styling
 */
export function adjustOffsets({
  base,
  edgeShift,
  flyoutSize,
  flyoutDir,
  caretDir,
  triggerRect,
  isScrollableContainer,
}: {|
  base: {| top: number, left: number |},
  edgeShift: EdgeShift,
  flyoutSize: Dimensions,
  flyoutDir: FlyoutDir,
  caretDir: CaretDir,
  triggerRect: ClientRect,
  isScrollableContainer: boolean,
|}): {|
  caretOffset: CaretOffset,
  flyoutOffset: Offset,
|} {
  let flyoutLeft = base.left;
  let flyoutTop = base.top;

  let caretTop = flyoutDir === 'down' ? -CARET_HEIGHT : null;
  let caretRight = flyoutDir === 'left' ? -CARET_HEIGHT : null;
  let caretBottom = flyoutDir === 'up' ? -CARET_HEIGHT : null;
  let caretLeft = flyoutDir === 'right' ? -CARET_HEIGHT : null;

  // If there's a parent ScrollableContainer and caret direction is up or down,
  // adjust the caret position to correctly match its flyout.
  if (caretDir === 'up') {
    flyoutTop = base.top - edgeShift.flyout.y;
    caretTop = edgeShift.caret.y + (isScrollableContainer ? 6 : 2);
  } else if (caretDir === 'down') {
    flyoutTop = base.top - flyoutSize.height + triggerRect.height + edgeShift.flyout.y;
    caretBottom = edgeShift.caret.y + (isScrollableContainer ? 6 : 2);
  } else if (caretDir === 'left') {
    flyoutLeft = base.left - edgeShift.flyout.x;
    caretLeft = edgeShift.caret.x + 2;
  } else if (caretDir === 'right') {
    flyoutLeft = base.left - flyoutSize.width + triggerRect.width + edgeShift.flyout.x;
    caretRight = edgeShift.caret.x + 2;
  } else if (caretDir === 'middle') {
    if (flyoutDir === 'left' || flyoutDir === 'right') {
      const triggerMid = flyoutTop + triggerRect.height / 2;
      flyoutTop = triggerMid - flyoutSize.height / 2;
      // Vertical positioning of the caret (position along the anchor)
      caretTop = (flyoutSize.height - CARET_WIDTH) / 2;
    }
    if (flyoutDir === 'up' || flyoutDir === 'down') {
      const triggerMid = flyoutLeft + triggerRect.width / 2;
      flyoutLeft = triggerMid - flyoutSize.width / 2;
      // Horizontal positioning of the caret (position along the anchor)
      caretLeft = (flyoutSize.width - CARET_WIDTH) / 2;
    }
  }

  return {
    flyoutOffset: {
      top: flyoutTop,
      left: flyoutLeft,
    },
    caretOffset: {
      top: caretTop,
      right: caretRight,
      bottom: caretBottom,
      left: caretLeft,
    },
  };
}

/* Calculates baseline top and left offset for flyout */
export function baseOffsets({
  hasCaret,
  relativeOffset,
  flyoutSize,
  flyoutDir,
  triggerRect,
  windowSize,
}: {|
  hasCaret: boolean,
  relativeOffset: Coordinates,
  flyoutSize: Dimensions,
  flyoutDir: FlyoutDir,
  triggerRect: ClientRect,
  windowSize: Window,
|}): Offset {
  const SPACING_OUTSIDE = hasCaret ? CARET_HEIGHT : 8;
  // TOP OFFSET
  let top;
  if (flyoutDir === 'down') {
    top = windowSize.scrollY + triggerRect.bottom + SPACING_OUTSIDE;
  } else if (flyoutDir === 'up') {
    top = windowSize.scrollY + (triggerRect.top - flyoutSize.height - SPACING_OUTSIDE);
  } else {
    // left and right
    top = windowSize.scrollY + triggerRect.top;
  }

  // LEFT OFFSET
  let left;
  if (flyoutDir === 'left') {
    left = windowSize.scrollX + (triggerRect.left - flyoutSize.width - SPACING_OUTSIDE);
  } else if (flyoutDir === 'right') {
    left = windowSize.scrollX + triggerRect.right + SPACING_OUTSIDE;
  } else {
    // down and up
    left = windowSize.scrollX + triggerRect.left;
  }

  // Adjusts for the relative parent container
  top -= relativeOffset.y;
  left -= relativeOffset.x;
  return { top, left };
}
