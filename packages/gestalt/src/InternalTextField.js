// @flow strict
import { useImperativeHandle, useRef, forwardRef, type Element, type Node, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
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
import { TAB, ENTER } from './keyCodes.js';
import typography from './Typography.css';

type Button = 'clear' | 'dropdown';
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
  accessibilityActivedescendant?: string,
  accessibilityShowButtonLabel?: string,
  autoComplete?: 'current-password' | 'new-password' | 'on' | 'off' | 'username' | 'email',
  disabled?: boolean,
  endButton?: Button,
  errorMessage?: Node,
  hasError?: boolean,
  helperText?: string,
  label?: string,
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
  tags?: $ReadOnlyArray<Element<typeof Tag>>,
  type?: 'date' | 'email' | 'number' | 'password' | 'text' | 'url',
  value?: string,
|};

const InternalTextFieldWithForwardRef: React$AbstractComponent<
  Props,
  HTMLInputElement,
> = forwardRef<Props, HTMLInputElement>(function TextField(props, ref): Node {
  const {
    accessibilityControls,
    accessibilityActivedescendant,
    accessibilityClearButtonLabel,
    accessibilityShowButtonLabel,
    autoComplete,
    disabled = false,
    endButton,
    errorMessage,
    hasError = false,
    helperText,
    id,
    label,
    name,
    onBlur,
    onChange,
    onClickIconButton,
    onClick,
    onFocus,
    onKeyDown,
    placeholder,
    size = 'md',
    tags,
    type = 'text',
    value,
  } = props;

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
      [styles.actionButton]: endButton,
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
      aria-activedescendant={accessibilityActivedescendant}
      aria-controls={accessibilityControls}
      aria-describedby={hasErrorMessage && focused ? `${id}-error` : null}
      aria-invalid={hasErrorMessage || hasError ? 'true' : 'false'}
      autoComplete={autoComplete}
      className={tags ? unstyledClasses : styledClasses}
      disabled={disabled}
      id={id}
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
      {...(tags ? {} : { ref: innerRef })}
      type={type}
      value={value}
    />
  );

  return (
    <span>
      {label ? <FormLabel id={id} label={label} /> : null}
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
        {endButton && !disabled ? (
          // styles.actionButtonContainernis required for RTL positioning
          <div className={classnames(styles.actionButtonContainer)}>
            <Box alignItems="center" display="flex" height="100%" marginEnd={2} rounding="circle">
              <TapArea
                accessibilityLabel={
                  endButton === 'clear'
                    ? accessibilityClearButtonLabel
                    : accessibilityShowButtonLabel
                }
                onBlur={() => setFocusedButton(false)}
                onFocus={() => setFocusedButton(true)}
                onKeyDown={({ event }) => {
                  if (event.keyCode !== ENTER && event.keyCode !== TAB) innerRef.current?.focus();
                }}
                onMouseEnter={() => setFocusedButton(true)}
                onMouseLeave={() => setFocusedButton(false)}
                onTap={handleOnClickIconButton}
                rounding="circle"
                tabIndex={endButton === 'clear' ? 0 : -1}
                tapStyle={endButton === 'clear' ? 'compress' : 'none'}
              >
                <Box
                  color={focusedButton && endButton === 'clear' ? 'lightGray' : 'transparent'}
                  padding={size === 'lg' ? 2 : 1}
                  rounding="circle"
                >
                  <Icon
                    accessibilityLabel=""
                    size={12}
                    icon={endButton === 'clear' ? 'cancel' : 'arrow-down'}
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

InternalTextFieldWithForwardRef.propTypes = {
  accessibilityActivedescendant: PropTypes.string,
  accessibilityClearButtonLabel: PropTypes.string,
  accessibilityControls: PropTypes.string,
  accessibilityShowButtonLabel: PropTypes.string,
  autoComplete: PropTypes.oneOf([
    'current-password',
    'new-password',
    'on',
    'off',
    'username',
    'email',
  ]),
  disabled: PropTypes.bool,
  endButton: PropTypes.oneOf(['clear', 'dropdown']),
  errorMessage: PropTypes.node,
  hasError: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  onClickIconButton: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['md', 'lg']),
  tags: PropTypes.arrayOf(PropTypes.node),
  type: PropTypes.oneOf(['date', 'email', 'number', 'password', 'text', 'url']),
  value: PropTypes.string,
};

InternalTextFieldWithForwardRef.displayName = 'InternalTextField';

export default InternalTextFieldWithForwardRef;
