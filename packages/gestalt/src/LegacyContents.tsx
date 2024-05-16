import { Component, ReactNode } from 'react';
import classnames from 'classnames';
import borderStyles from './Borders.css';
import { Overflow } from './boxTypes';
import Caret from './Caret';
import styles from './Contents.css';
import { useScrollBoundaryContainer } from './contexts/ScrollBoundaryContainerProvider';
import layoutStyles from './Layout.css';
import {
  CaretOffset,
  ClientRect,
  Coordinates,
  DerivedState,
  MainDirections,
  PopoverDir,
} from './utils/positioningTypes';
import {
  adjustOffsets,
  baseOffsets,
  calcEdgeShifts,
  CARET_HEIGHT,
  CARET_WIDTH,
  getCaretDir,
  getContainerNode,
  getPopoverDir,
} from './utils/positioningUtils';
import { Indexable } from './zIndex';

export type Role = 'dialog' | 'listbox' | 'menu' | 'tooltip';

type OwnProps = {
  accessibilityLabel?: string;
  anchor: HTMLElement;
  bgColor: 'blue' | 'darkGray' | 'white';
  border?: boolean;
  caret?: boolean;
  children?: ReactNode;
  id: string | null | undefined;
  idealDirection?: MainDirections;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  onResize: () => void;
  positionRelativeToAnchor?: boolean;
  relativeOffset: Coordinates | null | undefined;
  role: Role | null | undefined;
  rounding?: 2 | 4;
  shouldFocus?: boolean;
  triggerRect: ClientRect | null | undefined;
  width: number | null | undefined;
  __dangerouslyIgnoreScrollBoundaryContainerSize?: boolean;
  zIndex?: Indexable;
  overflow?: Extract<Overflow, 'auto' | 'hidden' | 'visible'>;
};

type HookProps = {
  scrollBoundaryContainerRef: HTMLElement | null | undefined;
};

type Props = OwnProps & HookProps;

type State = {
  popoverOffset: {
    top: number | null | undefined;
    left: number | null | undefined;
  };
  caretOffset: CaretOffset;
  popoverDir: PopoverDir | null | undefined;
  popoverRef: HTMLElement | null | undefined;
};

class LegacyContents extends Component<Props, State> {
  static defaultProps: {
    border: boolean;
    caret: boolean;
  } = {
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
    // @ts-expect-error - TS2769 - No overload matches this call.
    window.addEventListener('keydown', onKeyDown);
  }

  componentWillUnmount() {
    const { onResize, onKeyDown } = this.props;

    window.removeEventListener('resize', onResize);
    // @ts-expect-error - TS2769 - No overload matches this call.
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
    } as const;

    const popoverSize = {
      height: popoverRef ? popoverRef.clientHeight : 0,
      width: (popoverRef ? popoverRef.clientWidth : width) || 0,
    } as const;
    const popoverDir = getPopoverDir({
      popoverSize,
      idealDirection,
      triggerRect,
      windowSize,
      isScrollBoundaryContainer: !!containerNode,
    });
    const popoverData = { popoverDir, popoverSize } as const;

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
      caretDir: getCaretDir({
        popoverSize,
        popoverDir,
        triggerRect,
        windowSize,
      }),
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
  setPopoverRef: (popoverRef?: HTMLElement | null | undefined) => void = (
    popoverRef?: HTMLElement | null,
  ) => {
    if (!this.state.popoverRef) {
      this.setState({ popoverRef });
    }
  };

  calcTopHeight(): {
    height: number | null | undefined;
    top: number | null | undefined;
  } {
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

    return {
      top: !positionRelativeToAnchor ? top : null,
      height: elementHeight,
    };
  }

  render(): ReactNode {
    const {
      accessibilityLabel,
      bgColor,
      border,
      caret,
      children,
      id,
      role,
      rounding,
      width,
      zIndex,
      overflow = 'auto',
    } = this.props;
    const { caretOffset, popoverOffset, popoverDir } = this.state;

    // Needed to prevent UI thrashing
    const visibility = popoverDir === null ? 'hidden' : 'visible';

    // @ts-expect-error - TS2345 - Argument of type 'string | null | undefined' is not assignable to parameter of type 'string'.
    const isCaretVertical = ['down', 'up'].includes(popoverDir);

    const { top, height } = this.calcTopHeight();
    // Top value is used only when the current top value is negative
    const topValue = top != null && (popoverOffset?.top ?? 0) < 0 ? { top } : {};

    return (
      <div
        ref={this.setPopoverRef}
        className={classnames(
          layoutStyles.absolute,
          layoutStyles.block,
          layoutStyles.borderBox,
          borderStyles.shadow,
          {
            [borderStyles.rounding2]: rounding === 2,
            [borderStyles.rounding4]: rounding === 4,
          },
        )}
        // popoverOffset positions the Popover component
        // @ts-expect-error - TS2322 - Type '{ top: number; left: number | null | undefined; zIndex: number | undefined; visibility: "hidden" | "visible"; } | { top: number | null | undefined; left: number | null | undefined; zIndex: number | undefined; visibility: "hidden" | "visible"; }' is not assignable to type 'CSSProperties | undefined'.
        style={{
          zIndex: zIndex ? zIndex?.index() : undefined,
          visibility,
          ...popoverOffset,
          ...topValue,
        }}
        // popoverOffset positions the Popover component
        tabIndex={-1}
      >
        {caret && popoverDir && (
          <div
            className={classnames(
              {
                [styles.caretPrimary]: bgColor === 'white',
                [styles.caretSecondary]: bgColor === 'darkGray',
                [styles.caretEducation]: bgColor === 'blue',
              },
              styles.caret,
            )}
            // caretOffset positions the Caret on the Popover
            // @ts-expect-error - TS2322 - Type '{ left: number | null; top: number | null; bottom: number | null; right: number | null; }' is not assignable to type 'Properties<string | number, string & {}>'.
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
          className={classnames(layoutStyles.relative, styles.maxDimensions, {
            [styles.minDimensions]: width !== null,
            [styles.border]: border,
            [styles.primary]: bgColor === 'white',
            [styles.secondary]: bgColor === 'darkGray',
            [styles.education]: bgColor === 'blue',
            [borderStyles.rounding2]: rounding === 2,
            [borderStyles.rounding4]: rounding === 4,
          })}
          // @ts-expect-error - TS2322 - Type 'string | null | undefined' is not assignable to type 'string | undefined'.
          id={id}
          // @ts-expect-error - TS2322 - Type 'Role | null | undefined' is not assignable to type 'AriaRole | undefined'.
          role={role}
          // @ts-expect-error - TS2322 - Type 'number | null | undefined' is not assignable to type 'MaxWidth<string | number> | undefined'. | TS2322 - Type 'number | null | undefined' is not assignable to type 'MaxHeight<string | number> | undefined'.
          style={{ maxWidth: width, maxHeight: height, overflow }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default function WrappedLegacyContents(props: OwnProps) {
  const { scrollBoundaryContainerRef = null } = useScrollBoundaryContainer();

  return <LegacyContents {...props} scrollBoundaryContainerRef={scrollBoundaryContainerRef} />;
}
