// @flow strict
import React, { Component, type Node } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Caret from './Caret.js';
import styles from './Contents.css';
import borders from './Borders.css';
import colors from './Colors.css';
import { useColorScheme } from './contexts/ColorScheme.js';
import { useScrollBoundaryContainer } from './contexts/ScrollBoundaryContainer.js';
import type {
  CaretOffset,
  ClientRect,
  DerivedState,
  PopoverDir,
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
  getPopoverDir,
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
  scrollBoundaryContainerRef: ?HTMLDivElement,
|};
type ColorSchemeProps = {|
  colorGray100: string,
  isDarkMode: boolean,
|};

type Props = {| ...OwnProps, ...ColorSchemeProps, ...HookProps |};

type State = {|
  popoverOffset: {|
    top: ?number,
    left: ?number,
  |},
  caretOffset: CaretOffset,
  popoverDir: ?PopoverDir,
  popoverRef: ?HTMLElement,
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
    popoverOffset: {
      top: undefined,
      left: undefined,
    },
    caretOffset: {
      top: null,
      right: null,
      bottom: null,
      left: null,
    },
    popoverDir: null,
    popoverRef: null,
  };

  componentDidMount() {
    const { onResize, onKeyDown } = this.props;
    const { popoverRef } = this.state;

    setTimeout(() => {
      if (this.props.shouldFocus && popoverRef) {
        popoverRef.focus();
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
   * to correctly position the offset: Popover and Caret
   */
  static getDerivedStateFromProps(
    {
      anchor,
      caret,
      idealDirection,
      positionRelativeToAnchor,
      relativeOffset,
      scrollBoundaryContainerRef,
      triggerRect,
      width,
    }: Props,
    { popoverRef }: State,
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

    const containerNode = getContainerNode({
      scrollBoundaryContainerRef,
      initialPositionRef: anchor,
    });
    const containerBoundingClientRect = containerNode?.getBoundingClientRect();

    // If there's a parent ScrollBoundaryContainer, replace window's dimensions and scroll with the ScrollBoundaryContainer node ones
    const windowSize = {
      height: containerBoundingClientRect?.height ?? window.innerHeight,
      width: containerBoundingClientRect?.width ?? window.innerWidth,
      scrollX: containerNode?.scrollLeft ?? scrollX,
      scrollY: containerNode?.scrollTop ?? scrollY,
    };

    const popoverSize = {
      height: popoverRef ? popoverRef.clientHeight : 0,
      width: (popoverRef ? popoverRef.clientWidth : width) || 0,
    };
    const popoverDir = getPopoverDir({
      popoverSize,
      idealDirection,
      triggerRect,
      windowSize,
      isScrollBoundaryContainer: !!containerNode,
    });
    const popoverData = { popoverDir, popoverSize };

    // Adjusts for the subdirection of the caret
    const { popoverOffset, caretOffset } = adjustOffsets({
      // Gets the base offset that positions the popover based on the main direction only
      base: baseOffsets({
        hasCaret: Boolean(caret),
        relativeOffset,
        ...popoverData,
        triggerRect,
        windowSize,
      }),
      // Gets the edge shifts for the popover
      edgeShift: calcEdgeShifts({
        triggerRect,
        windowSize,
        isScrollBoundaryContainer: !!containerNode,
      }),
      ...popoverData,
      // Now that we have the main direction, chose from 3 caret placements for that direction
      caretDir: getCaretDir({ popoverSize, popoverDir, triggerRect, windowSize }),
      triggerRect,
      isScrollBoundaryContainer: !!containerNode,
    });

    return {
      caretOffset,
      popoverOffset,
      popoverDir,
    };
  }

  // Copy the popover DOM node to state. This is required because we need to
  // derive the popover location from it in getDerivedStateFromProps, and because
  // this method is static, it doesn't have access to the component instance.
  // Instead, we rely on React passing the state values into that method.
  setPopoverRef: (popoverRef: ?HTMLElement) => void = (popoverRef: ?HTMLElement) => {
    if (!this.state.popoverRef) {
      this.setState({ popoverRef });
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
    const { caretOffset, popoverOffset, popoverDir } = this.state;

    // Needed to prevent UI thrashing
    const visibility = popoverDir === null ? 'hidden' : 'visible';
    const background = bgColor === 'white' ? `${bgColor}BgElevated` : `${bgColor}Bg`;
    const stroke = bgColor === 'white' && !isDarkMode ? colorGray100 : null;
    const bgColorElevated = bgColor === 'white' ? 'whiteElevated' : bgColor;
    const isCaretVertical = ['down', 'up'].includes(popoverDir);

    return (
      <div
        className={styles.container}
        // popoverOffset positions the Popover component
        style={{ stroke, visibility, ...popoverOffset }}
      >
        <div
          className={classnames(
            rounding === 2 && borders.rounding2,
            rounding === 4 && borders.rounding4,
            styles.contents,
            styles.maxDimensions,
            width !== null && styles.minDimensions,
          )}
          ref={this.setPopoverRef}
          tabIndex={-1}
        >
          {caret && popoverDir && (
            <div
              className={classnames(colors[bgColorElevated], styles.caret)}
              // caretOffset positions the Caret on the Popover
              style={{ ...caretOffset }}
            >
              <Caret
                direction={popoverDir}
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
  const { scrollBoundaryContainerRef = null } = useScrollBoundaryContainer();

  return (
    <Contents
      {...props}
      colorGray100={colorGray100}
      isDarkMode={colorSchemeName === 'darkMode'}
      scrollBoundaryContainerRef={scrollBoundaryContainerRef}
    />
  );
}
