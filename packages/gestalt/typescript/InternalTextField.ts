import type { Element, Node, AbstractComponent } from "react";
import { useImperativeHandle, useRef, forwardRef, useState } from "react";
import classnames from "classnames";
import Box from "./Box";
import TapArea from "./TapArea";
import Icon from "./Icon";
import focusStyles from "./Focus.css";
import formElement from "./FormElement.css";
import FormErrorMessage from "./FormErrorMessage";
import FormHelperText from "./FormHelperText";
import FormLabel from "./FormLabel";
import Tag from "./Tag";
import layout from "./Layout.css";
import styles from "./InternalTextField.css";
import { TAB, SPACE, ENTER } from "./keyCodes";
import typography from "./Typography.css";
import type { LabelDisplay } from "./Label";
import "./Label";
type Props = {
  // REQUIRED
  id: string;
  onChange: (arg0: {
    event: React.SyntheticEvent<HTMLInputElement>;
    value: string;
  }) => void;
  // OPTIONAL
  accessibilityClearButtonLabel?: string;
  accessibilityControls?: string;
  accessibilityActiveDescendant?: string;
  autoComplete?:
    | "current-password"
    | "new-password"
    | "on"
    | "off"
    | "username"
    | "email";
  disabled?: boolean;
  errorMessage?: Node;
  hasError?: boolean;
  helperText?: string;
  label?: string;
  labelDisplay?: LabelDisplay;
  name?: string;
  onBlur?: (arg0: {
    event: React.FocusEvent<HTMLInputElement>;
    value: string;
  }) => void;
  onClickIconButton?: () => void;
  onClick?: (arg0: {
    event: React.SyntheticEvent<HTMLInputElement>;
    value: string;
  }) => void;
  onFocus?: (arg0: {
    event: React.FocusEvent<HTMLInputElement>;
    value: string;
  }) => void;
  onKeyDown?: (arg0: {
    event: React.KeyboardEvent<HTMLInputElement>;
    value: string;
  }) => void;
  placeholder?: string;
  size?: "md" | "lg";
  tags?: ReadonlyArray<Element<typeof Tag>>;
  textfieldIconButton?: "clear" | "expand";
  type?: "date" | "email" | "number" | "password" | "text" | "url";
  value?: string;
};
const InternalTextFieldWithForwardRef: AbstractComponent<
  Props,
  HTMLInputElement
> = forwardRef<Props, HTMLInputElement>(function TextField(
  props: Props,
  ref
): Node {
  const {
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
    name,
    onBlur,
    onChange,
    onClickIconButton,
    onClick,
    onFocus,
    onKeyDown,
    placeholder,
    size = "md",
    tags,
    textfieldIconButton,
    type = "text",
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
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.({
      event,
      value: event.currentTarget.value,
    });
  };

  const handleClick = (event: React.SyntheticEvent<HTMLInputElement>) =>
    onClick?.({
      event,
      value: event.currentTarget.value,
    });

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) =>
    onChange({
      event,
      value: event.currentTarget.value,
    });

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.({
      event,
      value: event.currentTarget.value,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>
    onKeyDown?.({
      event,
      value: event.currentTarget.value,
    });

  const handleOnClickIconButton = () => onClickIconButton?.();

  // ==== STYLING ====
  const hasErrorMessage = Boolean(errorMessage);
  const styledClasses = classnames(
    styles.textField,
    formElement.base,
    disabled ? formElement.disabled : formElement.enabled,
    (hasError || hasErrorMessage) && !focused
      ? formElement.errored
      : formElement.normal,
    {
      [layout.medium]: !tags && size === "md",
      [layout.large]: tags || size === "lg",
      [styles.actionButton]: textfieldIconButton,
    },
    tags
      ? {
          [focusStyles.accessibilityOutlineFocus]: focused,
          [styles.textFieldWrapper]: true,
        }
      : {
          [typography.truncate]: true,
        }
  );
  const unstyledClasses = classnames(styles.unstyledTextField);
  const inputElement = (
    <input
      aria-activedescendant={accessibilityActiveDescendant}
      aria-controls={accessibilityControls}
      aria-describedby={hasErrorMessage && focused ? `${id}-error` : null}
      aria-invalid={hasErrorMessage || hasError ? "true" : "false"}
      autoComplete={autoComplete}
      className={tags ? unstyledClasses : styledClasses}
      disabled={disabled}
      id={id}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      onClick={handleClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown} // type='number' doesn't work on ios safari without a pattern
      // https://stackoverflow.com/questions/14447668/input-type-number-is-not-showing-a-number-keypad-on-ios
      pattern={type === "number" ? "\\d*" : undefined}
      placeholder={placeholder}
      {...(tags
        ? {}
        : {
            ref: innerRef,
          })}
      type={type}
      value={value}
    />
  );
  return (
    <span>
      {label ? (
        <FormLabel id={id} label={label} labelDisplay={labelDisplay} />
      ) : null}
      <Box position="relative">
        {tags ? (
          <div
            className={styledClasses}
            {...(tags
              ? {
                  ref: innerRef,
                }
              : {})}
          >
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
        {textfieldIconButton && !disabled ? ( // styles.actionButtonContainernis required for RTL positioning
          <div className={classnames(styles.actionButtonContainer)}>
            <Box
              aria-hidden={textfieldIconButton === "expand"}
              alignItems="center"
              display="flex"
              height="100%"
              marginEnd={2}
              rounding="circle"
            >
              <TapArea
                accessibilityLabel={
                  textfieldIconButton === "clear"
                    ? accessibilityClearButtonLabel
                    : undefined
                }
                onBlur={() => setFocusedButton(false)}
                onFocus={() => setFocusedButton(true)}
                onKeyDown={({ event }) => {
                  if ([ENTER, SPACE].includes(event.keyCode))
                    handleOnClickIconButton();
                  if (event.keyCode !== TAB) event.preventDefault();
                }}
                onMouseEnter={() => setFocusedButton(true)}
                onMouseLeave={() => setFocusedButton(false)}
                onTap={handleOnClickIconButton}
                rounding="circle"
                tabIndex={textfieldIconButton === "clear" ? 0 : -1}
                tapStyle={textfieldIconButton === "clear" ? "compress" : "none"}
              >
                <Box
                  color={
                    focusedButton && textfieldIconButton === "clear"
                      ? "lightGray"
                      : "transparent"
                  }
                  padding={size === "lg" ? 2 : 1}
                  rounding="circle"
                >
                  <Icon
                    accessibilityLabel=""
                    size={12}
                    icon={
                      textfieldIconButton === "clear" ? "cancel" : "arrow-down"
                    }
                    color="darkGray"
                  />
                </Box>
              </TapArea>
            </Box>
          </div>
        ) : null}
      </Box>
      {helperText && !errorMessage ? (
        <FormHelperText text={helperText} />
      ) : null}
      {hasErrorMessage ? (
        <FormErrorMessage id={id} text={errorMessage} />
      ) : null}
    </span>
  );
});
InternalTextFieldWithForwardRef.displayName = "InternalTextField";
export default InternalTextFieldWithForwardRef;