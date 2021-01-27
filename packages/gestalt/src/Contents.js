// @flow strict
import React, { Component, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Caret from './Caret.js';
import styles from './Contents.css';
import borders from './Borders.css';
import colors from './Colors.css';
import { useColorScheme } from './contexts/ColorScheme.js';
import { useScrollableBoxStore } from './contexts/ScrollableBoxStore.js';

/* Needed until this Flow issue is fixed: https://github.com/facebook/flow/issues/380 */
/* eslint quote-props: 0 */
// prettier-ignore
const SPACES_INDEX_MAP = {
  '0': 'up',
  '1': 'right',
  '2': 'down',
  '3': 'left'
};

const DIR_INDEX_MAP = {
  up: 0,
  right: 1,
  down: 2,
  left: 3,
};

export const BORDER_RADIUS = 8;
export const CARET_HEIGHT = 4;
const CARET_OFFSET_FROM_SIDE = 24;
export const CARET_WIDTH = 12;
const MARGIN = 24;

const ContentProptypes = {
  bgColor: PropTypes.oneOf(['blue', 'darkGray', 'orange', 'red', 'white']),
  border: PropTypes.bool,
  caret: PropTypes.bool,
  children: PropTypes.node,
  idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  onKeyDown: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  relativeOffset: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  positionRelativeToAnchor: PropTypes.bool,
  rounding: PropTypes.oneOf([2, 4]),
  shouldFocus: PropTypes.bool,
  triggerBoundingClientRect: PropTypes.shape({
    bottom: PropTypes.number,
    height: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
    width: PropTypes.number,
  }),
  width: PropTypes.number,
};

type MainDir = ?('up' | 'right' | 'down' | 'left');
type CaretPlacement = 'up' | 'right' | 'down' | 'left' | 'middle';

type ClientRect = {
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number,
  ...
};

type Window = {|
  height: number,
  width: number,
  scrollY: number,
  scrollX: number,
|};

type Flyout = {| height: number, width: number |};

type Shift = {| x: number, y: number |};

type EdgeShift = {| caret: Shift, flyout: Shift |};

type OwnProps = {|
  anchor: HTMLElement,
  bgColor: 'blue' | 'darkGray' | 'orange' | 'red' | 'white',
  border?: boolean,
  caret?: boolean,
  children?: Node,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  onKeyDown: (event: {| keyCode: number |}) => void,
  onResize: () => void,
  positionRelativeToAnchor?: boolean,
  relativeOffset: {|
    x: number,
    y: number,
  |},
  rounding?: 2 | 4,
  shouldFocus?: boolean,
  triggerBoundingClientRect: ClientRect,
  width: ?number,
|};

type ColorSchemeProps = {|
  colorGray100: string,
  isDarkMode: boolean,
|};

type HookProps = {|
  refs: $ReadOnlyArray<?HTMLDivElement>,
|};

type Props = {| ...OwnProps, ...ColorSchemeProps, ...HookProps |};

type DerivedState = {|
  caretOffset: {|
    bottom: null | number,
    left: null | number,
    right: null | number,
    top: null | number,
  |},
  flyoutOffset: {| left: number, top: number |},
  mainDir: 'down' | 'left' | 'right' | 'up',
|};

type State = {|
  flyoutOffset: {|
    top: ?number,
    left: ?number,
  |},
  caretOffset: {|
    top: ?number,
    right: ?number,
    bottom: ?number,
    left: ?number,
  |},
  mainDir: ?MainDir,
  flyoutRef: ?HTMLElement,
|};

/**
 * Determines the main direction the flyout opens
 */
export function getMainDir({
  flyoutSize,
  idealDirection,
  triggerBoundingClientRect,
  windowSize,
}: {|
  flyoutSize: Flyout,
  idealDirection: MainDir,
  triggerBoundingClientRect: ClientRect,
  windowSize: Window,
|}): 'down' | 'left' | 'right' | 'up' {
  // Calculates the available space if we were to place the flyout in the 4 main directions
  // to determine which 'quadrant' to position the flyout inside of

  let up = triggerBoundingClientRect.top - flyoutSize.height - CARET_HEIGHT;
  let right =
    windowSize.width -
    flyoutSize.width -
    CARET_HEIGHT -
    triggerBoundingClientRect.right;
  let down =
    windowSize.height -
    flyoutSize.height -
    CARET_HEIGHT -
    triggerBoundingClientRect.bottom;
  let left = triggerBoundingClientRect.left - flyoutSize.width - CARET_HEIGHT;

  // TOO CLOSE TO EDGE overrides available space when the trigger is close to the edge of the screen
  // If Flyout is to be positioned within an ScrollableBox, this adjustment is disabled due to the high
  // probability of not having both top & left edge spaces within the container

  // TOP or BOTTOM: trigger is too close to top/bottom of screen for left & right flyouts
  const nonTopEdge = triggerBoundingClientRect.top < BORDER_RADIUS;
  const nonBottomEdge =
    windowSize.height - triggerBoundingClientRect.bottom < BORDER_RADIUS;
  const nonLeftEdge = triggerBoundingClientRect.left < BORDER_RADIUS;
  const nonRightEdge =
    windowSize.width - triggerBoundingClientRect.right < BORDER_RADIUS;

  const skipNoEdgeCondition =
    (nonTopEdge || nonBottomEdge) && (nonLeftEdge || nonRightEdge);

  if (!skipNoEdgeCondition && (nonTopEdge || nonBottomEdge)) {
    left = 0;
    right = 0;
  }
  // LEFT or RIGHT: trigger is too close to the left/right of screen for up & down flyouts
  if (!skipNoEdgeCondition && (nonLeftEdge || nonRightEdge)) {
    up = 0;
    down = 0;
  }

  const spaces = [up, right, down, left];

  // Identify best direction of available spaces
  const max = Math.max(...spaces);

  // Chose the main direction for the flyout based on available spaces & user preference
  let mainDir;
  if (idealDirection && spaces[DIR_INDEX_MAP[idealDirection]] > 0) {
    // user pref
    mainDir = idealDirection;
  } else {
    // If no direction pref, chose the direction in which there is the most space available
    mainDir = SPACES_INDEX_MAP[spaces.indexOf(max)];
  }

  return mainDir;
}

/**
 * Determines the sub direction of how the flyout is positioned within the main dir
 */
export function getCaretPlacement({
  flyoutSize,
  mainDir,
  triggerBoundingClientRect,
  windowSize,
}: {|
  flyoutSize: Flyout,
  mainDir: MainDir,
  triggerBoundingClientRect: ClientRect,
  windowSize: Window,
|}): CaretPlacement {
  // Now that we have the main direction, chose from 3 caret placements for that direction
  let offset;
  let triggerMid;
  let windowSpaceAvailable;

  if (mainDir === 'right' || mainDir === 'left') {
    offset = flyoutSize.height / 2;
    triggerMid =
      triggerBoundingClientRect.top +
      (triggerBoundingClientRect.bottom - triggerBoundingClientRect.top) / 2;
    windowSpaceAvailable = windowSize.height;
  } else {
    // (mainDir === 'up' || mainDir === 'down')
    offset = flyoutSize.width / 2;
    triggerMid =
      triggerBoundingClientRect.left +
      (triggerBoundingClientRect.right - triggerBoundingClientRect.left) / 2;
    windowSpaceAvailable = windowSize.width;
  }

  const aboveOrLeft = triggerMid - offset - MARGIN;
  const belowOrRight = windowSpaceAvailable - triggerMid - offset - MARGIN;
  let caretPlacement;
  if (aboveOrLeft > 0 && belowOrRight > 0) {
    // caret should go in middle b/c it can
    caretPlacement = 'middle';
  } else if (belowOrRight > 0) {
    // caret should go at top for left/right and left for up/down
    caretPlacement = mainDir === 'left' || mainDir === 'right' ? 'up' : 'left';
  } else {
    // caret should go at bottom for left/right and right for up/down
    caretPlacement =
      mainDir === 'left' || mainDir === 'right' ? 'down' : 'right';
  }
  return caretPlacement;
}

/**
 * Calculates the amount the flyout & caret need to shift over to align with designs
 */
export function calcEdgeShifts({
  triggerBoundingClientRect,
  windowSize,
  isScrollableBox,
}: {|
  triggerBoundingClientRect: ClientRect,
  windowSize: Window,
  isScrollableBox: boolean,
|}): {| caret: Shift, flyout: Shift |} {
  // Target values for flyout and caret shifts
  let flyoutVerticalShift =
    CARET_OFFSET_FROM_SIDE -
    (triggerBoundingClientRect.height - CARET_HEIGHT) / 2;

  let flyoutHorizontalShift =
    CARET_OFFSET_FROM_SIDE -
    (triggerBoundingClientRect.width - CARET_HEIGHT) / 2;
  let caretVerticalShift = CARET_WIDTH;
  let caretHorizontalShift = CARET_WIDTH;

  // Covers edge case where trigger is in a corner and we need to adjust the offset of the caret
  // to something smaller than normal in order
  const isCloseVertically =
    triggerBoundingClientRect.top - flyoutVerticalShift < 0 ||
    triggerBoundingClientRect.bottom + flyoutVerticalShift > windowSize.height;
  if (isCloseVertically) {
    flyoutVerticalShift = isScrollableBox
      ? 0
      : BORDER_RADIUS - (triggerBoundingClientRect.height - CARET_HEIGHT) / 2;
    caretVerticalShift = BORDER_RADIUS;
  }

  const isCloseHorizontally =
    triggerBoundingClientRect.left - flyoutHorizontalShift < 0 ||
    triggerBoundingClientRect.right + flyoutHorizontalShift > windowSize.width;
  if (isCloseHorizontally) {
    flyoutHorizontalShift = isScrollableBox
      ? 0
      : BORDER_RADIUS - (triggerBoundingClientRect.width - CARET_HEIGHT) / 2;
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
  mainDir,
  caretPlacement,
  triggerBoundingClientRect,
  isScrollableBox,
}: {|
  base: {| top: number, left: number |},
  edgeShift: EdgeShift,
  flyoutSize: Flyout,
  mainDir: MainDir,
  caretPlacement: CaretPlacement,
  triggerBoundingClientRect: ClientRect,
  isScrollableBox: boolean,
|}): {|
  caretOffset: {|
    bottom: null | number,
    left: null | number,
    right: null | number,
    top: null | number,
  |},
  flyoutOffset: {| left: number, top: number |},
|} {
  let flyoutLeft = base.left;
  let flyoutTop = base.top;

  let caretTop = mainDir === 'down' ? -CARET_HEIGHT : null;
  let caretRight = mainDir === 'left' ? -CARET_HEIGHT : null;
  let caretBottom = mainDir === 'up' ? -CARET_HEIGHT : null;
  let caretLeft = mainDir === 'right' ? -CARET_HEIGHT : null;

  if (caretPlacement === 'up') {
    flyoutTop = base.top - edgeShift.flyout.y;
    caretTop = edgeShift.caret.y + (isScrollableBox ? 6 : 2);
  } else if (caretPlacement === 'down') {
    flyoutTop =
      base.top -
      flyoutSize.height +
      triggerBoundingClientRect.height +
      edgeShift.flyout.y;
    caretBottom = edgeShift.caret.y + (isScrollableBox ? 6 : 2);
  } else if (caretPlacement === 'left') {
    flyoutLeft = base.left - edgeShift.flyout.x;
    caretLeft = edgeShift.caret.x + 2;
  } else if (caretPlacement === 'right') {
    flyoutLeft =
      base.left -
      flyoutSize.width +
      triggerBoundingClientRect.width +
      edgeShift.flyout.x;
    caretRight = edgeShift.caret.x + 2;
  } else if (caretPlacement === 'middle') {
    if (mainDir === 'left' || mainDir === 'right') {
      const triggerMid = flyoutTop + triggerBoundingClientRect.height / 2;
      flyoutTop = triggerMid - flyoutSize.height / 2;
      // Vertical positioning of the caret (position along the anchor)
      caretTop = (flyoutSize.height - CARET_WIDTH) / 2;
    }
    if (mainDir === 'up' || mainDir === 'down') {
      const triggerMid = flyoutLeft + triggerBoundingClientRect.width / 2;
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
export function baseOffsets(
  hasCaret: boolean,
  relativeOffset: {| x: number, y: number |},
  flyoutSize: Flyout,
  mainDir: MainDir,
  triggerBoundingClientRect: ClientRect,
  windowSize: Window
): {| left: number, top: number |} {
  const SPACING_OUTSIDE = hasCaret ? CARET_HEIGHT : 8;
  // TOP OFFSET
  let top;
  if (mainDir === 'down') {
    top =
      windowSize.scrollY + triggerBoundingClientRect.bottom + SPACING_OUTSIDE;
  } else if (mainDir === 'up') {
    top =
      windowSize.scrollY +
      (triggerBoundingClientRect.top - flyoutSize.height - SPACING_OUTSIDE);
  } else {
    // left and right
    top = windowSize.scrollY + triggerBoundingClientRect.top;
  }

  // LEFT OFFSET
  let left;
  if (mainDir === 'left') {
    left =
      windowSize.scrollX +
      (triggerBoundingClientRect.left - flyoutSize.width - SPACING_OUTSIDE);
  } else if (mainDir === 'right') {
    left =
      windowSize.scrollX + triggerBoundingClientRect.right + SPACING_OUTSIDE;
  } else {
    // down and up
    left = windowSize.scrollX + triggerBoundingClientRect.left;
  }

  // Adjusts for the relative parent container
  // Always 0 if positionRelativeToAnchor={false}
  top -= relativeOffset.y;
  left -= relativeOffset.x;
  return { top, left };
}

function getScrollableBox({
  anchor,
  refs,
}: {|
  anchor: HTMLElement,
  refs: $ReadOnlyArray<?HTMLDivElement>,
|}): ?HTMLElement {
  // Find the closest ScrollableBox container
  let containerNode = null;
  let currentNode = anchor;

  while (!containerNode) {
    if (refs && currentNode && currentNode.parentNode) {
      // eslint-disable-next-line no-loop-func
      refs.forEach((ref) => {
        if (
          currentNode instanceof HTMLDivElement &&
          ref?.isSameNode(currentNode)
        ) {
          containerNode = ref;
        }
      });
      currentNode = currentNode.parentNode;
    } else {
      break;
    }
  }
  return containerNode;
}

class Contents extends Component<Props, State> {
  static propTypes = ContentProptypes;

  static defaultProps: {| border: boolean, caret: boolean |} = {
    border: true,
    caret: true,
  };

  state: State = {
    flyoutOffset: {
      top: undefined,
      left: undefined,
    },
    caretOffset: {
      top: undefined,
      right: undefined,
      bottom: undefined,
      left: undefined,
    },
    mainDir: null,
    flyoutRef: null,
  };

  componentDidMount() {
    const { onResize, onKeyDown } = this.props;
    const { flyoutRef } = this.state;

    setTimeout(() => {
      if (this.props.shouldFocus && flyoutRef) {
        flyoutRef.focus();
      }
    });

    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
  }

  componentWillUnmount() {
    const { onResize, onKeyDown } = this.props;

    window.removeEventListener('resize', onResize);
    window.removeEventListener('keydown', onKeyDown);
  }

  /**
   * >> MAIN LOGIC << Determines the main direction, sub direction, and corresponding offsets needed
   * to correctly position the offset: Flyout and Caret
   */
  static getDerivedStateFromProps(
    {
      anchor,
      caret,
      idealDirection,
      positionRelativeToAnchor,
      relativeOffset,
      refs,
      triggerBoundingClientRect,
      width,
    }: Props,
    { flyoutRef }: State
  ): DerivedState {
    // Scroll not needed for relative elements
    // We can't use window.scrollX / window.scrollY since it's not supported by IE11
    const scrollX = positionRelativeToAnchor
      ? 0
      : window.pageXOffset ||
        (document.documentElement && document.documentElement.scrollLeft) ||
        0;
    const scrollY = positionRelativeToAnchor
      ? 0
      : window.pageYOffset ||
        (document.documentElement && document.documentElement.scrollTop) ||
        0;

    const container = getScrollableBox({
      anchor,
      refs,
    });

    const containerBoundingClientRect = container?.getBoundingClientRect();

    const windowSize = {
      height: containerBoundingClientRect?.height || window.innerHeight,
      width: containerBoundingClientRect?.width || window.innerWidth,
      scrollX: container?.scrollLeft ?? scrollX,
      scrollY: container?.scrollTop ?? scrollY,
    };

    const flyoutSize = {
      height: flyoutRef ? flyoutRef.clientHeight : 0,
      width: (flyoutRef ? flyoutRef.clientWidth : width) || 0,
    };

    // First choose one of 4 main direction
    const mainDir = getMainDir({
      flyoutSize,
      idealDirection,
      triggerBoundingClientRect,
      windowSize,
    });

    // Now that we have the main direction, chose from 3 caret placements for that direction
    const caretPlacement = getCaretPlacement({
      flyoutSize,
      mainDir,
      triggerBoundingClientRect,
      windowSize,
    });

    // Gets the base offset that positions the flyout based on the main direction only
    const base = baseOffsets(
      Boolean(caret),
      relativeOffset,
      flyoutSize,
      mainDir,
      triggerBoundingClientRect,
      windowSize
    );

    // Gets the edge shifts for the flyout
    const edgeShifts = calcEdgeShifts({
      triggerBoundingClientRect,
      windowSize,
      isScrollableBox: !!container,
    });

    // Adjusts for the subdirection of the caret
    const { flyoutOffset, caretOffset } = adjustOffsets({
      base,
      edgeShift: edgeShifts,
      flyoutSize,
      mainDir,
      caretPlacement,
      triggerBoundingClientRect,
      isScrollableBox: !!container,
    });

    return {
      caretOffset,
      flyoutOffset,
      mainDir,
    };
  }

  // Copy the flyout DOM node to state. This is required because we need to
  // derive the flyout location from it in getDerivedStateFromProps, and because
  // this method is static, it doesn't have access to the component instance.
  // Instead, we rely on React passing the state values into that method.
  setFlyoutRef: (flyoutRef: ?HTMLElement) => void = (
    flyoutRef: ?HTMLElement
  ) => {
    if (!this.state.flyoutRef) {
      this.setState({ flyoutRef });
    }
  };

  render(): Node {
    const {
      bgColor,
      border,
      caret,
      children,
      colorGray100,
      isDarkMode,
      rounding,
      width,
    } = this.props;
    const { caretOffset, flyoutOffset, mainDir } = this.state;

    // Needed to prevent UI thrashing
    const visibility = mainDir === null ? 'hidden' : 'visible';
    const background =
      bgColor === 'white' ? `${bgColor}BgElevated` : `${bgColor}Bg`;
    const stroke = bgColor === 'white' && !isDarkMode ? colorGray100 : null;
    const bgColorElevated = bgColor === 'white' ? 'whiteElevated' : bgColor;

    const isCaretVertical = ['down', 'up'].includes(mainDir);

    return (
      <div
        className={styles.container}
        // flyoutOffset positions the Flyout component
        style={{ stroke, visibility, ...flyoutOffset }}
      >
        <div
          className={classnames(
            rounding === 2 && borders.rounding2,
            rounding === 4 && borders.rounding4,
            styles.contents,
            styles.maxDimensions,
            width !== null && styles.minDimensions
          )}
          ref={this.setFlyoutRef}
          tabIndex={-1}
        >
          {caret && mainDir && (
            <div
              className={classnames(colors[bgColorElevated], styles.caret)}
              // caretOffset positions the Caret on the Flyout
              style={{ ...caretOffset }}
            >
              <Caret
                direction={mainDir}
                height={isCaretVertical ? CARET_HEIGHT : CARET_WIDTH}
                width={isCaretVertical ? CARET_WIDTH : CARET_HEIGHT}
              />
            </div>
          )}
          <div
            className={classnames(
              border && styles.border,
              colors[background],
              colors[bgColorElevated],
              rounding === 2 && borders.rounding2,
              rounding === 4 && borders.rounding4,
              styles.innerContents,
              styles.maxDimensions,
              width !== null && styles.minDimensions
            )}
            style={{ maxWidth: width }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default function WrappedContents(props: OwnProps): Node {
  const { colorGray100, name: colorSchemeName } = useColorScheme();
  const { refs = [] } = useScrollableBoxStore();

  return (
    <Contents
      {...props}
      colorGray100={colorGray100}
      isDarkMode={colorSchemeName === 'darkMode'}
      refs={refs}
    />
  );
}
