// @flow strict
import * as React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import formElement from './FormElement.css';
import FormErrorMessage from './FormErrorMessage.js';
import FormHelperText from './FormHelperText.js';
import FormLabel from './FormLabel.js';
import layout from './Layout.css';
import styles from './TextField.css';

type Props = {|
  autoComplete?:
    | 'current-password'
    | 'new-password'
    | 'on'
    | 'off'
    | 'username',
  disabled?: boolean,
  errorMessage?: string,
  hasError?: boolean,
  helperText?: string,
  id: string,
  label?: string,
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
  size?: 'md' | 'lg',
  value?: string,
|};

type State = {|
  focused: boolean,
|};

export default class TextField extends React.Component<Props, State> {
  // NOTE: we cannot move to React createRef until we audit uses of callsites
  // that reach into this component and use this instance variable
  textfield: ?HTMLInputElement;

  static propTypes = {
    autoComplete: PropTypes.oneOf([
      'current-password',
      'new-password',
      'on',
      'off',
      'username',
    ]),
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    hasError: PropTypes.bool,
    helperText: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(['md', 'lg']),
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
    size: 'md',
    type: 'text',
  };

  state = {
    focused: false,
  };

  setTextFieldRef = (ref: ?HTMLInputElement) => {
    this.textfield = ref;
  };

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    onChange({ event, value: event.currentTarget.value });
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur({ event, value: event.currentTarget.value });
    }
  };

  handleFocus = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus({ event, value: event.currentTarget.value });
    }
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown({ event, value: event.currentTarget.value });
    }
  };

  render() {
    const {
      autoComplete,
      disabled,
      errorMessage,
      hasError,
      helperText,
      id,
      label,
      name,
      placeholder,
      size,
      type,
      value,
    } = this.props;

    const { focused } = this.state;

    const classes = classnames(
      styles.textField,
      formElement.base,
      disabled ? formElement.disabled : formElement.enabled,
      hasError || errorMessage ? formElement.errored : formElement.normal,
      size === 'md' ? layout.medium : layout.large
    );

    // type='number' doesn't work on ios safari without a pattern
    // https://stackoverflow.com/questions/14447668/input-type-number-is-not-showing-a-number-keypad-on-ios
    const pattern = type === 'number' ? '\\d*' : undefined;

    return (
      <span>
        {label && <FormLabel id={id} label={label} />}
        <input
          aria-describedby={errorMessage && focused ? `${id}-error` : null}
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
          ref={this.setTextFieldRef}
          type={type}
          value={value}
        />
        {helperText && !errorMessage ? (
          <FormHelperText text={helperText} />
        ) : null}
        {errorMessage && <FormErrorMessage id={id} text={errorMessage} />}
      </span>
    );
  }
}
