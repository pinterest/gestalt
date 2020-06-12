// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import Contents from './Contents.js';
import OutsideEventBehavior from './behaviors/OutsideEventBehavior.js';

type Props = {|
  anchor: HTMLElement,
  bgColor: 'blue' | 'darkGray' | 'orange' | 'red' | 'white',
  border?: boolean,
  caret?: boolean,
  children?: React.Node,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  onDismiss: () => void,
  positionRelativeToAnchor: boolean,
  rounding?: 2 | 4,
  shouldFocus?: boolean,
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | null,
|};

const SIZE_WIDTH_MAP = {
  xs: 180,
  sm: 230,
  md: 284,
  lg: 320,
  xl: 360,
};

const ESCAPE_KEY_CODE = 27;

type ClientRect = {
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number,
  ...
};

type State = {|
  relativeOffset: {
    x: number,
    y: number,
  },
  triggerBoundingRect: ClientRect,
|};

function getTriggerRect(
  anchor: HTMLElement,
  positionRelativeToAnchor: boolean
) {
  let triggerBoundingRect;
  let relativeOffset;
  if (anchor) {
    triggerBoundingRect = anchor.getBoundingClientRect();

    // Needed for correct positioning within Contents.js
    relativeOffset = {
      x: positionRelativeToAnchor
        ? triggerBoundingRect.left - anchor.offsetLeft
        : 0,
      y: positionRelativeToAnchor
        ? triggerBoundingRect.top - anchor.offsetTop
        : 0,
    };
  }

  return { relativeOffset, triggerBoundingRect };
}

export default class Controller extends React.Component<Props, State> {
  static propTypes = {
    anchor: PropTypes.shape({
      contains: PropTypes.func,
      getBoundingClientRect: PropTypes.func,
    }),
    bgColor: PropTypes.oneOf(['blue', 'darkGray', 'orange', 'red', 'white']),
    border: PropTypes.bool,
    caret: PropTypes.bool,
    children: PropTypes.node,
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

  static defaultProps = {
    // Default size only applies when size is omitted,
    // if passed as null it will remain null
    size: 'sm',
  };

  static getDerivedStateFromProps({ anchor, positionRelativeToAnchor }: Props) {
    return getTriggerRect(anchor, positionRelativeToAnchor);
  }

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

  componentDidMount() {
    this.updateTriggerRect(this.props);
  }

  handleKeyDown = (event: { keyCode: number }) => {
    const { onDismiss } = this.props;
    if (event.keyCode === ESCAPE_KEY_CODE) {
      onDismiss();
    }
  };

  handlePageClick = (event: Event) => {
    const { anchor, onDismiss } = this.props;
    if (event.target instanceof Node && !anchor.contains(event.target)) {
      onDismiss();
    }
  };

  handleResize = () => {
    this.updateTriggerRect(this.props);
  };

  updateTriggerRect = ({ anchor, positionRelativeToAnchor }: Props) => {
    const { relativeOffset, triggerBoundingRect } = getTriggerRect(
      anchor,
      positionRelativeToAnchor
    );
    this.setState({ relativeOffset, triggerBoundingRect });
  };

  render() {
    const {
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
