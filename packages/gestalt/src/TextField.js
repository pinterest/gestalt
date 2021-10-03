// @flow strict
import { forwardRef, type Element, type Node } from 'react';
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
>(function TextField(props: Props, ref): Node {
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

TextFieldWithForwardRef.displayName = 'TextField';

export default TextFieldWithForwardRef;
