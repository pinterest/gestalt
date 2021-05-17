// @flow strict
import { forwardRef, type Element, type Node, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Box from './Box.js';
import focusStyles from './Focus.css';
import formElement from './FormElement.css';
import FormErrorMessage from './FormErrorMessage.js';
import FormHelperText from './FormHelperText.js';
import FormLabel from './FormLabel.js';
import Tag from './Tag.js';
import layout from './Layout.css';
import styles from './TextField.css';

type Props = {|
  autoComplete?: 'current-password' | 'new-password' | 'on' | 'off' | 'username',
  disabled?: boolean,
  errorMessage?: Node,
  hasError?: boolean,
  helperText?: string,
  id: string,
  label?: string,
  name?: string,
  onBlur?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onChange: ({|
    event: SyntheticInputEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onFocus?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onKeyDown?: ({|
    event: SyntheticKeyboardEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  placeholder?: string,
  tags?: $ReadOnlyArray<Element<typeof Tag>>,
  type?: 'date' | 'email' | 'number' | 'password' | 'text' | 'url',
  size?: 'md' | 'lg',
  value?: string,
|};

const TextFieldWithForwardRef: React$AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function TextField(props, ref): Node {
  const {
    autoComplete,
    disabled = false,
    errorMessage,
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
    tags,
    type = 'text',
    value,
  } = props;
  const [focused, setFocused] = useState(false);

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

  const hasErrorMessage = Boolean(errorMessage);

  const classes = classnames(
    styles.textField,
    formElement.base,
    disabled ? formElement.disabled : formElement.enabled,
    (hasError || hasErrorMessage) && !focused ? formElement.errored : formElement.normal,
    size === 'md' ? layout.medium : layout.large,
    tags
      ? {
          [focusStyles.accessibilityOutlineFocus]: focused,
          [styles.textFieldWrapper]: true,
        }
      : {},
  );

  // type='number' doesn't work on ios safari without a pattern
  // https://stackoverflow.com/questions/14447668/input-type-number-is-not-showing-a-number-keypad-on-ios
  const pattern = type === 'number' ? '\\d*' : undefined;

  const inputElement = (
    <input
      aria-describedby={hasErrorMessage && focused ? `${id}-error` : null}
      aria-invalid={hasErrorMessage || hasError ? 'true' : 'false'}
      autoComplete={autoComplete}
      className={tags ? styles.unstyledTextField : classes}
      disabled={disabled}
      id={id}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      pattern={pattern}
      placeholder={placeholder}
      ref={ref}
      type={type}
      value={value}
    />
  );

  return (
    <span>
      {label && <FormLabel id={id} label={label} />}
      {tags ? (
        <div className={classes}>
          {tags.map((tag, tagIndex) => (
            <Box key={tagIndex} marginEnd={1} marginBottom={1}>
              {tag}
            </Box>
          ))}
          <Box flex="grow" marginEnd={2} maxWidth="100%" position="relative">
            {/* This is an invisible spacer div which mirrors the input's
             * content. We use it to implement the flex wrapping behavior
             * which is not supported by inputs, by having the actual input
             * track it with absolute positioning. */}
            <div aria-hidden className={styles.textFieldSpacer}>
              {value}
            </div>
            {inputElement}
          </Box>
        </div>
      ) : (
        inputElement
      )}
      {helperText && !errorMessage ? <FormHelperText text={helperText} /> : null}
      {hasErrorMessage && <FormErrorMessage id={id} text={errorMessage} />}
    </span>
  );
});

TextFieldWithForwardRef.propTypes = {
  autoComplete: PropTypes.oneOf(['current-password', 'new-password', 'on', 'off', 'username']),
  disabled: PropTypes.bool,
  errorMessage: PropTypes.node,
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
  tags: PropTypes.arrayOf(PropTypes.node),
  type: PropTypes.oneOf(['date', 'email', 'number', 'password', 'text', 'url']),
  value: PropTypes.string,
};

TextFieldWithForwardRef.displayName = 'TextField';

export default TextFieldWithForwardRef;
