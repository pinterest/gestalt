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
