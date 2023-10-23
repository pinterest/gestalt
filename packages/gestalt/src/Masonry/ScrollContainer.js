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

// @flow strict
import { Children, Component, type Node } from 'react';

type Props = {
  children?: Node,
  onScroll: (event: Event) => void,
  scrollContainer: ?HTMLElement | (() => ?HTMLElement),
};

function getScrollContainer(scrollContainer: ?(HTMLElement | (() => ?HTMLElement))) {
  return typeof scrollContainer === 'function' ? scrollContainer() : scrollContainer;
}

export default class ScrollContainer extends Component<Props> {
  scrollContainer: ?HTMLElement;

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

  // This is used in Masonry
  // eslint-disable-next-line react/no-unused-class-component-methods
  getScrollContainerRef: () => ?HTMLElement = () => this.scrollContainer;

  handleScroll: (event: Event) => void = (event: Event) => {
    this.props.onScroll(event);
  };

  updateScrollContainer(scrollContainer: HTMLElement) {
    if (this.scrollContainer) {
      // cleanup existing scroll container if it exists
      this.scrollContainer.removeEventListener('scroll', this.handleScroll);
    }
    this.scrollContainer = scrollContainer;
    this.scrollContainer.addEventListener('scroll', this.handleScroll);
  }

  render(): Node {
    // Ensure that we only ever have a single child element
    return Children.only(this.props.children);
  }
}
