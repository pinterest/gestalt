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
  forwardedRef?: React.Ref<'input'>,
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

function TextField({
  autoComplete,
  disabled = false,
  errorMessage,
  forwardedRef,
  hasError = false,
  helperText,
  id,
  label,
  name,
  onBlur,
  onChange,
  onFocus,
  onKeyDown,
  placeholder,
  size = 'md',
  type = 'text',
  value,
}: Props) {
  const [focused, setFocused] = React.useState(false);

  const handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    onChange({ event, value: event.currentTarget.value });
  };

  const handleBlur = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    setFocused(false);
    if (onBlur) {
      onBlur({ event, value: event.currentTarget.value });
    }
  };

  const handleFocus = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    setFocused(true);
    if (onFocus) {
      onFocus({ event, value: event.currentTarget.value });
    }
  };

  const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown({ event, value: event.currentTarget.value });
    }
  };

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
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        pattern={pattern}
        placeholder={placeholder}
        ref={forwardedRef}
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

TextField.propTypes = {
  autoComplete: PropTypes.oneOf([
    'current-password',
    'new-password',
    'on',
    'off',
    'username',
  ]),
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  forwardedRef: PropTypes.shape({
    current: PropTypes.any,
  }),
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
  type: PropTypes.oneOf(['date', 'email', 'number', 'password', 'text', 'url']),
  value: PropTypes.string,
};

function forwardRef(props, ref) {
  return <TextField {...props} forwardedRef={ref} />;
}
forwardRef.displayName = 'TextField';

export default React.forwardRef<Props, HTMLInputElement>(forwardRef);
