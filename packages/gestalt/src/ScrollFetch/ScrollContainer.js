/**
 * ScrollContainer is a pass-through component that simply sets up an onScroll
 * handler on the given scrollContainer element (or the element that is
 * returned as result of calling the scrollContainer method). This allows for
 * the event listener subscription of the scrollContainer to be managed inside
 * the React lifecycle without adding bloat to Masonry or other onScroll
 * subscribers.
 *
 * Note that this Component renders its children without creating any
 * additional content. Also note that, while the component is built to manage
 * onScroll inside of the React lifecycle, it doesn't change onScroll events
 * or the API at all, so it could easily be adapted to other event types.
 */

// @flow
import * as React from 'react';
import PropTypes from 'prop-types';

type Props = {|
  children?: any,
  onScroll: (event: Event) => void,
  scrollContainer: ?HTMLElement | (() => ?HTMLElement),
|};

function getScrollContainer(scrollContainer) {
  return typeof scrollContainer === 'function'
    ? scrollContainer()
    : scrollContainer;
}

export default class ScrollContainer extends React.Component<Props> {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onScroll: PropTypes.func.isRequired,
    scrollContainer: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
      .isRequired,
  };

  componentDidMount() {
    const scrollContainer = getScrollContainer(this.props.scrollContainer);
    if (scrollContainer) {
      this.updateScrollContainer(scrollContainer);
    }
  }

  componentDidUpdate() {
    const nextScrollContainer = getScrollContainer(this.props.scrollContainer);
    if (nextScrollContainer && nextScrollContainer !== this.scrollContainer) {
      this.updateScrollContainer(nextScrollContainer);
    }
  }

  componentWillUnmount() {
    if (this.scrollContainer) {
      this.scrollContainer.removeEventListener('scroll', this.handleScroll);
    }
  }

  getScrollContainerRef = () => this.scrollContainer;

  updateScrollContainer(scrollContainer: HTMLElement) {
    if (this.scrollContainer) {
      // cleanup existing scroll container if it exists
      this.scrollContainer.removeEventListener('scroll', this.handleScroll);
    }
    this.scrollContainer = scrollContainer;
    this.scrollContainer.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = (event: Event) => {
    this.props.onScroll(event);
  };

  scrollContainer: ?HTMLElement;

  render() {
    return React.Children.only(this.props.children);
  }
}
