// @flow strict
import { useImperativeHandle, useRef, forwardRef, type Element, type Node, useState } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import TapArea from './TapArea.js';
import Icon from './Icon.js';
import focusStyles from './Focus.css';
import formElement from './FormElement.css';
import FormErrorMessage from './FormErrorMessage.js';
import FormHelperText from './FormHelperText.js';
import FormLabel from './FormLabel.js';
import Tag from './Tag.js';
import layout from './Layout.css';
import styles from './InternalTextField.css';
import { TAB, SPACE, ENTER } from './keyCodes.js';
import typography from './Typography.css';
import { type LabelDisplay } from './Label.js';

type Props = {|
  // REQUIRED
  id: string,
  onChange: ({|
    event: SyntheticInputEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  // OPTIONAL
  accessibilityClearButtonLabel?: string,
  accessibilityControls?: string,
  accessibilityActiveDescendant?: string,
  autoComplete?: 'current-password' | 'new-password' | 'on' | 'off' | 'username' | 'email',
  disabled?: boolean,
  errorMessage?: Node,
  hasError?: boolean,
  helperText?: string,
  label?: string,
  labelDisplay?: LabelDisplay,
  max?: number,
  min?: number,
  name?: string,
  onBlur?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onClickIconButton?: () => void,
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
  size?: 'md' | 'lg',
  step?: number,
  tags?: $ReadOnlyArray<Element<typeof Tag>>,
  textfieldIconButton?: 'clear' | 'expand',
  type?: 'date' | 'email' | 'number' | 'password' | 'tel' | 'text' | 'url',
  value?: string,
|};

const InternalTextFieldWithForwardRef: React$AbstractComponent<Props, HTMLInputElement> =
  forwardRef<Props, HTMLInputElement>(function TextField(
    {
      accessibilityControls,
      accessibilityActiveDescendant,
      accessibilityClearButtonLabel,
      autoComplete,
      disabled = false,
      errorMessage,
      hasError = false,
      helperText,
      id,
      label,
      labelDisplay,
      max,
      min,
      name,
      onBlur,
      onChange,
      onClickIconButton,
      onClick,
      onFocus,
      onKeyDown,
      placeholder,
      size = 'md',
      step,
      tags,
      textfieldIconButton,
      type = 'text',
      value,
    }: Props,
    ref,
  ): Node {
    // ==== REFS ====

    const innerRef = useRef(null);
    // When using both forwardRef and innerRefs, useimperativehandle() allows to externally set focus via the ref prop: textfieldRef.current.focus()
    // $FlowFixMe[incompatible-call]
    useImperativeHandle(ref, () => innerRef.current);

    // ==== STATE ====

    const [focused, setFocused] = useState(false);
    const [focusedButton, setFocusedButton] = useState(false);

    // ==== HANDLERS ====

    const handleBlur = (event: SyntheticFocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.({ event, value: event.currentTarget.value });
    };

    const handleClick = (event: SyntheticInputEvent<HTMLInputElement>) =>
      onClick?.({ event, value: event.currentTarget.value });

    const handleChange = (event: SyntheticInputEvent<HTMLInputElement>) =>
      onChange({ event, value: event.currentTarget.value });

    const handleFocus = (event: SyntheticFocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.({ event, value: event.currentTarget.value });
    };

    const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) =>
      onKeyDown?.({ event, value: event.currentTarget.value });

    const handleOnClickIconButton = () => onClickIconButton?.();

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
        [styles.actionButton]: textfieldIconButton,
      },
      tags
        ? {
            [focusStyles.accessibilityOutlineFocus]: focused,
            [styles.textFieldWrapper]: true,
          }
        : { [typography.truncate]: true },
    );

    const unstyledClasses = classnames(styles.unstyledTextField);

    const inputElement = (
      <input
        aria-activedescendant={accessibilityActiveDescendant}
        aria-controls={accessibilityControls}
        aria-describedby={hasErrorMessage && focused ? `${id}-error` : null}
        aria-invalid={hasErrorMessage || hasError ? 'true' : 'false'}
        autoComplete={autoComplete}
        className={tags ? unstyledClasses : styledClasses}
        disabled={disabled}
        id={id}
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
          {textfieldIconButton && !disabled ? (
            // styles.actionButtonContainernis required for RTL positioning
            <div className={classnames(styles.actionButtonContainer)}>
              <Box
                aria-hidden={textfieldIconButton === 'expand'}
                alignItems="center"
                display="flex"
                height="100%"
                marginEnd={2}
                rounding="circle"
              >
                <TapArea
                  accessibilityLabel={
                    textfieldIconButton === 'clear' ? accessibilityClearButtonLabel : undefined
                  }
                  onBlur={() => setFocusedButton(false)}
                  onFocus={() => setFocusedButton(true)}
                  onKeyDown={({ event }) => {
                    if ([ENTER, SPACE].includes(event.keyCode)) handleOnClickIconButton();
                    if (event.keyCode !== TAB) event.preventDefault();
                  }}
                  onMouseEnter={() => setFocusedButton(true)}
                  onMouseLeave={() => setFocusedButton(false)}
                  onTap={handleOnClickIconButton}
                  rounding="circle"
                  tabIndex={textfieldIconButton === 'clear' ? 0 : -1}
                  tapStyle={textfieldIconButton === 'clear' ? 'compress' : 'none'}
                >
                  <Box
                    color={
                      focusedButton && textfieldIconButton === 'clear' ? 'lightGray' : 'transparent'
                    }
                    padding={size === 'lg' ? 2 : 1}
                    rounding="circle"
                  >
                    <Icon
                      accessibilityLabel=""
                      size={12}
                      icon={textfieldIconButton === 'clear' ? 'cancel' : 'arrow-down'}
                      color="darkGray"
                    />
                  </Box>
                </TapArea>
              </Box>
            </div>
          ) : null}
        </Box>
        {helperText && !errorMessage ? <FormHelperText text={helperText} /> : null}
        {hasErrorMessage ? <FormErrorMessage id={id} text={errorMessage} /> : null}
      </span>
    );
  });

InternalTextFieldWithForwardRef.displayName = 'InternalTextField';

export default InternalTextFieldWithForwardRef;
