// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box/Box';
import Contents from './Contents';

type Props = {|
  anchor: ?HTMLElement,
  bgColor: 'darkGray' | 'white' | 'orange',
  children?: any,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  onDismiss: () => void,
  positionRelativeToAnchor: boolean,
  shouldFocus?: boolean,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number,
|};

const SIZE_WIDTH_MAP = {
  xs: 185,
  sm: 230,
  md: 284,
  lg: 320,
  xl: 375,
};

const ESCAPE_KEY_CODE = 27;

type ClientRect = {
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number,
};

type State = {
  relativeOffset: {
    x: number,
    y: number,
  },
  triggerBoundingRect: ClientRect,
};

export default class Controller extends React.Component<Props, State> {
  state: State = {
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

  componentWillReceiveProps(nextProps: Props) {
    this.updateTriggerRect(nextProps);
  }

  contents: ?HTMLElement;

  handleKeyDown = (event: { keyCode: number }) => {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      this.props.onDismiss();
    }
  };

  handlePageClick = (event: Event) => {
    if (
      event.target instanceof Node &&
      this.props.anchor &&
      !this.props.anchor.contains(event.target) &&
      this.contents &&
      !this.contents.contains(event.target)
    ) {
      this.props.onDismiss();
    }
  };

  handleResize = () => {
    this.updateTriggerRect(this.props);
  };

  updateTriggerRect = (props: Props) => {
    const { anchor, positionRelativeToAnchor } = props;
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

    this.setState({ relativeOffset, triggerBoundingRect });
  };

  render() {
    const {
      anchor,
      bgColor,
      children,
      idealDirection,
      positionRelativeToAnchor,
      shouldFocus,
    } = this.props;
    if (!anchor) {
      return null;
    }
    const size = this.props.size ? this.props.size : 'sm';
    const width = typeof size === 'string' ? SIZE_WIDTH_MAP[size] : size;
    return (
      <Box>
        <div
          ref={c => {
            this.contents = c;
          }}
        >
          {this.contents ? (
            <Contents
              bgColor={bgColor}
              idealDirection={idealDirection}
              onClick={this.handlePageClick}
              onKeyDown={this.handleKeyDown}
              onResize={this.handleResize}
              positionRelativeToAnchor={positionRelativeToAnchor}
              relativeOffset={this.state.relativeOffset}
              shouldFocus={shouldFocus}
              triggerRect={this.state.triggerBoundingRect}
              width={width}
            >
              {children}
            </Contents>
          ) : null}
        </div>
      </Box>
    );
  }
}

Controller.propTypes = {
  anchor: PropTypes.shape({
    contains: PropTypes.func,
    getBoundingClientRect: PropTypes.func,
  }),
  bgColor: PropTypes.oneOf(['darkGray', 'white', 'orange']),
  children: PropTypes.node,
  idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  onDismiss: PropTypes.func.isRequired,
  positionRelativeToAnchor: PropTypes.bool,
  shouldFocus: PropTypes.bool,
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']), // default: sm
  ]),
};
