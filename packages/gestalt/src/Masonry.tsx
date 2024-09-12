import { Component as ReactComponent, ReactNode } from 'react';
import debounce, { DebounceReturn } from './debounce';
import FetchItems from './FetchItems';
import styles from './Masonry.css';
import { Cache } from './Masonry/Cache';
import defaultLayout from './Masonry/defaultLayout';
import recalcHeights from './Masonry/dynamicHeightsUtils';
import fullWidthLayout from './Masonry/fullWidthLayout';
import ItemResizeObserverWrapper from './Masonry/ItemResizeObserverWrapper';
import MeasurementStore from './Masonry/MeasurementStore';
import { ColumnSpanConfig, MULTI_COL_ITEMS_MEASURE_BATCH_SIZE } from './Masonry/multiColumnLayout';
import ScrollContainer from './Masonry/ScrollContainer';
import { getElementHeight, getRelativeScrollTop, getScrollPos } from './Masonry/scrollUtils';
import { Align, Layout, LoadingStateItem, Position } from './Masonry/types';
import uniformRowLayout from './Masonry/uniformRowLayout';
import throttle, { ThrottleReturn } from './throttle';

const RESIZE_DEBOUNCE = 300;

const layoutNumberToCssDimension = (n?: number | null) => {
  if (n) {
    return n !== Infinity ? n : undefined;
  }
  return undefined;
};

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
  minCols: number;
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
   * Experimental prop to define how many columns a module should span. This is also used to enable multi-column support
   * _getColumnSpanConfig is a function that takes an individual grid item as an input and returns a ColumnSpanConfig. ColumnSpanConfig can be one of two things:
   * - A number, which indicates a static number of columns the item should span
   * - An object, which allows for configuration of the item's column span across the following grid sizes: sm (2 columns), md (3-4 columns), lg (5-8 columns), xl (9+ columns)
   *
   * This is an experimental prop and may be removed or changed in the future.
   */
  _getColumnSpanConfig?: (item: T) => ColumnSpanConfig;
  /**
   * An array of items to display that contains the data to be rendered by `_renderLoadingStateItems`.
   */
  _loadingStateItems?: ReadonlyArray<LoadingStateItem>;
  /**
   * Experimental prop to render a loading state
   *
   * A function that renders the loading state items you would like displayed in the grid. This function is passed two props: the item's data and the item's index in the grid.
   */
  _renderLoadingStateItems?: (arg1: {
    readonly data: LoadingStateItem;
    readonly itemIdx: number;
  }) => ReactNode;
  /**
   * Experimental flag to enable dynamic heights on items. This only works if multi column items are enabled.
   */
  _dynamicHeights?: boolean;
};

type State<T> = {
  hasPendingMeasurements: boolean;
  isFetching: boolean;
  items: ReadonlyArray<T>;
  measurementStore: Cache<T, number>;
  scrollTop: number;
  width: number | null | undefined;
};

/**
 * [Masonry](https://gestalt.pinterest.systems/web/masonry) creates a deterministic grid layout, positioning items based on available vertical space. It contains performance optimizations like virtualization and support for infinite scrolling.
 *
 * ![Masonry light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Masonry.spec.ts-snapshots/Masonry-chromium-darwin.png)
 *
 */
export default class Masonry<T> extends ReactComponent<Props<T>, State<T>> {
  static createMeasurementStore<T1 extends Record<any, any>, T2>(): MeasurementStore<T1, T2> {
    return new MeasurementStore();
  }

  static defaultProps: {
    align?: Align;
    columnWidth?: number;
    layout?: Layout;
    loadItems?: (
      arg1?:
        | {
            from: number;
          }
        | null
        | undefined,
    ) => void;
    minCols: number;
    virtualBufferFactor: number;
    virtualize?: boolean;
  } = {
    columnWidth: 236,
    align: 'center',
    minCols: 3,
    layout: 'basic',
    loadItems: () => {},
    virtualBufferFactor: 0.7,
    virtualize: false,
  };

  static displayName: string | null | undefined = 'Masonry';

