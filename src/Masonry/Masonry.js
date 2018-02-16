// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import FetchItems from '../ScrollFetch/FetchItems';
import MasonryComponentWrapper from './MasonryComponentWrapper';
import styles from './Masonry.css';
import ScrollContainer from '../ScrollFetch/ScrollContainer';
import throttle from '../throttle';
import MasonryLayout from './layout/masonry';
import UniformRowLayout from './layout/uniformRow';
import MeasurementStore, {
  type ItemPositionType,
  type ItemPositionInputType,
} from './MeasurementStore';
import {
  getElementHeight,
  getRelativeScrollTop,
  getScrollPos,
} from '../ScrollFetch/scrollUtils';

const MAX_ITEMS_PER_INSERTION = 1;

type LayoutType = {
  calculatePosition: (*, number) => ItemPositionInputType,
};

type GridItemType<T> = {
  appended?: boolean,
  itemData: T,
  position?: ?ItemPositionType,
  slotIdx: number,
};

type Props<T> = {|
  columnWidth?: number,
  comp: React.ComponentType<{
    data: T,
    addRelatedItems?: (items: Array<T>) => void,
    itemIdx: number,
    isMeasuring?: boolean,
  }>,
  flexible?: boolean,
  gutterWidth?: number,
  items: Array<T>,
  measurementStore?: MeasurementStore<T>,
  minCols: number,
  layout: any,
  // Support legacy loadItems usage.
  // TODO: Simplify non falsey flowtype.
  loadItems?:
    | false
    | ((
        ?{
          from: number,
        }
      ) => void | boolean | {}),
  scrollContainer?: () => ?HTMLElement,
  serverRender?: boolean,
  virtualize?: boolean,
|};

type State<T> = {
  gridItems: Array<GridItemType<T>>,
  insertedItemsCount: number,
  isFetching: boolean,
  mounted: boolean,
  scrollTop: number,
  serverItems: ?Array<GridItemType<T>>,
};

// Multiplied against container height.
// The amount of extra buffer space for populating visible items.
const VIRTUAL_BUFFER_FACTOR = 0.7;

function distance(a, b) {
  const x = a.x - b.x;
  const y = a.y - b.y;
  return Math.sqrt(x * x + y * y);
}

function cellToArrayIndex(
  numColumns: number,
  colIdx: number,
  itemIdx: number
): number {
  return numColumns * itemIdx + colIdx;
}

const gutter = (gutterWidth, flexible) => {
  // Default to 0 gutterWidth when rendering flexibly.
  if (gutterWidth == null) {
    return flexible ? 0 : 14;
  }
  return gutterWidth;
};

// $FlowFixMe
export default class Masonry<T> extends React.Component<Props<T>, State<T>> {
  static createMeasurementStore() {
    return new MeasurementStore();
  }

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
     * Whether or not this instance is server rendered.
     * TODO: If true, generate and output CSS for the initial server render.
     */
    serverRender: PropTypes.bool,

    /**
     * Whether or not to use actual virtualization
     */
    virtualize: PropTypes.bool,

    layout: PropTypes.oneOf([MasonryLayout, UniformRowLayout]),

