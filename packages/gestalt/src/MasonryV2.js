// @flow strict
import {
  forwardRef,
  type Node as ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
} from 'react';
import styles from './Masonry.css';
import { type Cache } from './Masonry/Cache';
import getLayoutAlgorithm from './Masonry/getLayoutAlgorithm';
import HeightsStore, { type HeightsStoreInterface } from './Masonry/HeightsStore';
import MeasurementStore from './Masonry/MeasurementStore';
import { getElementHeight, getRelativeScrollTop, getScrollPos } from './Masonry/scrollUtils';
import { type Layout, type Position } from './Masonry/types';

const layoutNumberToCssDimension = (n: ?number) => (n !== Infinity ? n : undefined);

type Props<T> = {
  /**
   * The preferred/target item width in pixels. If `layout="flexible"` is set, the item width will
   * grow to fill column space, and shrink to fit if below the minimum number of columns.
   */
  columnWidth?: number,
  /**
   * The amount of vertical and horizontal space between each item, specified in pixels.
   */
  gutterWidth?: number,
  /**
   * An array of items to display that contains the data to be rendered by `renderItem`.
   */
  items: $ReadOnlyArray<T>,
  /**
   * `basic`: Left-aligned, fixed-column-width masonry layout.
   * `basicCentered`: Center-aligned, fixed-column-width masonry layout.
   * `flexible`: Item width grows to fill column space and shrinks to fit if below the minimum number of columns.
   * `serverRenderedFlexible`: Item width grows to fill column space and shrinks to fit if below the minimum number of columns. Main differerence with `flexible` is that we do not store the initial measurement. More context in [#2084](https://github.com/pinterest/gestalt/pull/2084)
   * `uniformRow`: Items are laid out in a single row, with all items having the same height. Note that Masonry does _not_ crop or alter items in any way — rows will take the height of the tallest item in the row, with additional whitespace shown below any shorter items.
   */
  layout?: Layout,
  /**
   * A callback fired when the user scrolls past a given threshold, based on the height of the container. The callback should update the state of the items, which must be reflected in the `items` prop.
   *
   * _Note that `scrollContainer` must be specified._
   */
  loadItems?: (
    ?{
      from: number,
    },
  ) => void,
  /**
   * Masonry internally caches item heights using a measurement store. If `measurementStore` is provided, Masonry will use it as its cache and will keep it updated with future measurements. This is often used to prevent re-measurement when users navigate away from and back to a grid. Create a new measurement store with `Masonry.createMeasurementStore()`.
   */
  measurementStore?: Cache<T, number>,
  /**
   * Minimum number of columns to display, regardless of the container width.
   */
  minCols: number,
  /**
   * Masonry internally caches positions using a position store. If `positionStore` is provided, Masonry will use it as its cache and will keep it updated with future positions.
   */
  positionStore?: Cache<T, Position>,
  /**
   * A function that renders the item you would like displayed in the grid. This function is passed three props: the item's data, the item's index in the grid, and a flag indicating if Masonry is currently measuring the item.
   *
   * If present, `heightAdjustment` indicates the number of pixels this item needs to grow/shrink to accommodate a 2-column item in the grid. Items must respond to this prop by adjusting their height or layout issues will occur.
   */
  renderItem: ({
    +data: T,
    +itemIdx: number,
    +isMeasuring: boolean,
  }) => ReactNode,
  /**
   * A function that returns a DOM node that Masonry uses for scroll event subscription. This DOM node is intended to be the most immediate ancestor of Masonry in the DOM that will have a scroll bar; in most cases this will be the `window` itself, although sometimes Masonry is used inside containers that have `overflow: auto`. `scrollContainer` is optional, although it is required for features such as `virtualize` and `loadItems`.
   *
   * This is required if the grid is expected to be scrollable.
   */
  scrollContainer?: () => HTMLElement,
  /**
   * If `virtualize` is enabled, Masonry will only render items that fit in the viewport, plus some buffer. `virtualBoundsBottom` allows customization of the buffer size below the viewport, specified in pixels.
   */
  virtualBoundsBottom?: number,
  /**
   * If `virtualize` is enabled, Masonry will only render items that fit in the viewport, plus some buffer. `virtualBoundsTop` allows customization of the buffer size above the viewport, specified in pixels.
   */
  virtualBoundsTop?: number,
  /**
   * If `virtualize` is enabled, Masonry will only render items that fit in the viewport, plus some buffer. `virtualBufferFactor` allows customization of the buffer size, specified as a multiplier of the container height. It specifies the amount of extra buffer space for populating visible items. For example, if `virtualBufferFactor` is 2, then Masonry will render items that fit in the viewport, plus 2x the viewport height.
   */
  virtualBufferFactor?: number,
  /**
   * Specifies whether or not Masonry dynamically adds/removes content from the grid based on the user's viewport and scroll position. Note that `scrollContainer` must be specified when virtualization is used.
   */
  virtualize?: boolean,
  /**
   * Experimental prop to turn on support for items spanning two columns. Two-column items should include the optional `columnSpan` prop.
   *
   * This is an experimental prop and may be removed in the future.
   */
  _twoColItems?: boolean,
  /**
   * Experimental prop to log the additional whitespace shown above two-column items.
   *
   * This is an experimental prop and may be removed in the future.
   */
  _logTwoColWhitespace?: (number) => void,
};

