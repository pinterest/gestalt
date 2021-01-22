// @flow strict
import React, { Component, type Node as ReactNode } from 'react';
import PropTypes from 'prop-types';
import { ESCAPE } from './keyCodes.js';
import Contents from './Contents.js';
import OutsideEventBehavior from './behaviors/OutsideEventBehavior.js';
import { useScrollableBoxStore } from './contexts/ScrollableBoxStore.js';

type OwnProps = {|
  anchor: HTMLElement,
  bgColor: 'blue' | 'darkGray' | 'orange' | 'red' | 'white',
  border?: boolean,
  caret?: boolean,
  children?: ReactNode,
  handleKeyDown?: (
    event: SyntheticKeyboardEvent<HTMLElement> | {| keyCode: number |}
  ) => void,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  onDismiss: () => void,
  positionRelativeToAnchor: boolean,
  rounding?: 2 | 4,
  shouldFocus?: boolean,
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | null,
|};

type HookProps = {|
  refs: $ReadOnlyArray<?HTMLDivElement>,
|};

type Props = {| ...OwnProps, ...HookProps |};

const SIZE_WIDTH_MAP = {
  xs: 180,
  sm: 230,
  md: 284,
  lg: 320,
  xl: 360,
};

type ClientRect = {|
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number,
|};

type State = {|
  relativeOffset: {|
    x: number,
    y: number,
  |},
  triggerBoundingClientRect: ClientRect,
|};

function getTriggerRect(
  anchor: HTMLElement,
  positionRelativeToAnchor: boolean,
  refs: $ReadOnlyArray<?HTMLDivElement>
): {|
  relativeOffset: void | {| x: number, y: number |},
  triggerBoundingClientRect: void | ClientRect,
|} {
  let relativeOffset;
  let triggerBoundingClientRect;

  if (!anchor) {
    return { relativeOffset, triggerBoundingClientRect };
  }

  // Find the closest ScrollableBox container
  let containerNode = null;
  let currentNode = anchor;

  while (!containerNode) {
    if (refs && currentNode && currentNode.parentNode) {
      // eslint-disable-next-line no-loop-func
      refs.forEach((ref) => {
        if (
          currentNode instanceof HTMLDivElement &&
          ref?.isSameNode(currentNode)
        ) {
          containerNode = ref;
        }
      });
      currentNode = currentNode.parentNode;
    } else {
      break;
    }
  }

  const boundingAnchorRect = anchor.getBoundingClientRect();
  triggerBoundingClientRect = {
    bottom: boundingAnchorRect.bottom,
    left: boundingAnchorRect.left,
    right: boundingAnchorRect.right,
    top: boundingAnchorRect.top,
    height: boundingAnchorRect.height,
    width: boundingAnchorRect.width,
  };

  if (containerNode) {
    const boundingContainerRect = containerNode.getBoundingClientRect();
    triggerBoundingClientRect.bottom =
      boundingAnchorRect.bottom - boundingContainerRect.top;
    triggerBoundingClientRect.left =
      boundingAnchorRect.left - boundingContainerRect.left;
    triggerBoundingClientRect.right =
      boundingAnchorRect.right - boundingContainerRect.left;
    triggerBoundingClientRect.top =
      boundingAnchorRect.top - boundingContainerRect.top;
  }

  // Needed for correct positioning within Contents.js
  relativeOffset = {
    x: positionRelativeToAnchor
      ? triggerBoundingClientRect.left - anchor.offsetLeft
      : 0,
    y: positionRelativeToAnchor
      ? triggerBoundingClientRect.top - anchor.offsetTop
      : 0,
  };

  return {
    relativeOffset,
    triggerBoundingClientRect,
  };
}

class Controller extends Component<Props, State> {
  static propTypes = {
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

  static defaultProps: {|
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | null,
  |} = {
    // Default size only applies when size is omitted,
    // if passed as null it will remain null
    size: 'sm',
  };

  state: State = {
    relativeOffset: {
      x: 0,
      y: 0,
    },
    triggerBoundingClientRect: {
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
    refs,
  }: Props) {
    return getTriggerRect(anchor, positionRelativeToAnchor, refs);
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
    refs,
  }: Props) => {
    const { relativeOffset, triggerBoundingClientRect } = getTriggerRect(
      anchor,
      positionRelativeToAnchor,
      refs
    );
    this.setState({ relativeOffset, triggerBoundingClientRect });
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
    const { relativeOffset, triggerBoundingClientRect } = this.state;

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
          triggerBoundingClientRect={triggerBoundingClientRect}
          width={width}
        >
          {children}
        </Contents>
      </OutsideEventBehavior>
    );
  }
}

const WrappedController = (props: OwnProps): ReactNode => {
  const { refs = [] } = useScrollableBoxStore();
  return <Controller {...props} refs={refs} />;
};

export default WrappedController;
