// @flow strict
import { forwardRef, type Element, type Node, useState } from 'react';
import InternalTextField from './InternalTextField.js';
import InternalTextFieldIconButton from './InternalTextFieldIconButton.js';
import Tag from './Tag.js';

type Type = 'date' | 'email' | 'password' | 'tel' | 'text' | 'url';

type Props = {|
  /**
   * Label for the "Hide password" button. Required when `type="password"`. Be sure to localize the label.
   */
  accessibilityHidePasswordLabel?: string,
  /**
   * Label for the "Show password" button. Required when `type="password"`. Be sure to localize the label.
   */
  accessibilityShowPasswordLabel?: string,
  /**
   * Indicate if autocomplete should be available on the input, and the type of autocomplete.
   */
  autoComplete?: 'current-password' | 'new-password' | 'on' | 'off' | 'username' | 'email',
  /**
   * Indicate if the input is disabled.
   */
  disabled?: boolean,
  /**
   * For most use cases, pass a string with a helpful error message (be sure to localize!). In certain instances it can be useful to make some text clickable; to support this, you may instead pass a React.Node to wrap text in [Link](https://gestalt.pinterest.systems/link) or [TapArea](https://gestalt.pinterest.systems/taparea).
   */
  errorMessage?: Node,
  /**
   * This field is deprecated and will be removed soon. Please do not use.
   */
  hasError?: boolean,
  /**
   * More information about how to complete the form field.
   */
  helperText?: string,
  /**
   * A unique identifier for the input.
   */
  id: string,
  /**
   * The label for the input. Be sure to localize the text.
   */
  label?: string,
  /**
   * A unique name for the input.
   */
  name?: string,
  /**
   * Callback triggered when the user blurs the input.
   */
  onBlur?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  /**
   * Callback triggered when the value of the input changes.
   */
  onChange: ({|
    event: SyntheticInputEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  /**
   * Callback triggered when the user focuses the input.
   */
  onFocus?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  /**
   * Callback triggered when the user presses any key while the input is focused.
   */
  onKeyDown?: ({|
    event: SyntheticKeyboardEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  /**
   * Placeholder text shown the the user has not yet input a value.
   */
  placeholder?: string,
  /**
   * Ref that is forwarded to the underlying input element.
   */
  ref?: Element<'input'>, // eslint-disable-line react/no-unused-prop-types
  /**
   * List of tags to display in the component.
   */
  tags?: $ReadOnlyArray<Element<typeof Tag>>,
  /**
   * The type of input. For non-telephone numerical input, please use [NumberField](https://gestalt.pinterest.systems/numberfield).
   */
  type?: Type,
  /**
   * md: 40px, lg: 48px
   */
  size?: 'md' | 'lg',
  /**
   * The current value of the input.
   */
  value?: string,
|};

/**
 * [TextField](https://gestalt.pinterest.systems/textfield) allows for multiple types of text input.
 *
 * ![TextField light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/TextField%20%230.png)
 * ![TextField dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/TextField-dark%20%230.png)
 *
 */
const TextFieldWithForwardRef: React$AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function TextField(
  {
    accessibilityHidePasswordLabel,
    accessibilityShowPasswordLabel,
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
    type: typeProp = 'text',
    value,
  }: Props,
  ref,
): Node {
  const [type, setType] = useState<Type>(typeProp);

  const isPasswordField = typeProp === 'password';
  const isCurrentlyPasswordType = type === 'password';

  // TODO:
  // - Wrap this in experiment
  // - Tooltip?
  const iconButton = isPasswordField ? (
    <InternalTextFieldIconButton
      accessibilityLabel={
        isCurrentlyPasswordType ? accessibilityShowPasswordLabel : accessibilityHidePasswordLabel
      }
      icon={isCurrentlyPasswordType ? 'eye' : 'eye-hide'}
      onClick={() => {
        setType(isCurrentlyPasswordType ? 'text' : 'password');
      }}
    />
  ) : undefined;

  return (
    <InternalTextField
      autoComplete={autoComplete}
      disabled={disabled}
      errorMessage={errorMessage}
      hasError={hasError}
      helperText={helperText}
      iconButton={iconButton}
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
