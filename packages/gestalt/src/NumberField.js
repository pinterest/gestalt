// @flow strict
import { type AbstractComponent, forwardRef, type Node } from 'react';
import InternalTextField from './TextField/InternalTextField.js';

// <input> deals with strings, but we only want numbers for this component.
// So we parse what we get from InternalTextField and we stringify what we give it.

// $FlowExpectedError[unclear-type] We don't need a more specific type, and `event` polymorphism is problematic
type Handler = Function;

const parseHandlerValue =
  (handler?: Handler) =>
  ({
    event,
    value,
  }:
    | {| event: SyntheticInputEvent<HTMLInputElement>, value: string |}
    | {| event: SyntheticFocusEvent<HTMLInputElement>, value: string |}
    | {| event: SyntheticKeyboardEvent<HTMLInputElement>, value: string |}) => {
    const parsedValue = parseFloat(value);
    handler?.({ event, value: Number.isFinite(parsedValue) ? parsedValue : undefined });
  };

type Props = {|
  /**
   * Indicate if autocomplete should be available on the input.
   */
  autoComplete?: 'on' | 'off',
  /**
   * Indicate if the input is disabled.
   */
  disabled?: boolean,
  /**
   * For most use cases, pass a string with a helpful error message (be sure to localize!). In certain instances it can be useful to make some text clickable; to support this, you may instead pass a React.Node to wrap text in [Link](https://gestalt.pinterest.systems/web/link) or [TapArea](https://gestalt.pinterest.systems/web/taparea).
   */
  errorMessage?: Node,
  /**
   * More information for the user about how to complete the form field.
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
   * The upper bound of valid input, inclusive.
   */
  max?: number,
  /**
   * The lower bound of valid input, inclusive.
   */
  min?: number,
  /**
   *  Mobile only prop. Optionally specify the action label to present for the enter key on virtual keyboards. See the [enterKeyHint variant](https://gestalt.pinterest.systems/web/numberfield#EnterKeyHint) for more info.
   *
   */
  mobileEnterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send',
  /**
   * A unique name for the input.
   */
  name?: string,
  /**
   * Callback triggered when the user blurs the input.
   */
  onBlur?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: number | void,
  |}) => void,
  /**
   * Callback triggered when the value of the input changes, whether by keyboard entry or the input's arrows.
   */
  onChange: ({|
    event: SyntheticInputEvent<HTMLInputElement>,
    value: number | void,
  |}) => void,
  /**
   * Callback triggered when the user focuses the input.
   */
  onFocus?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: number | void,
  |}) => void,
  /**
   * Callback triggered when the user presses any key while the input is focused.
   */
  onKeyDown?: ({|
    event: SyntheticKeyboardEvent<HTMLInputElement>,
    value: number | void,
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
   * md: 40px, lg: 48px
   */
  size?: 'md' | 'lg',
  /**
   * Indicates the amount the value will increase or decrease when using the input's arrows.
   */
  step?: number,
  /**
   * The current value of the input.
   */
  value?: number | void,
|};

/**
 * [NumberField](https://gestalt.pinterest.systems/web/numberfield) allows for numerical input.
 *
 * ![NumberField light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/NumberField.spec.mjs-snapshots/NumberField-chromium-darwin.png)
 * ![NumberField dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/NumberField-dark.spec.mjs-snapshots/NumberField-dark-chromium-darwin.png)
 *
 */
const NumberFieldWithForwardRef: AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function NumberField(
  {
    autoComplete,
    disabled = false,
    mobileEnterKeyHint,
    errorMessage,
    helperText,
    id,
    label,
    max,
    min,
    name,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    placeholder,
    size = 'md',
    step,
    value,
  }: Props,
  ref,
): Node {
  return (
    <InternalTextField
      autoComplete={autoComplete}
      disabled={disabled}
      mobileEnterKeyHint={mobileEnterKeyHint}
      errorMessage={errorMessage}
      helperText={helperText}
      id={id}
      label={label}
      max={max}
      min={min}
      name={name}
      onBlur={parseHandlerValue(onBlur)}
      onChange={parseHandlerValue(onChange)}
      onFocus={parseHandlerValue(onFocus)}
      onKeyDown={parseHandlerValue(onKeyDown)}
      placeholder={placeholder}
      size={size}
      step={step}
      ref={ref}
      type="number"
      // See comment above — we need to stringify what we give InternalTextField
      value={value === undefined ? value : String(value)}
    />
  );
});

NumberFieldWithForwardRef.displayName = 'NumberField';

export default NumberFieldWithForwardRef;
