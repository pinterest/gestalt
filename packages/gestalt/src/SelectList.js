// @flow strict
import React, { useState, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import formElement from './FormElement.css';
import layout from './Layout.css';
import FormErrorMessage from './FormErrorMessage.js';
import FormHelperText from './FormHelperText.js';
import FormLabel from './FormLabel.js';
import Icon from './Icon.js';
import styles from './SelectList.css';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type Option = {|
  label: string,
  value: string,
  disabled?: boolean,
|};

type Props = {|
  errorMessage?: string,
  disabled?: boolean,
  helperText?: string,
  id: string,
  label?: string,
  name?: string,
  onChange: AbstractEventHandler<SyntheticInputEvent<HTMLSelectElement>, {| value: string |}>,
  options: $ReadOnlyArray<Option>,
  placeholder?: string,
  size?: 'md' | 'lg',
  value?: ?string,
|};

export default function SelectList({
  disabled = false,
  errorMessage,
  helperText,
  id,
  label,
  name,
  onChange,
  options = [],
  placeholder,
  size = 'md',
  value,
}: Props): Node {
  const [focused, setFocused] = useState(false);

  const handleOnChange: (event: SyntheticInputEvent<HTMLSelectElement>) => void = (event) => {
    if (value !== event.target.value) {
      onChange({ event, value: event.target.value });
    }
  };

  const handleBlur = (event: SyntheticInputEvent<HTMLSelectElement>) => {
    setFocused(false);
    handleOnChange(event);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const classes = classnames(
    styles.select,
    formElement.base,
    disabled ? formElement.disabled : formElement.enabled,
    errorMessage ? formElement.errored : formElement.normal,
    size === 'md' ? layout.medium : layout.large,
  );

  const showPlaceholder = placeholder && !value;

  return (
    <Box>
      {label && <FormLabel id={id} label={label} />}
      <Box
        color={disabled ? 'lightGray' : 'white'}
        display="flex"
        position="relative"
        rounding={4}
        width="100%"
      >
        <Box
          alignItems="center"
          bottom
          dangerouslySetInlineStyle={{
            __style: { paddingRight: 14, paddingTop: 2 },
          }}
          display="flex"
          position="absolute"
          right
          top
        >
          <Icon
            icon="arrow-down"
            size={12}
            color={disabled ? 'gray' : 'darkGray'}
            accessibilityLabel=""
          />
        </Box>
        <select
          aria-describedby={errorMessage && focused ? `${id}-error` : null}
          aria-invalid={errorMessage ? 'true' : 'false'}
          className={classes}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={handleBlur}
          onChange={handleOnChange}
          onFocus={handleFocus}
          value={showPlaceholder ? placeholder : value}
        >
          {showPlaceholder && (
            <option disabled value={placeholder} hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
      </Box>
      {helperText && !errorMessage ? <FormHelperText text={helperText} /> : null}
      {errorMessage && <FormErrorMessage id={id} text={errorMessage} />}
    </Box>
  );
}

SelectList.propTypes = {
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  options: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    }),
  ),
  placeholder: PropTypes.string,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  size: PropTypes.oneOf(['md', 'lg']),
  value: PropTypes.string,
};
