import type { Node } from "react";
import { useState } from "react";
import classnames from "classnames";
import Box from "./Box";
import formElement from "./FormElement.css";
import layout from "./Layout.css";
import FormErrorMessage from "./FormErrorMessage";
import FormHelperText from "./FormHelperText";
import FormLabel from "./FormLabel";
import Icon from "./Icon";
import styles from "./SelectList.css";
import type { AbstractEventHandler } from "./AbstractEventHandler";
import "./AbstractEventHandler";
type Props = {
  /**
   * Used to disable the entire SelectList.
   */
  disabled?: boolean;

  /**
   * Used to communicate error information to the user. Be sure to localize the text. See the [error message](https://gestalt.pinterest.systems/selectlist#Error-message) variant to learn more.
   */
  errorMessage?: string;

  /**
   * Used to provide more information about the form field. Be sure to localize the text. See the [helper text](https://gestalt.pinterest.systems/selectlist#Helper-text) variant to learn more.
   */
  helperText?: string;

  /**
   * A unique identifier to connect the underlying `<select>` with the associated label.
   */
  id: string;

  /**
   * The label shown above the input. Be sure to localize the label.
   */
  label?: string;

  /**
   * Used to specify the name of the control.
   */
  name?: string;

  /**
   * Callback triggered when the user selects a new option.  See the [controlled component](https://gestalt.pinterest.systems/selectlist#Controlled-component) variant to learn more.
   */
  onChange: AbstractEventHandler<
    React.SyntheticEvent<HTMLSelectElement>,
    {
      value: string;
    }
  >;

  /**
   * The options displayed in the dropdown list. Note that ``disabled`` here is used to disable a single option. Be sure to localize the label.
   */
  options: ReadonlyArray<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;

  /**
   * If not provided, the first item in the list will be shown. Be sure to localize the text. See the [controlled component](https://gestalt.pinterest.systems/selectlist#Controlled-component) variant to learn more.
   */
  placeholder?: string;

  /**
   * md: 40px, lg: 48px. See the [size](https://gestalt.pinterest.systems/selectlist#Size) variant to learn more.
   */
  size?: "md" | "lg";

  /**
   * The currently-selected value. See the [controlled component](https://gestalt.pinterest.systems/selectlist#Controlled-component) variant to learn more.
   */
  value?: string | null | undefined;
};
/**
 * https://gestalt.pinterest.systems/SelectList
 */

export default function SelectList({
  disabled = false,
  errorMessage,
  helperText,
  id,
  label,
  name,
  onChange,
  options,
  placeholder,
  size = "md",
  value,
}: Props): Node {
  const [focused, setFocused] = useState(false);

  const handleOnChange: (
    event: React.SyntheticEvent<HTMLSelectElement>
  ) => void = (event) => {
    if (value !== event.target.value) {
      onChange({
        event,
        value: event.target.value,
      });
    }
  };

  const handleBlur = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setFocused(false);
    handleOnChange(event);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const classes = classnames(
    styles.select,
    formElement.base,
    disabled ? formElement.disabled : formElement.enabled,
    errorMessage ? formElement.errored : formElement.normal,
    size === "md" ? layout.medium : layout.large
  );
  const showPlaceholder = placeholder && !value;
  return (
    <Box>
      {label && <FormLabel id={id} label={label} />}
      <Box
        color={disabled ? "lightGray" : "white"}
        display="flex"
        position="relative"
        rounding={4}
        width="100%"
      >
        <Box
          alignItems="center"
          bottom
          dangerouslySetInlineStyle={{
            __style: {
              paddingRight: 14,
              paddingTop: 2,
            },
          }}
          display="flex"
          position="absolute"
          right
          top
        >
          <Icon
            icon="arrow-down"
            size={12}
            color={disabled ? "gray" : "darkGray"}
            accessibilityLabel=""
          />
        </Box>
        <select
          aria-describedby={errorMessage && focused ? `${id}-error` : null}
          aria-invalid={errorMessage ? "true" : "false"}
          className={classes}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={handleBlur}
          onChange={handleOnChange}
          onFocus={handleFocus}
          value={showPlaceholder ? placeholder : value}
        >
          {showPlaceholder && (
            <option disabled value={placeholder} hidden>
              {placeholder}
            </option>
          )}
          {(options ?? []).map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </Box>
      {helperText && !errorMessage ? (
        <FormHelperText text={helperText} />
      ) : null}
      {errorMessage && <FormErrorMessage id={id} text={errorMessage} />}
    </Box>
  );
}