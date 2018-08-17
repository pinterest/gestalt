// @flow
import * as React from 'react';
import FetchItems from './FetchItems.js';
import MeasurementStore from './MeasurementStore.js';
import Masonry, { type Props, type Layer } from './Masonry.js';

type State<T> = {|
  containerHeight: number,
  hasPendingMeasurements: boolean,
  isFetching: boolean,
  items: Array<T>,
  scrollTop: number,
  scrollHeight: number,
|};

const hasNewItem = (i, items) => items[i] === undefined;
const hasDifferentItem = (i, itemsA, itemsB) => itemsA[i] !== itemsB[i];
const hasLessItems = (itemsA, itemsB) => itemsA.length < itemsB.length;

/**
 * This MasonryInfinite is backward compatible and serves to help with migrating
 * to a Masrony that doesn't have the scrol fetch concerns
 */
export default class MasonryInfinite<T> extends React.Component<
  Props<T>,
  State<T>
> {
  static createMeasurementStore() {
    return new MeasurementStore();
  }

  constructor(props: Props<T>) {
    super(props);

    this.state = {
      containerHeight: 0,
      hasPendingMeasurements: false,
      isFetching: false,
      // eslint-disable-next-line react/no-unused-state
      items: props.items,
      scrollTop: 0,
      scrollHeight: 0,
    };

    this.gridRef = React.createRef();
  }

  /**
   * Content layer and Viewport layer is as defined in Collection.
   */
  onLayerUpdate = (contentLayer: Layer, viewportLayer: Layer) => {
    const { containerHeight, scrollTop, scrollHeight } = this.state;
    if (
      viewportLayer.height !== containerHeight ||
      viewportLayer.top !== scrollTop ||
      contentLayer.height !== scrollHeight
    ) {
      this.setState({
        containerHeight: viewportLayer.height,
        scrollTop: viewportLayer.top,
        scrollHeight: contentLayer.height,
      });
    }
  };

  static getDerivedStateFromProps(props: Props<T>, state: State<T>) {
    const { items } = props;

    // Shallow compare all items, if any change reflow the grid.
    // checks below are comparable to Masonry.getDerivedStateFromProps
    for (let i = 0; i < items.length; i += 1) {
      if (
        hasNewItem(i, state.items) ||
        hasDifferentItem(i, items, state.items) ||
        hasLessItems(items, state.items)
      ) {
        return { isFetching: false };
      }
    }

    // Return null to indicate no change to state.
    return null;
  }

  fetchMore = () => {
    const { loadItems } = this.props;
    if (loadItems && typeof loadItems === 'function') {
      this.setState(
        {
          isFetching: true,
        },
        () => loadItems({ from: this.props.items.length })
      );
    }
  };

  handlePendingMeasurementsUpdate = (hasPendingMeasurements: boolean) => {
    if (this.state.hasPendingMeasurements !== hasPendingMeasurements) {
      this.setState({ hasPendingMeasurements });
    }
  };

  reflow = () => {
    if (this.gridRef.current) {
      this.gridRef.current.reflow();
    }
  };

  // $FlowFixMe - this is the right definition
  gridRef: React.ElementRef<typeof Masonry<T>>;

  render() {
    return this.props.scrollContainer ? (
      <React.Fragment>
        <FetchItems
          containerHeight={this.state.containerHeight}
          fetchMore={this.fetchMore}
          isFetching={
            this.state.isFetching || this.state.hasPendingMeasurements
          }
          scrollHeight={this.state.scrollHeight}
          scrollTop={this.state.scrollTop}
        />
        <Masonry
          {...this.props}
          onLayerUpdate={this.onLayerUpdate}
          onPendingMeasurementsUpdate={this.handlePendingMeasurementsUpdate}
          ref={this.gridRef}
        />
      </React.Fragment>
    ) : (
      <Masonry {...this.props} ref={this.gridRef} />
    );
  }
}