    measurementStore: PropTypes.instanceOf(MeasurementStore),
  };

  static defaultProps = {
    columnWidth: 236,
    minCols: 3,
    serverRender: false,
    layout: MasonryLayout,
    loadItems: () => {},
    virtualize: false,
  };

  constructor(props: Props<T>) {
    super(props);

    this.containerHeight = 0;
    this.containerOffset = 0;
    this.serverRefs = [];
    this.slotIndices = new WeakMap();

    // initialize here for server rendering
    this.itemWidth = props.flexible
      ? 0
      : props.columnWidth + gutter(props.gutterWidth, props.flexible);

    // measurement store
    this.measurementStore = props.measurementStore || new MeasurementStore();

    // see if we need to reset cache when remounting with a previous cache
    // we reset the position cache if the measurementStore is not empty and
    // a) incoming item length is less than the number of cached item positions
    // b) an incoming item does not exist in the cache and its index is less than the number of cached item positions
    if (!this.measurementStore.isEmpty()) {
      const cachedItemCount = this.measurementStore.itemCount;
      if (
        props.items.length < cachedItemCount ||
        props.items.some(
          (item, idx) =>
            !this.measurementStore.hasItemPosition(item) &&
            idx < cachedItemCount
        )
      ) {
        this.measurementStore.resetItemPositions();
      }
    }

    // Item ref counter to re-key items after item ref changes.
    this.refUpdateCounter = 0;

    let serverItems = null;
    if (props.serverRender) {
      serverItems = props.items
        // If we already have the item's measurement, then we can assume this isn't
        // a server item, but most likely the grid being re-mounted, so defer positioning
        // to insertItems.
        .filter(item => !this.measurementStore.hasItemMeasurement(item))
        .map((itemData, key) => ({
          itemData,
          slotIdx: key,
          position: { top: 0, left: 0, row: 0, column: 0, bottom: 0 },
        }));
    }

    this.state = {
      isFetching: false,
      gridItems: [],
      serverItems,
      mounted: false,
      scrollTop: 0,
      insertedItemsCount: 0,
    };

    const layoutConfig = {
      gutterWidth: gutter(props.gutterWidth, props.flexible),
      measurementStore: this.measurementStore,
    };
    const LayoutClass = this.props.layout;
    this.layout = new LayoutClass(layoutConfig);
  }

  /**
   * Adds hooks after the component mounts.
   */
  componentDidMount() {
    // Append a node to measure items.
    this.measuringNode = document.createElement('div');

    if (document.body) {
      document.body.appendChild(this.measuringNode);
    }

    window.addEventListener('resize', this.handleResize);

    // Determine #columns and itemWidth
    this.updateDimensions();

    // Measure server ref sizes
    this.serverRefs.forEach(({ itemData, ref }) => {
      if (this.measurementStore.hasItemMeasurement(itemData)) {
        return;
      }
      const serverRendered = ref;
      serverRendered.style.width = `${this.itemWidth -
        gutter(this.props.gutterWidth, this.props.flexible)}px`;
      const height = serverRendered.clientHeight;
      this.measurementStore.setItemMeasurement(itemData, { height });
    });

    let nextState = this.state;
    if (
      this.props.items &&
      // insertedItemsCount should always be 0
      this.props.items.length !== this.state.insertedItemsCount
    ) {
      nextState = this.insertItemsWithoutSetState(nextState, {
        newItems: this.props.items.slice(this.state.insertedItemsCount),
      });
    }

    this.measureContainer();

    let { scrollTop } = this.state;
    if (this.scrollContainer != null) {
      const scrollContainer = this.scrollContainer.getScrollContainerRef();
      if (scrollContainer) {
        scrollTop = getScrollPos(scrollContainer);
      }
    }

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState(
      {
        ...nextState,
        serverItems: null,
        mounted: true,
        scrollTop,
      },
      this.insertNextItems
    );

    if (this.gridWrapper) {
      this.gridWrapper.addEventListener(
        'animationend',
        this.handleAnimationEnd
      );
    }
  }

  componentWillReceiveProps({ items }: Props<T>) {
    // Shallow compare all items, if any change reflow the grid.
    for (let i = 0; i < items.length; i += 1) {
      // We've reached the end of our current props and everything matches.
      // If we hit this case it means we need to insert new items.
      if (this.props.items[i] === undefined) {
        let nextState = this.state;
        if (items && items.length !== this.state.insertedItemsCount) {
          nextState = this.insertItemsWithoutSetState(this.state, {
            newItems: items.slice(this.state.insertedItemsCount),
          });
        }

        this.setState(
          { ...nextState, isFetching: false },
          this.insertNextItems
        );
        return;
      }
      // Reset grid items when:
      if (
        // An item object ref does not match.
        items[i] !== this.props.items[i] ||
        // Or less items than we currently have are passed in.
        items.length < this.props.items.length
      ) {
        // reset positions
        this.refUpdateCounter += 1;
        this.measurementStore.resetItemPositions();
        // cleanup any existing measurement components
        this.cleanupMeasuringComponents();
        const nextState = this.insertItemsWithoutSetState(
          { ...this.state, insertedItemsCount: 0 },
          {
            newItems: items,
            forceUpdate: true,
          }
        );
        this.setState(
          { ...nextState, isFetching: false },
          this.insertNextItems
        );
        return;
      }
    }

    // Reset items if new items array is empty.
    if (items.length === 0 && this.props.items.length > 0) {
      this.measurementStore.resetItemPositions();
      this.setState({ insertedItemsCount: 0, isFetching: false });
    }
  }

  componentDidUpdate() {
    clearTimeout(this.measureTimeout);
    this.measureTimeout = setTimeout(() => {
      this.measureContainer();
    });
  }

  /**
   * Remove listeners when unmounting.
   */
  componentWillUnmount() {
    if (this.insertAnimationFrame) {
      cancelAnimationFrame(this.insertAnimationFrame);
    }
    clearTimeout(this.measureTimeout);
    clearTimeout(this.resizeTimeout);

    window.removeEventListener('resize', this.handleResize);
    if (this.gridWrapper) {
      this.gridWrapper.removeEventListener(
        'animationend',
        this.handleAnimationEnd
      );
    }

    // cleanup any hanging measuring nodes
    this.cleanupMeasuringComponents();
    if (document.body && this.measuringNode) {
      document.body.removeChild(this.measuringNode);
    }
  }

  getSlotIndex(
    idx: number,
    colIdx?: number | null = null,
    itemIdx?: number | null = null
  ) {
    const slotIdx = idx;
    if (colIdx !== null && itemIdx !== null) {
      const previousItemKey = this.measurementStore.getGridCell(
        colIdx,
        itemIdx - 1
      );
      const counterAsDecimal = (slotIdx % 10000) / 1000;
      return previousItemKey
        ? parseInt(this.slotIndices.get(previousItemKey), 10) + counterAsDecimal
        : counterAsDecimal;
    }
    return slotIdx;
  }

  getItemsRelatedTo(itemData: T, noItems: number = 5) {
    const itemAPosition = this.measurementStore.getItemPosition(itemData);
    if (!itemAPosition) {
      return [];
    }

    // group these by column, insert by the lowest idx in the column
    const allItems = this.state.gridItems
      .reduce((validItems, { itemData: itemBKey }) => {
        const itemBPosition = this.measurementStore.getItemPosition(itemBKey);
        if (
          !itemBPosition ||
          itemBPosition.top < itemAPosition.top - 20 ||
          (itemAPosition.column === itemBPosition.column &&
            itemAPosition.row === itemBPosition.row)
        ) {
          return validItems;
        }
        return validItems.concat({
          distance: this.calculateDistance(itemData, itemBKey),
          columnIdx: itemBPosition.column,
          itemIdx: itemBPosition.row,
        });
      }, [])
      .sort((a, b) => a.distance - b.distance);

    const columnToItemMapping = {};
    for (let i = 0; i < noItems; i += 1) {
      if (!allItems[i]) {
        break;
      }
      const { columnIdx, itemIdx } = allItems[i];
      if (!columnToItemMapping[columnIdx]) {
        columnToItemMapping[columnIdx] = {
          itemIdx,
          count: 1,
        };
      } else {
        columnToItemMapping[columnIdx].count += 1;
      }
    }
    return Object.keys(columnToItemMapping).map(column => ({
      columnIdx: parseInt(column, 10),
      ...columnToItemMapping[column],
    }));
  }

  setGridWrapperRef = (ref: ?HTMLElement) => {
    this.gridWrapper = ref;
  };

  setScrollContainerRef = (ref: ?ScrollContainer) => {
    this.scrollContainer = ref;
  };

  columnCount: number;
  itemWidth: number;
  layout: LayoutType;
  refUpdateCounter: number;

  /**
   * We need to remove the animation trigger for an element after it's finished animating.
   * This is necessary because we virtualize the grid and don't want animations replaying.
   */
  handleAnimationEnd = (event: Event) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    const { classList } = event.target;
    if (classList.contains(styles.Masonry__Item__Animated)) {
      classList.remove(styles.Masonry__Item__Animated);
    }
  };

  calculateDistance(itemKeyA: T, itemKeyB: T) {
    const { height: heightA } =
      this.measurementStore.getItemMeasurement(itemKeyA) || {};
    const { bottom: bottomA, column: columnA, left: leftA, top: topA } =
      this.measurementStore.getItemPosition(itemKeyA) || {};
    const { bottom: bottomB, column: columnB, left: leftB, top: topB } =
      this.measurementStore.getItemPosition(itemKeyB) || {};
    const width = this.props.columnWidth;
    const gutterWidth = gutter(this.props.gutterWidth, this.props.flexible);

    if (columnA === columnB) {
      return topA < topB
        ? topB - (bottomA + gutterWidth) - 1
        : topA - (bottomB + gutterWidth) - 1;
    }
    if (
      (topA <= topB && bottomA >= topB) ||
      (topA <= bottomB && bottomA >= bottomB) ||
      (topB <= topA && bottomB >= topA)
    ) {
      const columnWeight = 25;
      const columnDistance = (Math.abs(columnA - columnB) - 1) * columnWeight;
      return columnDistance + Math.abs(topA - topB) / heightA;
    }
    if (topA < topB) {
      return leftA < leftB
        ? distance({ x: bottomA, y: leftA + width }, { x: topB, y: leftB })
        : distance({ x: bottomA, y: leftA }, { x: topB, y: leftB + width });
    }
    return leftA < leftB
      ? distance({ x: topA, y: leftA + width }, { x: bottomB, y: leftB })
      : distance({ x: topA, y: leftA }, { x: bottomB, y: leftB + width });
  }

  containerHeight: number;
  containerOffset: number;
  gridWrapper: ?HTMLElement;
  insertAnimationFrame: AnimationFrameID;
  measuringNode: ?HTMLElement;
  measurementStore: MeasurementStore<T>;
  measureTimeout: TimeoutID;
  resizeTimeout: TimeoutID;
  scrollContainer: ?ScrollContainer;
  serverRefs: Array<{ ref: HTMLElement, itemData: T }>;
  slotIndices: WeakMap<T, number>;

  handleAddRelatedItems(itemData: T) {
    // $FlowFixMe
    return (items: Array<T>) => {
      const relatedItems = this.getItemsRelatedTo(itemData, items.length);
      const nextState = relatedItems.reduce(
        (state, { columnIdx, itemIdx, count }) =>
          this.insertItemsWithoutSetState(state, {
            newItems: items.splice(0, count),
            colIdx: columnIdx,
            itemIdx,
          }),
        this.state
      );
      this.setState(nextState, this.insertNextItems);
    };
  }

  measureItems(pendingDomMeasurements: Array<GridItemType<T>>) {
    const Component = this.props.comp;
    const { measuringNode } = this;
    if (pendingDomMeasurements.length === 0 || measuringNode == null) {
      return;
    }
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      <div>
        {' '}
        {pendingDomMeasurements.map(({ itemData, slotIdx }, idx) => (
          <div
            key={`el-${idx}`}
            style={{
              visibility: 'hidden',
              width: `${this.itemWidth -
                gutter(this.props.gutterWidth, this.props.flexible)}px`,
            }}
          >
            <Component
              data={itemData}
              addRelatedItems={this.handleAddRelatedItems(itemData)}
              itemIdx={slotIdx}
              isMeasuring
            />
          </div>
        ))}{' '}
      </div>,
      measuringNode
    );
    const wrapperNodes = measuringNode.children[0].children;
    pendingDomMeasurements.forEach(({ itemData }, idx) => {
      // update cache
      const newMeasurements = { height: wrapperNodes[idx].clientHeight };
      this.measurementStore.setItemMeasurement(itemData, newMeasurements);
    });
  }

  calculateSpecificInsertionPosition(
    itemData: T,
    itemHeight: number,
    colIdx: number,
    itemIdx: number
  ) {
    if (this.measurementStore.hasItemPosition(itemData)) {
      return;
    }

    const previousItemInColumn = this.measurementStore.getGridCell(
      colIdx,
      itemIdx - 1
    );
    const previousItemPosition =
      previousItemInColumn !== null
        ? this.measurementStore.getItemPosition(previousItemInColumn)
        : null;

    const column = colIdx;
    const top = (previousItemPosition && previousItemPosition.bottom) || 0;
    const left = column * this.itemWidth;
    const bottom =
      top + itemHeight + gutter(this.props.gutterWidth, this.props.flexible);

    const newPosition = { column, bottom, left, top, row: itemIdx };

    // update cache
    this.measurementStore.setItemPosition(itemData, newPosition);
  }

  insertItemsWithoutSetState(
    state: State<T>,
    {
      newItems,
      colIdx,
      itemIdx,
      forceUpdate = false,
    }: {
      newItems: Array<T>,
      colIdx?: ?number,
      itemIdx?: ?number,
      forceUpdate?: boolean,
    }
  ): State<T> {
    const { serverItems } = state;
    let gridItems = forceUpdate ? [] : state.gridItems;
    let items;
    if (forceUpdate) {
      items = newItems;
    } else if (
      serverItems &&
      serverItems.length &&
      state.insertedItemsCount < serverItems.length
    ) {
      items = newItems.slice(0, serverItems.length - state.insertedItemsCount);
    } else if (newItems.length > MAX_ITEMS_PER_INSERTION) {
      items = newItems.slice(0, MAX_ITEMS_PER_INSERTION);
    } else {
      items = newItems;
    }

    // build out initial item info blobs for each component
    const pendingDomMeasurements = [];
    const itemInfos = items.map((item, insertedItemIdx) => {
      if (item == null) {
        return null;
      }
      const actualIdx = insertedItemIdx + state.insertedItemsCount;
      const itemData = item.itemData || item;

      const slotIdx = this.getSlotIndex(actualIdx, colIdx, itemIdx);
      this.slotIndices.set(itemData, slotIdx);

      const itemInfo = {
        appended: false,
        itemData,
        slotIdx,
      };

      // see if we need to measure
      if (!this.measurementStore.hasItemMeasurement(itemData)) {
        pendingDomMeasurements.push(itemInfo);
      }

      return itemInfo;
    });

    // measure new measurements
    this.measureItems(pendingDomMeasurements);

    // insert the actual items into the grid
    itemInfos.forEach((itemInfo: ?GridItemType<T>) => {
      if (itemInfo == null) {
        return;
      }
      const { itemData } = itemInfo;
      const { height = 0 } =
        this.measurementStore.getItemMeasurement(itemData) || {};
      if (colIdx != null && itemIdx != null) {
        this.calculateSpecificInsertionPosition(
          itemData,
          height,
          colIdx,
          itemIdx
        );
        const insertionIndex = cellToArrayIndex(
          this.columnCount,
          colIdx,
          itemIdx
        );
        gridItems = gridItems
          .slice(0, insertionIndex)
          .concat(itemInfo)
          .concat(gridItems.slice(insertionIndex));
      } else {
        if (!this.measurementStore.hasItemPosition(itemData)) {
          const newPosition = this.layout.calculatePosition(
            itemData,
            height,
            // $FlowFixMe
            itemInfo.slotIdx
          );
          this.measurementStore.setItemPosition(itemData, newPosition);
        }
        gridItems = gridItems.concat([{ ...itemInfo, appended: true }]);
      }
    });

    return {
      ...state,
      gridItems,
      insertedItemsCount: state.insertedItemsCount + itemInfos.length,
    };
  }

  // public
  insertItems(
    newItems: Array<T>,
    colIdx?: number | null = null,
    itemIdx?: number | null = null,
    forceUpdate?: boolean | null = null
  ) {
    const nextState = this.insertItemsWithoutSetState(this.state, {
      newItems,
      colIdx,
      itemIdx,
      forceUpdate: Boolean(forceUpdate),
    });
    this.setState(nextState, this.insertNextItems);
  }

  cleanupMeasuringComponents() {
    ReactDOM.unmountComponentAtNode(this.measuringNode);
  }

  insertNextItems = () => {
    if (this.state.insertedItemsCount >= this.props.items.length) {
      // no more insertions at this time, so clean up any mounted components used for measuring
      this.cleanupMeasuringComponents();
      return;
    }
    this.insertAnimationFrame = requestAnimationFrame(() => {
      // $FlowFixMe
      const nextState = this.insertItemsWithoutSetState(this.state, {
        newItems: this.props.items.slice(this.state.insertedItemsCount),
      });
      // $FlowFixMe
      this.setState(nextState, this.insertNextItems);
    });
  };

  /**
   * Delays resize handling in case the scroll container is still being resized.
   */
  handleResize = () => {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      this.updateDimensions();
      this.reflow();
    }, 100);
  };

  updateDimensions = () => {
    const { columnWidth, flexible } = this.props;
    const el = this.gridWrapper;
    if (el && el.parentNode instanceof HTMLElement) {
      const gridWidth = el.parentNode.clientWidth;

      // Calculate the number of columns
      const eachItemWidth =
        this.props.columnWidth +
        gutter(this.props.gutterWidth, this.props.flexible);
      this.columnCount = Math.max(
        this.props.minCols,
        Math.floor(gridWidth / eachItemWidth)
      );

      this.itemWidth = flexible
        ? Math.floor(gridWidth / this.columnCount)
        : columnWidth + gutter(this.props.gutterWidth, flexible);
      this.measurementStore.setDimensions({
        columnCount: this.columnCount,
        itemWidth: this.itemWidth,
      });
    }
  };

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
  });

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
   * TODO(yen) - Make Masonry smart enough so we don't need this anymore.  Handling
   * items resize should be the only use case left?
   */
  reflow() {
    // clear measurements and positions
    this.measurementStore.resetItemMeasurements();
    this.measurementStore.resetItemPositions();
    this.measureContainer();
    const nextState = this.insertItemsWithoutSetState(
      { ...this.state, insertedItemsCount: 0 },
      {
        newItems: this.state.gridItems,
        forceUpdate: true,
      }
    );
    this.setState(nextState, this.insertNextItems);
  }

  fetchMore = () => {
    const { loadItems } = this.props;
    if (loadItems && typeof loadItems === 'function') {
      const allItems = this.state.gridItems;
      this.setState({
        isFetching: true,
      });
      loadItems({
        from: allItems.length,
      });
    }
  };

  renderMasonryComponent = (item: GridItemType<T>, idx: number) => {
    const { appended, itemData, position, slotIdx } = item;
    const { comp: Component, virtualize } = this.props;
    // we inline position for server rendered items instead of setting them in cache
    const itemPosition =
      position || this.measurementStore.getItemPosition(itemData);
    if (!itemPosition) {
      return null;
    }
    const { top, left } = itemPosition;

    let isVisible;
    if (this.props.scrollContainer) {
      const virtualBuffer = this.containerHeight * VIRTUAL_BUFFER_FACTOR;
      const offsetScrollPos = this.state.scrollTop - this.containerOffset;
      const viewportTop = offsetScrollPos - virtualBuffer;
      const viewportBottom =
        offsetScrollPos + this.containerHeight + virtualBuffer;

      isVisible = !(
        itemPosition.bottom < viewportTop || itemPosition.top > viewportBottom
      );
    } else {
      // if no scroll container is passed in, items should always be visible
      isVisible = true;
    }

    const itemClassName = [
      this.state.serverItems ? 'static' : styles.Masonry__Item,
      this.state.mounted ? styles.Masonry__Item__Mounted : '',
    ].join(' ');

    const itemComponent = (
      <div
        className={itemClassName}
        data-grid-item
        key={`${slotIdx}.${this.refUpdateCounter}`}
        style={{
          top: 0,
          left: 0,
          transform: `translateX(${left}px) translateY(${top}px)`,
          WebkitTransform: `translateX(${left}px) translateY(${top}px)`,
          ...(this.itemWidth
            ? {
                width:
                  this.itemWidth -
                  gutter(this.props.gutterWidth, this.props.flexible),
              }
            : {}),
          ...(virtualize || isVisible
            ? {}
            : { display: 'none', transition: 'none' }),
        }}
        {...(this.state.serverItems
          ? {
              ref: ref => {
                if (ref && this.serverRefs.length <= idx) {
                  this.serverRefs.push({
                    itemData,
                    ref,
                  });
                }
              },
            }
          : {})}
      >
        <div
          className={
            appended || !this.state.mounted
              ? null
              : styles.Masonry__Item__Animated
          }
        >
          <Component
            data={itemData}
            addRelatedItems={this.handleAddRelatedItems(itemData)}
            itemIdx={slotIdx}
          />
        </div>
      </div>
    );

    return virtualize ? (
      (isVisible && itemComponent) || null
    ) : (
      <MasonryComponentWrapper
        key={`wrapper-${slotIdx}`}
        isInViewport={isVisible}
        component={itemComponent}
      />
    );
  };

  render() {
    const Component = this.props.comp;
    let gridBody;
    if (!this.state.mounted && this.measurementStore.isEmpty()) {
      const itemWidth = !this.props.flexible
        ? this.itemWidth - gutter(this.props.gutterWidth, this.props.flexible)
        : undefined;

      gridBody = (
        <div
          className={styles.Masonry}
          style={{ height: 0, width: 'NaNpx' }}
          ref={this.setGridWrapperRef}
        >
          {this.props.items.map((item, i) => (
            <div
              className="static"
              data-grid-item
              // keep this in sync with renderMasonryComponent
              key={`${i}.${this.refUpdateCounter}`}
              style={{
                top: 0,
                left: 0,
                transform: 'translateX(0px) translateY(0px)',
                WebkitTransform: 'translateX(0px) translateY(0px)',
                width: itemWidth,
              }}
              ref={ref => {
                if (ref && this.serverRefs.length <= i) {
                  this.serverRefs.push({ itemData: item, ref });
                }
              }}
            >
              <div>
                <Component
                  data={item}
                  addRelatedItems={() => {}}
                  // keep this in sync with renderMasonryComponent
                  itemIdx={i}
                />
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      const allItems = this.state.serverItems || this.state.gridItems;
      const height = this.measurementStore.getColumnHeight(
        this.measurementStore.tallestColumn
      );
      if (this.gridWrapper) {
        gridBody = (
          <div
            className={styles.Masonry}
            ref={this.setGridWrapperRef}
            style={{
              height,
              width: `${this.columnCount * this.itemWidth -
                gutter(this.props.gutterWidth, this.props.flexible)}px`,
            }}
          >
            {this.scrollContainer && (
              <FetchItems
                containerHeight={this.containerHeight}
                fetchMore={this.fetchMore}
                isFetching={
                  this.state.isFetching ||
                  this.state.insertedItemsCount < this.props.items.length
                }
                scrollHeight={this.measurementStore.getColumnHeight(
                  this.measurementStore.shortestColumn
                )}
                scrollTop={this.state.scrollTop}
              />
            )}
            {// $FlowFixMe
            allItems.map(this.renderMasonryComponent)}
          </div>
        );
      } else {
        gridBody = (
          <div
            className={styles.Masonry}
            ref={this.setGridWrapperRef}
            style={{
              height,
              width: `${this.columnCount * this.itemWidth -
                gutter(this.props.gutterWidth, this.props.flexible)}px`,
            }}
          />
        );
      }
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
