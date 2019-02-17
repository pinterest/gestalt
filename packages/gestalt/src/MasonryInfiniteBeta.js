// @flow
import * as React from 'react';
import FetchItems from './FetchItems.js';
import MeasurementStore from './MeasurementStore.js';
import Masonry, { type Props, type MeasurementState } from './MasonryBeta.js';
import { type Position } from './defaultLayout.js';

type State<T> = {|
  containerHeight: number,
  hasPendingMeasurements: boolean,
  isFetching: boolean,
  items: Array<T>,
  scrollTop: number,
  scrollHeight: number,
|};

/**
 * This MasonryInfiniteBeta is backward compatible with Masonry and
 * serves to help with migrating to a Masrony that doesn't have
 * the scrol fetch concerns.
 *
 * It is in beta so that it can be battle tested.
 *
 */
export default class MasonryInfiniteBeta<T> extends React.Component<
  Props<T>,
  State<T>
> {
  static createMeasurementStore() {
    return new MeasurementStore();
  }

  static defaultProps = Masonry.defaultProps;

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
  }

  /**
   * Content layer and Viewport layer is as defined in Collection.
   */
  onVirtualizationWindowUpdate = (content: Position, viewport: Position) => {
    const { containerHeight, scrollTop, scrollHeight } = this.state;
    if (
      viewport.height !== containerHeight ||
      viewport.top !== scrollTop ||
      content.height !== scrollHeight
    ) {
      this.setState({
        containerHeight: viewport.height,
        scrollTop: viewport.top,
        scrollHeight: content.height,
      });
    }
  };

  static getDerivedStateFromProps(props: Props<T>, state: State<T>) {
    const { items } = props;

    // assume immutable items
    if (props.items !== state.items) {
      return {
        items,
        isFetching: false,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  setRef = (ref: React.ElementRef<*>) => {
    if (ref) {
      this.gridRef = ref;
    }
  };

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

  handleOnAutoMeasuringUpdate = (state: MeasurementState) => {
    const hasPendingMeasurements = state === 'measuring';
    if (this.state.hasPendingMeasurements !== hasPendingMeasurements) {
      this.setState({ hasPendingMeasurements });
    }

    if (typeof this.props.onAutoMeasuringUpdate === 'function') {
      this.props.onAutoMeasuringUpdate(state);
    }
  };

  reflow = () => {
    if (this.gridRef) {
      this.gridRef.reflow();
    }
  };

  handleResize = () => {
    if (this.gridRef) {
      this.gridRef.handleResize();
    }
  };

  gridRef: Masonry<T>;

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
          onVirtualizationWindowUpdate={this.onVirtualizationWindowUpdate}
          onAutoMeasuringUpdate={this.handleOnAutoMeasuringUpdate}
          ref={this.setRef}
        />
      </React.Fragment>
    ) : (
      <Masonry {...this.props} ref={this.setRef} />
    );
  }
}
