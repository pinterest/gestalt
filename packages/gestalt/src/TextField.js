// @flow strict
import {
  type AbstractComponent,
  type Element,
  forwardRef,
  type Node,
  useEffect,
  useState,
} from 'react';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import Tag from './Tag.js';
import InternalTextField from './TextField/InternalTextField.js';
import InternalTextFieldIconButton from './TextField/InternalTextFieldIconButton.js';

export type MaxLength = {|
  characterCount: number,
  errorAccessibilityLabel: string,
|};

type Type = 'date' | 'email' | 'password' | 'tel' | 'text' | 'url';

type Props = {|
  /**
   * Indicate if autocomplete should be available on the input, and the type of autocomplete. Autocomplete values are implemented upon request. [Reach out to the Gestalt team](https://gestalt.pinterest.systems/team_support/get_help#Slack-channels) if you need [additional autocomplete values](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values) to be supported.
   */
  autoComplete?: 'bday' | 'current-password' | 'email' | 'new-password' | 'on' | 'off' | 'username',
  /**
   * Indicate if the input is disabled. See the [disabled example](https://gestalt.pinterest.systems/web/textfield#Disabled) for more details.
   */
  disabled?: boolean,
  /**
   * For most use cases, pass a string with a helpful error message (be sure to localize!). In certain instances it can be useful to make some text clickable; to support this, you may instead pass a React.Node to wrap text in [Link](https://gestalt.pinterest.systems/web/link) or [TapArea](https://gestalt.pinterest.systems/web/taparea).
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
   * Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually. See the [label visibility variant](https://gestalt.pinterest.systems#Label-visibility) for more info.
   */
  labelDisplay?: 'visible' | 'hidden',
  /**
   * The maximum number of characters allowed in Textfield. `maxLength` must be an integer value 0 or higher. See the [maximum length variant](https://gestalt.pinterest.systems/web/textfield#Maximum-length) for more details.
   */
  maxLength?: MaxLength,
  /**
   * Mobile only prop. Optionally specify the action label to present for the enter key on virtual keyboards. See the [enterKeyHint variant](https://gestalt.pinterest.systems/web/textfield#EnterKeyHint) for more info.
   */
  mobileEnterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send',
  /**
   * Mobile only prop. Optionally specify the type of data that might be entered by the user while editing the element or its contents. This allows mobile browsers to display an appropriate virtual keyboard. See the [enterKeyHint variant](https://gestalt.pinterest.systems/web/textfield#EnterKeyHint) for more info.
   */
  mobileInputMode?: 'none' | 'text' | 'decimal' | 'numeric',
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
   * Indicate if the input is readOnly. See the [readOnly example](https://gestalt.pinterest.systems/web/textfield#Read-only) for more details.
   */
  readOnly?: boolean,
  /**
   * Ref that is forwarded to the underlying input element.
   */
  ref?: Element<'input'>, // eslint-disable-line react/no-unused-prop-types
  /**
   * List of tags to display in the component.
   */
  tags?: $ReadOnlyArray<Element<typeof Tag>>,
  /**
   * The type of input. For non-telephone numerical input, please use [NumberField](https://gestalt.pinterest.systems/web/numberfield).
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
 * [TextField](https://gestalt.pinterest.systems/web/textfield) allows for multiple types of text input.
 *
 * ![TextField light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TextField.spec.mjs-snapshots/TextField-chromium-darwin.png)
 * ![TextField dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TextField-dark.spec.mjs-snapshots/TextField-dark-chromium-darwin.png)
 *
 */
const TextFieldWithForwardRef: AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function TextField(
  {
    autoComplete,
    disabled = false,
    errorMessage,
    hasError = false,
    helperText,
    id,
    label,
    labelDisplay = 'visible',
    maxLength,
    mobileEnterKeyHint,
    mobileInputMode,
    name,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    placeholder,
    readOnly = false,
    size = 'md',
    tags,
    type: typeProp = 'text',
    value,
  }: Props,
  ref,
): Node {
  /**
   * Yes, this is initializing a state variable with a prop value and then disregarding the prop value — often a code smell, I know. This is necessary to internalize the effective input type (password vs text) and not force the user to handle responding to clicks on the button
   */
  const [type, setType] = useState<Type>(typeProp);

  useEffect(() => {
    setType(typeProp);
  }, [typeProp]);

  const isPasswordField = typeProp === 'password';
  const isCurrentlyPasswordType = type === 'password';

  const { accessibilityHidePasswordLabel, accessibilityShowPasswordLabel } =
    useDefaultLabelContext('TextField');

  const iconButton = isPasswordField ? (
    <InternalTextFieldIconButton
      accessibilityChecked={!isCurrentlyPasswordType}
      accessibilityLabel={
        isCurrentlyPasswordType
          ? accessibilityShowPasswordLabel ?? ''
          : accessibilityHidePasswordLabel ?? ''
      }
      icon={isCurrentlyPasswordType ? 'eye' : 'eye-hide'}
      onClick={() => {
        setType(isCurrentlyPasswordType ? 'text' : 'password');
      }}
      role="switch"
      tooltipText={
        isCurrentlyPasswordType
          ? accessibilityShowPasswordLabel ?? ''
          : accessibilityHidePasswordLabel ?? ''
      }
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
      labelDisplay={labelDisplay}
      maxLength={maxLength}
      mobileEnterKeyHint={mobileEnterKeyHint}
      mobileInputMode={mobileInputMode}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      size={size}
      readOnly={readOnly}
      ref={ref}
      tags={tags}
      type={type}
      value={value}
    />
  );
});

TextFieldWithForwardRef.displayName = 'TextField';

export default TextFieldWithForwardRef;