type MasonryRef = {
  +reflow: () => void,
};

/**
 * [Masonry](https://gestalt.pinterest.systems/web/masonry) creates a deterministic grid layout, positioning items based on available vertical space. It contains performance optimizations like virtualization and support for infinite scrolling.
 *
 * ![Masonry light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Masonry.spec.mjs-snapshots/Masonry-chromium-darwin.png)
 *
 */

function createMeasurementStore<T1: { ... }, T2>(): MeasurementStore<T1, T2> {
  return new MeasurementStore();
}

function subscribeToResizeEvent(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => {
    window.removeEventListener('resize', callback);
  };
}

// helper hook to force update a component
function useForceUpdate() {
  const [, forceUpdate] = useReducer<number, void>((x) => x + 1, 0);
  return forceUpdate;
}

function useElementWidth(element: ?HTMLDivElement) {
  const getElementWidth = useCallback(() => {
    const elWidth = element?.clientWidth;
    return elWidth;
  }, [element]);

  const width = useSyncExternalStore(subscribeToResizeEvent, getElementWidth, () => null);
  return width;
}

function useScrollContainer({
  gridWrapper,
  scrollContainer,
}: {
  gridWrapper: ?HTMLElement,
  scrollContainer: ?HTMLElement,
}) {
  const subscribeToScrollEvent = useCallback(
    (callback: () => void) => {
      scrollContainer?.addEventListener('scroll', callback);
      return () => {
        scrollContainer?.removeEventListener('scroll', callback);
      };
    },
    [scrollContainer],
  );

  const scrollTop = useSyncExternalStore(
    subscribeToScrollEvent,
    () => (scrollContainer ? getScrollPos(scrollContainer) : 0),
    () => 0,
  );

  const containerHeight = useMemo(() => {
    if (!scrollContainer) {
      return 0;
    }
    return getElementHeight(scrollContainer);
  }, [scrollContainer]);

  const containerOffset = useMemo(() => {
    if (scrollContainer && gridWrapper instanceof HTMLElement) {
      const relativeScrollTop = getRelativeScrollTop(scrollContainer);
      return gridWrapper.getBoundingClientRect().top + relativeScrollTop;
    }
    return 0;
  }, [gridWrapper, scrollContainer]);

  return {
    containerHeight,
    containerOffset,
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
}: {
  containerHeight: number,
  containerOffset: number,
  hasPendingMeasurements: boolean,
  height: number,
  items: $ReadOnlyArray<mixed>,
  loadItems: (
    ?{
      from: number,
    },
  ) => void,
  scrollTop: number,
  scrollContainerElement: ?HTMLElement,
}) {
  const isFetching = useRef<boolean>(false);
  const itemLength = items.length;

  useEffect(() => {
    isFetching.current = false;
  }, [itemLength]);

  useEffect(() => {
    const shouldFetchMore = !(isFetching.current || hasPendingMeasurements);
    if (scrollContainerElement && loadItems && typeof loadItems === 'function' && shouldFetchMore) {
      const scrollHeight = height + containerOffset;
      const scrollBuffer = containerHeight * 3;
      if (scrollTop + scrollBuffer > scrollHeight) {
        isFetching.current = true;
        loadItems({ from: itemLength });
      }
    }
  }, [
    containerOffset,
    hasPendingMeasurements,
    height,
    itemLength,
    loadItems,
    scrollTop,
    scrollContainerElement,
    containerHeight,
  ]);
}