  constructor(props: Props<T>) {
    super(props);

    this.containerHeight = 0;
    this.containerOffset = 0;

    const measurementStore: Cache<T, number> =
      props.measurementStore || Masonry.createMeasurementStore();

    this.positionStore = props.positionStore || Masonry.createMeasurementStore();

    this.resizeObserver =
      /* eslint-disable-next-line no-underscore-dangle */
      props._dynamicHeights && typeof window !== 'undefined' && this.positionStore
        ? new ResizeObserver((entries) => {
            let triggerUpdate = false;
            entries.forEach(({ target, contentRect }) => {
              const idx = Number(target.getAttribute('data-grid-item-idx'));

              if (typeof idx === 'number') {
                const changedItem: T = this.state.items[idx]!;
                const newHeight = contentRect.height;

                triggerUpdate =
                  recalcHeights({
                    items: this.state.items,
                    changedItem,
                    newHeight,
                    positionStore: this.positionStore,
                    measurementStore: this.state.measurementStore,
                  }) || triggerUpdate;
              }
            });
            if (triggerUpdate) {
              this.forceUpdate();
            }
          })
        : undefined;

    this.state = {
      hasPendingMeasurements: props.items.some((item) => !!item && !measurementStore.has(item)),
      isFetching: false,
      items: props.items,
      measurementStore,
      scrollTop: 0,
      width: undefined,
    };
  }

  resizeObserver: ResizeObserver | undefined;

  containerHeight: number;

  containerOffset: number;

  gridWrapper: HTMLElement | null | undefined;

  positionStore: Cache<T, Position>;

  insertAnimationFrame: number | null = null;

  scrollContainer: ScrollContainer | null | undefined;

  /**
   * Delays resize handling in case the scroll container is still being resized.
   */
  handleResize: DebounceReturn = debounce(() => {
    if (this.gridWrapper) {
      this.setState({ width: this.gridWrapper.clientWidth });
    }
  }, RESIZE_DEBOUNCE);

  // Using throttle here to schedule the handler async, outside of the event
  // loop that produced the event.
  updateScrollPosition: ThrottleReturn = throttle(() => {
    if (!this.scrollContainer) {
      return;
    }
    const scrollContainer = this.scrollContainer.getScrollContainerRef();

    if (!scrollContainer) {
      return;
    }

    this.setState({
      scrollTop: getScrollPos(scrollContainer),
    });
  });

  measureContainerAsync: DebounceReturn = debounce(() => {
    this.measureContainer();
  }, 0);

  /**
   * Adds hooks after the component mounts.
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);

    this.measureContainer();

    let { scrollTop } = this.state;
    if (this.scrollContainer != null) {
      const scrollContainer = this.scrollContainer.getScrollContainerRef();
      if (scrollContainer) {
        scrollTop = getScrollPos(scrollContainer);
      }
    }

    this.setState((prevState) => ({
      scrollTop,
      width: this.gridWrapper ? this.gridWrapper.clientWidth : prevState.width,
    }));
  }

  componentDidUpdate(prevProps: Props<T>, prevState: State<T>) {
    const { items } = this.props;
    const { measurementStore } = this.state;

    this.measureContainerAsync();

    if (prevState.width != null && this.state.width !== prevState.width) {
      measurementStore.reset();
      this.positionStore.reset();
    }
    // calculate whether we still have pending measurements
    const hasPendingMeasurements = items.some((item) => !!item && !measurementStore.has(item));

    // Per Yen-Wei, we may be able to remove this after https://github.com/pinterest/gestalt/pull/228
    if (
      hasPendingMeasurements ||
      hasPendingMeasurements !== this.state.hasPendingMeasurements ||
      prevState.width == null
    ) {
      // This helps prevent jank
      // Revisit this with React 18!
      this.insertAnimationFrame = requestAnimationFrame(() => {
        this.setState({
          hasPendingMeasurements,
        });
      });
    }
  }

  /**
   * Remove listeners when unmounting.
   */
  componentWillUnmount() {
    if (this.insertAnimationFrame) {
      cancelAnimationFrame(this.insertAnimationFrame);
    }

    // Make sure async methods are cancelled.
    this.measureContainerAsync.clearTimeout();
    this.handleResize.clearTimeout();
    this.updateScrollPosition.clearTimeout();

    window.removeEventListener('resize', this.handleResize);
  }

