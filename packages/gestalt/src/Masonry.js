// @flow strict
import { type ComponentType, type Node, Component as ReactComponent } from 'react';
import debounce, { type DebounceReturn } from './utils/debounce.js';
import FetchItems from './shared/FetchItems.js';
import styles from './Masonry.css';
import ScrollContainer from './shared/ScrollContainer.js';
import throttle, { type ThrottleReturn } from './utils/throttle.js';
import { type Cache } from './Masonry/Cache.js';
import MeasurementStore from './Masonry/MeasurementStore.js';
import { getElementHeight, getRelativeScrollTop, getScrollPos } from './utils/scroll.js';
import defaultLayout from './Masonry/defaultLayout.js';
import uniformRowLayout from './Masonry/uniformRowLayout.js';
import fullWidthLayout from './Masonry/fullWidthLayout.js';

type Position = {| top: number, left: number, width: number, height: number |};

type Layout = 'basic' | 'basicCentered' | 'flexible' | 'serverRenderedFlexible' | 'uniformRow';

type Props<T> = {|
  /**
   * The preferred/target item width. If 'flexible' is set, the item width will
   * grow to fill column space, and shrink to fit if below min columns.
   */
  columnWidth?: number,
  /**
   * The amount of vertical and horizontal space between each item, specified in pixels.
   */
  gutterWidth?: number,
  /**
   * A React component (or stateless functional component) that renders the item you would like displayed in the grid. This component is passed three props: the item's data, the item's index in the grid, and a flag indicating if Masonry is currently measuring the item. *Note that this [must be a stable reference!](https://www.developerway.com/posts/react-re-renders-guide#part3.1)* If using a component declared within a parent function component, you must use [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback) to ensure a stable reference.
   */
  Item: ComponentType<{|
    data: T,
    itemIdx: number,
    isMeasuring: boolean,
  |}>,
  /**
   * An array of items to display that contains the data to be rendered by `<Item />`.
   */
  items: $ReadOnlyArray<T>,
  /**
   * `basic`: Left aligned masonry layout.
   * `basicCentered`: Center aligned masonry layout.
   * `flexible`: Item width grows to fill column space and shrinks to fit if below min columns.
   * `serverRenderedFlexible`: Item width grows to fill column space and shrinks to fit if below min columns. Main differerence with `flexible` is that we do not store the initial measurement. More context in [#2084](https://github.com/pinterest/gestalt/pull/2084)
   * `uniformRow`: Items are laid out in a single row, with all items having the same height.
   */
  layout?: Layout,
  /**
   * A callback which the grid calls when we need to load more items as the user scrolls.
   * The callback should update the state of the items, and pass those in as props
   * to this component.
   * Note that `scrollContainer` must be specified.
   */
  loadItems?:
    | false
    | ((
        ?{|
          from: number,
        |},
      ) => void | boolean | { ... }),
  /**
   * Masonry internally caches item sizes/positions using a measurement store. If `measurementStore` is provided, Masonry will use it as its cache and will keep it updated with future measurements. This is often used to prevent re-measurement when users navigate away and back to a grid. Create a new measurement store with `Masonry.createMeasurementStore()`.
   */
  // $FlowFixMe[unclear-type]
  measurementStore?: Cache<T, *>,
  /**
   * Minimum number of columns to display.
   */
  minCols: number,
  /**
   * A function that returns a DOM node that Masonry uses for on-scroll event subscription. This DOM node is intended to be the most immediate ancestor of Masonry in the DOM that will have a scroll bar; in most cases this will be the `window` itself, although sometimes Masonry is used inside containers that have `overflow: auto`. `scrollContainer` is optional, although it is required for features such as `virtualize` and `loadItems`.
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
   * Specifies whether or not Masonry dynamically adds/removes content from the grid based on the user's viewport and scroll position. Note that `scrollContainer` must be specified when virtualization is used.
   */
  virtualize?: boolean,
|};

