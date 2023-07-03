// @flow strict
import { Component, createRef, type Element } from 'react';
import { Masonry } from 'gestalt';
import ExampleGridItem from './ExampleGridItem.js';
import getClassicGridServerStyles from './getClassicGridServerStyles.js';
import getFlexibleGridServerStyles from './getFlexibleGridServerStyles.js';
import generateExampleItems from './items-utils/generateExampleItems.js';
import generateRealisticExampleItems from './items-utils/generateRealisticExampleItems.js';
import getRandomNumberGenerator from './items-utils/getRandomNumberGenerator.js';

// MasonryContainer is a simulation of a web page that contains a Masonry grid
// on it. It allows for a ton of configuration and also has a number of buttons
// rendered at the top, all of which change the behavior of the page and the
// grid. This is intended to simulate all possible scenarios a Masonry grid
// could be rendered; it's a gauntlet!
//
// Note: While most of the behavior of this component is meant to test how
// Masonry works, MasonryContainer also supports certain SSR functionality such
// as generating styles that affect pre-hydration Masonry content.

const TWO_COL_MINDEX = 50;

type Props = {|
  // The actual Masonry component to be used (if using an experimental version of Masonry).
  MasonryComponent: typeof Masonry,
  // Experimental prop to batch paints of measured items.
  batchPaints?: boolean,
  // Sets up props to display a collage layout.
  collage?: boolean,
  // Constrains the width of the grid rendering.
  constrained?: boolean,
  // Whether or not to use an external cache
  externalCache?: boolean,
  // Does not allow infinite scroll.
  finiteLength?: boolean,
  // Grid items should have flexible width.
  flexible?: boolean,
  // The initial data from the server side render.
  // $FlowFixMe[unclear-type]
  initialItems?: $ReadOnlyArray<?Object>,
  // Whether or not to log whitespace.
  logWhitespace?: boolean,
  // Whether or not to require tests to trigger fetch completion manually.
  manualFetch?: boolean,
  // External measurement store.
  // $FlowFixMe[unclear-type]
  measurementStore: Object,
  // Prevent scrolling on Masonry
  noScroll?: boolean,
  // Positions the element inside of a relative container, offset from the top.
  offsetTop?: number,
  // An array of realistic pin heights as sampled from actual Pin data.
  pinHeightsSample?: $ReadOnlyArray<number>,
  // If we should position the grid within a scrollContainer besides the window.
  scrollContainer?: boolean,
  // Insert two-column items into the feed
  twoColItems?: boolean,
  // If we should virtualize the grid
  virtualize?: boolean,
  // The relative amount in pixel to extend the virtualized viewport top value.
  virtualBoundsTop?: number,
  // The relative amount in pixel to extend the virtualized viewport bottom value.
  virtualBoundsBottom?: number,
|};

type State = {|
  expanded: boolean,
  hasScrollContainer: boolean,
  // $FlowFixMe[unclear-type]
  items: $ReadOnlyArray<Object>,
  mountGrid: boolean,
  mounted: boolean,
|};

export default class MasonryContainer extends Component<Props, State> {
  state: State = {
    expanded: false,
    hasScrollContainer: !!this.props.scrollContainer,
    items: this.props.initialItems || [],
    mountGrid: true,
    mounted: false, // eslint-disable-line react/no-unused-state
  };

  // $FlowFixMe[unclear-type]
  gridRef: {| current: any | null |} = createRef();

  randomNumberSeed: number = 0;

  componentDidMount() {
    window.TEST_FETCH_COUNTS = 0;

    window.addEventListener('trigger-reflow', () => {
      if (this.gridRef.current) {
        this.gridRef.current.reflow();
        this.forceUpdate();
      }
    });

    window.addEventListener('set-masonry-items', (e) => {
      this.setState({
        items: e.detail.items,
      });
    });

    window.ERROR_COUNT = window.ERROR_COUNT || 0;
    window.addEventListener('error', () => {
      window.ERROR_COUNT += 1;
    });

    // Trigger a re-render in case we need to render /w scrollContainer.
    setTimeout(() => {
      this.setState({ mounted: true }); // eslint-disable-line react/no-unused-state
    });
  }

  handleToggleScrollContainer: () => void = () => {
    this.setState((prevState) => ({
      hasScrollContainer: !prevState.hasScrollContainer,
    }));
  };

  handlePushGridDown: () => void = () => {
    const topSibling = document.getElementById('top-sibling');
    if (!topSibling) {
      throw new Error('Cannot find top-sibling.');
    }
    topSibling.style.height = '1000px';

    if (this.gridRef.current && this.gridRef.current.updatePosition) {
      this.gridRef.current.updatePosition();
    }
  };

  handleAddItems: () => void = () => {
    const { items } = this.state;
    this.customLoadItems({ name: 'Manual Fetch Pin', from: items.length, force: true });
  };

  handleShuffleItems: () => void = () => {
    this.randomNumberSeed += 1;
    const pseudoRandom = getRandomNumberGenerator(this.randomNumberSeed);

    this.setState((prevState) => ({
      items: [...prevState.items]
        .map((item) => ({
          ...item,
        }))
        .sort(() => 0.5 - pseudoRandom()),
    }));
  };

