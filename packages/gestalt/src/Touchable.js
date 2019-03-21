// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Touchable.css';

type Shape =
  | 'square'
  | 'rounded'
  | 'pill'
  | 'circle'
  | 'roundedTop'
  | 'roundedBottom'
  | 'roundedLeft'
  | 'roundedRight';

type MouseCursor =
  | 'copy'
  | 'grab'
  | 'grabbing'
  | 'move'
  | 'noDrop'
  | 'pointer'
  | 'zoomIn'
  | 'zoomOut';

type Props = {|
  children?: React.Node,
  fullHeight?: boolean,
  fullWidth?: boolean,
  mouseCursor?: MouseCursor,
  onMouseEnter?: ({ event: SyntheticMouseEvent<HTMLDivElement> }) => void,
  onMouseLeave?: ({ event: SyntheticMouseEvent<HTMLDivElement> }) => void,
  onTouch?: ({
    event:
      | SyntheticMouseEvent<HTMLDivElement>
      | SyntheticKeyboardEvent<HTMLDivElement>,
  }) => void,
  shape?: Shape,
|};

const SPACE_CHAR_CODE = 32;
const ENTER_CHAR_CODE = 13;

export default class Touchable extends React.Component<Props> {
  handleKeyPress = (event: SyntheticKeyboardEvent<HTMLDivElement>) => {
    const { onTouch } = this.props;
    // Check to see if space or enter were pressed
    if (
      onTouch &&
      (event.charCode === SPACE_CHAR_CODE || event.charCode === ENTER_CHAR_CODE)
    ) {
      // Prevent the default action to stop scrolling when space is pressed
      event.preventDefault();
      onTouch({ event });
    }
  };

  handleMouseEnter = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const { onMouseEnter } = this.props;
    if (onMouseEnter) {
      onMouseEnter({ event });
    }
  };

  handleMouseLeave = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const { onMouseLeave } = this.props;
    if (onMouseLeave) {
      onMouseLeave({ event });
    }
  };

  handleClick = (event: SyntheticMouseEvent<HTMLDivElement>) => {
    const { onTouch } = this.props;
    if (onTouch) {
      onTouch({ event });
    }
  };

  render() {
    const {
      children,
      fullWidth = true,
      fullHeight,
      mouseCursor = 'pointer',
      shape = 'square',
    } = this.props;

    const classes = classnames(
      styles.touchable,
      styles[mouseCursor],
      styles[shape],
      {
        [styles.fullHeight]: fullHeight,
        [styles.fullWidth]: fullWidth,
      }
    );

    return (
      <div
        className={classes}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onKeyPress={this.handleKeyPress}
        role="button"
        tabIndex="0"
      >
        {children}
      </div>
    );
  }
}

Touchable.propTypes = {
  children: PropTypes.node,
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  mouseCursor: PropTypes.oneOf([
    'copy',
    'grab',
    'grabbing',
    'move',
    'noDrop',
    'pointer',
    'zoomIn',
    'zoomOut',
  ]),
  onTouch: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  shape: PropTypes.oneOf([
    'square',
    'rounded',
    'pill',
    'circle',
    'roundedTop',
    'roundedBottom',
    'roundedLeft',
    'roundedRight',
  ]),
};
