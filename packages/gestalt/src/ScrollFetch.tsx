import { PureComponent, ReactNode } from 'react';
import FetchItems from './FetchItems';
import ScrollContainer from './Masonry/ScrollContainer';
import { getElementHeight, getScrollHeight, getScrollPos } from './Masonry/scrollUtils';
import throttle, { ThrottleReturn } from './throttle';

type Props = {
  /**
   * The scroll container to use. Defaults to window.
   */
  container?: HTMLElement;
  isAtEnd?: boolean;
  isFetching: boolean;
  fetchMore?: () => void;
  renderHeight?: () => number;
};

type State = {
  containerHeight: number;
  scrollHeight: number;
  scrollTop: number;
};

export default class ScrollFetch extends PureComponent<Props, State> {
  /**
   * Fetches additional items if needed.
   */
  updatePosition: ThrottleReturn = throttle(() => {
    this.setState(this.getScrollState());
  });

  static defaultProps: {
    container?: HTMLElement;
  } = {
    // @ts-expect-error - TS2322 - Type '(Window & typeof globalThis) | undefined' is not assignable to type 'HTMLElement | undefined'.
    container: typeof window !== 'undefined' ? window : undefined,
  };

  state: State = {
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
      // @ts-expect-error - TS2345 - Argument of type '{ scrollHeight?: number | undefined; scrollTop?: number | undefined; containerHeight: number; }' is not assignable to parameter of type 'State | ((prevState: Readonly<State>, props: Readonly<Props>) => State | Pick<State, "scrollHeight" | "scrollTop" | "containerHeight"> | null) | Pick<...> | null'.
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
  getScrollHeight: () => number = () => {
    const { container } = this.props;
    if (!container) {
      return 0;
    }
    return getScrollHeight(container);
  };

  getScrollState(): null | {
    scrollHeight: number;
    scrollTop: number;
  } {
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

  render(): null | ReactNode {
    const { containerHeight, scrollHeight, scrollTop } = this.state;
    const { container, fetchMore, isAtEnd, isFetching } = this.props;

    const props = {
      containerHeight,
      fetchMore,
      isAtEnd,
      isFetching,
      scrollHeight,
      scrollTop,
    } as const;

    if (!container || isAtEnd) {
      return null;
    }
    return (
      <ScrollContainer onScroll={this.updatePosition} scrollContainer={container}>
        <FetchItems {...props} />
      </ScrollContainer>
    );
  }
}
