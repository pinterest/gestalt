import type { Element, Node, AbstractComponent } from "react";
import { forwardRef } from "react";
import Tag from "./Tag";
import InternalTextField from "./InternalTextField";
type Props = {
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
  id: string;
  label?: string;
  name?: string;
  onBlur?: (arg0: {
    event: React.FocusEvent<HTMLInputElement>;
    value: string;
  }) => void;
  onChange: (arg0: {
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
  tags?: ReadonlyArray<Element<typeof Tag>>;
  type?: "date" | "email" | "number" | "password" | "text" | "url";
  size?: "md" | "lg";
  value?: string;
};

/**
 * https://gestalt.pinterest.systems/TextField
 */
const TextFieldWithForwardRef: AbstractComponent<
  Props,
  HTMLInputElement
> = forwardRef<Props, HTMLInputElement>(function TextField(
  props: Props,
  ref
): Node {
  const {
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
    size = "md",
    tags,
    type = "text",
    value,
  } = props;
  return (
    <InternalTextField
      autoComplete={autoComplete}
      disabled={disabled}
      errorMessage={errorMessage}
      hasError={hasError}
      helperText={helperText}
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
TextFieldWithForwardRef.displayName = "TextField";
export default TextFieldWithForwardRef;