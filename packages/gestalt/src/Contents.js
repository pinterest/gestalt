// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Contents.css';
import colors from './Colors.css';

/* Needed until this Flow issue is fixed: https://github.com/facebook/flow/issues/380 */
/* eslint quote-props: 0 */
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

const MARGIN = 24;
export const SPACING_OUTSIDE = 8;
export const BORDER_RADIUS = 16;

type MainDir = ?('up' | 'right' | 'down' | 'left');
type SubDir = 'up' | 'right' | 'down' | 'left' | 'middle';

type ClientRect = {
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number,
};

type Window = {
  height: number,
  width: number,
  scrollY: number,
  scrollX: number,
};

type Flyout = { height: number, width: number };

type Shift = { x: number, y: number };

type EdgeShift = { flyout: Shift };

type Props = {|
  bgColor: 'blue' | 'darkGray' | 'orange' | 'red' | 'white',
  children?: React.Node,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  onKeyDown: (event: { keyCode: number }) => void,
  onResize: () => void,
  positionRelativeToAnchor?: boolean,
  relativeOffset: {
    x: number,
    y: number,
  },
  shouldFocus?: boolean,
  triggerRect: ClientRect,
  width: ?number,
|};

type State = {|
  flyoutOffset: {|
    top: ?number,
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
  windowSize: Window
): MainDir {
  // Calculates the available space if we were to place the flyout in the 4 main directions
  // to determine which 'quadrant' to position the flyout inside of
  let up = triggerRect.top - flyoutSize.height - MARGIN;
  let right = windowSize.width - flyoutSize.width - MARGIN - triggerRect.right;
  let down =
    windowSize.height - flyoutSize.height - MARGIN - triggerRect.bottom;
  let left = triggerRect.left - flyoutSize.width - MARGIN;

  // overrides available space when the trigger is close to the edge of the screen
  // trigger is too close to top/bottom of screen for left & right flyouts
  if (
    triggerRect.top < BORDER_RADIUS ||
    windowSize.height - triggerRect.bottom < BORDER_RADIUS
  ) {
    left = 0;
    right = 0;
  }

  // trigger is too close to the left/right of screen for up & down flyouts
  if (
    triggerRect.left < BORDER_RADIUS ||
    windowSize.width - triggerRect.right < BORDER_RADIUS
  ) {
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
  windowSize: Window
): SubDir {
  // Now that we have the main direction, chose from 3 placements for that direction
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
    // should go in middle b/c it can
    subDir = 'middle';
  } else if (belowOrRight > 0) {
    // should go at top for left/right and left for up/down
    subDir = mainDir === 'left' || mainDir === 'right' ? 'up' : 'left';
  } else {
    // should go at bottom for left/right and right for up/down
    subDir = mainDir === 'left' || mainDir === 'right' ? 'down' : 'right';
  }
  return subDir;
}

/**
 * Calculates the amount the flyout need to shift over to align with designs
 */
export function calcEdgeShifts(
  subDir: SubDir,
  triggerRect: ClientRect,
  windowSize: Window
) {
  // Target values for flyout shifts
  let flyoutVerticalShift = MARGIN - (triggerRect.height - MARGIN) / 2;
  let flyoutHorizontalShift = MARGIN - (triggerRect.width - MARGIN) / 2;

  // Covers edge case where trigger is in a corner and we need to adjust the offset
  // to something smaller than normal in order
  const isCloseVertically =
    triggerRect.top - flyoutVerticalShift < 0 ||
    triggerRect.bottom + flyoutVerticalShift > windowSize.height;
  const isCloseHorizontally =
    triggerRect.left - flyoutHorizontalShift < 0 ||
    triggerRect.right + flyoutHorizontalShift > windowSize.width;
  if (isCloseVertically) {
    flyoutVerticalShift = BORDER_RADIUS - (triggerRect.height - MARGIN) / 2;
  }
  if (isCloseHorizontally) {
    flyoutHorizontalShift = BORDER_RADIUS - (triggerRect.width - MARGIN) / 2;
  }

  return {
    flyout: {
      x: flyoutHorizontalShift,
      y: flyoutVerticalShift,
    },
  };
}

/**
 * Calculates flyout offsets for styling
 */
export function adjustOffsets(
  base: { top: number, left: number },
  edgeShift: EdgeShift,
  flyoutSize: Flyout,
  mainDir: MainDir,
  subDir: SubDir,
  triggerRect: ClientRect
) {
  let { left, top } = base;

  if (subDir === 'up') {
    top = base.top - edgeShift.flyout.y;
  } else if (subDir === 'down') {
    top =
      base.top - flyoutSize.height + triggerRect.height + edgeShift.flyout.y;
  } else if (subDir === 'left') {
    left = base.left - edgeShift.flyout.x;
  } else if (subDir === 'right') {
    left =
      base.left - flyoutSize.width + triggerRect.width + edgeShift.flyout.x;
  } else if (subDir === 'middle') {
    if (mainDir === 'left' || mainDir === 'right') {
      const triggerMid = top + triggerRect.height / 2;
      top = triggerMid - flyoutSize.height / 2;
    }
    if (mainDir === 'up' || mainDir === 'down') {
      const triggerMid = left + triggerRect.width / 2;
      left = triggerMid - flyoutSize.width / 2;
    }
  }

  return {
    top,
    left,
  };
}

/* Calculates baseline top and left offset for flyout */
export function baseOffsets(
  relativeOffset: { x: number, y: number },
  flyoutSize: Flyout,
  mainDir: MainDir,
  triggerRect: ClientRect,
  windowSize: Window
): {
  top: number,
  left: number,
} {
  // TOP OFFSET
  let top;
  if (mainDir === 'down') {
    top = windowSize.scrollY + triggerRect.bottom + SPACING_OUTSIDE;
  } else if (mainDir === 'up') {
    top =
      windowSize.scrollY +
      (triggerRect.top - flyoutSize.height - SPACING_OUTSIDE);
  } else {
    // left and right
    top = windowSize.scrollY + triggerRect.top;
  }

  // LEFT OFFSET
  let left;
  if (mainDir === 'left') {
    left =
      windowSize.scrollX +
      (triggerRect.left - flyoutSize.width - SPACING_OUTSIDE);
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

export default class Contents extends React.Component<Props, State> {
  static propTypes = {
    bgColor: PropTypes.oneOf(['blue', 'darkGray', 'orange', 'red', 'white']),
    children: PropTypes.node,
    idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
    onKeyDown: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired,
    relativeOffset: PropTypes.exact({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    positionRelativeToAnchor: PropTypes.bool,
    shouldFocus: PropTypes.bool,
    triggerRect: PropTypes.exact({
      bottom: PropTypes.number,
      height: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
      top: PropTypes.number,
      width: PropTypes.number,
    }),
    width: PropTypes.number,
  };

  state = {
    flyoutOffset: {
      top: undefined,
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
   * Determines the main direction, sub direction, and corresponding offsets needed
   * to correctly position the offset
   */
  static getDerivedStateFromProps(
    {
      idealDirection,
      positionRelativeToAnchor,
      relativeOffset,
      triggerRect,
      width,
    }: Props,
    { flyoutRef }: State
  ) {
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

    const windowSize = {
      height: window.innerHeight,
      width: window.innerWidth,
      scrollX,
      scrollY,
    };

    const flyoutSize = {
      height: flyoutRef ? flyoutRef.clientHeight : 0,
      width: width || (flyoutRef ? flyoutRef.clientWidth : 0),
    };

    // First choose one of 4 main directions
    const mainDir = getMainDir(
      flyoutSize,
      idealDirection,
      triggerRect,
      windowSize
    );

    // Now that we have the main direction, choose from 3 placements for that direction
    const subDir = getSubDir(flyoutSize, mainDir, triggerRect, windowSize);

    // Gets the base offset that positions the flyout based on the main direction only
    const base = baseOffsets(
      relativeOffset,
      flyoutSize,
      mainDir,
      triggerRect,
      windowSize
    );

    // Gets the edge shifts for the flyout
    const edgeShifts = calcEdgeShifts(subDir, triggerRect, windowSize);

    // Adjusts for the subdirection
    const flyoutOffset = adjustOffsets(
      base,
      edgeShifts,
      flyoutSize,
      mainDir,
      subDir,
      triggerRect
    );

    return {
      flyoutOffset,
      mainDir,
    };
  }

  // Copy the flyout DOM node to state. This is required because we need to
  // derive the flyout location from it in getDerivedStateFromProps, and because
  // this method is static, it doesn't have access to the component instance.
  // Instead, we rely on React passing the state values into that method.
  setFlyoutRef = (flyoutRef: ?HTMLElement) => {
    if (!this.state.flyoutRef) {
      this.setState({ flyoutRef });
    }
  };

  render() {
    const { bgColor, children, width } = this.props;
    const { flyoutOffset, mainDir } = this.state;

    // Needed to prevent UI thrashing
    const visibility = mainDir === null ? 'hidden' : 'visible';
    const background = `${bgColor}Bg`;
    const stroke = bgColor === 'white' ? '#efefef' : null;

    return (
      <div
        className={styles.container}
        style={{ stroke, visibility, ...flyoutOffset }}
      >
        <div
          className={classnames(
            colors[background],
            colors[bgColor],
            styles.contents,
            styles.maxDimensions,
            width !== null && styles.minDimensions
          )}
          ref={this.setFlyoutRef}
          tabIndex={-1}
        >
          <div
            className={classnames(
              styles.innerContents,
              styles.maxDimensions,
              width !== null && styles.minDimensions
            )}
            style={{ width }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}
