// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import FetchItems from './FetchItems.js';
import ScrollContainer from './ScrollContainer.js';
import {
  getElementHeight,
  getScrollHeight,
  getScrollPos,
} from './scrollUtils.js';
import throttle from './throttle.js';

type Props = {
  container?: HTMLElement,
  isAtEnd?: boolean,
  isFetching: boolean,
  fetchMore?: () => void,
  renderHeight?: () => number,
};

type State = {
  containerHeight: number,
  scrollHeight: number,
  scrollTop: number,
};

export default class ScrollFetch extends React.PureComponent<Props, State> {
  /**
   * Fetches additional items if needed.
   */
  updatePosition = throttle(() => {
    this.setState(this.getScrollState());
  });

  static defaultProps: {};

  state = {
    containerHeight: 0,
    scrollHeight: 0,
    scrollTop: 0,
  };

  /**
   * Adds scroll listener after the component mounts.
   */
  componentDidMount() {
    const { container } = this.props;
    if (!container) {
      return;
    }
    setTimeout(() => {
      this.setState({
        containerHeight: getElementHeight(container),
        ...this.getScrollState(),
      });
    });
  }

  /**
   * Update scroll buffer and check after the component updates.
   */
  componentDidUpdate() {
    // setTimeout so the parent component can calculate renderHeight().
    this.updatePosition();
  }

  /**
   * Returns the scrollable content height.
   */
  getScrollHeight = () => {
    const { container } = this.props;
    if (!container) {
      return 0;
    }
    return getScrollHeight(container);
  };

  getScrollState() {
    const { container, renderHeight } = this.props;
    if (!container) {
      return null;
    }
    const scrollHeight = renderHeight || this.getScrollHeight;

    return {
      scrollHeight: scrollHeight(),
      scrollTop: getScrollPos(container),
    };
  }

  scrollBuffer: number;

  render() {
    const { containerHeight, scrollHeight, scrollTop } = this.state;
    const { container, fetchMore, isAtEnd, isFetching } = this.props;

    const props = {
      containerHeight,
      fetchMore,
      isAtEnd,
      isFetching,
      scrollHeight,
      scrollTop,
    };

    if (!container || isAtEnd) {
      return null;
    }
    return (
      <ScrollContainer
        onScroll={this.updatePosition}
        scrollContainer={container}
      >
        <FetchItems {...props} />
      </ScrollContainer>
    );
  }
}

ScrollFetch.propTypes = {
  /**
   * The scroll container to use. Defaults to window.
   */
  container: PropTypes.shape({
    addEventListener: PropTypes.func,
    removeEventListener: PropTypes.func,
  }),
  renderHeight: PropTypes.func,
  isAtEnd: PropTypes.bool,
  isFetching: PropTypes.bool,
  fetchMore: PropTypes.func,
};

ScrollFetch.defaultProps = {
  container: typeof window !== 'undefined' ? window : null,
};
