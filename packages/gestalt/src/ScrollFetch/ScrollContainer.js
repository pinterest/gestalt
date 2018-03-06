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
    if (!scrollContainer) {
      return;
    }
    this.updateScrollContainer(scrollContainer);
  }

  componentWillReceiveProps(nextProps: Props) {
    const nextScrollContainer = getScrollContainer(nextProps.scrollContainer);
    if (!nextScrollContainer || nextScrollContainer === this.scrollContainer) {
      return;
    }
    this.updateScrollContainer(nextScrollContainer);
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
