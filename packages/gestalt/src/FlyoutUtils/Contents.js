// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Caret from './Caret';
import styles from './Contents.css';
import colors from '../Colors.css';

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
export const CARET_HEIGHT = 24;
const CARET_OFFSET_FROM_SIDE = 24;
export const BORDER_RADIUS = 8;

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

type EdgeShift = { caret: Shift, flyout: Shift };

type Props = {|
  bgColor: 'darkGray' | 'white' | 'orange',
  children?: any,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  onClick: (event: Event) => void,
  onKeyDown: (event: { keyCode: number }) => void,
  onResize: () => void,
  positionRelativeToAnchor?: boolean,
  relativeOffset: {
    x: number,
    y: number,
  },
  shouldFocus?: boolean,
  triggerRect: ClientRect,
  width: number,
|};

type State = {
  flyoutOffset: {
    top: ?number,
    left: ?number,
  },
  caretOffset: {
    top: ?number,
    right: ?number,
    bottom: ?number,
    left: ?number,
  },
  mainDir: ?MainDir,
};

/**
 * Determines the main direction the flyout opens
 */
export function getMainDir(
  flyoutSize: Flyout,
  idealDirection: MainDir,
  triggerRect: ClientRect,
  windowSize: Window
) {
  // Calculates the available space if we were to place the flyout in the 4 main directions
  // to determine which 'quadrant' to position the flyout inside of
  let up = triggerRect.top - flyoutSize.height - CARET_HEIGHT;
  let right =
    windowSize.width - flyoutSize.width - CARET_HEIGHT - triggerRect.right;
  let down =
    windowSize.height - flyoutSize.height - CARET_HEIGHT - triggerRect.bottom;
  let left = triggerRect.left - flyoutSize.width - CARET_HEIGHT;

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
) {
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
  subDir: SubDir,
  triggerRect: ClientRect,
  windowSize: Window
) {
  // Target values for flyout and caret shifts
  let flyoutVerticalShift =
    CARET_OFFSET_FROM_SIDE - (triggerRect.height - CARET_HEIGHT) / 2;
  let flyoutHorizontalShift =
    CARET_OFFSET_FROM_SIDE - (triggerRect.width - CARET_HEIGHT) / 2;
  let caretVerticalShift = CARET_HEIGHT;
  let caretHorizontalShift = CARET_HEIGHT;

  // Covers edge case where trigger is in a corner and we need to adjust the offset of the caret
  // to something smaller than normal in order
  const isCloseVertically =
    triggerRect.top - flyoutVerticalShift < 0 ||
    triggerRect.bottom + flyoutVerticalShift > windowSize.height;
  const isCloseHorizontally =
    triggerRect.left - flyoutHorizontalShift < 0 ||
    triggerRect.right + flyoutHorizontalShift > windowSize.width;
  if (isCloseVertically) {
    flyoutVerticalShift =
      BORDER_RADIUS - (triggerRect.height - CARET_HEIGHT) / 2;
    caretVerticalShift = BORDER_RADIUS;
  }
  if (isCloseHorizontally) {
    flyoutHorizontalShift =
      BORDER_RADIUS - (triggerRect.width - CARET_HEIGHT) / 2;
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
  base: { top: number, left: number },
  edgeShift: EdgeShift,
  flyoutSize: Flyout,
  mainDir: MainDir,
  subDir: SubDir,
  triggerRect: ClientRect
) {
  let flyoutLeft = base.left;
  let flyoutTop = base.top;

  let caretTop = mainDir === 'down' ? -CARET_HEIGHT : null;
  let caretRight = mainDir === 'left' ? -CARET_HEIGHT : null;
  let caretBottom = null;
  let caretLeft = mainDir === 'right' ? -CARET_HEIGHT : null;

  if (subDir === 'up') {
    flyoutTop = base.top - edgeShift.flyout.y;
    caretTop = edgeShift.caret.y;
  } else if (subDir === 'down') {
    flyoutTop =
      base.top - flyoutSize.height + triggerRect.height + edgeShift.flyout.y;
    caretBottom = edgeShift.caret.y;
  } else if (subDir === 'left') {
    flyoutLeft = base.left - edgeShift.flyout.x;
    caretLeft = edgeShift.caret.x;
  } else if (subDir === 'right') {
    flyoutLeft =
      base.left - flyoutSize.width + triggerRect.width + edgeShift.flyout.x;
    caretRight = edgeShift.caret.x;
  } else if (subDir === 'middle') {
    if (mainDir === 'left' || mainDir === 'right') {
      const triggerMid = flyoutTop + triggerRect.height / 2;
      flyoutTop = triggerMid - flyoutSize.height / 2;
      caretTop = (flyoutSize.height - CARET_HEIGHT) / 2;
    }
    if (mainDir === 'up' || mainDir === 'down') {
      const triggerMid = flyoutLeft + triggerRect.width / 2;
      flyoutLeft = triggerMid - flyoutSize.width / 2;
      caretLeft = (flyoutSize.width - CARET_HEIGHT) / 2;
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
  relativeOffset: { x: number, y: number },
  flyoutSize: Flyout,
  mainDir: MainDir,
  triggerRect: ClientRect,
  windowSize: Window
) {
  const HALF_CARET = CARET_HEIGHT / 2;
  // TOP OFFSET
  let top;
  if (mainDir === 'down') {
    top = windowSize.scrollY + triggerRect.bottom + HALF_CARET;
  } else if (mainDir === 'up') {
    top =
      windowSize.scrollY + (triggerRect.top - flyoutSize.height - HALF_CARET);
  } else {
    // left and right
    top = windowSize.scrollY + triggerRect.top;
  }

  // LEFT OFFSET
  let left;
  if (mainDir === 'left') {
    left =
      windowSize.scrollX + (triggerRect.left - flyoutSize.width - HALF_CARET);
  } else if (mainDir === 'right') {
    left = windowSize.scrollX + triggerRect.right + HALF_CARET;
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
  state: State = {
    flyoutOffset: {
      top: undefined,
      right: undefined,
      bottom: undefined,
      left: undefined,
    },
    caretOffset: {
      top: undefined,
      right: undefined,
      bottom: undefined,
      left: undefined,
    },
    mainDir: null,
  };

  componentDidMount() {
    this.setFlyoutPosition(this.props);
    setTimeout(() => {
      if (this.props.shouldFocus && this.flyout) {
        this.flyout.focus();
      }
    });
    document.addEventListener('click', this.props.onClick, true);
    window.addEventListener('resize', this.props.onResize);
    window.addEventListener('keydown', this.props.onKeyDown);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setFlyoutPosition(nextProps);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.props.onClick, true);
    window.removeEventListener('resize', this.props.onResize);
    window.removeEventListener('keydown', this.props.onKeyDown);
  }

  /**
   * Determines the main direciton, sub direction, and corresponding offsets needed
   * to correctly position the offset
   */
  setFlyoutPosition = (props: Props) => {
    const {
      relativeOffset,
      idealDirection,
      positionRelativeToAnchor,
      triggerRect,
      width,
    } = props;

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
      height: this.flyout ? this.flyout.clientHeight : 0,
      width,
    };

    // First choose one of 4 main direction
    const mainDir = getMainDir(
      flyoutSize,
      idealDirection,
      triggerRect,
      windowSize
    );

    // Now that we have the main direction, chose from 3 caret placements for that direction
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

    // Adjusts for the subdirection of the caret
    const { flyoutOffset, caretOffset } = adjustOffsets(
      base,
      edgeShifts,
      flyoutSize,
      mainDir,
      subDir,
      triggerRect
    );

    this.setState({
      caretOffset,
      flyoutOffset,
      mainDir,
    });
  };

  flyout: ?HTMLElement;

  render() {
    const { bgColor, children, width } = this.props;

    // Needed to prevent UI thrashing
    const visibility = this.state.mainDir === null ? 'hidden' : 'visible';
    const background = `${bgColor}Bg`;
    const stroke = bgColor === 'white' ? '#efefef' : null;
    const borderColor = bgColor === 'white' ? 'lightGray' : bgColor;

    return (
      <div
        className={styles.container}
        style={{ stroke, visibility, ...this.state.flyoutOffset }}
      >
        <div
          className={classnames(
            colors[background],
            colors[borderColor],
            styles.dimensions,
            styles.contents
          )}
          ref={c => {
            this.flyout = c;
          }}
          tabIndex={-1}
        >
          <div
            className={classnames(styles.dimensions, styles.innerContents)}
            style={{ width }}
          >
            {children}
          </div>
          <div
            className={classnames(colors[bgColor], styles.caret)}
            style={{ ...this.state.caretOffset }}
          >
            <Caret direction={this.state.mainDir} />
          </div>
        </div>
      </div>
    );
  }
}

/* eslint react/no-unused-prop-types: 0 */
Contents.propTypes = {
  bgColor: PropTypes.oneOf(['darkGray', 'white', 'orange']),
  children: PropTypes.node,
  idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  relativeOffset: PropTypes.exact({ x: PropTypes.number, y: PropTypes.number }),
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