  handleInsertNullItems: () => void = () => {
    this.setState((prevState) => ({
      items: [...prevState.items, null, null, null],
    }));
  };

  handleExpandGridItems: () => void = () => {
    this.setState(
      (prevState) => ({
        expanded: !prevState.expanded,
      }),
      () => {
        if (this.gridRef.current) {
          this.gridRef.current.reflow();
        }
      },
    );
  };

  handleUpdateGridItems: () => void = () => {
    this.setState(
      (prevState) => ({
        mountGrid: !prevState.mountGrid,
      }),
      () => {
        this.setState((prevState) => ({
          mountGrid: !prevState.mountGrid,
        }));
      },
    );

    setTimeout(() => {
      this.setState((prevState) => ({
        items: prevState.items.map((item) =>
          item
            ? {
                ...item,
                height: item.height * 2,
              }
            : item,
        ),
      }));
    });
  };

  toggleMount: () => void = () => {
    window.ITEM_MOUNT_COUNT = 0;
    this.setState((prevState) => ({
      mountGrid: !prevState.mountGrid,
    }));
  };

  pushFirstItemDown: () => void = () => {
    const { measurementStore } = this.props;
    measurementStore.setItemPosition(measurementStore.getGridCell(0, 0), { top: 100, row: 1 });
    this.forceUpdate();
  };

  customLoadItems: ({| force: boolean, from?: number, name?: string |}) => void = ({
    name,
    from = 0,
    force = false,
  }) => {
    const { collage, manualFetch, pinHeightsSample, twoColItems } = this.props;

    if (manualFetch && !force) {
      return;
    }

    window.TEST_FETCH_COUNTS += 1;

    let until = from + 20;
    let baseHeight = 200;

    if (collage) {
      until = 5;
      baseHeight = 40;
    }

    this.randomNumberSeed += 1;
    const newItems =
      pinHeightsSample && pinHeightsSample.length > 1
        ? generateRealisticExampleItems({
            name,
            numberOfItems: until - from,
            previousItemCount: from,
            randomNumberSeed: Math.random(),
            pinHeightsSample,
            twoColItems: twoColItems && from > TWO_COL_MINDEX,
          })
        : generateExampleItems({
            name,
            numberOfItems: until - from,
            previousItemCount: from,
            baseHeight,
            randomNumberSeed: this.randomNumberSeed,
            twoColItems: twoColItems && from > TWO_COL_MINDEX,
          });

    this.setState(({ items }) => ({
      items: [...items, ...newItems],
    }));
  };

  loadItems: $ElementType<React$ElementConfig<typeof Masonry>, 'loadItems'> = (props) => {
    const { collage, manualFetch, pinHeightsSample, twoColItems } = this.props;

    if (manualFetch) {
      return;
    }

    window.TEST_FETCH_COUNTS += 1;

    const defaultFrom = props?.from ?? 0;

    let until = defaultFrom + 20;
    let baseHeight = 200;

    if (collage) {
      until = 5;
      baseHeight = 40;
    }

    this.randomNumberSeed += 1;
    const newItems =
      pinHeightsSample && pinHeightsSample.length > 1
        ? generateRealisticExampleItems({
            name: undefined,
            numberOfItems: until - defaultFrom,
            previousItemCount: defaultFrom,
            randomNumberSeed: Math.random(),
            pinHeightsSample,
            twoColItems: twoColItems && defaultFrom > TWO_COL_MINDEX,
          })
        : generateExampleItems({
            name: undefined,
            numberOfItems: until - defaultFrom,
            previousItemCount: defaultFrom,
            baseHeight,
            randomNumberSeed: this.randomNumberSeed,
            twoColItems: twoColItems && defaultFrom > TWO_COL_MINDEX,
          });

    this.setState(({ items }) => ({
      items: [...items, ...newItems],
    }));
  };

  renderItem: $ElementType<React$ElementConfig<typeof Masonry>, 'renderItem'> = ({
    data,
    itemIdx,
  }) => {
    const { expanded } = this.state;
    return <ExampleGridItem expanded={expanded} data={data} itemIdx={itemIdx} />;
  };

