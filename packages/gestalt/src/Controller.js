// @flow strict
import React, { Component, type Node as ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ESCAPE } from './keyCodes.js';
import Contents from './Contents.js';
import OutsideEventBehavior from './behaviors/OutsideEventBehavior.js';
import { useScrollableContainer } from './contexts/ScrollableContainer.js';
import type { ClientRect, Coordinates } from './utils/positioningTypes.js';
import { getTriggerRect } from './utils/positioningUtils.js';

const SIZE_WIDTH_MAP = {
  xs: 180,
  sm: 230,
  md: 284,
  lg: 320,
  xl: 360,
};
type OwnProps = {|
  anchor: HTMLElement,
  bgColor: 'blue' | 'darkGray' | 'orange' | 'red' | 'white',
  border?: boolean,
  caret?: boolean,
  children?: ReactNode,
  handleKeyDown?: (event: SyntheticKeyboardEvent<HTMLElement> | {| keyCode: number |}) => void,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  onDismiss: () => void,
  positionRelativeToAnchor: boolean,
  rounding?: 2 | 4,
  shouldFocus?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | null,
|};

type HookProps = {|
  scrollableContainerRef: ?HTMLDivElement,
|};

type Props = {| ...OwnProps, ...HookProps |};

type State = {|
  relativeOffset: Coordinates,
  triggerBoundingRect: ClientRect,
|};

const ControllerProptypes = {
  anchor: PropTypes.shape({
    contains: PropTypes.func,
    getBoundingClientRect: PropTypes.func,
  }),
  bgColor: PropTypes.oneOf(['blue', 'darkGray', 'orange', 'red', 'white']),
  border: PropTypes.bool,
  caret: PropTypes.bool,
  children: PropTypes.node,
  handleKeyDown: PropTypes.func,
  idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  onDismiss: PropTypes.func.isRequired,
  positionRelativeToAnchor: PropTypes.bool,
  rounding: PropTypes.oneOf([2, 4]),
  shouldFocus: PropTypes.bool,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), // default: sm
  ]),
};

class Controller extends Component<Props, State> {
  static propTypes = ControllerProptypes;

  static defaultProps: {|
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | null,
  |} = {
    // Default size only applies when size is omitted,
    // if passed as null it will remain null
    size: 'sm',
  };

  state = {
    relativeOffset: {
      x: 0,
      y: 0,
    },
    triggerBoundingRect: {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    },
  };

  static getDerivedStateFromProps({
    anchor,
    positionRelativeToAnchor,
    scrollableContainerRef,
  }: Props) {
    return getTriggerRect({ anchor, positionRelativeToAnchor, scrollableContainerRef });
  }

  componentDidMount() {
    this.updateTriggerRect(this.props);
  }

  handleKeyDown: (event: {| keyCode: number |}) => void = (event) => {
    const { handleKeyDown, onDismiss } = this.props;
    if (event.keyCode === ESCAPE) {
      onDismiss();
    }
    if (handleKeyDown) handleKeyDown(event);
  };

  handlePageClick: (event: Event) => void = (event) => {
    const { anchor, onDismiss } = this.props;
    if (event.target instanceof Node && !anchor.contains(event.target)) {
      onDismiss();
    }
  };

  handleResize: () => void = () => {
    this.updateTriggerRect(this.props);
  };

  updateTriggerRect: (Props) => void = ({
    anchor,
    positionRelativeToAnchor,
    scrollableContainerRef,
  }: Props) => {
    const { relativeOffset, triggerBoundingRect } = getTriggerRect({
      anchor,
      positionRelativeToAnchor,
      scrollableContainerRef,
    });
    this.setState({ relativeOffset, triggerBoundingRect });
  };

  render(): ReactNode {
    const {
      anchor,
      bgColor,
      border,
      caret,
      children,
      idealDirection,
      positionRelativeToAnchor,
      rounding,
      shouldFocus,
      size,
    } = this.props;
    const { relativeOffset, triggerBoundingRect } = this.state;

    const width = typeof size === 'string' ? SIZE_WIDTH_MAP[size] : size;

    return (
      <OutsideEventBehavior onClick={this.handlePageClick}>
        <Contents
          anchor={anchor}
          bgColor={bgColor}
          border={border}
          caret={caret}
          idealDirection={idealDirection}
          onKeyDown={this.handleKeyDown}
          onResize={this.handleResize}
          positionRelativeToAnchor={positionRelativeToAnchor}
          relativeOffset={relativeOffset}
          rounding={rounding}
          shouldFocus={shouldFocus}
          triggerRect={triggerBoundingRect}
          width={width}
        >
          {children}
        </Contents>
      </OutsideEventBehavior>
    );
  }
}

const WrappedController = (props: OwnProps): ReactNode => {
  const { scrollableContainerRef = null } = useScrollableContainer();
  return <Controller {...props} scrollableContainerRef={scrollableContainerRef} />;
};

export default WrappedController;
