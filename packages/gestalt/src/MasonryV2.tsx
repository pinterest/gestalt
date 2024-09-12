import {
  forwardRef,
  memo,
  ReactNode,
  startTransition,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import debounce from './debounce';
import styles from './Masonry.css';
import { Cache } from './Masonry/Cache';
import recalcHeights from './Masonry/dynamicHeightsUtils';
import getLayoutAlgorithm from './Masonry/getLayoutAlgorithm';
import ItemResizeObserverWrapper from './Masonry/ItemResizeObserverWrapper';
import MeasurementStore from './Masonry/MeasurementStore';
import { ColumnSpanConfig, MULTI_COL_ITEMS_MEASURE_BATCH_SIZE } from './Masonry/multiColumnLayout';
import { getElementHeight, getRelativeScrollTop, getScrollPos } from './Masonry/scrollUtils';
import { Align, Layout, Position } from './Masonry/types';
import throttle from './throttle';

const RESIZE_DEBOUNCE = 300;

const layoutNumberToCssDimension = (n?: number | null) => (n !== Infinity ? n : undefined);

type Props<T> = {
  /**
   * Controls the horizontal alignment of items within the Masonry grid. The `align` property determines how items are aligned along the main-axis (horizontally) across multiple columns.
   * `start`: Aligns items to the start of the Masonry container. This is the default behavior where items are placed starting from the left side of the container.
   * `center`: Centers items in the Masonry grid. This will adjust the spacing on either side of the grid to ensure that the items are centered within the container.
   * `end`: Aligns items to the end of the Masonry container. Items will be placed starting from the right, moving leftwards, which may leave space on the left side of the container.
   * Using the `align` property can help control the visual balance and alignment of the grid, especially in responsive layouts or when dealing with varying item widths.
   *
   * _Note that layout='basic' must be set for align to take effect._
   */
  align?: Align;
  /**
   * The preferred/target item width in pixels. If `layout="flexible"` is set, the item width will
   * grow to fill column space, and shrink to fit if below the minimum number of columns.
   */
  columnWidth?: number;
  /**
   * The amount of vertical and horizontal space between each item, specified in pixels.
   */
  gutterWidth?: number;
  /**
   * An array of items to display that contains the data to be rendered by `renderItem`.
   */
  items: ReadonlyArray<T>;
  /**
   * `basic`: Left-aligned, fixed-column-width masonry layout.
   * `basicCentered`: Center-aligned, fixed-column-width masonry layout.
   * `flexible`: Item width grows to fill column space and shrinks to fit if below the minimum number of columns.
   * `serverRenderedFlexible`: Item width grows to fill column space and shrinks to fit if below the minimum number of columns. Main differerence with `flexible` is that we do not store the initial measurement. More context in [#2084](https://github.com/pinterest/gestalt/pull/2084)
   * `uniformRow`: Items are laid out in a single row, with all items having the same height. Note that Masonry does _not_ crop or alter items in any way — rows will take the height of the tallest item in the row, with additional whitespace shown below any shorter items.
   */
  layout?: Layout;
  /**
   * A callback fired when the user scrolls past a given threshold, based on the height of the container. The callback should update the state of the items, which must be reflected in the `items` prop.
   *
   * _Note that `scrollContainer` must be specified._
   */
  loadItems?: (
    arg1?:
      | {
          from: number;
        }
      | null
      | undefined,
  ) => void;
  /**
   * Masonry internally caches item heights using a measurement store. If `measurementStore` is provided, Masonry will use it as its cache and will keep it updated with future measurements. This is often used to prevent re-measurement when users navigate away from and back to a grid. Create a new measurement store with `Masonry.createMeasurementStore()`.
   */
  measurementStore?: Cache<T, number>;
  /**
   * Minimum number of columns to display, regardless of the container width.
   */
  minCols?: number;
  /**
   * Masonry internally caches positions using a position store. If `positionStore` is provided, Masonry will use it as its cache and will keep it updated with future positions.
   */
  positionStore?: Cache<T, Position>;
  /**
   * A function that renders the item you would like displayed in the grid. This function is passed three props: the item's data, the item's index in the grid, and a flag indicating if Masonry is currently measuring the item.
   *
   * If present, `heightAdjustment` indicates the number of pixels this item needs to grow/shrink to accommodate a 2-column item in the grid. Items must respond to this prop by adjusting their height or layout issues will occur.
   */
  renderItem: (arg1: {
    readonly data: T;
    readonly itemIdx: number;
    readonly isMeasuring: boolean;
  }) => ReactNode;
  /**
   * A function that returns a DOM node that Masonry uses for scroll event subscription. This DOM node is intended to be the most immediate ancestor of Masonry in the DOM that will have a scroll bar; in most cases this will be the `window` itself, although sometimes Masonry is used inside containers that have `overflow: auto`. `scrollContainer` is optional, although it is required for features such as `virtualize` and `loadItems`.
   *
   * This is required if the grid is expected to be scrollable.
   */
  scrollContainer?: () => HTMLElement;
  /**
   * If `virtualize` is enabled, Masonry will only render items that fit in the viewport, plus some buffer. `virtualBoundsBottom` allows customization of the buffer size below the viewport, specified in pixels.
   */
  virtualBoundsBottom?: number;
  /**
   * If `virtualize` is enabled, Masonry will only render items that fit in the viewport, plus some buffer. `virtualBoundsTop` allows customization of the buffer size above the viewport, specified in pixels.
   */
  virtualBoundsTop?: number;
  /**
   * If `virtualize` is enabled, Masonry will only render items that fit in the viewport, plus some buffer. `virtualBufferFactor` allows customization of the buffer size, specified as a multiplier of the container height. It specifies the amount of extra buffer space for populating visible items. For example, if `virtualBufferFactor` is 2, then Masonry will render items that fit in the viewport, plus 2x the viewport height.
   */
  virtualBufferFactor?: number;
  /**
   * Specifies whether or not Masonry dynamically adds/removes content from the grid based on the user's viewport and scroll position. Note that `scrollContainer` must be specified when virtualization is used.
   */
  virtualize?: boolean;
  /**
   * Experimental prop to log the additional whitespace shown above two-column items.
   *
   * This is an experimental prop and may be removed in the future.
   */
  _logTwoColWhitespace?: (arg1: ReadonlyArray<number>) => void;
  /**
   * Experimental prop to measure all items in one batch
   */
  _measureAll?: boolean;
  /**
   * Experimental prop to trigger rendering updates via requestAnimationFrame
   */
  _useRAF?: boolean;
  /**
   * Experimental prop to define how many columns a module should span. This is also used to enable multi-column support
   * _getColumnSpanConfig is a function that takes an individual grid item as an input and returns a ColumnSpanConfig. ColumnSpanConfig can be one of two things:
   * - A number, which indicates a static number of columns the item should span
   * - An object, which allows for configuration of the item's column span across the following grid sizes: sm (2 columns), md (3-4 columns), lg (5-8 columns), xl (9+ columns)
   *
   * This is an experimental prop and may be removed or changed in the future.
   */
  _getColumnSpanConfig?: (item: T) => ColumnSpanConfig;
  /**
   * Experimental flag to enable dynamic heights on items. This only works if multi column items are enabled.
   */
  _dynamicHeights?: boolean;
};

type MasonryRef = {
  readonly handleResize: () => void;
  readonly reflow: () => void;
  readonly state: {
    width: number | null | undefined;
  };
};

/**
 * [Masonry](https://gestalt.pinterest.systems/web/masonry) creates a deterministic grid layout, positioning items based on available vertical space. It contains performance optimizations like virtualization and support for infinite scrolling.
 *
 * ![Masonry light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Masonry.spec.ts-snapshots/Masonry-chromium-darwin.png)
 *
 */

function createMeasurementStore<T1 extends Record<any, any>, T2>(): MeasurementStore<T1, T2> {
  return new MeasurementStore();
}

// helper hook to force update a component
function useForceUpdate() {
  // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2. | TS7006 - Parameter 'x' implicitly has an 'any' type.
  const [, forceUpdate] = useReducer<number, undefined>((x) => x + 1, 0);
  return forceUpdate;
}

// useElementWidth returns the width of the gridWrapper element
// and uses useSyncExternalStore to subscribe to window resize events
function useElementWidth(element?: HTMLDivElement | null): [() => void, number | null | undefined] {
  const prevElementRef = useRef<HTMLDivElement | null | undefined>(null);
  const elementWidthRef = useRef<number | null | undefined>(null);

  // update elementWidthRef whenever element changes
  if (element && element !== prevElementRef.current) {
    elementWidthRef.current = element.clientWidth;
    prevElementRef.current = element;
  }

  const updateElementWidth = useCallback(() => {
    if (element) {
      elementWidthRef.current = element.clientWidth;
    }
  }, [element]);

  const subscribeToResizeEvent = useCallback(
    (callback: () => void) => {
      const handler = debounce(() => {
        // update elementWidthRef whenever we have a resize event
        updateElementWidth();
        callback();
      }, RESIZE_DEBOUNCE);
      window.addEventListener('resize', handler);
      return () => {
        window.removeEventListener('resize', handler);
      };
    },
    [updateElementWidth],
  );

  const width = useSyncExternalStore(
    subscribeToResizeEvent,
    () => elementWidthRef.current,
    () => null,
  );

  return [updateElementWidth, width];
}

function useScrollContainer({
  gridWrapper,
  scrollContainer,
}: {
  gridWrapper: HTMLElement | null | undefined;
  scrollContainer: HTMLElement | null | undefined;
}) {
  const containerHeight = useRef(0);
  const containerOffset = useRef(0);
  const scrollPos = useRef(0);

  const measureContainer = useCallback(() => {
    if (scrollContainer) {
      containerHeight.current = getElementHeight(scrollContainer);
      if (gridWrapper instanceof HTMLElement) {
        // todo - look into using IntersectionObserver instead
        containerOffset.current =
          gridWrapper.getBoundingClientRect().top + getRelativeScrollTop(scrollContainer);
      }
    }
  }, [gridWrapper, scrollContainer]);

  // created a debounced version of measureContainer to avoid measuring the container on every render
  // this is mostly because the calls to getBoundingClientRect are expensive and result in forced reflows
  const measureContainerAsync = useMemo(() => debounce(measureContainer, 100), [measureContainer]);

  if (containerHeight.current === 0 && containerOffset.current === 0) {
    // initialize value on first render
    // doing this here vs in the `useRef` to avoid measureContainer always being called
    // https://18.react.dev/reference/react/useRef#avoiding-recreating-the-ref-contents
    measureContainer();
  }

  const subscribeToScrollEvent = useCallback(
    (callback: () => void) => {
      const handler = throttle(() => {
        // update elementWidthRef whenever we have a resize event
        scrollPos.current = scrollContainer ? getScrollPos(scrollContainer) : 0;
        callback();
      });
      scrollContainer?.addEventListener('scroll', handler);
      return () => {
        scrollContainer?.removeEventListener('scroll', handler);
      };
    },
    [scrollContainer],
  );

  const scrollTop = useSyncExternalStore(
    subscribeToScrollEvent,
    () => scrollPos.current,
    () => 0,
  );

  useEffect(() => {
    // trigger an async measurement whenever an update occurs
    // todo - followup on this and figure out a more ideal way to handle this.
    measureContainerAsync();
  });

  return {
    containerHeight: containerHeight.current,
    containerOffset: containerOffset.current,
    scrollTop,
  };
}

function useFetchOnScroll({
  containerHeight,
  containerOffset,
  hasPendingMeasurements,
  height,
  items,
  loadItems,
  scrollTop,
  scrollContainerElement,
  width,
}: {
  containerHeight: number;
  containerOffset: number;
  hasPendingMeasurements: boolean;
  height: number;
  items: ReadonlyArray<unknown>;
  loadItems: (
    arg1?:
      | {
          from: number;
        }
      | null
      | undefined,
  ) => void;
  scrollTop: number;
  scrollContainerElement: HTMLElement | null | undefined;
  width: number | null | undefined;
}) {
  const isFetching = useRef<boolean>(false);
  const itemLength = items.length;
  const scrollHeight = height + containerOffset;
  const scrollBuffer = containerHeight * 3;
  const shouldFetchMore =
    loadItems &&
    typeof loadItems === 'function' &&
    scrollContainerElement &&
    width != null &&
    !isFetching.current &&
    !hasPendingMeasurements &&
    scrollTop + scrollBuffer > scrollHeight;

  useEffect(() => {
    // indicate that we're no longer fetching once we've detected a change in item length
    isFetching.current = false;
  }, [itemLength]);

  useEffect(() => {
    // after each render, if we've indicated that we should fetch more items, do so
    if (shouldFetchMore) {
      isFetching.current = true;
      loadItems({ from: itemLength });
    }
  });
}

function useLayout<T>({
  align,
  columnWidth,
  gutter,
  items,
  layout,
  measurementStore,
  minCols,
  positionStore,
  width,
  heightUpdateTrigger,
  _logTwoColWhitespace,
  _measureAll,
  _useRAF,
  _getColumnSpanConfig,
}: {
  align: Align;
  columnWidth: number;
  gutter?: number;
  items: ReadonlyArray<T>;
  layout: Layout;
  measurementStore: Cache<T, number>;
  minCols: number;
  positionStore: Cache<T, Position>;
  width: number | null | undefined;
  heightUpdateTrigger: number;
  _logTwoColWhitespace?: (arg1: ReadonlyArray<number>) => void;
  _measureAll?: boolean;
  _useRAF?: boolean;
  _getColumnSpanConfig?: (item: T) => ColumnSpanConfig;
}): {
  height: number;
  hasPendingMeasurements: boolean;
  positions: ReadonlyArray<Position | null | undefined>;
  updateMeasurement: (arg1: T, arg2: number) => void;
} {
  const hasMultiColumnItems =
    _getColumnSpanConfig &&
    items
      .filter((item) => item && !positionStore.has(item))
      .some((item) => _getColumnSpanConfig(item) !== 1);
  const itemToMeasureCount = hasMultiColumnItems ? MULTI_COL_ITEMS_MEASURE_BATCH_SIZE + 1 : minCols;
  const layoutFunction = getLayoutAlgorithm({
    align,
    columnWidth,
    gutter,
    items,
    layout,
    measurementStore,
    positionStore,
    minCols,
    width,
    _getColumnSpanConfig,
    _logTwoColWhitespace,
  });

  const itemMeasurements = items.filter((item) => measurementStore.has(item));
  const itemMeasurementsCount = itemMeasurements.length;
  const hasPendingMeasurements = itemMeasurementsCount < items.length;
  const canPerformLayout = width != null;

  const positions: ReadonlyArray<Position | null | undefined> = useMemo(() => {
    if (!canPerformLayout) {
      return [];
    }
    // we currently calculate positions separately for items that have been measured and items that haven't
    // maintain this paradigm for now for parity but ideally we should just able to pass all items to the layout function
    const itemsWithMeasurements = items.filter((item) => measurementStore.has(item));
    const itemsWithoutMeasurements = items.filter((item) => !measurementStore.has(item));
    const rawPositions = layoutFunction(itemsWithMeasurements).concat(
      layoutFunction(itemsWithoutMeasurements),
    );
    let measureItemCount = 0;
    return items.reduce<Array<any>>((acc: Array<Position | null | undefined>, item, i) => {
      const position = positionStore.get(item) ?? rawPositions[i];
      if (!position) {
        acc.push(null);
      } else {
        const hasMeasurement = measurementStore.has(item);
        if (hasMeasurement) {
          acc.push(position);
        } else if (_measureAll || measureItemCount < itemToMeasureCount) {
          acc.push(position);
          measureItemCount += 1;
        } else {
          acc.push(null);
        }
      }
      return acc;
    }, []);
    // only recalculate positions when certain things change
    // - items: if we get new items, we should always recalculate positions
    // - itemMeasurementsCount: if we have a change in the number of items we've measured, we should always recalculage
    // - canPerformLayout: if we don't have a width, we can't calculate positions yet. so recalculate once we're able to

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemMeasurementsCount, items, canPerformLayout, heightUpdateTrigger]);

  const forceUpdate = useForceUpdate();
  const rafId = useRef<number | null>(null);

  const updateMeasurement = useCallback(
    (item: T, itemHeight: number) => {
      measurementStore.set(item, itemHeight);
      // schedule state update either via startTransition or requestAnimationFrame depending on whether _useRAF is true.
      // requestAnimationFrame is to test parity with Masonry V1
      if (!_useRAF) {
        startTransition(() => {
          forceUpdate();
        });
      } else if (!rafId.current) {
        rafId.current = requestAnimationFrame(() => {
          rafId.current = null;
          forceUpdate();
        });
      }
    },
    [measurementStore, forceUpdate, _useRAF],
  );

  // Math.max() === -Infinity when there are no positions
  const height = positions.length
    ? Math.max(...positions.map((pos) => (pos && pos.top >= 0 ? pos.top + pos.height : 0)))
    : 0;

  return {
    hasPendingMeasurements,
    height,
    positions,
    updateMeasurement,
  };
}

function useViewport({
  containerHeight,
  containerOffset,
  scrollContainer,
  scrollTop,
  virtualBufferFactor,
  virtualBoundsTop,
  virtualBoundsBottom,
  virtualize,
}: {
  containerHeight: number;
  containerOffset: number;
  scrollContainer: HTMLElement | null | undefined;
  scrollTop: number;
  virtualBufferFactor: number;
  virtualBoundsTop: number | null | undefined;
  virtualBoundsBottom: number | null | undefined;
  virtualize: boolean;
}) {
  if (virtualize && scrollContainer && Boolean(virtualBufferFactor)) {
    const virtualBuffer = containerHeight * virtualBufferFactor;
    const offsetScrollPos = scrollTop - containerOffset;
    const viewportTop = virtualBoundsTop
      ? offsetScrollPos - virtualBoundsTop
      : offsetScrollPos - virtualBuffer;
    const viewportBottom = virtualBoundsBottom
      ? offsetScrollPos + containerHeight + virtualBoundsBottom
      : offsetScrollPos + containerHeight + virtualBuffer;

    return {
      viewportTop,
      viewportBottom,
    };
  }
  return {
    viewportTop: -Infinity,
    viewportBottom: Infinity,
  };
}

function MasonryItem<T>({
  height,
  idx,
  isMeasurement,
  isServerRenderOrHydration,
  item,
  layout,
  left,
  renderItem,
  serializedColumnSpanConfig,
  top,
  updateMeasurement,
  width,
  resizeObserver,
}: {
  height: number | null | undefined;
  idx: number;
  isMeasurement: boolean;
  isServerRenderOrHydration: boolean;
  item: T;
  left: number;
  layout: Layout;
  renderItem: Props<T>['renderItem'];
  serializedColumnSpanConfig: string | number;
  top: number;
  updateMeasurement: (arg1: T, arg2: number) => void;
  width: number | null | undefined;
  resizeObserver: any;
}) {
  // This isn't great since it currently returns false during server render/hydration and potentially true after
  // This should be revisited
  const isRtl =
    isServerRenderOrHydration || typeof document === 'undefined' ? false : document?.dir === 'rtl';
  const className = isServerRenderOrHydration ? 'static' : styles.Masonry__Item;
  const refCallback = isServerRenderOrHydration
    ? (el?: HTMLDivElement | null) => {
        // purposely not checking for layout === 'serverRenderedFlexible' here
        if (el && layout !== 'flexible') {
          // if we're hydrating from the server, we should only measure items on the initial render pass
          // if we're not rendering a flexible layout.  "serverRenderedFlexible" is an exception because we assume
          // that the caller has added the proper CSS to ensure the layout is correct during server render
          updateMeasurement(item, el.clientHeight);
        }
      }
    : (el?: HTMLDivElement | null) => {
        if (el && isMeasurement) {
          updateMeasurement(item, el.clientHeight);
        }
      };
  const style = isMeasurement
    ? {
        visibility: 'hidden',
        position: 'absolute',
        top: layoutNumberToCssDimension(top),
        left: layoutNumberToCssDimension(left),
        width: layoutNumberToCssDimension(width),
        height: layoutNumberToCssDimension(height),
      }
    : {
        top: 0,
        ...(isRtl ? { right: 0 } : { left: 0 }),
        transform: `translateX(${isRtl ? left * -1 : left}px) translateY(${top}px)`,
        WebkitTransform: `translateX(${isRtl ? left * -1 : left}px) translateY(${top}px)`,
        width: layoutNumberToCssDimension(width),
        height: layoutNumberToCssDimension(height),
      };
  return (
    <div
      ref={refCallback}
      className={className}
      data-column-span={serializedColumnSpanConfig}
      data-grid-item
      role="listitem"
      // @ts-expect-error - TS2322 - Type '{ visibility: string; position: string; top: number | null | undefined; left: number | null | undefined; width: number | null | undefined; height: number | null | undefined; } | { transform: string; ... 7 more ...; left?: undefined; } | { ...; }' is not assignable to type 'CSSProperties | undefined'.
      style={style}
    >
      <ItemResizeObserverWrapper idx={idx} resizeObserver={resizeObserver}>
        {renderItem({ data: item, itemIdx: idx, isMeasuring: isMeasurement })}
      </ItemResizeObserverWrapper>
    </div>
  );
}

const MasonryItemMemo = memo(MasonryItem) as typeof MasonryItem;

function Masonry<T>(
  {
    align = 'center',
    columnWidth = 236,
    gutterWidth: gutter,
    items,
    layout = 'basic',
    loadItems = () => {},
    measurementStore: measurementStoreProp,
    minCols = 3,
    positionStore: positionStoreProp,
    renderItem,
    scrollContainer,
    virtualBufferFactor = 0.7,
    virtualBoundsBottom,
    virtualBoundsTop,
    virtualize = false,
    _logTwoColWhitespace,
    _measureAll,
    _useRAF,
    _getColumnSpanConfig,
    _dynamicHeights,
  }: Props<T>,
  ref:
    | {
        current: null | MasonryRef;
      }
    | ((arg1: null | MasonryRef) => unknown),
) {
  const hasSetInitialWidth = useRef(false);
  const [gridWrapperEl, setGridWrapperEl] = useState<HTMLDivElement | null | undefined>(null);
  const gridWrapperRef = useCallback((el?: HTMLDivElement | null) => {
    if (el) {
      setGridWrapperEl(el);
    }
  }, []);

  const measurementStore: Cache<T, number> = useMemo(
    () => measurementStoreProp || createMeasurementStore(),
    [measurementStoreProp],
  );

  const positionStore: Cache<T, Position> = useMemo(
    () => positionStoreProp || createMeasurementStore(),
    [positionStoreProp],
  );

  const scrollContainerElement = useMemo(
    () => (typeof window !== 'undefined' ? scrollContainer?.() : null),
    [scrollContainer],
  );

  const [updateElementWidth, width] = useElementWidth(gridWrapperEl);
  const { containerHeight, containerOffset, scrollTop } = useScrollContainer({
    gridWrapper: gridWrapperEl,
    scrollContainer: scrollContainerElement,
  });

  const forceUpdate = useForceUpdate();

  const reflow = () => {
    measurementStore.reset();
    positionStore.reset();
    updateElementWidth();

    startTransition(() => {
      forceUpdate();
    });
  };

  // these are all for backwards compatibility with the old Masonry
  // will work on removing these once this lands
  useImperativeHandle(ref, () => ({
    handleResize: () => updateElementWidth(),
    reflow,
    state: {
      width,
    },
  }));

  // respond to changes in width (e.g. resize)
  useEffect(() => {
    if (hasSetInitialWidth.current && width != null) {
      // whenever the width changes, we need to reset all measurements
      // we only want to do this after the initial width has been set, so we use a ref to track that
      // reflow the grid
      reflow();
    }

    if (!hasSetInitialWidth.current && width != null) {
      hasSetInitialWidth.current = true;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const [heightUpdateTrigger, setHeightUpdateTrigger] = useState(0);

  const resizeObserver = useMemo(
    () =>
      _dynamicHeights && typeof window !== 'undefined' && positionStore
        ? new ResizeObserver((entries) => {
            let triggerUpdate = false;
            entries.forEach(({ target, contentRect }) => {
              const idx = Number(target.getAttribute('data-grid-item-idx'));

              if (typeof idx === 'number') {
                const changedItem: T = items[idx]!;

                triggerUpdate =
                  recalcHeights({
                    items,
                    changedItem,
                    newHeight: contentRect.height,
                    positionStore,
                    measurementStore,
                  }) || triggerUpdate;
              }
            });
            if (triggerUpdate) {
              setHeightUpdateTrigger((prev) => prev + 1);
            }
          })
        : undefined,
    [_dynamicHeights, items, measurementStore, positionStore],
  );

  const { hasPendingMeasurements, height, positions, updateMeasurement } = useLayout<T>({
    align,
    columnWidth,
    gutter,
    items,
    layout,
    measurementStore,
    minCols,
    positionStore,
    width,
    heightUpdateTrigger,
    _logTwoColWhitespace,
    _measureAll,
    _useRAF,
    _getColumnSpanConfig,
  });

  useFetchOnScroll({
    containerHeight,
    containerOffset,
    hasPendingMeasurements,
    height,
    items,
    loadItems,
    scrollTop,
    scrollContainerElement,
    width,
  });

  const isServerRenderOrHydration = width == null && hasPendingMeasurements;
  const canPerformFullLayout = width != null;

  const { viewportTop, viewportBottom } = useViewport({
    containerHeight,
    containerOffset,
    scrollContainer: scrollContainerElement,
    scrollTop,
    virtualBufferFactor,
    virtualBoundsTop,
    virtualBoundsBottom,
    virtualize,
  });

  const gridBody =
    isServerRenderOrHydration || canPerformFullLayout
      ? items.filter(Boolean).map((item, i) => {
          const key = `item-${i}`;
          const columnSpanConfig = _getColumnSpanConfig?.(item) ?? 1;
          const position = canPerformFullLayout
            ? positions[i]
            : {
                top: 0,
                left: 0,
                // we don't know the height yet when server rendering or hydrating
                height: undefined,
                width:
                  // eslint-disable-next-line no-nested-ternary
                  layout === 'flexible' ||
                  layout === 'serverRenderedFlexible' ||
                  typeof columnSpanConfig === 'object'
                    ? undefined // we can't set a width for server rendered flexible items
                    : typeof columnSpanConfig === 'number' && columnWidth != null && gutter != null
                    ? columnWidth * columnSpanConfig + gutter * (columnSpanConfig - 1)
                    : columnWidth,
              };

          if (!position) {
            return null;
          }

          const isMeasurement = canPerformFullLayout ? !measurementStore.has(item) : false;
          const isVisible =
            isServerRenderOrHydration || isMeasurement
              ? true
              : !(
                  position.top + (position.height ?? 0) < viewportTop ||
                  position.top > viewportBottom
                );

          const serializedColumnSpanConfig =
            typeof columnSpanConfig === 'number'
              ? columnSpanConfig
              : btoa(JSON.stringify(columnSpanConfig));

          return isVisible ? (
            <MasonryItemMemo
              key={key}
              height={position.height}
              idx={i}
              isMeasurement={isMeasurement}
              isServerRenderOrHydration={isServerRenderOrHydration}
              item={item}
              layout={layout}
              left={position.left}
              renderItem={renderItem}
              resizeObserver={resizeObserver}
              serializedColumnSpanConfig={serializedColumnSpanConfig}
              top={position.top}
              updateMeasurement={updateMeasurement}
              width={position.width}
            />
          ) : null;
        })
      : null;

  return (
    <div ref={gridWrapperRef} style={{ width: '100%' }}>
      {/* @ts-expect-error - TS2322 - Type 'number | null | undefined' is not assignable to type 'Width<string | number> | undefined'. */}
      <div className={styles.Masonry} role="list" style={{ height, width }}>
        {gridBody}
      </div>
    </div>
  );
}

const MasonryWithForwardRef = forwardRef<MasonryRef, Props<any>>(
  // @ts-expect-error - TS2345
  Masonry,
);

// @ts-expect-error - TS3339
MasonryWithForwardRef.createMeasurementStore = createMeasurementStore;

export default MasonryWithForwardRef;