  render(): Element<'div'> {
    const {
      MasonryComponent,
      batchPaints,
      collage,
      constrained,
      externalCache,
      finiteLength,
      flexible,
      logWhitespace,
      measurementStore,
      noScroll,
      offsetTop,
      twoColItems,
      virtualBoundsBottom,
      virtualBoundsTop,
      virtualize,
    } = this.props;

    const { hasScrollContainer, mountGrid, items } = this.state;

    const dynamicGridProps: {|
      minCols: $ElementType<React$ElementConfig<typeof Masonry>, 'minCols'>,
      gutterWidth: $ElementType<React$ElementConfig<typeof Masonry>, 'gutterWidth'>,
      loadItems: $ElementType<React$ElementConfig<typeof Masonry>, 'loadItems'>,
      virtualBoundsTop: $ElementType<React$ElementConfig<typeof Masonry>, 'virtualBoundsBottom'>,
      virtualBoundsBottom: $ElementType<React$ElementConfig<typeof Masonry>, 'virtualBoundsBottom'>,
      scrollContainer: $ElementType<React$ElementConfig<typeof Masonry>, 'scrollContainer'>,
    |} = {
      minCols: undefined,
      gutterWidth: undefined,
      loadItems: undefined,
      virtualBoundsTop: undefined,
      virtualBoundsBottom: undefined,
      scrollContainer: undefined,
    };

    const gridStyle: {|
      margin: ?string,
      width: ?string | number,
    |} = {
      margin: undefined,
      width: undefined,
    };

    if (constrained) {
      gridStyle.margin = '0px 200px';
    }

    // One example of a collage layout w/o scrolling.
    if (collage) {
      dynamicGridProps.minCols = 1;
      dynamicGridProps.gutterWidth = 5;
      gridStyle.width = 500;
    }

    if (flexible) {
      gridStyle.width = '100%';
      dynamicGridProps.gutterWidth = 0;
    }

    // Allow for infinite scroll if the test does not opt out with the finiteLength prop.
    if (!finiteLength) {
      dynamicGridProps.loadItems = this.loadItems;
    }

    if (virtualBoundsTop) {
      dynamicGridProps.virtualBoundsTop = virtualBoundsTop;
    }

    if (virtualBoundsBottom) {
      dynamicGridProps.virtualBoundsBottom = virtualBoundsBottom;
    }

    if (noScroll) {
      dynamicGridProps.scrollContainer = undefined;
    } else if (hasScrollContainer) {
      const query = document.querySelector('[data-scroll-container]');
      if (typeof document === 'undefined') {
        dynamicGridProps.scrollContainer = undefined;
      } else if (query) {
        dynamicGridProps.scrollContainer = () => query;
      }
    } else {
      dynamicGridProps.scrollContainer = typeof window === 'undefined' ? undefined : () => window;
    }

    const columnWidth = flexible ? 300 : 240;

    let gridWrapper = (
      <div id="gridWrapper" className="gridCentered" style={gridStyle}>
        <div id="top-sibling" />
        {mountGrid && (
          <MasonryComponent
            _batchPaints={batchPaints}
            _logTwoColWhitespace={
              logWhitespace
                ? // eslint-disable-next-line no-console
                  (whitespace) => console.log('Whitespace above 2-col module:', whitespace)
                : undefined
            }
            _twoColItems={twoColItems}
            columnWidth={columnWidth}
            gutterWidth={0}
            items={items}
            layout={flexible ? 'flexible' : undefined}
            measurementStore={externalCache ? measurementStore : undefined}
            ref={this.gridRef}
            renderItem={this.renderItem}
            virtualize={virtualize}
            {...dynamicGridProps}
          />
        )}
        <div className="afterGrid" />
      </div>
    );

    // Render multiple relative ancestors to verify virtual bound calculation.
    if (offsetTop) {
      const top = parseInt(offsetTop / 2, 10);
      gridWrapper = (
        <div style={{ top, position: 'relative' }}>
          <div style={{ top, position: 'relative' }}>{gridWrapper}</div>
        </div>
      );
    }

    const containerStyle = hasScrollContainer ? { height: 400, overflowY: 'scroll' } : {};

    return (
      <div>
        <div style={{ paddingTop: 8, paddingBottom: 8 }}>
          <button id="add-items" onClick={this.handleAddItems} type="submit">
            Add items
          </button>
          <button id="shuffle-items" onClick={this.handleShuffleItems} type="submit">
            Shuffle items
          </button>
          <button id="toggle-mount" onClick={this.toggleMount} type="submit">
            Toggle mount
          </button>
          <button id="insert-null-items" onClick={this.handleInsertNullItems} type="submit">
            Insert null items
          </button>
          {externalCache && (
            <button id="push-first-down" onClick={this.pushFirstItemDown} type="submit">
              Push first item down
            </button>
          )}
          <button id="push-grid-down" onClick={this.handlePushGridDown} type="submit">
            Push grid down
          </button>
          <button id="update-grid-items" onClick={this.handleUpdateGridItems} type="submit">
            Update grid items
          </button>
          {!flexible && (
            <button id="expand-grid-items" onClick={this.handleExpandGridItems} type="submit">
              Expand grid items
            </button>
          )}
          <button
            id="toggle-scroll-container"
            onClick={this.handleToggleScrollContainer}
            type="submit"
          >
            Toggle scroll container
          </button>
        </div>
        <div data-scroll-container style={containerStyle}>
          {gridWrapper}
        </div>
        <style>
          {flexible
            ? getFlexibleGridServerStyles({
                maxItemWidth: columnWidth,
                maxColumns: 10,
                minColumns: 3,
              })
            : getClassicGridServerStyles({
                itemWidth: columnWidth,
                maxColumns: 10,
                minColumns: 3,
              })}
        </style>
      </div>
    );
  }
}
