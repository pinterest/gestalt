import React from 'react';
import { ExperimentalMasonry as Masonry } from 'gestalt';
import Item from './ExampleGridItem';
import PropTypes from 'prop-types';

const store = Masonry.createMeasurementStore();

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getRandomNumberGenerator = seed => {
  let localSeed = seed;
  return () => {
    localSeed += 1;
    const rnd = Math.sin(localSeed);
    return rnd - Math.floor(rnd);
  };
};

export default class MasonryExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disableServerRender: false,
      expanded: false,
      hasScrollContainer: !!this.props.scrollContainer,
      items: props.initialPins,
      mountGrid: true,
    };
  }

  componentDidMount() {
    window.ERROR_COUNT = window.ERROR_COUNT || 0;
    window.addEventListener('trigger-reflow', () => {
      this.gridRef.reflow();
      this.forceUpdate();
    });

    window.addEventListener('set-masonry-items', e => {
      this.setState({
        items: e.detail.items,
      });
    });

    window.addEventListener('error', () => {
      window.ERROR_COUNT += 1;
    });

    window.addEventListener('resize', () => {
      window.RESIZE_MEASUREMENT_DONE = false;
      setTimeout(() => {
        const checkIfMeasuring = () => {
          if (!this.gridRef.state.hasPendingMeasurements) {
            window.RESIZE_MEASUREMENT_DONE = true;
          } else {
            window.requestAnimationFrame(checkIfMeasuring);
          }
        };
        window.requestAnimationFrame(checkIfMeasuring);
      }, 500);
    });

    // Trigger a re-render in case we need to render /w scrollContainer.
    setTimeout(() => {
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        mounted: true,
      });
    });

    // set flag once masonry mounts - used for remount regression testing
    window.MASONRY_DID_MOUNT = true;
  }

  getItems = ({ name = 'Item', from = 0 }, collage) => {
    let until = from + 20;

    let baseHeight = 200;

    if (collage) {
      until = 5;
      baseHeight = 40;
    }

    return new Promise(resolve => {
      const items = [];
      for (let i = from; i < until; i += 1) {
        items.push({
          name: `${name} ${i}`,
          height: baseHeight + i,
          color: getRandomColor(),
        });
      }
      window.TEST_FETCH_COUNTS = window.TEST_FETCH_COUNTS || 0;
      window.TEST_FETCH_COUNTS += 1;

      window.NEXT_FETCH = () => {
        window.NEXT_FETCH = null;
        resolve(items);
      };
      if (!this.props.manualFetch) {
        window.NEXT_FETCH();
      }
    });
  };

  getScrollContainerRef = ref => {
    this.scrollContainer = ref;
  };

  randomNumberSeed = 0;

  handleToggleScrollContainer = e => {
    e.preventDefault();
    this.setState(prevState => ({
      hasScrollContainer: !prevState.hasScrollContainer,
    }));
  };

  handlePushGridDown = e => {
    e.preventDefault();
    document.getElementById('top-sibling').style.height = '1000px';
  };

  handleShuffleItems = e => {
    e.preventDefault();
    this.randomNumberSeed += 1;
    const pseudoRandom = getRandomNumberGenerator(this.randomNumberSeed);
    this.setState(prevState => ({
      items: [...prevState.items]
        .map(item => ({
          ...item,
        }))
        .sort(() => 0.5 - pseudoRandom()),
    }));
  };

  handleInsertNullItems = e => {
    e.preventDefault();
    this.setState(prevState => ({
      items: [...prevState.items].concat([null, null, null]),
    }));
  };

  handleExpandGridItems = e => {
    e.preventDefault();
    this.setState(
      prevState => ({
        expanded: !prevState.expanded,
      }),
      () => {
        this.gridRef.reflow();
      }
    );
  };

  handleUpdateGridItems = e => {
    e.preventDefault();
    this.setState(
      prevState => ({
        mountGrid: !prevState.mountGrid,
      }),
      () => {
        this.setState(prevState => ({
          disableServerRender: true,
          mountGrid: !prevState.mountGrid,
        }));
      }
    );
    setTimeout(() => {
      this.setState(prevState => ({
        items: prevState.items.map(item => ({
          ...item,
          height: item.height * 2,
        })),
      }));
    });
  };

  toggleMount = e => {
    e.preventDefault();
    window.ITEM_MOUNT_COUNT = 0;
    this.setState(prevState => ({
      mountGrid: !prevState.mountGrid,
    }));
  };

  pushFirstItemDown = e => {
    e.preventDefault();
    // get the first cell and push it down
    store.setItemPosition(store.getGridCell(0, 0), { top: 100, row: 1 });
    this.forceUpdate();
  };

  loadItems = meta => {
    this.getItems(meta, this.props.collage).then(newItems => {
      this.setState({
        items: this.state.items.concat(newItems),
      });
    });
  };

  addMoreItems = () => this.getItems({ name: 'Insertion' });

  renderItem = data => (
    <Item
      expanded={this.state.expanded}
      fetchMore={this.addMoreItems}
      flexible={Boolean(this.props.flexible)}
      {...data}
    />
  );

  render() {
    const dynamicGridProps = {};

    const gridStyleProps = {
      style: {},
    };

    if (this.props.constrained) {
      gridStyleProps.style.margin = '0px 200px';
    }

    // One example of a collage layout w/o scrolling.
    if (this.props.collage) {
      dynamicGridProps.minCols = 1;
      dynamicGridProps.gutterWidth = 5;
      gridStyleProps.style.width = 500;
    }

    if (this.props.flexible) {
      gridStyleProps.style.width = '100%';
      dynamicGridProps.gutterWidth = 0;
    }

    // Allow for infinite scroll if the test does not opt out with the finiteLength prop.
    if (!this.props.finiteLength) {
      dynamicGridProps.loadItems = this.loadItems;
    }

    if (this.state.hasScrollContainer) {
      dynamicGridProps.scrollContainer = () =>
        document.querySelector('[data-scroll-container]');
    } else if (!this.props.noScroll) {
      dynamicGridProps.scrollContainer = () => window;
    }

    let gridWrapper = (
      <div id="gridWrapper" className="gridCentered" {...gridStyleProps}>
        <div style={{ paddingTop: 8, paddingBottom: 8 }}>
          <button id="shuffle-pins" onClick={this.handleShuffleItems}>
            Shuffle items
          </button>
          <button id="toggle-mount" onClick={this.toggleMount}>
            Toggle mount
          </button>
          <button id="insert-null-items" onClick={this.handleInsertNullItems}>
            Insert null items
          </button>
          {this.props.externalCache && (
            <button id="push-first-down" onClick={this.pushFirstItemDown}>
              Push first item down
            </button>
          )}
          <button id="push-grid-down" onClick={this.handlePushGridDown}>
            Push grid down
          </button>
          <button id="update-grid-items" onClick={this.handleUpdateGridItems}>
            Update grid items
          </button>
          {!this.props.flexible && (
            <button id="expand-grid-items" onClick={this.handleExpandGridItems}>
              Expand grid items
            </button>
          )}
          <button
            id="toggle-scroll-container"
            onClick={this.handleToggleScrollContainer}
          >
            Toggle scroll container
          </button>
        </div>
        <div id="top-sibling" />
        {this.state.mountGrid && (
          <Masonry
            comp={this.renderItem}
            flexible={Boolean(this.props.flexible)}
            items={this.state.items}
            measurementStore={this.props.externalCache ? store : undefined}
            ref={ref => {
              this.gridRef = ref;
            }}
            serverRender={!this.state.disableServerRender}
            virtualize={Boolean(this.props.virtualize)}
            {...dynamicGridProps}
          />
        )}
        <div className="afterGrid" />
      </div>
    );

    // Render multiple relative ancestors to verify virtual bound calculation.
    if (this.props.offsetTop) {
      const top = parseInt(this.props.offsetTop / 2, 10);
      gridWrapper = (
        <div style={{ top, position: 'relative' }}>
          <div style={{ top, position: 'relative' }}>{gridWrapper}</div>
        </div>
      );
    }

    const containerStyle = this.state.hasScrollContainer
      ? { height: 400, overflowY: 'scroll' }
      : {};
    return (
      <div
        data-scroll-container
        ref={this.getScrollContainerRef}
        style={containerStyle}
      >
        {gridWrapper}
      </div>
    );
  }
}

MasonryExample.propTypes = {
  // Sets up props to display a collage layout.
  collage: PropTypes.string,
  // Constrains the width of the grid rendering.
  constrained: PropTypes.string,
  // Grid items should have flexible width.
  flexible: PropTypes.bool,
  // Whether or not to use an external cache
  externalCache: PropTypes.string,
  // Whether or not to require tests to trigger fetch completion manually.
  manualFetch: PropTypes.string,
  // Does not allow infinite scroll.
  finiteLength: PropTypes.string,
  // The initial data from the server side render.
  initialPins: PropTypes.arrayOf(PropTypes.shape({})),
  // Prevent scrolling on Masonry
  noScroll: PropTypes.string,
  // Positions the element inside of a relative container, offset from the top.
  offsetTop: PropTypes.string,
  // If we should position the grid within a scrollContainer besides the window.
  scrollContainer: PropTypes.string,
  // If we should virtualize the grid
  virtualize: PropTypes.bool,
};
