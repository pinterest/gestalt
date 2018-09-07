// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import debounce from './debounce.js';
import styles from './Masonry.css';
import ScrollContainer from './ScrollContainer.js';
import throttle from './throttle.js';
import type { Cache } from './Cache.js';
import MeasurementStore from './MeasurementStore.js';
import {
  getElementHeight,
  getRelativeScrollTop,
  getScrollPos,
} from './scrollUtils.js';
import {
  DefaultLayoutSymbol,
  UniformRowLayoutSymbol,
} from './legacyLayoutSymbols.js';
import defaultLayout, { type Position } from './defaultLayout.js';
import uniformRowLayout from './uniformRowLayout.js';
import fullWidthLayout from './fullWidthLayout.js';
import LegacyMasonryLayout from './layouts/MasonryLayout.js';
import LegacyUniformRowLayout from './layouts/UniformRowLayout.js';

type Layout =
  | typeof DefaultLayoutSymbol
  | typeof UniformRowLayoutSymbol
  | LegacyMasonryLayout
  | LegacyUniformRowLayout;

export type MeasurementState = 'idle' | 'measuring';

export type Props<T> = {|
  columnWidth?: number,
  comp: React.ComponentType<{
    data: T,
    itemIdx: number,
    isMeasuring: boolean,
  }>,
  flexible?: boolean,
  gutterWidth?: number,
  items: Array<T>,
  measurementStore: Cache<T, *>,
  minCols: number,
  // Content layer and Viewport layer is as defined in Collection.
  onVirtualizationWindowUpdate?: (
    content: Position,
    viewport: Position
  ) => void,
  onAutoMeasuringUpdate?: (state: MeasurementState) => void,
  layout?: Layout,
  // Support legacy loadItems usage.
  // TODO: Simplify non falsey flowtype.
  loadItems?:
    | false
    | ((
        ?{
          from: number,
        }
      ) => void | boolean | {}),
  scrollContainer?: () => HTMLElement,
  virtualBoundsTop?: number,
  virtualBoundsBottom?: number,
  virtualize?: boolean,
|};

type State<T> = {|
  hasPendingMeasurements: boolean,
  height: number,
  items: Array<T>,
  itemsToMeasure: Array<T>,
  itemsToRender: Array<T>,
  measuringPositions: Array<Position>,
  renderPositions: Array<Position>,
  scrollTop: number,
  width: ?number,
|};

const RESIZE_DEBOUNCE = 300;
// Multiplied against container height.
// The amount of extra buffer space for populating visible items.
const VIRTUAL_BUFFER_FACTOR = 0.7;

const layoutNumberToCssDimension = n => (n !== Infinity ? n : undefined);

function layoutClass<T>(
  {
    columnWidth,
    flexible,
    gutterWidth: gutter,
    layout,
    measurementStore,
    minCols,
  }: Props<T>,
  { width }: State<T>
) {
  if (flexible && width !== null) {
    return fullWidthLayout({
      gutter,
      cache: measurementStore,
      minCols,
      idealColumnWidth: columnWidth,
      width,
    });
  }
  if (
    layout === UniformRowLayoutSymbol ||
    layout instanceof LegacyUniformRowLayout
  ) {
    return uniformRowLayout({
      cache: measurementStore,
      columnWidth,
      gutter,
      minCols,
      width,
    });
  }
  return defaultLayout({
    cache: measurementStore,
    columnWidth,
    gutter,
    minCols,
    width,
  });
}

function statesForRendering<T>(props: Props<T>, state: State<T>) {
  const { measurementStore, minCols } = props;
  const { items } = state;

  // Full layout is possible
  // $FlowIssue https://github.com/facebook/flow/issues/6151
  const itemsToRender = items.filter(
    item => item && measurementStore.has(item)
  );

  const layout = layoutClass(props, state);
  const renderPositions = layout(itemsToRender);
  // Math.max() === -Infinity when there are no renderPositions
  const height = renderPositions.length
    ? Math.max(...renderPositions.map(pos => pos.top + pos.height))
    : 0;

  // $FlowIssue https://github.com/facebook/flow/issues/6151
  const itemsToMeasure = items
    .filter(item => item && !measurementStore.has(item))
    .slice(0, minCols);
  const measuringPositions = layout(itemsToMeasure);

  return {
    height,
    itemsToRender,
    itemsToMeasure,
    measuringPositions,
    renderPositions,
  };
}

