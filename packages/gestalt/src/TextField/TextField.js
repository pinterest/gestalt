// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ErrorFlyout from '../ErrorFlyout/ErrorFlyout';
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
  onBlur?: ({ event: SyntheticFocusEvent<>, value: string }) => void,
  onChange: ({ event: SyntheticInputEvent<>, value: string }) => void,
  onFocus?: ({ event: SyntheticFocusEvent<>, value: string }) => void,
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

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.errorMessage !== state.errorMessage) {
      return {
        errorIsOpen: !!props.errorMessage,
        errorMessage: props.errorMessage,
      };
    }

    return null;
  }

  state = {
    focused: false,
    errorIsOpen: false,
  };

  textfield: ?HTMLElement;

  handleChange = (event: SyntheticInputEvent<>) => {
    if (event.target instanceof HTMLInputElement) {
      this.props.onChange({
        event,
        value: event.target.value,
      });
    }
  };

  handleBlur = (event: SyntheticFocusEvent<>) => {
    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: false });
    }
    if (event.target instanceof HTMLInputElement && this.props.onBlur) {
      this.props.onBlur({
        event,
        value: event.target.value,
      });
    }
  };

  handleFocus = (event: SyntheticFocusEvent<>) => {
    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: true });
    }
    if (event.target instanceof HTMLInputElement && this.props.onFocus) {
      this.props.onFocus({
        event,
        value: event.target.value,
      });
    }
  };

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
            <ErrorFlyout
              anchor={this.textfield}
              id={`${id}-gestalt-error`}
              idealDirection={idealErrorDirection}
              message={errorMessage}
              onDismiss={() => this.setState({ errorIsOpen: false })}
              size="sm"
            />
          )}
      </span>
    );
  }
}
