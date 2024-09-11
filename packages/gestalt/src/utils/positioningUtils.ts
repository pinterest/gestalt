import {
  CaretDir,
  CaretOffset,
  ClientRect,
  Coordinates,
  Dimensions,
  EdgeShift,
  MainDirections,
  Offset,
  PopoverDir,
  Window,
} from './positioningTypes';

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
} as const;

const DIR_INDEX_MAP = {
  up: 0,
  right: 1,
  down: 2,
  left: 3,
} as const;

export const getContainerNode = ({
  scrollBoundaryContainerRef,
  initialPositionRef,
}: {
  scrollBoundaryContainerRef: HTMLElement | null | undefined;
  initialPositionRef: HTMLElement | null | undefined;
}): HTMLElement | null | undefined => {
  // containerNode references the ScrollBoundaryContainer node to which
  // append the portal
  let containerNode = null;
  // currentNode references the DOM node used while traversing up nodes in the DOM tree
  let currentNode: HTMLElement | null | undefined | Node = initialPositionRef;

  while (!containerNode) {
    // To find ScrollBoundaryContainer parents, currentNode is traversed up accessing its parent node
    // until matching with the ScrollBoundaryContainer ref passed via context
    // or until reaching the HTML document (loop break)
    if (scrollBoundaryContainerRef && currentNode && currentNode.parentNode) {
      if (
        currentNode instanceof HTMLDivElement &&
        scrollBoundaryContainerRef?.isSameNode(currentNode)
      ) {
        containerNode = scrollBoundaryContainerRef;
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
  scrollBoundaryContainerRef,
}: {
  anchor: HTMLElement;
  positionRelativeToAnchor: boolean;
  scrollBoundaryContainerRef: HTMLElement | null | undefined;
}): {
  relativeOffset: Coordinates | null | undefined;
  triggerBoundingRect: ClientRect | null | undefined;
} => {
  let triggerBoundingRect;
  let relativeOffset;

  if (!anchor) {
    return { relativeOffset, triggerBoundingRect };
  }

  const containerNode = getContainerNode({
    scrollBoundaryContainerRef,
    initialPositionRef: anchor,
  });

  const boundingAnchorRect = anchor.getBoundingClientRect();
  // triggerBoundingRect is passed to Contents.tsx where this data will be used for positioning
  triggerBoundingRect = {
    bottom: boundingAnchorRect.bottom,
    left: boundingAnchorRect.left,
    right: boundingAnchorRect.right,
    top: boundingAnchorRect.top,
    height: boundingAnchorRect.height,
    width: boundingAnchorRect.width,
  };

  if (containerNode) {
    // If there's a parent ScrollBoundaryContainer, ScrollBoundaryContainer's top/left
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
  // relativeOffset is used for correct positioning within Contents.tsx
  relativeOffset = {
    x: positionRelativeToAnchor ? triggerBoundingRect.left - anchor.offsetLeft : 0,
    y: positionRelativeToAnchor ? triggerBoundingRect.top - anchor.offsetTop : 0,
  };

  return { relativeOffset, triggerBoundingRect };
};

/**
 * Determines the main direction the popover opens
 */
export function getPopoverDir({
  popoverSize,
  idealDirection,
  triggerRect,
  windowSize,
  isScrollBoundaryContainer,
}: {
  popoverSize: Dimensions;
  idealDirection: PopoverDir;
  triggerRect: ClientRect | null | undefined;
  windowSize: Window;
  isScrollBoundaryContainer?: boolean;
}): MainDirections {
  // Calculates the available space if we were to place the popover in the 4 main directions
  // to determine which 'quadrant' to position the popover inside of
  let up = (triggerRect?.top ?? 0) - popoverSize.height - CARET_HEIGHT;
  let right = windowSize.width - popoverSize.width - CARET_HEIGHT - (triggerRect?.right ?? 0);
  let down = windowSize.height - popoverSize.height - CARET_HEIGHT - (triggerRect?.bottom ?? 0);
  let left = (triggerRect?.left ?? 0) - popoverSize.width - CARET_HEIGHT;

  // TOO CLOSE TO EDGE overrides available space when the trigger is close to the edge of the screen

  // TOP or BOTTOM: trigger is too close to top/bottom of screen for left & right popovers
  const nonTopEdge = (triggerRect?.top ?? 0) < BORDER_RADIUS;
  const nonBottomEdge = windowSize.height - (triggerRect?.bottom ?? 0) < BORDER_RADIUS;
  const nonLeftEdge = (triggerRect?.left ?? 0) < BORDER_RADIUS;
  const nonRightEdge = windowSize.width - (triggerRect?.right ?? 0) < BORDER_RADIUS;

  // skipNoEdgeCondition is mostly an edge case within ScrollBoundaryContainers because trigger elements are more likely
  // to touch both edges of the parent ScrollBoundaryContainers without margins/paddings
  const skipNoEdgeCondition =
    isScrollBoundaryContainer && (nonTopEdge || nonBottomEdge) && (nonLeftEdge || nonRightEdge);

  const maybeEdgeCondition = idealDirection !== 'forceDown' && !skipNoEdgeCondition;

  if (maybeEdgeCondition && (nonTopEdge || nonBottomEdge)) {
    left = 0;
    right = 0;
  }

  // LEFT or RIGHT: trigger is too close to the left/right of screen for up & down popovers\
  if (maybeEdgeCondition && (nonLeftEdge || nonRightEdge)) {
    up = 0;
    down = 0;
  }

  // Choose the main direction for the popover based on available spaces & user preference
  const spaces = [up, right, down, left];

  if (idealDirection && idealDirection === 'forceDown') {
    return 'down';
  }

  if (
    idealDirection &&
    // @ts-expect-error - TS2367 - This condition will always return 'true' since the types '"left" | "right" | "down" | "up"' and '"forceDown"' have no overlap.
    idealDirection !== 'forceDown' &&
    (spaces[DIR_INDEX_MAP[idealDirection]] ?? 0) > 0
  ) {
    // user pref
    return idealDirection;
  }

  const noAvailableSpaceCondition = up <= 0 && right <= 0 && down <= 0 && left <= 0;

  // Identify best direction of available spaces
  const max = Math.max(...spaces);
  // If no direction pref, chose the direction in which there is the most space available
  // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'number' can't be used to index type '{ readonly '0': "up"; readonly '1': "right"; readonly '2': "down"; readonly '3': "left"; }'.
  return noAvailableSpaceCondition ? 'down' : SPACES_INDEX_MAP[spaces.indexOf(max)];
}

/**
 * Determines the sub direction of how the popover is positioned within the main dir
 */
export function getCaretDir({
  popoverSize,
  popoverDir,
  triggerRect,
  windowSize,
}: {
  popoverSize: Dimensions;
  popoverDir: PopoverDir;
  triggerRect: ClientRect | null | undefined;
  windowSize: Window;
}): CaretDir {
  // Now that we have the main direction, chose from 3 caret placements for that direction
  let offset;
  let triggerMid;
  let windowSpaceAvailable;

  if (popoverDir === 'right' || popoverDir === 'left') {
    offset = popoverSize.height / 2;
    triggerMid =
      (triggerRect?.top ?? 0) + ((triggerRect?.bottom ?? 0) - (triggerRect?.top ?? 0)) / 2;
    windowSpaceAvailable = windowSize.height;
  } else {
    // (popoverDir === 'up' || popoverDir === 'down')
    offset = popoverSize.width / 2;
    triggerMid =
      (triggerRect?.left ?? 0) + ((triggerRect?.right ?? 0) - (triggerRect?.left ?? 0)) / 2;
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
    caretDir = popoverDir === 'left' || popoverDir === 'right' ? 'up' : 'left';
  } else {
    // caret should go at bottom for left/right and right for up/down
    caretDir = popoverDir === 'left' || popoverDir === 'right' ? 'down' : 'right';
  }
  // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'CaretDir'.
  return caretDir;
}

/**
 * Calculates the amount the popover & caret need to shift over to align with designs
 */
export function calcEdgeShifts({
  triggerRect,
  windowSize,
  isScrollBoundaryContainer,
}: {
  triggerRect: ClientRect | null | undefined;
  windowSize: Window;
  isScrollBoundaryContainer: boolean;
}): {
  caret: Coordinates;
  popover: Coordinates;
} {
  // Target values for popover and caret shifts
  let popoverVerticalShift =
    CARET_OFFSET_FROM_SIDE - ((triggerRect?.height ?? 0) - CARET_HEIGHT) / 2;
  let popoverHorizontalShift =
    CARET_OFFSET_FROM_SIDE - ((triggerRect?.width ?? 0) - CARET_HEIGHT) / 2;
  let caretVerticalShift = CARET_WIDTH;
  let caretHorizontalShift = CARET_WIDTH;

  // Covers edge case where trigger is in a corner and we need to adjust the offset of the caret
  // to something smaller than normal in order
  const isCloseVertically =
    (triggerRect?.top ?? 0) - popoverVerticalShift < 0 ||
    (triggerRect?.bottom ?? 0) + popoverVerticalShift > windowSize.height;
  const isCloseHorizontally =
    (triggerRect?.left ?? 0) - popoverHorizontalShift < 0 ||
    (triggerRect?.right ?? 0) + popoverHorizontalShift > windowSize.width;

  // If there's a parent ScrollBoundaryContainer and trigger is close vertically and/or horizontally,
  // skip the popover shift adjusments so that the popover is right in the edge.
  if (isCloseVertically) {
    popoverVerticalShift = isScrollBoundaryContainer
      ? 0
      : BORDER_RADIUS - ((triggerRect?.height ?? 0) - CARET_HEIGHT) / 2;
    caretVerticalShift = BORDER_RADIUS;
  }

  if (isCloseHorizontally) {
    popoverHorizontalShift = isScrollBoundaryContainer
      ? 0
      : BORDER_RADIUS - ((triggerRect?.width ?? 0) - CARET_HEIGHT) / 2;
    caretHorizontalShift = BORDER_RADIUS;
  }

  return {
    popover: {
      x: popoverHorizontalShift,
      y: popoverVerticalShift,
    },
    caret: {
      x: caretHorizontalShift,
      y: caretVerticalShift,
    },
  };
}

/**
 * Calculates popover and caret offsets for styling
 */
export function adjustOffsets({
  base,
  edgeShift,
  popoverSize,
  popoverDir,
  caretDir,
  triggerRect,
  isScrollBoundaryContainer,
}: {
  base: {
    top: number;
    left: number;
  };
  edgeShift: EdgeShift;
  popoverSize: Dimensions;
  popoverDir: PopoverDir;
  caretDir: CaretDir;
  triggerRect: ClientRect | null | undefined;
  isScrollBoundaryContainer: boolean;
}): {
  caretOffset: CaretOffset;
  popoverOffset: Offset;
} {
  let popoverLeft = base.left;
  let popoverTop = base.top;

  let caretTop = popoverDir === 'down' ? -CARET_HEIGHT : null;
  let caretRight = popoverDir === 'left' ? -CARET_HEIGHT : null;
  let caretBottom = popoverDir === 'up' ? -CARET_HEIGHT : null;
  let caretLeft = popoverDir === 'right' ? -CARET_HEIGHT : null;

  // If there's a parent ScrollBoundaryContainer and caret direction is up or down,
  // adjust the caret position to correctly match its popover.
  if (caretDir === 'up') {
    popoverTop = base.top - edgeShift.popover.y;
    caretTop = edgeShift.caret.y + (isScrollBoundaryContainer ? 6 : 2);
  } else if (caretDir === 'down') {
    popoverTop = base.top - popoverSize.height + (triggerRect?.height ?? 0) + edgeShift.popover.y;
    caretBottom = edgeShift.caret.y + (isScrollBoundaryContainer ? 6 : 2);
  } else if (caretDir === 'left') {
    popoverLeft = base.left - edgeShift.popover.x;
    caretLeft = edgeShift.caret.x + 2;
  } else if (caretDir === 'right') {
    popoverLeft = base.left - popoverSize.width + (triggerRect?.width ?? 0) + edgeShift.popover.x;
    caretRight = edgeShift.caret.x + 2;
  } else if (caretDir === 'middle') {
    if (popoverDir === 'left' || popoverDir === 'right') {
      const triggerMid = popoverTop + (triggerRect?.height ?? 0) / 2;
      popoverTop = triggerMid - popoverSize.height / 2;
      // Vertical positioning of the caret (position along the anchor)
      caretTop = (popoverSize.height - CARET_WIDTH) / 2;
    }
    if (popoverDir === 'up' || popoverDir === 'down') {
      const triggerMid = popoverLeft + (triggerRect?.width ?? 0) / 2;
      popoverLeft = triggerMid - popoverSize.width / 2;
      // Horizontal positioning of the caret (position along the anchor)
      caretLeft = (popoverSize.width - CARET_WIDTH) / 2;
    }
  }

  return {
    popoverOffset: {
      top: popoverTop,
      left: popoverLeft,
    },
    caretOffset: {
      top: caretTop,
      right: caretRight,
      bottom: caretBottom,
      left: caretLeft,
    },
  };
}

/* Calculates baseline top and left offset for popover */
export function baseOffsets({
  hasCaret,
  relativeOffset,
  popoverSize,
  popoverDir,
  triggerRect,
  windowSize,
}: {
  hasCaret: boolean;
  relativeOffset: Coordinates | null | undefined;
  popoverSize: Dimensions;
  popoverDir: PopoverDir;
  triggerRect: ClientRect | null | undefined;
  windowSize: Window;
}): Offset {
  const SPACING_OUTSIDE = hasCaret ? CARET_HEIGHT : 8;
  // TOP OFFSET
  let top;
  if (popoverDir === 'down') {
    top = windowSize.scrollY + (triggerRect?.bottom ?? 0) + SPACING_OUTSIDE;
  } else if (popoverDir === 'up') {
    top = windowSize.scrollY + ((triggerRect?.top ?? 0) - popoverSize.height - SPACING_OUTSIDE);
  } else {
    // left and right
    top = windowSize.scrollY + (triggerRect?.top ?? 0);
  }

  // LEFT OFFSET
  let left;
  if (popoverDir === 'left') {
    left = windowSize.scrollX + ((triggerRect?.left ?? 0) - popoverSize.width - SPACING_OUTSIDE);
  } else if (popoverDir === 'right') {
    left = windowSize.scrollX + (triggerRect?.right ?? 0) + SPACING_OUTSIDE;
  } else {
    // down and up
    left = windowSize.scrollX + (triggerRect?.left ?? 0);
  }

  // Adjusts for the relative parent container
  top -= relativeOffset?.y ?? 0;
  left -= relativeOffset?.x ?? 0;
  return { top, left };
}
