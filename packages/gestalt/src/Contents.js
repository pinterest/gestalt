// @flow strict
import React, { Component, type Node } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Caret from './Caret.js';
import styles from './Contents.css';
import borders from './Borders.css';
import colors from './Colors.css';
import { useColorScheme } from './contexts/ColorScheme.js';
import { useScrollableContainer } from './contexts/ScrollableContainer.js';
import type {
  CaretOffset,
  ClientRect,
  DerivedState,
  FlyoutDir,
  MainDirections,
  Coordinates,
} from './utils/positioningTypes.js';
import {
  adjustOffsets,
  baseOffsets,
  calcEdgeShifts,
  CARET_HEIGHT,
  CARET_WIDTH,
  getCaretDir,
  getContainerNode,
  getFlyoutDir,
} from './utils/positioningUtils.js';

type OwnProps = {|
  anchor: HTMLElement,
  bgColor: 'blue' | 'darkGray' | 'orange' | 'red' | 'white',
  border?: boolean,
  caret?: boolean,
  children?: Node,
  idealDirection?: MainDirections,
  onKeyDown: (event: {| keyCode: number |}) => void,
  onResize: () => void,
  positionRelativeToAnchor?: boolean,
  relativeOffset: Coordinates,
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
  caretOffset: CaretOffset,
  flyoutDir: ?FlyoutDir,
  flyoutRef: ?HTMLElement,
|};

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

class Contents extends Component<Props, State> {
  static propTypes = ContentProptypes;

  static defaultProps: {| border: boolean, caret: boolean |} = {
    border: true,
    caret: true,
  };

  state = {
    flyoutOffset: {
      top: undefined,
      left: undefined,
    },
    caretOffset: {
      top: null,
      right: null,
      bottom: null,
      left: null,
    },
    flyoutDir: null,
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
      : window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || 0;

    const containerNode = getContainerNode({ scrollableContainerRef, initialPositionRef: anchor });
    const containerBoundingClientRect = containerNode?.getBoundingClientRect();

    // If there's a parent ScrollableContainer, replace window's dimensions and scroll with the ScrollableContainer node ones
    const windowSize = {
      height: containerBoundingClientRect?.height ?? window.innerHeight,
      width: containerBoundingClientRect?.width ?? window.innerWidth,
      scrollX: containerNode?.scrollLeft ?? scrollX,
      scrollY: containerNode?.scrollTop ?? scrollY,
    };

    const flyoutSize = {
      height: flyoutRef ? flyoutRef.clientHeight : 0,
      width: (flyoutRef ? flyoutRef.clientWidth : width) || 0,
    };
    const flyoutDir = getFlyoutDir({ flyoutSize, idealDirection, triggerRect, windowSize });
    const flyoutData = { flyoutDir, flyoutSize };

    // Adjusts for the subdirection of the caret
    const { flyoutOffset, caretOffset } = adjustOffsets({
      // Gets the base offset that positions the flyout based on the main direction only
      base: baseOffsets({
        hasCaret: Boolean(caret),
        relativeOffset,
        ...flyoutData,
        triggerRect,
        windowSize,
      }),
      // Gets the edge shifts for the flyout
      edgeShift: calcEdgeShifts({
        triggerRect,
        windowSize,
        isScrollableBox: !!containerNode,
      }),
      ...flyoutData,
      // Now that we have the main direction, chose from 3 caret placements for that direction
      caretDir: getCaretDir({ flyoutSize, flyoutDir, triggerRect, windowSize }),
      triggerRect,
      isScrollableBox: !!containerNode,
    });

    return {
      caretOffset,
      flyoutOffset,
      flyoutDir,
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
    const { caretOffset, flyoutOffset, flyoutDir } = this.state;

    // Needed to prevent UI thrashing
    const visibility = flyoutDir === null ? 'hidden' : 'visible';
    const background = bgColor === 'white' ? `${bgColor}BgElevated` : `${bgColor}Bg`;
    const stroke = bgColor === 'white' && !isDarkMode ? colorGray100 : null;
    const bgColorElevated = bgColor === 'white' ? 'whiteElevated' : bgColor;
    const isCaretVertical = ['down', 'up'].includes(flyoutDir);

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
          {caret && flyoutDir && (
            <div
              className={classnames(colors[bgColorElevated], styles.caret)}
              // caretOffset positions the Caret on the Flyout
              style={{ ...caretOffset }}
            >
              <Caret
                direction={flyoutDir}
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
