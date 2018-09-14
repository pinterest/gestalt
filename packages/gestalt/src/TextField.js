// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Flyout from './Flyout.js';
import Box from './Box.js';
import Text from './Text.js';
import styles from './TextField.css';

type State = {
  focused: boolean,
  errorIsOpen: boolean,
  errorMessage?: string,
};

type Props = {|
  autoComplete?: 'current-password' | 'on' | 'off' | 'username',
  disabled?: boolean,
  errorMessage?: string,
  hasError?: boolean,
  id: string,
  idealErrorDirection?: 'up' | 'right' | 'down' | 'left' /* default: right */,
  name?: string,
  onBlur?: ({
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  }) => void,
  onChange: ({
    event: SyntheticInputEvent<HTMLInputElement>,
    value: string,
  }) => void,
  onFocus?: ({
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  }) => void,
  onKeyDown?: ({
    event: SyntheticKeyboardEvent<HTMLInputElement>,
    value: string,
  }) => void,
  placeholder?: string,
  type?: 'date' | 'email' | 'number' | 'password' | 'text' | 'url',
  value?: string,
|};

export default class TextField extends React.Component<Props, State> {
  static propTypes = {
    autoComplete: PropTypes.oneOf([
      'current-password',
      'on',
      'off',
      'username',
    ]),
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    hasError: PropTypes.bool,
    id: PropTypes.string.isRequired,
    idealErrorDirection: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf([
      'date',
      'email',
      'number',
      'password',
      'text',
      'url',
    ]),
    value: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    hasError: false,
    idealErrorDirection: 'right',
    type: 'text',
  };

  state = {
    focused: false,
    errorIsOpen: false,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.errorMessage !== state.errorMessage) {
      return {
        errorIsOpen: !!props.errorMessage,
        errorMessage: props.errorMessage,
      };
    }

    return null;
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.props.onChange({
      event,
      value: event.currentTarget.value,
    });
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: false });
    }
    if (this.props.onBlur) {
      this.props.onBlur({
        event,
        value: event.currentTarget.value,
      });
    }
  };

  handleFocus = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: true });
    }
    if (this.props.onFocus) {
      this.props.onFocus({
        event,
        value: event.currentTarget.value,
      });
    }
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown({
        event,
        value: event.currentTarget.value,
      });
    }
  };

  textfield: ?HTMLElement;

  render() {
    const {
      autoComplete,
      disabled,
      errorMessage,
      hasError,
      id,
      idealErrorDirection,
      name,
      placeholder,
      type,
      value,
    } = this.props;

    const classes = classnames(
      styles.textField,
      disabled ? styles.disabled : styles.enabled,
      hasError || errorMessage ? styles.errored : styles.normal
    );

    // type='number' doesn't work on ios safari without a pattern
    // https://stackoverflow.com/questions/14447668/input-type-number-is-not-showing-a-number-keypad-on-ios
    const pattern = type === 'number' ? '\\d*' : undefined;

    return (
      <span>
        <input
          aria-describedby={
            errorMessage && this.state.focused ? `${id}-gestalt-error` : null
          }
          aria-invalid={errorMessage || hasError ? 'true' : 'false'}
          autoComplete={autoComplete}
          className={classes}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          pattern={pattern}
          placeholder={placeholder}
          ref={c => {
            this.textfield = c;
          }}
          type={type}
          value={value}
        />
        {errorMessage &&
          this.state.errorIsOpen && (
            <Flyout
              anchor={this.textfield}
              color="orange"
              idealDirection={idealErrorDirection}
              onDismiss={() => this.setState({ errorIsOpen: false })}
              shouldFocus={false}
              size="sm"
            >
              <Box padding={3}>
                <Text bold color="white">
                  <span id={`${id}-gestalt-error`}>{errorMessage}</span>
                </Text>
              </Box>
            </Flyout>
          )}
      </span>
    );
  }
}