  static getDerivedStateFromProps<K>(
    props: Props<K>,
    state: State<K>,
  ): null | {
    hasPendingMeasurements: boolean;
    isFetching?: boolean;
    items: ReadonlyArray<K>;
  } {
    const { items } = props;
    const { measurementStore } = state;

    // whenever we're receiving new props, determine whether any items need to be measured
    // TODO - we should treat items as immutable
    const hasPendingMeasurements = items.some((item) => !measurementStore.has(item));

    // Shallow compare all items, if any change reflow the grid.
    for (let i = 0; i < items.length; i += 1) {
      // We've reached the end of our current props and everything matches.
      // If we hit this case it means we need to insert new items.
      if (state.items[i] === undefined) {
        return {
          hasPendingMeasurements,
          items,
          isFetching: false,
        };
      }

      // Reset grid items when:
      if (
        // An item object ref does not match.
        items[i] !== state.items[i] ||
        // Or less items than we currently have are passed in.
        items.length < state.items.length
      ) {
        return {
          hasPendingMeasurements,
          items,
          isFetching: false,
        };
      }
    }

    // Reset items if new items array is empty.
    if (items.length === 0 && state.items.length > 0) {
      return {
        hasPendingMeasurements,
        items,
        isFetching: false,
      };
    }
    if (hasPendingMeasurements !== state.hasPendingMeasurements) {
      // make sure we always update hasPendingMeasurements
      return {
        hasPendingMeasurements,
        items,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  setGridWrapperRef: (ref?: HTMLElement | null | undefined) => void = (
    ref?: HTMLElement | null,
  ) => {
    this.gridWrapper = ref;
  };

  setScrollContainerRef: (ref?: ScrollContainer | null | undefined) => void = (
    ref?: ScrollContainer | null,
  ) => {
    this.scrollContainer = ref;
  };

  fetchMore: () => void = () => {
    const { loadItems, items } = this.props;
    if (loadItems && typeof loadItems === 'function') {
      this.setState(
        {
          isFetching: true,
        },
        () => loadItems({ from: items.length }),
      );
    }
  };

  measureContainer() {
    if (this.scrollContainer != null) {
      const { scrollContainer } = this;
      const scrollContainerRef = scrollContainer.getScrollContainerRef();
      if (scrollContainerRef) {
        this.containerHeight = getElementHeight(scrollContainerRef);
        const el = this.gridWrapper;
        if (el instanceof HTMLElement) {
          const relativeScrollTop = getRelativeScrollTop(scrollContainerRef);
          this.containerOffset = el.getBoundingClientRect().top + relativeScrollTop;
        }
      }
    }
  }

  /**
   * Clear measurements/positions and force a reflow of the entire grid.
   * Only use this if absolutely necessary - ex: We need to reflow items if the
   * number of columns we would display should change after a resize.
   */
  reflow() {
    const { measurementStore } = this.props;

    if (measurementStore) {
      measurementStore.reset();
    }
    this.state.measurementStore.reset();
    this.positionStore.reset();

    this.measureContainer();
    this.forceUpdate();
  }

  renderMasonryComponent: (itemData: T, idx: number, position: Position) => ReactNode = (
    itemData,
    idx,
    position,
  ) => {
    const {
      renderItem,
      scrollContainer,
      virtualize,
      virtualBoundsTop,
      virtualBoundsBottom,
      virtualBufferFactor,
    } = this.props;
    const { top, left, width, height } = position;

    let isVisible;
    if (scrollContainer && virtualBufferFactor) {
      const virtualBuffer = this.containerHeight * virtualBufferFactor;
      const offsetScrollPos = this.state.scrollTop - this.containerOffset;
      const viewportTop = virtualBoundsTop
        ? offsetScrollPos - virtualBoundsTop
        : offsetScrollPos - virtualBuffer;
      const viewportBottom = virtualBoundsBottom
        ? offsetScrollPos + this.containerHeight + virtualBoundsBottom
        : offsetScrollPos + this.containerHeight + virtualBuffer;

      isVisible = !(position.top + position.height < viewportTop || position.top > viewportBottom);
    } else {
      // if no scroll container is passed in, items should always be visible
      isVisible = true;
    }

    // This assumes `document.dir` exists, since this method is only invoked
    // on the client. If that assumption changes, this will need to be revisited
    const isRtl = document?.dir === 'rtl';

    const itemComponent = (
      <div
        key={`item-${idx}`}
        className={[styles.Masonry__Item, styles.Masonry__Item__Mounted].join(' ')}
        data-grid-item
        role="listitem"
        style={{
          top: 0,
          ...(isRtl ? { right: 0 } : { left: 0 }),
          transform: `translateX(${isRtl ? left * -1 : left}px) translateY(${top}px)`,
          WebkitTransform: `translateX(${isRtl ? left * -1 : left}px) translateY(${top}px)`,
          width: layoutNumberToCssDimension(width),
          height: layoutNumberToCssDimension(height),
        }}
      >
        <ItemResizeObserverWrapper idx={idx} resizeObserver={this.resizeObserver}>
          {renderItem({ data: itemData, itemIdx: idx, isMeasuring: false })}
        </ItemResizeObserverWrapper>
      </div>
    );

    return virtualize ? (isVisible && itemComponent) || null : itemComponent;
  };

  renderLoadingStateComponent: ({
    itemData,
    idx,
    position,
  }: {
    itemData: LoadingStateItem;
    idx: number;
    position: Position;
  }) => ReactNode = ({ itemData, idx, position }) => {
    const { _renderLoadingStateItems } = this.props;
    const { top, left, width, height } = position;

    if (_renderLoadingStateItems) {
      return (
        <div
          key={`item-${idx}`}
          className={[styles.Masonry__Item, styles.Masonry__Item__Mounted].join(' ')}
          data-grid-item
          role="listitem"
          style={{
            top,
            left,
            width: layoutNumberToCssDimension(width),
            height: layoutNumberToCssDimension(height),
          }}
        >
          {_renderLoadingStateItems({ data: itemData, itemIdx: idx })}
        </div>
      );
    }

    return null;
  };

  render() {
    const {
      align = 'center',
      columnWidth,
      gutterWidth: gutter,
      items,
      layout = 'basic',
      minCols,
      renderItem,
      scrollContainer,
      _logTwoColWhitespace,
      _getColumnSpanConfig,
      _loadingStateItems = [],
      _renderLoadingStateItems,
    } = this.props;
    const { hasPendingMeasurements, measurementStore, width } = this.state;
    const { positionStore } = this;
    const renderLoadingState = Boolean(
      items.length === 0 && _loadingStateItems && _renderLoadingStateItems,
    );

    let getPositions: (
      itemsToGetPosition: readonly T[] | readonly LoadingStateItem[],
    ) => ReadonlyArray<Position>;

    if ((layout === 'flexible' || layout === 'serverRenderedFlexible') && width !== null) {
      getPositions = fullWidthLayout({
        gutter,
        measurementCache: measurementStore,
        positionCache: positionStore,
        minCols,
        idealColumnWidth: columnWidth,
        width,
        logWhitespace: _logTwoColWhitespace,
        _getColumnSpanConfig,
        renderLoadingState,
      });
    } else if (layout === 'uniformRow') {
      getPositions = uniformRowLayout({
        cache: measurementStore,
        columnWidth,
        gutter,
        minCols,
        width,
        renderLoadingState,
      });
    } else {
      getPositions = defaultLayout({
        align,
        measurementCache: measurementStore,
        positionCache: positionStore,
        columnWidth,
        gutter,
        layout,
        minCols,
        rawItemCount: renderLoadingState ? _loadingStateItems.length : items.length,
        width,
        logWhitespace: _logTwoColWhitespace,
        _getColumnSpanConfig,
        renderLoadingState,
      });
    }

    let gridBody;

    if (width == null && hasPendingMeasurements) {
      // When hyrdating from a server render, we don't have the width of the grid
      // and the measurement store is empty
      gridBody = (
        <div
          ref={this.setGridWrapperRef}
          className={styles.Masonry}
          role="list"
          style={{ height: 0, width: '100%' }}
        >
          {items.filter(Boolean).map((item, i) => {
            const columnSpanConfig = _getColumnSpanConfig?.(item) ?? 1;
            return (
              <div // keep this in sync with renderMasonryComponent
                // eslint-disable-next-line react/no-array-index-key
                key={i}
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
                data-column-span={
                  typeof columnSpanConfig === 'number'
                    ? columnSpanConfig
                    : btoa(JSON.stringify(columnSpanConfig))
                }
                data-grid-item
                role="listitem"
                style={{
                  top: 0,
                  left: 0,
                  transform: 'translateX(0px) translateY(0px)',
                  WebkitTransform: 'translateX(0px) translateY(0px)',
                  width:
                    layout === 'flexible' ||
                    layout === 'serverRenderedFlexible' ||
                    typeof columnSpanConfig === 'object'
                      ? undefined // we can't set a width for server rendered flexible items
                      : layoutNumberToCssDimension(
                          typeof columnSpanConfig === 'number' &&
                            columnWidth != null &&
                            gutter != null
                            ? columnWidth * columnSpanConfig + gutter * (columnSpanConfig - 1)
                            : columnWidth,
                        ),
                }}
              >
                {renderItem({ data: item, itemIdx: i, isMeasuring: false })}
              </div>
            );
          })}
        </div>
      );
    } else if (width == null) {
      // When the width is empty (usually after a re-mount) render an empty
      // div to collect the width for layout
      gridBody = <div ref={this.setGridWrapperRef} style={{ width: '100%' }} />;
    } else if (renderLoadingState) {
      const positions = getPositions(_loadingStateItems);
      const height = positions.length
        ? Math.max(...positions.map((pos) => pos.top + pos.height))
        : 0;

      gridBody = (
        <div ref={this.setGridWrapperRef} style={{ width: '100%' }}>
          <div className={styles.Masonry} role="list" style={{ height, width }}>
            {_loadingStateItems.map((itemData, idx) =>
              this.renderLoadingStateComponent({
                itemData,
                idx,
                position: positions[idx]!,
              }),
            )}
          </div>
        </div>
      );
    } else {
      // Full layout is possible
      const itemsToRender = items.filter((item) => item && measurementStore.has(item));
      const itemsWithoutPositions = items.filter((item) => item && !positionStore.has(item));
      const hasMultiColumnItems =
        _getColumnSpanConfig &&
        itemsWithoutPositions.some((item) => _getColumnSpanConfig(item) !== 1);

      // If there are 2-col items, we need to measure more items to ensure we have enough possible layouts to find a suitable one
      // we need the batch size (number of one column items for the graph) + 1 (two column item)
      const itemsToMeasureCount = hasMultiColumnItems
        ? MULTI_COL_ITEMS_MEASURE_BATCH_SIZE + 1
        : minCols;
      const itemsToMeasure = items
        .filter((item) => item && !measurementStore.has(item))
        .slice(0, itemsToMeasureCount);

      const positions = getPositions(itemsToRender);
      const measuringPositions = getPositions(itemsToMeasure);
      // Math.max() === -Infinity when there are no positions
      const height = positions.length
        ? Math.max(...positions.map((pos) => pos.top + pos.height))
        : 0;

      gridBody = (
        <div ref={this.setGridWrapperRef} style={{ width: '100%' }}>
          <div className={styles.Masonry} role="list" style={{ height, width }}>
            {itemsToRender.map((item, i) =>
              this.renderMasonryComponent(
                item,
                i,
                // If we have items in the positionStore (newer way of tracking positions used for 2-col support), use that. Otherwise fall back to the classic way of tracking positions
                // this is only required atm because the two column layout doesn't not return positions in their original item order
                positionStore.get(item) ?? positions[i]!,
              ),
            )}
          </div>
          <div className={styles.Masonry} style={{ width }}>
            {itemsToMeasure.map((data, i) => {
              // itemsToMeasure is always the length of minCols, so i will always be 0..minCols.length
              // we normalize the index here relative to the item list as a whole so that itemIdx is correct
              // and so that React doesnt reuse the measurement nodes
              const measurementIndex = itemsToRender.length + i;
              const position = measuringPositions[i]!;
              return (
                <div
                  key={`measuring-${measurementIndex}`}
                  ref={(el) => {
                    if (el) {
                      measurementStore.set(data, el.clientHeight);
                    }
                  }}
                  style={{
                    visibility: 'hidden',
                    position: 'absolute',
                    top: layoutNumberToCssDimension(position.top),
                    left: layoutNumberToCssDimension(position.left),
                    width: layoutNumberToCssDimension(position.width),
                    height: layoutNumberToCssDimension(position.height),
                  }}
                >
                  {renderItem({
                    data,
                    itemIdx: measurementIndex,
                    isMeasuring: true,
                  })}
                </div>
              );
            })}
          </div>

          {this.scrollContainer && (
            <FetchItems
              containerHeight={this.containerHeight}
              fetchMore={this.fetchMore}
              isFetching={this.state.isFetching || this.state.hasPendingMeasurements}
              scrollHeight={height + this.containerOffset}
              scrollTop={this.state.scrollTop}
            />
          )}
        </div>
      );
    }

    return scrollContainer ? (
      <ScrollContainer
        ref={this.setScrollContainerRef}
        onScroll={this.updateScrollPosition}
        scrollContainer={scrollContainer}
      >
        {gridBody}
      </ScrollContainer>
    ) : (
      gridBody
    );
  }
}