/**
 * The will be the new MasonryBeta that will not have any fetching concerns.
 *
 * For now, it differs with Masonry only by not having any fetching logic.
 *
 * It is in beta until it can be battle tested.
 */
export default class MasonryBeta<T> extends React.Component<
  Props<T>,
  State<T>
> {
  /**
   * Delays resize handling in case the scroll container is still being resized.
   */
  handleResize = debounce(() => {
    if (this.gridWrapper) {
      this.setState({ width: this.gridWrapper.clientWidth });
    }
  }, RESIZE_DEBOUNCE);

  updateScrollPosition = throttle(() => {
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

    this.handleVirtualizationWindowUpdate();
  });

  measureContainerAsync = debounce(() => {
    this.measureContainer();
  }, 0);

  static propTypes = {
    /**
     * The preferred/target item width. If `flexible` is set, the item width will
     * grow to fill column space, and shrink to fit if below min columns.
     */
    columnWidth: PropTypes.number,

    /**
     * The component to render.
     */
    /* eslint react/no-unused-prop-types: 0 */
    comp: PropTypes.func.isRequired,

    /**
     * The preferred/target item width. Item width will grow to fill
     * column space, and shrink to fit if below min columns.
     */
    flexible: PropTypes.bool,

    /**
     * The amount of space between each item.
     */
    gutterWidth: PropTypes.number,

    /**
     * An array of all objects to display in the grid.
     */
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

    /**
     * Measurement Store
     */
    measurementStore: PropTypes.instanceOf(MeasurementStore),

    /**
     * Layout system to use for items
     */
    layout: PropTypes.oneOfType([
      PropTypes.instanceOf(LegacyMasonryLayout),
      PropTypes.instanceOf(LegacyUniformRowLayout),
      PropTypes.symbol,
    ]),

    /**
     * A callback which the grid calls when we need to load more items as the user scrolls.
     * The callback should update the state of the items, and pass those in as props
     * to this component.
     */
    loadItems: PropTypes.func,

    /**
     * Minimum number of columns to display.
     */
    minCols: PropTypes.number,

    /**
     * Function that the grid calls to get the scroll container.
     * This is required if the grid is expected to be scrollable.
     */
    scrollContainer: PropTypes.func,

    /**
     * Whether or not to use actual virtualization
     */
    virtualize: PropTypes.bool,
  };

  static defaultProps = {
    columnWidth: 236,
    measurementStore: new MeasurementStore(),
    minCols: 3,
    layout: DefaultLayoutSymbol,
    loadItems: () => {},
    virtualize: false,
  };

  constructor(props: Props<T>) {
    super(props);

    this.containerHeight = 0;
    this.containerOffset = 0;

    this.state = {
      hasPendingMeasurements: props.items.some(
        item => !!item && !props.measurementStore.has(item)
      ),
      height: 0,
      itemsToRender: [],
      itemsToMeasure: [],
      // eslint-disable-next-line react/no-unused-state
      items: props.items,
      measuringPositions: [],
      renderPositions: [],
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

    this.setState(prevState => {
      const width = this.gridWrapper
        ? this.gridWrapper.clientWidth
        : prevState.width;
      const stateWithWidth = { ...this.state, width };
      return {
        scrollTop,
        width,
        ...statesForRendering(this.props, stateWithWidth),
      };
    });

    // need to make sure parent component has the correct pending measurement value
    this.handleOnAutoMeasuringUpdate(
      this.state.hasPendingMeasurements ? 'measuring' : 'idle'
    );
  }

  componentDidUpdate(prevProps: Props<T>, prevState: State<T>) {
    const { items, measurementStore } = this.props;

    this.measureContainerAsync();

    if (prevState.width != null && this.state.width !== prevState.width) {
      measurementStore.reset();
    }
    // calculate whether we still have pending measurements
    const hasPendingMeasurements = items.some(
      item => !!item && !measurementStore.has(item)
    );

    if (hasPendingMeasurements && !prevState.hasPendingMeasurements) {
      this.handleOnAutoMeasuringUpdate('measuring');
    } else if (!hasPendingMeasurements && prevState.hasPendingMeasurements) {
      this.handleOnAutoMeasuringUpdate('idle');
    }
    this.handleVirtualizationWindowUpdate();

    if (
      hasPendingMeasurements ||
      hasPendingMeasurements !== this.state.hasPendingMeasurements ||
      prevState.width == null
    ) {
      this.insertAnimationFrame = requestAnimationFrame(() => {
        const renderingStates = statesForRendering(this.props, this.state);
        this.setState({
          hasPendingMeasurements,
          ...renderingStates,
        });
      });
    } else if (hasPendingMeasurements || prevState.items !== items) {
      this.insertAnimationFrame = requestAnimationFrame(() => {
        const renderingStates = statesForRendering(this.props, this.state);
        this.setState({ ...renderingStates });
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

  static getDerivedStateFromProps(props: Props<T>, state: State<T>) {
    const { items, measurementStore } = props;
    // whenever we're receiving new props, determine whether any items need to be measured
    // TODO - we should treat items as immutable
    const hasPendingMeasurements = items.some(
      item => item && !measurementStore.has(item)
    );

    const newState: State<T> = {
      ...state,
      hasPendingMeasurements,
      items,
    };

    // Shallow compare all items, if any change reflow the grid.
    for (let i = 0; i < items.length; i += 1) {
      // We've reached the end of our current props and everything matches.
      // If we hit this case it means we need to insert new items.
      if (state.items[i] === undefined) {
        return {
          hasPendingMeasurements,
          items,
          ...statesForRendering(props, newState),
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
          ...statesForRendering(props, newState),
        };
      }
    }

    // Reset items if new items array is empty.
    if (items.length === 0 && state.items.length > 0) {
      return {
        hasPendingMeasurements,
        items,
        ...statesForRendering(props, newState),
      };
    }
    if (hasPendingMeasurements !== state.hasPendingMeasurements) {
      // make sure we always update hasPendingMeasurements
      return {
        hasPendingMeasurements,
        items,
        ...statesForRendering(props, newState),
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  setGridWrapperRef = (ref: ?HTMLElement) => {
    this.gridWrapper = ref;
  };

  setScrollContainerRef = (ref: ?ScrollContainer) => {
    this.scrollContainer = ref;
  };

  handleVirtualizationWindowUpdate = () => {
    const { height, width } = this.state;
    if (
      typeof this.props.onVirtualizationWindowUpdate === 'function' &&
      this.containerHeight
    ) {
      const viewport = {
        top: this.state.scrollTop,
        left: 0,
        height: this.containerHeight,
        width: width || 0,
      };
      const content = {
        top: this.containerOffset,
        left: 0,
        height,
        width: width || 0,
      };

      this.props.onVirtualizationWindowUpdate(content, viewport);
    }
  };

  handleOnAutoMeasuringUpdate = (state: MeasurementState) => {
    if (this.props.onAutoMeasuringUpdate) {
      this.props.onAutoMeasuringUpdate(state);
    }
  };

  containerHeight: number;

  containerOffset: number;

  gridWrapper: ?HTMLElement;

  insertAnimationFrame: AnimationFrameID;

  measureTimeout: TimeoutID;

  scrollContainer: ?ScrollContainer;

  measureContainer() {
    if (this.scrollContainer != null) {
      const { scrollContainer } = this;
      const scrollContainerRef = scrollContainer.getScrollContainerRef();
      if (scrollContainerRef) {
        this.containerHeight = getElementHeight(scrollContainerRef);
        const el = this.gridWrapper;
        if (el instanceof HTMLElement) {
          const relativeScrollTop = getRelativeScrollTop(scrollContainerRef);
          this.containerOffset =
            el.getBoundingClientRect().top + relativeScrollTop;
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
    this.props.measurementStore.reset();
    this.measureContainer();
    this.handleVirtualizationWindowUpdate();
    this.forceUpdate();
  }

  renderMasonryComponent = (itemData: T, idx: number, position: *) => {
    const {
      comp: Component,
      virtualize,
      virtualBoundsTop,
      virtualBoundsBottom,
    } = this.props;
    const { top, left, width, height } = position;

    let isVisible;
    if (this.props.scrollContainer) {
      const virtualBuffer = this.containerHeight * VIRTUAL_BUFFER_FACTOR;
      const offsetScrollPos = this.state.scrollTop - this.containerOffset;
      const viewportTop = virtualBoundsTop
        ? offsetScrollPos - virtualBoundsTop
        : offsetScrollPos - virtualBuffer;
      const viewportBottom = virtualBoundsBottom
        ? offsetScrollPos + this.containerHeight + virtualBoundsBottom
        : offsetScrollPos + this.containerHeight + virtualBuffer;

      isVisible = !(
        position.top + position.height < viewportTop ||
        position.top > viewportBottom
      );
    } else {
      // if no scroll container is passed in, items should always be visible
      isVisible = true;
    }

    const itemComponent = (
      <div
        key={`item-${idx}`}
        className={[styles.Masonry__Item, styles.Masonry__Item__Mounted].join(
          ' '
        )}
        data-grid-item
        style={{
          top: 0,
          left: 0,
          transform: `translateX(${left}px) translateY(${top}px)`,
          WebkitTransform: `translateX(${left}px) translateY(${top}px)`,
          width: layoutNumberToCssDimension(width),
          height: layoutNumberToCssDimension(height),
        }}
      >
        <Component data={itemData} itemIdx={idx} isMeasuring={false} />
      </div>
    );

    return virtualize ? (isVisible && itemComponent) || null : itemComponent;
  };

  render() {
    const {
      columnWidth,
      comp: Component,
      flexible,
      measurementStore,
      items,
    } = this.props;
    const {
      hasPendingMeasurements,
      height,
      itemsToMeasure,
      itemsToRender,
      measuringPositions,
      renderPositions,
      width,
    } = this.state;
    let gridBody;
    if (width == null && hasPendingMeasurements) {
      // When hyrdating from a server render, we don't have the width of the grid
      // and the measurement store is empty
      gridBody = (
        <div
          className={styles.Masonry}
          style={{ height: 0, width: '100%' }}
          ref={this.setGridWrapperRef}
        >
          {items.filter(item => item).map((item, i) => (
            <div // keep this in sync with renderMasonryComponent
              className="static"
              data-grid-item
              key={i}
              style={{
                top: 0,
                left: 0,
                transform: 'translateX(0px) translateY(0px)',
                WebkitTransform: 'translateX(0px) translateY(0px)',
                width: flexible
                  ? undefined
                  : layoutNumberToCssDimension(columnWidth), // we can't set a width for server rendered flexible items
              }}
              ref={el => {
                if (el && !flexible) {
                  // only measure flexible items on client
                  measurementStore.set(item, el.clientHeight);
                }
              }}
            >
              <Component data={item} itemIdx={i} isMeasuring={false} />
            </div>
          ))}
        </div>
      );
    } else if (width == null) {
      // When the width is empty (usually after a re-mount) render an empty
      // div to collect the width for layout
      gridBody = <div style={{ width: '100%' }} ref={this.setGridWrapperRef} />;
    } else {
      gridBody = (
        <div style={{ width: '100%' }} ref={this.setGridWrapperRef}>
          <div className={styles.Masonry} style={{ height, width }}>
            {itemsToRender.map((item, i) =>
              // $FlowFixMe this is the right definition, it an Array<T>
              this.renderMasonryComponent(item, i, renderPositions[i])
            )}
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
                  ref={el => {
                    if (el) {
                      measurementStore.set(data, el.clientHeight);
                    }
                  }}
                >
                  <Component
                    data={data}
                    itemIdx={measurementIndex}
                    isMeasuring
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return this.props.scrollContainer ? (
      <ScrollContainer
        ref={this.setScrollContainerRef}
        onScroll={this.updateScrollPosition}
        scrollContainer={this.props.scrollContainer}
      >
        {gridBody}
      </ScrollContainer>
    ) : (
      gridBody
    );
  }
}
