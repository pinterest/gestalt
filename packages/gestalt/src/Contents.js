// @flow strict
import React, { Component, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Caret from './Caret.js';
import styles from './Contents.css';
import borders from './Borders.css';
import colors from './Colors.css';
import { useColorScheme } from './contexts/ColorScheme.js';
import { useScrollableContainer } from './contexts/ScrollableContainer.js';
import { getContainerNode } from './Layer.js';

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

type MainDir = ?('up' | 'right' | 'down' | 'left');
type SubDir = 'up' | 'right' | 'down' | 'left' | 'middle';

type ClientRect = {|
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number,
|};

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
  triggerRect: ClientRect,
  width: ?number,
|};

type HookProps = {|
  scrollableContainerRef: ?HTMLDivElement,
|};
type ColorSchemeProps = {|
  colorGray100: string,
  isDarkMode: boolean,
|};

type Props = {| ...OwnProps, ...ColorSchemeProps, ...HookProps |};

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
export function getMainDir(
  flyoutSize: Flyout,
  idealDirection: MainDir,
  triggerRect: ClientRect,
  windowSize: Window,
): 'down' | 'left' | 'right' | 'up' {
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
  const skipNoEdgeCondition = (nonTopEdge || nonBottomEdge) && (nonLeftEdge || nonRightEdge);

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
export function getSubDir(
  flyoutSize: Flyout,
  mainDir: MainDir,
  triggerRect: ClientRect,
  windowSize: Window,
): SubDir {
  // Now that we have the main direction, chose from 3 caret placements for that direction
  let offset;
  let triggerMid;
  let windowSpaceAvailable;

  if (mainDir === 'right' || mainDir === 'left') {
    offset = flyoutSize.height / 2;
    triggerMid = triggerRect.top + (triggerRect.bottom - triggerRect.top) / 2;
    windowSpaceAvailable = windowSize.height;
  } else {
    // (mainDir === 'up' || mainDir === 'down')
    offset = flyoutSize.width / 2;
    triggerMid = triggerRect.left + (triggerRect.right - triggerRect.left) / 2;
    windowSpaceAvailable = windowSize.width;
  }

  const aboveOrLeft = triggerMid - offset - MARGIN;
  const belowOrRight = windowSpaceAvailable - triggerMid - offset - MARGIN;
  let subDir;
  if (aboveOrLeft > 0 && belowOrRight > 0) {
    // caret should go in middle b/c it can
    subDir = 'middle';
  } else if (belowOrRight > 0) {
    // caret should go at top for left/right and left for up/down
    subDir = mainDir === 'left' || mainDir === 'right' ? 'up' : 'left';
  } else {
    // caret should go at bottom for left/right and right for up/down
    subDir = mainDir === 'left' || mainDir === 'right' ? 'down' : 'right';
  }
  return subDir;
}

/**
 * Calculates the amount the flyout & caret need to shift over to align with designs
 */
export function calcEdgeShifts(
  triggerRect: ClientRect,
  windowSize: Window,
  isScrollableBox: boolean,
): {| caret: Shift, flyout: Shift |} {
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
  if (isCloseVertically) {
    // If there's a parent ScrollableContainer and trigger is close vertically and/or horizontally,
    // skip the flyout shift adjusments so that the flyout is right in the edge.
    flyoutVerticalShift = isScrollableBox
      ? 0
      : BORDER_RADIUS - (triggerRect.height - CARET_HEIGHT) / 2;
    caretVerticalShift = BORDER_RADIUS;
  }

  const isCloseHorizontally =
    triggerRect.left - flyoutHorizontalShift < 0 ||
    triggerRect.right + flyoutHorizontalShift > windowSize.width;
  if (isCloseHorizontally) {
    flyoutHorizontalShift = isScrollableBox
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
export function adjustOffsets(
  base: {| top: number, left: number |},
  edgeShift: EdgeShift,
  flyoutSize: Flyout,
  mainDir: MainDir,
  subDir: SubDir,
  triggerRect: ClientRect,
  isScrollableBox: boolean,
): {|
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

  if (subDir === 'up') {
    flyoutTop = base.top - edgeShift.flyout.y;
    // If there's a parent ScrollableContainer and caret direction is up or down,
    // adjust the caret position to correctly match flyout position.
    caretTop = edgeShift.caret.y + (isScrollableBox ? 6 : 2);
  } else if (subDir === 'down') {
    flyoutTop = base.top - flyoutSize.height + triggerRect.height + edgeShift.flyout.y;
    caretBottom = edgeShift.caret.y + (isScrollableBox ? 6 : 2);
  } else if (subDir === 'left') {
    flyoutLeft = base.left - edgeShift.flyout.x;
    caretLeft = edgeShift.caret.x + 2;
  } else if (subDir === 'right') {
    flyoutLeft = base.left - flyoutSize.width + triggerRect.width + edgeShift.flyout.x;
    caretRight = edgeShift.caret.x + 2;
  } else if (subDir === 'middle') {
    if (mainDir === 'left' || mainDir === 'right') {
      const triggerMid = flyoutTop + triggerRect.height / 2;
      flyoutTop = triggerMid - flyoutSize.height / 2;
      // Vertical positioning of the caret (position along the anchor)
      caretTop = (flyoutSize.height - CARET_WIDTH) / 2;
    }
    if (mainDir === 'up' || mainDir === 'down') {
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
export function baseOffsets(
  hasCaret: boolean,
  relativeOffset: {| x: number, y: number |},
  flyoutSize: Flyout,
  mainDir: MainDir,
  triggerRect: ClientRect,
  windowSize: Window,
): {| left: number, top: number |} {
  const SPACING_OUTSIDE = hasCaret ? CARET_HEIGHT : 8;
  // TOP OFFSET
  let top;
  if (mainDir === 'down') {
    top = windowSize.scrollY + triggerRect.bottom + SPACING_OUTSIDE;
  } else if (mainDir === 'up') {
    top = windowSize.scrollY + (triggerRect.top - flyoutSize.height - SPACING_OUTSIDE);
  } else {
    // left and right
    top = windowSize.scrollY + triggerRect.top;
  }

  // LEFT OFFSET
  let left;
  if (mainDir === 'left') {
    left = windowSize.scrollX + (triggerRect.left - flyoutSize.width - SPACING_OUTSIDE);
  } else if (mainDir === 'right') {
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

class Contents extends Component<Props, State> {
  static propTypes = {
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
    triggerRect: PropTypes.shape({
      bottom: PropTypes.number,
      height: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
      top: PropTypes.number,
      width: PropTypes.number,
    }),
    width: PropTypes.number,
  };

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
      scrollableContainerRef,
      triggerRect,
      width,
    }: Props,
    { flyoutRef }: State,
  ): {|
    caretOffset: {|
      bottom: null | number,
      left: null | number,
      right: null | number,
      top: null | number,
    |},
    flyoutOffset: {| left: number, top: number |},
    mainDir: 'down' | 'left' | 'right' | 'up',
  |} {
    // Scroll not needed for relative elements
    // We can't use window.scrollX / window.scrollY since it's not supported by IE11
    const scrollX = positionRelativeToAnchor
      ? 0
      : window.pageXOffset ||
        (document.documentElement && document.documentElement.scrollLeft) ||
        0;
    const scrollY = positionRelativeToAnchor
      ? 0
      : window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || 0;

    const containerNode = getContainerNode({ scrollableContainerRef, initialPositionRef: anchor });
    const containerBoundingClientRect = containerNode?.getBoundingClientRect();

    // If there's a parent ScrollableContainer, replace window's dimensions and scroll with the ScrollableContainer node ones
    const windowSize = {
      height: containerBoundingClientRect?.height || window.innerHeight,
      width: containerBoundingClientRect?.width || window.innerWidth,
      scrollX: containerNode?.scrollLeft ?? scrollX,
      scrollY: containerNode?.scrollTop ?? scrollY,
    };

    const flyoutSize = {
      height: flyoutRef ? flyoutRef.clientHeight : 0,
      width: (flyoutRef ? flyoutRef.clientWidth : width) || 0,
    };

    // First choose one of 4 main direction
    const mainDir = getMainDir(flyoutSize, idealDirection, triggerRect, windowSize);

    // Now that we have the main direction, chose from 3 caret placements for that direction
    const subDir = getSubDir(flyoutSize, mainDir, triggerRect, windowSize);

    // Gets the base offset that positions the flyout based on the main direction only
    const base = baseOffsets(
      Boolean(caret),
      relativeOffset,
      flyoutSize,
      mainDir,
      triggerRect,
      windowSize,
    );

    // Gets the edge shifts for the flyout
    const edgeShifts = calcEdgeShifts(triggerRect, windowSize, !!containerNode);

    // Adjusts for the subdirection of the caret
    const { flyoutOffset, caretOffset } = adjustOffsets(
      base,
      edgeShifts,
      flyoutSize,
      mainDir,
      subDir,
      triggerRect,
      !!containerNode,
    );

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
  setFlyoutRef: (flyoutRef: ?HTMLElement) => void = (flyoutRef: ?HTMLElement) => {
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
    const background = bgColor === 'white' ? `${bgColor}BgElevated` : `${bgColor}Bg`;
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
            width !== null && styles.minDimensions,
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
              width !== null && styles.minDimensions,
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
  const { scrollableContainerRef = null } = useScrollableContainer();

  return (
    <Contents
      {...props}
      colorGray100={colorGray100}
      isDarkMode={colorSchemeName === 'darkMode'}
      scrollableContainerRef={scrollableContainerRef}
    />
  );
}
