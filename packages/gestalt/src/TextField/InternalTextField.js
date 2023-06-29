// @flow strict
import {
  type AbstractComponent,
  type Element,
  forwardRef,
  type Node,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import styles from './InternalTextField.css';
import InternalTextFieldIconButton from './InternalTextFieldIconButton.js';
import Box from '../Box.js';
import focusStyles from '../Focus.css';
import layout from '../Layout.css';
import formElement from '../shared/FormElement.css';
import FormErrorMessage from '../shared/FormErrorMessage.js';
import FormHelperText from '../shared/FormHelperText.js';
import FormLabel from '../shared/FormLabel.js';
import Tag from '../Tag.js';
import { type MaxLength } from '../TextField.js';
import typography from '../Typography.css';

type Props = {|
  // REQUIRED
  id: string,
  onChange: ({|
    event: SyntheticInputEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  // OPTIONAL
  accessibilityControls?: string,
  accessibilityActiveDescendant?: string,
  autoComplete?: 'bday' | 'current-password' | 'email' | 'new-password' | 'on' | 'off' | 'username',
  disabled?: boolean,
  errorMessage?: Node,
  hasError?: boolean,
  helperText?: string,
  iconButton?: Element<typeof InternalTextFieldIconButton>,
  label?: string,
  labelDisplay?: 'visible' | 'hidden',
  max?: number,
  maxLength?: ?MaxLength,
  min?: number,
  mobileEnterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send',
  mobileInputMode?: 'none' | 'text' | 'decimal' | 'numeric',
  name?: string,
  onBlur?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onClick?: ({|
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
  readOnly?: boolean,
  size?: 'md' | 'lg',
  step?: number,
  tags?: $ReadOnlyArray<Element<typeof Tag>>,
  type?: 'date' | 'email' | 'number' | 'password' | 'tel' | 'text' | 'url',
  value?: string,
|};

const InternalTextFieldWithForwardRef: AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function TextField(
  {
    accessibilityControls,
    accessibilityActiveDescendant,
    autoComplete,
    disabled = false,
    errorMessage,
    hasError = false,
    helperText,
    id,
    iconButton,
    label,
    labelDisplay,
    max,
    maxLength,
    mobileEnterKeyHint,
    mobileInputMode,
    min,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    placeholder,
    readOnly,
    size = 'md',
    step,
    tags,
    type = 'text',
    value,
  }: Props,
  ref,
): Node {
  // ==== REFS ====
  const innerRef = useRef<null | HTMLInputElement | HTMLDivElement>(null);
  // When using both forwardRef and innerRefs, useimperativehandle() allows to externally set focus via the ref prop: textfieldRef.current.focus()
  // $FlowFixMe[incompatible-call]
  useImperativeHandle(ref, () => innerRef.current);

  // ==== STATE ====
  const [focused, setFocused] = useState(false);
  const [currentLength, setCurrentLength] = useState(value?.length ?? 0);

  // ==== HANDLERS ====
  const handleBlur = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.({ event, value: event.currentTarget.value });
  };

  const handleClick = (event: SyntheticInputEvent<HTMLInputElement>) =>
    onClick?.({ event, value: event.currentTarget.value });

  const handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    setCurrentLength(event.currentTarget.value?.length ?? 0);
    onChange({ event, value: event.currentTarget.value });
  };

  const handleFocus = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.({ event, value: event.currentTarget.value });
  };

  const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) =>
    onKeyDown?.({ event, value: event.currentTarget.value });

  // ==== STYLING ====
  const hasErrorMessage = Boolean(errorMessage);

  const styledClasses = classnames(
    styles.textField,
    formElement.base,
    disabled ? formElement.disabled : formElement.enabled,
    (hasError || hasErrorMessage) && !focused ? formElement.errored : formElement.normal,
    {
      [layout.medium]: !tags && size === 'md',
      [layout.large]: tags || size === 'lg',
      [styles.actionButton]: iconButton,
    },
    tags
      ? {
          [focusStyles.accessibilityOutlineFocus]: focused,
          [styles.textFieldWrapper]: true,
        }
      : { [typography.truncate]: true },
  );

  const unstyledClasses = classnames(styles.unstyledTextField);

  if (maxLength && maxLength.characterCount < 0) {
    throw new Error('`maxLength` must be an integer value 0 or higher.');
  }

  let ariaDescribedby;

  if (hasErrorMessage) {
    ariaDescribedby = `${id}-error`;
  }

  if (helperText || maxLength) {
    ariaDescribedby = `${id}-helperText`;
  }

  const inputElement = (
    <input
      aria-activedescendant={accessibilityActiveDescendant}
      aria-controls={accessibilityControls}
      // checking for "focused" is not required by screenreaders but it prevents a11y integration tests to complain about missing label, as aria-describedby seems to shadow label in tests though it's a W3 accepeted pattern https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html
      aria-describedby={focused ? ariaDescribedby : undefined}
      aria-invalid={hasErrorMessage || hasError ? 'true' : 'false'}
      autoComplete={autoComplete}
      className={tags ? unstyledClasses : styledClasses}
      disabled={disabled}
      enterKeyHint={mobileEnterKeyHint}
      id={id}
      inputMode={mobileInputMode}
      maxLength={maxLength?.characterCount}
      max={type === 'number' ? max : undefined}
      min={type === 'number' ? min : undefined}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      onClick={handleClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      // type='number' doesn't work on ios safari without a pattern
      // https://stackoverflow.com/questions/14447668/input-type-number-is-not-showing-a-number-keypad-on-ios
      pattern={type === 'number' ? '\\d*' : undefined}
      placeholder={placeholder}
      readOnly={readOnly}
      // This config is required to prevent exposing passwords and usernames to spell-checking servers during login processes. More info here: https://www.androidpolice.com/google-chrome-servers-get-passwords-enhanced-spell-check/
      spellCheck={['email', 'password'].includes(type) ? false : undefined}
      step={type === 'number' ? step : undefined}
      {...(tags ? {} : { ref: innerRef })}
      type={type}
      value={value}
    />
  );

  return (
    <span>
      {label ? <FormLabel id={id} label={label} labelDisplay={labelDisplay} /> : null}

      <Box position="relative">
        {tags ? (
          <div className={styledClasses} {...(tags ? { ref: innerRef } : {})}>
            {tags.map((tag, tagIndex) => (
              // eslint-disable-next-line react/no-array-index-key
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

        {!disabled && iconButton}
      </Box>

      {(helperText || maxLength) && !errorMessage ? (
        <FormHelperText
          id={`${id}-helperText`}
          text={helperText}
          maxLength={maxLength}
          currentLength={currentLength}
        />
      ) : null}

      {hasErrorMessage ? <FormErrorMessage id={`${id}-error`} text={errorMessage} /> : null}
    </span>
  );
});

InternalTextFieldWithForwardRef.displayName = 'InternalTextField';

export default InternalTextFieldWithForwardRef;
