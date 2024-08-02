import {
  cloneElement,
  forwardRef,
  ReactElement,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import { TOKEN_SPACE_100 } from 'gestalt-design-tokens';
import styles from './InternalTextField.css';
import Box from '../Box';
import focusStyles from '../Focus.css';
import layout from '../Layout.css';
import formElement from '../sharedSubcomponents/FormElement.css';
import FormErrorMessage from '../sharedSubcomponents/FormErrorMessage';
import FormHelperText from '../sharedSubcomponents/FormHelperText';
import FormLabel from '../sharedSubcomponents/FormLabel';
import { MaxLength } from '../TextField';
import typography from '../Typography.css';

type SizeType = 'sm' | 'md' | 'lg';

export type autoCompleteType =
  | 'additional-name'
  | 'address-level1'
  | 'address-level2'
  | 'address-level3'
  | 'address-level4'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'bday'
  | 'billing'
  | 'cc-additional-name'
  | 'cc-csc'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-exp'
  | 'cc-family-name'
  | 'cc-given-name'
  | 'cc-name'
  | 'cc-number'
  | 'cc-type'
  | 'country-name'
  | 'country'
  | 'current-password'
  | 'email'
  | 'family-name'
  | 'given-name'
  | 'honoric-prefix'
  | 'honoric-suffix'
  | 'impp'
  | 'language'
  | 'name'
  | 'new-password'
  | 'nickname'
  | 'off'
  | 'on'
  | 'one-time-code'
  | 'organization-title'
  | 'organization'
  | 'photo'
  | 'postal-code'
  | 'sex'
  | 'shipping'
  | 'street-address'
  | 'tel-area-code'
  | 'tel-country-code'
  | 'tel-extension'
  | 'tel-local-prefix'
  | 'tel-local-suffix'
  | 'tel-local'
  | 'tel-national'
  | 'tel'
  | 'transaction-amount'
  | 'transaction-currency'
  | 'url'
  | 'username'
  | 'webauthn';

type Props = {
  // REQUIRED
  id: string;
  onChange: (arg1: { event: React.ChangeEvent<HTMLInputElement>; value: string }) => void;
  // OPTIONAL
  accessibilityControls?: string;
  accessibilityActiveDescendant?: string;
  autoComplete?: autoCompleteType;
  dataTestId?: string;
  disabled?: boolean;
  errorMessage?: ReactNode;
  hasError?: boolean;
  helperText?: string;
  iconButton?: ReactElement;
  label?: string;
  labelDisplay?: 'visible' | 'hidden';
  max?: number;
  maxLength?: MaxLength | null | undefined;
  min?: number;
  mobileEnterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  mobileInputMode?: 'none' | 'text' | 'decimal' | 'numeric';
  name?: string;
  onBlur?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  onClick?: (arg1: { event: React.ChangeEvent<HTMLInputElement>; value: string }) => void;
  onFocus?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  onKeyDown?: (arg1: { event: React.KeyboardEvent<HTMLInputElement>; value: string }) => void;
  placeholder?: string;
  readOnly?: boolean;
  size?: SizeType;
  step?: number;
  tags?: ReadonlyArray<ReactElement>;
  type?: 'date' | 'email' | 'number' | 'password' | 'tel' | 'text' | 'url';
  value?: string;
};

const applyDensityStyle = (size: SizeType) => styles[`${size}`];

const InternalTextFieldWithForwardRef = forwardRef<HTMLInputElement, Props>(function TextField(
  {
    accessibilityControls,
    accessibilityActiveDescendant,
    autoComplete,
    dataTestId,
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
) {
  // ==== REFS ====
  const innerRef = useRef<null | HTMLInputElement | HTMLDivElement>(null);
  // When using both forwardRef and innerRefs, useimperativehandle() allows to externally set focus via the ref prop: textfieldRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLDivElement | HTMLInputElement | null' is not assignable to type 'HTMLInputElement'.
  useImperativeHandle(ref, () => innerRef.current);

  // ==== STATE ====
  const [focused, setFocused] = useState(false);
  const [currentLength, setCurrentLength] = useState(value?.length ?? 0);

  // ==== HANDLERS ====
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.({ event, value: event.currentTarget.value });
  };

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) =>
    onClick?.({ event, value: event.currentTarget.value });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLength(event.currentTarget.value?.length ?? 0);
    onChange({ event, value: event.currentTarget.value });
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.({ event, value: event.currentTarget.value });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>
    onKeyDown?.({ event, value: event.currentTarget.value });

  // ==== STYLING ====
  const hasErrorMessage = Boolean(errorMessage);

  const styledClasses = classnames(
    styles.textField,
    formElement.base,
    disabled ? formElement.disabled : formElement.enabled,
    (hasError || hasErrorMessage) && !focused ? formElement.errored : formElement.normal,
    {
      [formElement.sm]: size === 'sm',
      [formElement.md]: size === 'md',
      [formElement.lg]: size === 'lg',
      // note: layout CSS controls min-height of element
      [layout.small]: size === 'sm',
      [layout.medium]: size === 'md',
      [layout.large]: size === 'lg',
      [styles.actionButton]: iconButton,
    },
    applyDensityStyle(size),
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
    <div
    onFocus={(e) =>
      e.target.addEventListener(
        "wheel",
        (event) => {
          console.log(event);
          event.preventDefault();
        },
        { passive: false },
      )}>
      <input
        aria-activedescendant={accessibilityActiveDescendant}
        aria-controls={accessibilityControls}
        // checking for "focused" is not required by screenreaders but it prevents a11y integration tests to complain about missing label, as aria-describedby seems to shadow label in tests though it's a W3 accepeted pattern https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html
        aria-describedby={focused ? ariaDescribedby : undefined}
        aria-invalid={hasErrorMessage || hasError ? 'true' : 'false'}
        autoComplete={autoComplete}
        className={tags ? unstyledClasses : styledClasses}
        data-test-id={dataTestId}
        disabled={disabled}
        enterKeyHint={mobileEnterKeyHint}
        id={id}
        inputMode={mobileInputMode}
        max={type === 'number' ? max : undefined}
        maxLength={maxLength?.characterCount}
        min={type === 'number' ? min : undefined}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        // @ts-expect-error - TS2322 - Type '(event: React.ChangeEvent<HTMLInputElement>) => void | undefined' is not assignable to type 'MouseEventHandler<HTMLInputElement>'.
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
    </div>
  );

  // Explicit margin for the small size, we don't have a token for 2px
  const tagMarginY = size === 'sm' || size === 'md' ? '2px' : TOKEN_SPACE_100;

  return (
    <span>
      {label && <FormLabel id={id} label={label} labelDisplay={labelDisplay} size={size} />}

      <Box position="relative">
        {tags ? (
          <div className={styledClasses} {...(tags ? { ref: innerRef } : {})}>
            {tags.map((tag, tagIndex) => (
              <Box
                // eslint-disable-next-line react/no-array-index-key
                key={tagIndex}
                dangerouslySetInlineStyle={{
                  __style: { marginBottom: tagMarginY },
                }}
                marginEnd={1}
              >
                {cloneElement(tag, { size: size === 'lg' ? 'md' : 'sm' })}
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
          currentLength={currentLength}
          id={`${id}-helperText`}
          maxLength={maxLength}
          size={size}
          text={helperText}
        />
      ) : null}

      {hasErrorMessage ? (
        <FormErrorMessage id={`${id}-error`} size={size} text={errorMessage} />
      ) : null}
    </span>
  );
});

InternalTextFieldWithForwardRef.displayName = 'InternalTextField';

export default InternalTextFieldWithForwardRef;
