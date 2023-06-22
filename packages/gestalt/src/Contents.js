// @flow strict
import { Component, type Node } from 'react';
import classnames from 'classnames';
import borders from './Borders.css';
import Caret from './Caret.js';
import colors from './Colors.css';
import styles from './Contents.css';
import { useScrollBoundaryContainer } from './contexts/ScrollBoundaryContainerProvider.js';
import {
  type CaretOffset,
  type ClientRect,
  type Coordinates,
  type DerivedState,
  type MainDirections,
  type PopoverDir,
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

export type Role = 'dialog' | 'listbox' | 'menu' | 'tooltip';

type OwnProps = {|
  accessibilityLabel?: string,
  anchor: HTMLElement,
  bgColor: 'blue' | 'darkGray' | 'orange' | 'red' | 'white',
  border?: boolean,
  caret?: boolean,
  children?: Node,
  id: ?string,
  idealDirection?: MainDirections,
  onKeyDown: (event: SyntheticKeyboardEvent<HTMLElement>) => void,
  onResize: () => void,
  positionRelativeToAnchor?: boolean,
  relativeOffset: ?Coordinates,
  role: ?Role,
  rounding?: 2 | 4,
  shouldFocus?: boolean,
  triggerRect: ?ClientRect,
  width: ?number,
  __dangerouslyIgnoreScrollBoundaryContainerSize?: boolean,
|};

type HookProps = {|
  scrollBoundaryContainerRef: ?HTMLElement,
|};

type Props = {| ...OwnProps, ...HookProps |};

type State = {|
  popoverOffset: {|
    top: ?number,
    left: ?number,
  |},
  caretOffset: CaretOffset,
  popoverDir: ?PopoverDir,
  popoverRef: ?HTMLElement,
|};

class Contents extends Component<Props, State> {
  static defaultProps: {| border: boolean, caret: boolean |} = {
    border: true,
    caret: true,
  };

  state: State = {
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
    const { onResize, onKeyDown, shouldFocus } = this.props;
    const { popoverRef } = this.state;

    function focusPopoverRef() {
      if (shouldFocus && popoverRef) {
        popoverRef.focus();
      }
      requestAnimationFrame(focusPopoverRef);
    }

    focusPopoverRef();
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

  calcTopHeight(): {| height: ?number, top: ?number |} {
    if (!window || !document) {
      return { top: null, height: null };
    }

    const {
      __dangerouslyIgnoreScrollBoundaryContainerSize,
      scrollBoundaryContainerRef,
      positionRelativeToAnchor,
    } = this.props;

    // Define the height based the reference to render: ScrollBoundaryContainer or screen viewport
    let height = window.innerHeight ?? 0;
    if (!__dangerouslyIgnoreScrollBoundaryContainerSize && scrollBoundaryContainerRef) {
      height = scrollBoundaryContainerRef.offsetHeight;
    }

    // 5% of height available
    const top = (height / 10) * 0.5;

    // 90% of height available on container reference
    const elementHeight = (height / 10) * 9;

    return { top: !positionRelativeToAnchor ? top : null, height: elementHeight };
  }

  render(): Node {
    const { accessibilityLabel, bgColor, border, caret, children, id, role, rounding, width } =
      this.props;
    const { caretOffset, popoverOffset, popoverDir } = this.state;

    // Needed to prevent UI thrashing
    const visibility = popoverDir === null ? 'hidden' : 'visible';
    const background = bgColor === 'white' ? `${bgColor}BgElevated` : `${bgColor}Bg`;
    const bgColorElevated = bgColor === 'white' ? 'whiteElevated' : bgColor;
    const isCaretVertical = ['down', 'up'].includes(popoverDir);

    const { top, height } = this.calcTopHeight();
    // Top value is used only when the current top value is negative
    const topValue = top != null && (popoverOffset?.top ?? 0) < 0 ? { top } : {};

    return (
      <div
        className={classnames(
          styles.container,
          rounding === 2 && borders.rounding2,
          rounding === 4 && borders.rounding4,
          styles.contents,
          styles.maxDimensions,
          width !== null && styles.minDimensions,
        )}
        ref={this.setPopoverRef}
        tabIndex={-1}
        // popoverOffset positions the Popover component
        style={{ visibility, ...popoverOffset, ...topValue }}
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
          aria-label={accessibilityLabel}
          id={id}
          role={role}
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
          style={{ maxWidth: width, maxHeight: height }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default function WrappedContents(props: OwnProps): Node {
  const { scrollBoundaryContainerRef = null } = useScrollBoundaryContainer();

  return <Contents {...props} scrollBoundaryContainerRef={scrollBoundaryContainerRef} />;
}
