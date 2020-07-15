// @flow strict

import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import formElement from './FormElement.css';
import FormErrorMessage from './FormErrorMessage.js';
import FormHelperText from './FormHelperText.js';
import FormLabel from './FormLabel.js';
import styles from './TextArea.css';

type Props = {|
  errorMessage?: string,
  disabled?: boolean,
  forwardedRef?: React.Ref<'textarea'>,
  hasError?: boolean,
  helperText?: string,
  id: string,
  label?: string,
  name?: string,
  onBlur?: ({|
    event: SyntheticFocusEvent<HTMLTextAreaElement>,
    value: string,
  |}) => void,
  onChange: ({|
    event: SyntheticInputEvent<HTMLTextAreaElement>,
    value: string,
  |}) => void,
  onFocus?: ({|
    event: SyntheticFocusEvent<HTMLTextAreaElement>,
    value: string,
  |}) => void,
  onKeyDown?: ({|
    event: SyntheticKeyboardEvent<HTMLTextAreaElement>,
    value: string,
  |}) => void,
  placeholder?: string,
  rows?: number,
  value?: string,
|};

function TextArea({
  errorMessage,
  disabled = false,
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
  rows = 3,
  value,
}: Props) {
  const [focused, setFocused] = React.useState(false);

  const handleChange = (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
    onChange({ event, value: event.currentTarget.value });
  };

  const handleBlur = (event: SyntheticFocusEvent<HTMLTextAreaElement>) => {
    setFocused(false);
    if (onBlur) {
      onBlur({ event, value: event.currentTarget.value });
    }
  };

  const handleFocus = (event: SyntheticFocusEvent<HTMLTextAreaElement>) => {
    setFocused(false);
    if (onFocus) {
      onFocus({ event, value: event.currentTarget.value });
    }
  };

  const handleKeyDown = (
    event: SyntheticKeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (onKeyDown) {
      onKeyDown({ event, value: event.currentTarget.value });
    }
  };

  const classes = classnames(
    styles.textArea,
    formElement.base,
    disabled ? formElement.disabled : formElement.enabled,
    hasError || errorMessage ? formElement.errored : formElement.normal
  );

  return (
    <span>
      {label && <FormLabel id={id} label={label} />}
      <textarea
        aria-describedby={errorMessage && focused ? `${id}-error` : null}
        aria-invalid={errorMessage || hasError ? 'true' : 'false'}
        className={classes}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        ref={forwardedRef}
        rows={rows}
        value={value}
      />
      {helperText && !errorMessage ? (
        <FormHelperText text={helperText} />
      ) : null}
      {errorMessage && <FormErrorMessage id={id} text={errorMessage} />}
    </span>
  );
}

TextArea.propTypes = {
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]),
  hasError: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  value: PropTypes.string,
};

function TextAreaWithRef(props, ref) {
  return <TextArea {...props} forwardedRef={ref} />;
}

TextAreaWithRef.displayName = 'ForwardRef(TextArea)';

const TextAreaWithForwardRef: React$AbstractComponent<
  Props,
  HTMLTextAreaElement
> = React.forwardRef<Props, HTMLTextAreaElement>(TextAreaWithRef);

TextAreaWithForwardRef.displayName = 'TextArea';

export default TextAreaWithForwardRef;
