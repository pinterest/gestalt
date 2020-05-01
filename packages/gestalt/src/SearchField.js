// @flow strict

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import layout from './Layout.css';
import styles from './SearchField.css';
import Box from './Box.js';
import Icon from './Icon.js';

type Props = {|
  accessibilityLabel: string,
  autoComplete?: 'on' | 'off' | 'username' | 'name',
  id: string,
  onBlur?: ({ event: SyntheticEvent<HTMLInputElement> }) => void,
  onChange: ({
    value: string,
    syntheticEvent: SyntheticEvent<HTMLInputElement>,
  }) => void,
  onFocus?: ({
    value: string,
    syntheticEvent: SyntheticEvent<HTMLInputElement>,
  }) => void,
  placeholder?: string,
  size?: 'md' | 'lg',
  value?: string,
|};

type State = {|
  focused: boolean,
  hovered: boolean,
|};

export default class SearchField extends React.Component<Props, State> {
  static propTypes = {
    accessibilityLabel: PropTypes.string.isRequired,
    autoComplete: PropTypes.oneOf(['on', 'off', 'username', 'name']),
    id: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(['md', 'lg']),
    value: PropTypes.string,
  };

  state = {
    focused: false,
    hovered: false,
  };

  handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    onChange({
      value: event.currentTarget.value,
      syntheticEvent: event,
    });
  };

  handleClear = (event: SyntheticEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    onChange({ value: '', syntheticEvent: event });
  };

  handleMouseEnter = () => this.setState({ hovered: true });

  handleMouseLeave = () => this.setState({ hovered: false });

  handleFocus = (event: SyntheticEvent<HTMLInputElement>) => {
    const { onFocus } = this.props;
    this.setState({ focused: true });

    if (onFocus) {
      onFocus({
        value: event.currentTarget.value,
        syntheticEvent: event,
      });
    }
  };

  handleBlur = (event: SyntheticEvent<HTMLInputElement>) => {
    const { onBlur } = this.props;
    this.setState({ focused: false });

    if (onBlur) {
      onBlur({ event });
    }
  };

  render() {
    const {
      accessibilityLabel,
      autoComplete,
      id,
      placeholder,
      size = 'md',
      value,
    } = this.props;

    const { focused, hovered } = this.state;

    const hasValue = value && value.length > 0;
    const hideSearchIcon = focused || hasValue;

    const className = classnames(styles.input, {
      [layout.medium]: size === 'md',
      [layout.large]: size === 'lg',
      [styles.inputActive]: focused || hasValue,
      [styles.inputHovered]: hovered,
    });

    const clearButtonSize = size === 'lg' ? 24 : 20;
    const clearIconSize = size === 'lg' ? 12 : 10;

    return (
      <Box
        alignItems="center"
        display="flex"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        position="relative"
      >
        {!hideSearchIcon && (
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                pointerEvents: 'none',
                // Added the following lines for Safari support
                top: '50%',
                transform: 'translateY(-50%)',
              },
            }}
            left
            paddingX={4}
            position="absolute"
          >
            <Icon icon="search" accessibilityLabel="" />
          </Box>
        )}
        <input
          aria-label={accessibilityLabel}
          autoComplete={autoComplete}
          className={className}
          id={id}
          onChange={this.handleChange}
          placeholder={placeholder}
          role="searchbox"
          type="search"
          value={value}
        />
        {hasValue && (
          <button
            className={styles.clear}
            onClick={this.handleClear}
            tabIndex={-1}
            type="button"
          >
            <Box
              alignItems="center"
              color={focused ? 'darkGray' : 'transparent'}
              display="flex"
              height={clearButtonSize}
              justifyContent="center"
              rounding="circle"
              width={clearButtonSize}
            >
              <Icon
                accessibilityLabel=""
                color={focused ? 'white' : 'darkGray'}
                icon="cancel"
                size={clearIconSize}
              />
            </Box>
          </button>
        )}
      </Box>
    );
  }
}