type State<T> = {|
  hasPendingMeasurements: boolean,
  isFetching: boolean,
  items: $ReadOnlyArray<T>,
  // $FlowFixMe[unclear-type]
  measurementStore: Cache<T, *>,
  scrollTop: number,
  width: ?number,
|};

const RESIZE_DEBOUNCE = 300;
// Multiplied against container height.
// The amount of extra buffer space for populating visible items.
const VIRTUAL_BUFFER_FACTOR = 0.7;

const layoutNumberToCssDimension = (n) => (n !== Infinity ? n : undefined);

/**
 * [Masonry](https://gestalt.pinterest.systems/web/masonry) creates a deterministic grid layout, positioning items based on available vertical space. It contains performance optimizations like virtualization and support for infinite scrolling.
 */
export default class Masonry<T: { ... }> extends ReactComponent<Props<T>, State<T>> {
  static createMeasurementStore<T1: { ... }, T2>(): MeasurementStore<T1, T2> {
    return new MeasurementStore();
  }

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

  containerHeight: number;

  containerOffset: number;

  gridWrapper: ?HTMLElement;

  insertAnimationFrame: AnimationFrameID;

  measureTimeout: TimeoutID;

  scrollContainer: ?ScrollContainer;

  static defaultProps: {|
    columnWidth?: number,
    layout?: Layout,
    loadItems?:
      | false
      | ((
          ?{|
            from: number,
          |},
        ) => void | boolean | { ... }),
    minCols: number,
    virtualize?: boolean,
  |} = {
    columnWidth: 236,
    minCols: 3,
    layout: 'basic',
    loadItems: () => {},
    virtualize: false,
  };

