// @flow strict
import { forwardRef, type Element, type Node } from 'react';
import PropTypes from 'prop-types';
import Tag from './Tag.js';
import InternalTextField from './InternalTextField.js';

type Props = {|
  autoComplete?: 'current-password' | 'new-password' | 'on' | 'off' | 'username' | 'email',
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

/**
 * https://gestalt.pinterest.systems/TextField
 */
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

  return (
    <InternalTextField
      autoComplete={autoComplete}
      disabled={disabled}
      errorMessage={errorMessage}
      hasError={hasError}
      helperText={helperText}
      id={id}
      label={label}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      size={size}
      ref={ref}
      tags={tags}
      type={type}
      value={value}
    />
  );
});

TextFieldWithForwardRef.propTypes = {
  autoComplete: PropTypes.oneOf([
    'current-password',
    'new-password',
    'on',
    'off',
    'username',
    'email',
  ]),
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
