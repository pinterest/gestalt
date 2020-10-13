// @flow strict

import React, { forwardRef, useState, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import formElement from './FormElement.css';
import FormErrorMessage from './FormErrorMessage.js';
import FormHelperText from './FormHelperText.js';
import FormLabel from './FormLabel.js';
import styles from './TextArea.css';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type Props = {|
  errorMessage?: string,
  disabled?: boolean,
  hasError?: boolean,
  helperText?: string,
  id: string,
  label?: string,
  name?: string,
  onBlur?: AbstractEventHandler<
    SyntheticFocusEvent<HTMLTextAreaElement>,
    {| value: string |}
  >,
  onChange: AbstractEventHandler<
    SyntheticInputEvent<HTMLTextAreaElement>,
    {| value: string |}
  >,
  onFocus?: AbstractEventHandler<
    SyntheticFocusEvent<HTMLTextAreaElement>,
    {| value: string |}
  >,
  onKeyDown?: AbstractEventHandler<
    SyntheticKeyboardEvent<HTMLTextAreaElement>,
    {| value: string |}
  >,
  placeholder?: string,
  rows?: number,
  value?: string,
|};

const TextAreaWithForwardRef: React$AbstractComponent<
  Props,
  HTMLTextAreaElement
> = forwardRef<Props, HTMLTextAreaElement>(function TextArea(props, ref): Node {
  const {
    errorMessage,
    disabled = false,
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
  } = props;
  const [focused, setFocused] = useState(false);

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
        ref={ref}
        rows={rows}
        value={value}
      />
      {helperText && !errorMessage ? (
        <FormHelperText text={helperText} />
      ) : null}
      {errorMessage && <FormErrorMessage id={id} text={errorMessage} />}
    </span>
  );
});

// $FlowFixMe[prop-missing] flow 0.135.0 upgrade
TextAreaWithForwardRef.propTypes = {
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
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

TextAreaWithForwardRef.displayName = 'TextArea';

export default TextAreaWithForwardRef;