  constructor(props: Props<T>) {
    super(props);

    this.containerHeight = 0;
    this.containerOffset = 0;

    // $FlowFixMe[unclear-type]
    const measurementStore: Cache<T, *> =
      props.measurementStore || Masonry.createMeasurementStore();

    this.state = {
      hasPendingMeasurements: props.items.some((item) => !!item && !measurementStore.has(item)),
      isFetching: false,
      items: props.items,
      measurementStore,
      scrollTop: 0,
      width: undefined,
    };
  }

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
    }
    // calculate whether we still have pending measurements
    const hasPendingMeasurements = items.some((item) => !!item && !measurementStore.has(item));
    if (
      hasPendingMeasurements ||
      hasPendingMeasurements !== this.state.hasPendingMeasurements ||
      prevState.width == null
    ) {
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

  static getDerivedStateFromProps(
    props: Props<T>,
    state: State<T>,
  ): null | {|
    hasPendingMeasurements: boolean,
    isFetching?: boolean,
    items: $ReadOnlyArray<T>,
  |} {
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

  setGridWrapperRef: (ref: ?HTMLElement) => void = (ref: ?HTMLElement) => {
    this.gridWrapper = ref;
  };

  setScrollContainerRef: (ref: ?ScrollContainer) => void = (ref: ?ScrollContainer) => {
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

    this.measureContainer();
    this.forceUpdate();
  }

  renderMasonryComponent: (itemData: T, idx: number, position: Position) => Node = (
    itemData,
    idx,
    position,
  ) => {
    const { Item, scrollContainer, virtualize, virtualBoundsTop, virtualBoundsBottom } = this.props;
    const { top, left, width, height } = position;

    let isVisible;
    if (scrollContainer) {
      const virtualBuffer = this.containerHeight * VIRTUAL_BUFFER_FACTOR;
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
        className={[styles.Masonry__Item, styles.Masonry__Item__Mounted].join(' ')}
        data-grid-item
        key={`item-${idx}`}
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
        <Item data={itemData} itemIdx={idx} isMeasuring={false} />
      </div>
    );

    return virtualize ? (isVisible && itemComponent) || null : itemComponent;
  };

  render(): Node {
    const {
      columnWidth,
      gutterWidth: gutter,
      Item,
      items,
      layout,
      minCols,
      scrollContainer,
    } = this.props;
    const { hasPendingMeasurements, measurementStore, width } = this.state;

    let getPositions;

    if ((layout === 'flexible' || layout === 'serverRenderedFlexible') && width !== null) {
      getPositions = fullWidthLayout({
        gutter,
        cache: measurementStore,
        minCols,
        idealColumnWidth: columnWidth,
        width,
      });
    } else if (layout === 'uniformRow') {
      getPositions = uniformRowLayout({
        cache: measurementStore,
        columnWidth,
        gutter,
        minCols,
        width,
      });
    } else {
      getPositions = defaultLayout({
        cache: measurementStore,
        columnWidth,
        gutter,
        justify: layout === 'basicCentered' ? 'center' : 'start',
        minCols,
        rawItemCount: items.length,
        width,
      });
    }

    let gridBody;
    if (width == null && hasPendingMeasurements) {
      // When hyrdating from a server render, we don't have the width of the grid
      // and the measurement store is empty
      gridBody = (
        <div
          className={styles.Masonry}
          ref={this.setGridWrapperRef}
          role="list"
          style={{ height: 0, width: '100%' }}
        >
          {items.filter(Boolean).map((item, i) => (
            <div // keep this in sync with renderMasonryComponent
              className="static"
              data-grid-item
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
              role="listitem"
              style={{
                top: 0,
                left: 0,
                transform: 'translateX(0px) translateY(0px)',
                WebkitTransform: 'translateX(0px) translateY(0px)',
                width:
                  layout === 'flexible' || layout === 'serverRenderedFlexible'
                    ? undefined
                    : layoutNumberToCssDimension(columnWidth), // we can't set a width for server rendered flexible items
              }}
            >
              <Item data={item} itemIdx={i} isMeasuring={false} />
            </div>
          ))}
        </div>
      );
    } else if (width == null) {
      // When the width is empty (usually after a re-mount) render an empty
      // div to collect the width for layout
      gridBody = <div style={{ width: '100%' }} ref={this.setGridWrapperRef} />;
    } else {
      // Full layout is possible
      const itemsToRender = items.filter((item) => item && measurementStore.has(item));
      const itemsToMeasure = items
        .filter((item) => item && !measurementStore.has(item))
        .slice(0, minCols);

      const positions = getPositions(itemsToRender);
      const measuringPositions = getPositions(itemsToMeasure);
      // Math.max() === -Infinity when there are no positions
      const height = positions.length
        ? Math.max(...positions.map((pos) => pos.top + pos.height))
        : 0;
      gridBody = (
        <div style={{ width: '100%' }} ref={this.setGridWrapperRef}>
          <div className={styles.Masonry} role="list" style={{ height, width }}>
            {itemsToRender.map((item, i) => this.renderMasonryComponent(item, i, positions[i]))}
          </div>
          <div className={styles.Masonry} style={{ width }}>
            {itemsToMeasure.map((data, i) => {
              // itemsToMeasure is always the length of minCols, so i will always be 0..minCols.length
              // we normalize the index here relative to the item list as a whole so that itemIdx is correct
              // and so that React doesnt reuse the measurement nodes
              const measurementIndex = itemsToRender.length + i;
              const position = measuringPositions[i];
              return (
                <div
                  key={`measuring-${measurementIndex}`}
                  style={{
                    visibility: 'hidden',
                    position: 'absolute',
                    top: layoutNumberToCssDimension(position.top),
                    left: layoutNumberToCssDimension(position.left),
                    width: layoutNumberToCssDimension(position.width),
                    height: layoutNumberToCssDimension(position.height),
                  }}
                  ref={(el) => {
                    if (el) {
                      measurementStore.set(data, el.clientHeight);
                    }
                  }}
                >
                  <Item data={data} itemIdx={measurementIndex} isMeasuring />
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
