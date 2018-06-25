/**
 * FetchItems is a logic component that renders no content itself. Its job
 * is to manage when the given fetchMore method should be called based on
 * the given scroll/size props.
 *
 * While no element is actually passed to FetchItems, it is intended to be used
 * in conjunction with a large scroll container that uses async fetching to
 * load and render additional data. Based on the height of this container and
 * its current scroll position, FetchItems is responsible for triggering future
 * fetch calls.
 */

// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

type Props = {
  containerHeight: number,
  isAtEnd?: boolean,
  isFetching: boolean,
  fetchMore?: Function,
  scrollHeight: number,
  scrollTop: number,
};

export default class FetchItems extends React.PureComponent<Props> {
  static propTypes = {
    containerHeight: PropTypes.number.isRequired,
    isAtEnd: PropTypes.bool,
    isFetching: PropTypes.bool.isRequired,
    fetchMore: PropTypes.func,
    scrollHeight: PropTypes.number.isRequired,
    scrollTop: PropTypes.number.isRequired,
  };

  componentDidMount() {
    setTimeout(this.check);
  }

  componentDidUpdate() {
    this.check();
  }

  check = () => {
    const {
      containerHeight,
      isAtEnd,
      isFetching,
      fetchMore,
      scrollHeight,
      scrollTop,
    } = this.props;

    if (isAtEnd || isFetching || !fetchMore) {
      return;
    }
    const scrollBuffer = containerHeight * 3;

    if (scrollTop + scrollBuffer > scrollHeight) {
      fetchMore();
    }
  };

  render() {
    return null;
  }
}
