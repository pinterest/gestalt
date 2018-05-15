// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './IconButton.css';
import icons from '../Icon/icons';
import Pog from '../Pog/Pog';

type Props = {|
  accessibilityExpanded?: boolean,
  accessibilityHaspopup?: boolean,
  accessibilityLabel: string,
  bgColor?: 'transparent' | 'lightGray' | 'white',
  iconColor?: 'gray' | 'darkGray' | 'red' | 'blue' | 'white',
  icon: $Keys<typeof icons>,
  onClick?: ({ event: SyntheticMouseEvent<> }) => void,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
|};

type State = {|
  active: boolean,
  focused: boolean,
  hovered: boolean,
|};

export default class IconButton extends React.Component<Props, State> {
  static propTypes = {
    accessibilityExpanded: PropTypes.bool,
    accessibilityHaspopup: PropTypes.bool,
    accessibilityLabel: PropTypes.string.isRequired,
    bgColor: PropTypes.oneOf(['transparent', 'lightGray', 'white']),
    icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
    iconColor: PropTypes.oneOf(['gray', 'darkGray', 'red', 'blue', 'white']),
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  };

  state: State = {
    active: false,
    focused: false,
    hovered: false,
  };

  handleBlur = () => this.setState({ focused: false });
  handleFocus = () => {
    this.setState({ focused: true });
  };
  handleMouseDown = () => {
    this.setState({ active: true });
  };
  handleMouseEnter = () => {
    this.setState({ hovered: true });
  };
  handleMouseLeave = () => {
    this.setState({
      active: false,
      hovered: false,
    });
  };
  handleMouseUp = () => {
    this.setState({ active: false });
  };

  render() {
    const {
      accessibilityExpanded,
      accessibilityHaspopup,
      accessibilityLabel,
      bgColor,
      iconColor,
      icon,
      size,
      onClick,
    } = this.props;

    const { active, focused, hovered } = this.state;

    return (
      <button
        aria-expanded={accessibilityExpanded}
        aria-haspopup={accessibilityHaspopup}
        aria-label={accessibilityLabel}
        className={styles.button}
        onBlur={this.handleBlur}
        onClick={event => onClick && onClick({ event })}
        onFocus={this.handleFocus}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        type="button"
      >
        <Pog
          active={active}
          bgColor={bgColor}
          focused={focused}
          hovered={hovered}
          iconColor={iconColor}
          icon={icon}
          size={size}
        />
      </button>
    );
  }
}
