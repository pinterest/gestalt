import type { Node, AbstractComponent } from "react";
import { forwardRef, useState, useRef, useImperativeHandle } from "react";
import classnames from "classnames";
import layout from "./Layout.css";
import styles from "./SearchField.css";
import formElement from "./FormElement.css";
import Box from "./Box";
import Icon from "./Icon";
import FormErrorMessage from "./FormErrorMessage";
import FormLabel from "./FormLabel";
import type { AbstractEventHandler } from "./AbstractEventHandler";
import "./AbstractEventHandler";
type UnionRefs = HTMLDivElement | HTMLAnchorElement;
type Props = {
  /**
   * String that clients such as VoiceOver will read to describe the element. Always localize the label. See the [Accessibility section](https://gestalt.pinterest.systems/searchfield#Accessibility) for more info.
   */
  accessibilityLabel: string;

  /**
   * String that clients such as VoiceOver will read to describe the clear button element. Always localize the label. See the [Accessibility section](https://gestalt.pinterest.systems/searchfield#Accessibility) for more info.
   */
  accessibilityClearButtonLabel?: string;

  /**
   * The type of autocomplete used, if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for more info.
   */
  autoComplete?: "on" | "off" | "username" | "name";

  /**
   * Error text displayed below the input field.
   */
  errorMessage?: string;

  /**
   * Must be unique!
   */
  id: string;

  /**
   * Text used to label the input. Be sure to localize the text. See the [Visible label variant](https://gestalt.pinterest.systems/searchfield#Visible-label) for more info.
   */
  label?: string;

  /**
   *
   */
  onBlur?: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>>;

  /**
   * Primary callback to handle keyboard input.
   */
  onChange: (arg0: {
    value: string;
    syntheticEvent: React.SyntheticEvent<HTMLInputElement>;
  }) => void;

  /**
   *
   */
  onFocus?: (arg0: {
    value: string;
    syntheticEvent: React.SyntheticEvent<HTMLInputElement>;
  }) => void;

  /**
   * Secondary callback for keyboard events. Possible uses include validation, form submission, etc.
   */
  onKeyDown?: (arg0: {
    event: React.KeyboardEvent<HTMLInputElement>;
    value: string;
  }) => void;

  /**
   * Text displayed before the user has entered anything.
   */
  placeholder?: string;

  /**
   * Ref that is forwarded to the underlying input element.
   */
  ref?: UnionRefs;
  // eslint-disable-line react/no-unused-prop-types

  /**
   * md: 40px, lg: 48px
   */
  size?: "md" | "lg";

  /**
   * The current value of the input.
   */
  value?: string;
};

/**
 * [SearchField](https://gestalt.pinterest.systems/SearchField) allows users to search for free-form content.
 */
const SearchFieldWithForwardRef: AbstractComponent<
  Props,
  HTMLInputElement
> = forwardRef<Props, HTMLInputElement>(function SearchField(
  {
    accessibilityLabel,
    accessibilityClearButtonLabel,
    autoComplete,
    id,
    label,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    placeholder,
    size = "md",
    value,
    errorMessage,
  }: Props,
  ref
): Node {
  const [hovered, setHovered] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  // Ref to the input
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => inputRef.current);

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    onChange({
      value: event.currentTarget.value,
      syntheticEvent: event,
    });
  };

  const handleMouseEnter = () => setHovered(true);

  const handleMouseLeave = () => setHovered(false);

  const handleFocus = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setFocused(true);

    if (onFocus) {
      onFocus({
        value: event.currentTarget.value,
        syntheticEvent: event,
      });
    }
  };

  const handleClear = (event: React.SyntheticEvent<HTMLInputElement>) => {
    inputRef?.current?.focus();
    onChange({
      value: "",
      syntheticEvent: event,
    });
  };

  const handleBlur = (event) => {
    setFocused(false);

    if (onBlur) {
      onBlur({
        event,
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown({
        event,
        value: event.currentTarget.value,
      });
    }
  };

  const hasValue = value && value.length > 0;
  const hideSearchIcon = focused || hasValue;
  const className = classnames(
    styles.input,
    {
      [layout.medium]: size === "md",
      [layout.large]: size === "lg",
      [styles.inputActive]: focused || hasValue,
      [styles.inputHovered]: hovered,
    },
    errorMessage ? formElement.errored : formElement.normal
  );
  const clearButtonSize = size === "lg" ? 24 : 20;
  const clearIconSize = size === "lg" ? 12 : 10;
  return (
    <span>
      {label && <FormLabel id={id} label={label} />}
      <Box
        alignItems="center"
        display="flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        position="relative"
      >
        {!hideSearchIcon && (
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                pointerEvents: "none",
                // Added the following lines for Safari support
                top: "50%",
                transform: "translateY(-50%)",
              },
            }}
            left
            right
            paddingX={4}
            position="absolute"
          >
            <Icon icon="search" accessibilityLabel="" />
          </Box>
        )}
        <input
          aria-describedby={errorMessage && focused ? `${id}-error` : null}
          aria-invalid={errorMessage ? "true" : "false"}
          ref={inputRef}
          aria-label={accessibilityLabel}
          autoComplete={autoComplete}
          className={className}
          id={id}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          role="searchbox"
          type="search"
          value={value}
        />

        {hasValue && (
          <button className={styles.clear} onClick={handleClear} type="button">
            <Box
              alignItems="center"
              color={focused ? "darkGray" : "transparent"}
              display="flex"
              height={clearButtonSize}
              justifyContent="center"
              rounding="circle"
              width={clearButtonSize}
            >
              <Icon
                accessibilityLabel={accessibilityClearButtonLabel || ""}
                color={focused ? "white" : "darkGray"}
                icon="cancel"
                size={clearIconSize}
              />
            </Box>
          </button>
        )}
      </Box>
      {errorMessage && <FormErrorMessage id={id} text={errorMessage} />}
    </span>
  );
});
SearchFieldWithForwardRef.displayName = "SearchField";
export default SearchFieldWithForwardRef;