function useLayout<T: { +[string]: mixed }>({
  columnWidth,
  gutter,
  heightsStore,
  items,
  layout,
  measurementStore,
  minCols,
  positionStore,
  width,
  _twoColItems,
  _logTwoColWhitespace,
}: {
  columnWidth: number,
  gutter?: number,
  heightsStore: HeightsStoreInterface,
  items: $ReadOnlyArray<T>,
  layout: Layout,
  measurementStore: Cache<T, number>,
  minCols: number,
  positionStore: Cache<T, Position>,
  width: ?number,
  _twoColItems?: boolean,
  _logTwoColWhitespace?: (number) => void,
}): {
  height: number,
  hasPendingMeasurements: boolean,
  positions: $ReadOnlyArray<?Position>,
  updateMeasurement: (T, number) => void,
} {
  const itemToMeasureCount = minCols;
  const forceUpdate = useForceUpdate();
  const layoutFunction = getLayoutAlgorithm({
    columnWidth,
    gutter,
    heightsStore,
    items,
    layout,
    measurementStore,
    positionStore,
    minCols,
    width,
    _twoColItems,
    _logTwoColWhitespace,
  });

  const calculatePositions = () => {
    console.log('calculate positions');
    const rawPositions = layoutFunction(items);
    let measureItemCount = 0;
    // eslint-disable-next-line flowtype/no-mutable-array
    return items.reduce((acc: Array<?Position>, item, i) => {
      const position = positionStore.get(item) ?? rawPositions[i];
      if (!position) {
        acc.push(null);
      } else {
        const isMeasuring = position.top < 0 && position.left < 0;
        if (isMeasuring) {
          if (measureItemCount < itemToMeasureCount) {
            acc.push(position);
            measureItemCount += 1;
          } else {
            acc.push(null);
          }
        } else {
          acc.push(position);
        }
      }
      return acc;
    }, []);
  };

  const hasPendingMeasurements = items.some((item) => !!item && !measurementStore.has(item));
  const positions = calculatePositions();
  const updateMeasurement = (item: T, itemHeight: number) => {
    measurementStore.set(item, itemHeight);
    // force update to retrigger position calculations
    forceUpdate();
  };

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

function Masonry<T: { +[string]: mixed }>(
  props: Props<T>,
  ref: { current: ?MasonryRef },
): ReactNode {
  const {
    columnWidth = 236,
    gutterWidth: gutter,
    items,
    layout = 'basic',
    loadItems = () => {},
    minCols = 3,
    renderItem,
    scrollContainer,
    virtualBufferFactor = 0.7,
    virtualBoundsBottom,
    virtualBoundsTop,
    virtualize = false,
    _twoColItems,
    _logTwoColWhitespace,
  } = props;

  const hasSetInitialWidth = useRef(false);
  const gridWrapperRef = useRef<?HTMLDivElement>();
  const heightsStore = useMemo(() => new HeightsStore(), []);

  const measurementStore = useMemo(
    () => props.measurementStore || createMeasurementStore(),
    [props.measurementStore],
  );

  const positionStore = useMemo(
    () => props.positionStore || createMeasurementStore(),
    [props.positionStore],
  );

  const scrollContainerElement = useMemo(
    () => (typeof window !== 'undefined' ? scrollContainer?.() : null),
    [scrollContainer],
  );
  const width = useElementWidth(gridWrapperRef.current);
  const { containerHeight, containerOffset, scrollTop } = useScrollContainer({
    gridWrapper: gridWrapperRef.current,
    scrollContainer: scrollContainerElement,
  });
  const [isPending, startTransition] = useTransition();
  const forceUpdate = useForceUpdate();

  useImperativeHandle(ref, () => ({
    reflow: () => {
      measurementStore.reset();
      positionStore.reset();
      heightsStore.reset();

      startTransition(() => {
        forceUpdate();
      });
    },
  }));

  useEffect(() => {
    if (hasSetInitialWidth.current && width != null) {
      // whenever the width changes, we need to reset all measurements
      // we only want to do this after the initial width has been set, so we use a ref to track that
      measurementStore.reset();
      positionStore.reset();
      heightsStore.reset();
    }

    if (!hasSetInitialWidth.current && width != null) {
      hasSetInitialWidth.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  let gridBody = null;

  const { hasPendingMeasurements, height, positions, updateMeasurement } = useLayout({
    columnWidth,
    gutter,
    heightsStore,
    items,
    layout,
    measurementStore,
    minCols,
    positionStore,
    width,
    _twoColItems,
    _logTwoColWhitespace,
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
  });

  console.log({ containerHeight, containerOffset, height, items, isPending, positions, scrollTop });

  if (width == null && hasPendingMeasurements) {
    // When hyrdating from a server render, we don't have the width of the grid
    // and the measurement store is empty

    gridBody = (
      <div className={styles.Masonry} role="list" style={{ height: 0, width }}>
        {items.filter(Boolean).map((item, i) => (
          <div // keep this in sync with renderMasonryComponent
            // eslint-disable-next-line react/no-array-index-key
            key={`item-${i}`}
            ref={(el) => {
              // purposely not checking for layout === 'serverRenderedFlexible' here
              if (el && layout !== 'flexible') {
                // if we're hydrating from the server, we should only measure items on the initial render pass
                // if we're not rendering a flexible layout.  "serverRenderedFlexible" is an exception because we assume
                // that the caller has added the proper CSS to ensure the layout is correct during server render
                measurementStore.set(item, el.clientHeight);
              }
            }}
            className="static"
            data-column-span={item.columnSpan ?? 1}
            data-grid-item
            role="listitem"
            style={{
              top: 0,
              left: 0,
              transform: 'translateX(0px) translateY(0px)',
              WebkitTransform: 'translateX(0px) translateY(0px)',
              width:
                layout === 'flexible' || layout === 'serverRenderedFlexible'
                  ? undefined // we can't set a width for server rendered flexible items
                  : layoutNumberToCssDimension(
                      typeof item.columnSpan === 'number' && columnWidth != null && gutter != null
                        ? columnWidth * item.columnSpan + gutter * (item.columnSpan - 1)
                        : columnWidth,
                    ),
            }}
          >
            {renderItem({ data: item, itemIdx: i, isMeasuring: false })}
          </div>
        ))}
      </div>
    );
  } else if (width != null) {
    // This assumes `document.dir` exists, since this method is only invoked
    // on the client. If that assumption changes, this will need to be revisited
    const isRtl = document?.dir === 'rtl';

    gridBody = (
      <div className={styles.Masonry} role="list" style={{ height, width }}>
        {items.map((item, i) => {
          const key = `item-${i}`;
          const position = positions[i];
          if (!position) {
            return null;
          }
          const isMeasurement = position.top < 0 && position.left < 0;
          const style = isMeasurement
            ? {
                visibility: 'hidden',
                position: 'absolute',
                top: layoutNumberToCssDimension(position.top),
                left: layoutNumberToCssDimension(position.left),
                width: layoutNumberToCssDimension(position.width),
                height: layoutNumberToCssDimension(position.height),
              }
            : {
                top: 0,
                ...(isRtl ? { right: 0 } : { left: 0 }),
                transform: `translateX(${
                  isRtl ? position.left * -1 : position.left
                }px) translateY(${position.top}px)`,
                WebkitTransform: `translateX(${
                  isRtl ? position.left * -1 : position.left
                }px) translateY(${position.top}px)`,
                width: layoutNumberToCssDimension(position.width),
                height: layoutNumberToCssDimension(position.height),
              };
          let isVisible = true;

          if (scrollContainer && Boolean(virtualBufferFactor) && !isMeasurement) {
            const virtualBuffer = containerHeight * virtualBufferFactor;
            const offsetScrollPos = scrollTop - containerOffset;
            const viewportTop = virtualBoundsTop
              ? offsetScrollPos - virtualBoundsTop
              : offsetScrollPos - virtualBuffer;
            const viewportBottom = virtualBoundsBottom
              ? offsetScrollPos + containerHeight + virtualBoundsBottom
              : offsetScrollPos + containerHeight + virtualBuffer;

            isVisible = !(
              position.top + position.height < viewportTop || position.top > viewportBottom
            );
          } else {
            // if no scroll container is passed in, items should always be visible
            isVisible = true;
          }

          const itemComponent = (
            <div
              key={key}
              ref={(el) => {
                if (el && isMeasurement) {
                  startTransition(() => {
                    updateMeasurement(item, el.clientHeight);
                  });
                }
              }}
              className={[styles.Masonry__Item].join(' ')}
              data-grid-item
              role="listitem"
              style={style}
            >
              {renderItem({ data: item, itemIdx: i, isMeasuring: isMeasurement })}
            </div>
          );

          return virtualize ? (isVisible && itemComponent) || null : itemComponent;
        })}
      </div>
    );
  }

  return (
    <div ref={gridWrapperRef} style={{ width: '100%' }}>
      {gridBody}
    </div>
  );
}

// const { itemsToRender, itemsToMeasure, positions, updateMeasurement } = useLayout();

const MasonryWithForwardRef: AbstractComponent<Props, ?MasonryRef> = forwardRef(Masonry);

MasonryWithForwardRef.createMeasurementStore = createMeasurementStore;

export default MasonryWithForwardRef;
