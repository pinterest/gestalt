import type { Element, Node, AbstractComponent } from "react";
import { forwardRef, useState } from "react";
import classnames from "classnames";
import Box from "./Box";
import focusStyles from "./Focus.css";
import formElement from "./FormElement.css";
import FormErrorMessage from "./FormErrorMessage";
import FormHelperText from "./FormHelperText";
import FormLabel from "./FormLabel";
import Tag from "./Tag";
import styles from "./TextArea.css";
import type { AbstractEventHandler } from "./AbstractEventHandler";
import "./AbstractEventHandler";
const ROW_HEIGHT = 24;
const INPUT_PADDING_WITH_TAGS = 20;
type Props = {
  disabled?: boolean;
  errorMessage?: Node;
  hasError?: boolean;
  helperText?: string;
  id: string;
  label?: string;
  name?: string;
  onBlur?: AbstractEventHandler<
    React.FocusEvent<HTMLTextAreaElement>,
    {
      value: string;
    }
  >;
  onChange: AbstractEventHandler<
    React.SyntheticEvent<HTMLTextAreaElement>,
    {
      value: string;
    }
  >;
  onFocus?: AbstractEventHandler<
    React.FocusEvent<HTMLTextAreaElement>,
    {
      value: string;
    }
  >;
  onKeyDown?: AbstractEventHandler<
    React.KeyboardEvent<HTMLTextAreaElement>,
    {
      value: string;
    }
  >;
  placeholder?: string;
  rows?: number;
  tags?: ReadonlyArray<Element<typeof Tag>>;
  value?: string;
};

/**
 * https://gestalt.pinterest.systems/TextArea
 */
const TextAreaWithForwardRef: AbstractComponent<
  Props,
  HTMLTextAreaElement
> = forwardRef<Props, HTMLTextAreaElement>(function TextArea(
  props: Props,
  ref
): Node {
  const {
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
    rows = 3,
    tags,
    value,
  } = props;
  const [focused, setFocused] = useState(false);

  const handleChange = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    onChange({
      event,
      value: event.currentTarget.value,
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(false);

    if (onBlur) {
      onBlur({
        event,
        value: event.currentTarget.value,
      });
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(true);

    if (onFocus) {
      onFocus({
        event,
        value: event.currentTarget.value,
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (onKeyDown) {
      onKeyDown({
        event,
        value: event.currentTarget.value,
      });
    }
  };

  const hasErrorMessage = Boolean(errorMessage);
  const classes = classnames(
    styles.textArea,
    formElement.base,
    disabled ? formElement.disabled : formElement.enabled,
    (hasError || hasErrorMessage) && !focused
      ? formElement.errored
      : formElement.normal,
    tags
      ? {
          [focusStyles.accessibilityOutlineFocus]: focused,
          [styles.textAreaWrapper]: true,
        }
      : {}
  );
  const inputElement = (
    <textarea
      aria-describedby={hasErrorMessage && focused ? `${id}-error` : null}
      aria-invalid={hasErrorMessage || hasError ? "true" : "false"}
      className={tags ? styles.unstyledTextArea : classes}
      disabled={disabled}
      id={id}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      ref={ref}
      rows={tags ? undefined : rows}
      value={value}
    />
  );
  const tagsWrapperStyle = {
    minHeight: rows * ROW_HEIGHT + INPUT_PADDING_WITH_TAGS,
  };
  return (
    <span>
      {label && <FormLabel id={id} label={label} />}
      {tags ? (
        <div className={classes} style={tagsWrapperStyle}>
          {tags.map((tag, tagIndex) => (
            <Box key={tagIndex} marginEnd={1} marginBottom={1}>
              {tag}
            </Box>
          ))}
          <Box
            flex="grow"
            maxWidth="100%"
            overflow="hidden"
            position="relative"
          >
            {/* This is an invisible spacer div which mirrors the input's
             * content. We use it to implement the flex wrapping behavior
             * which is not supported by inputs, by having the actual input
             * track it with absolute positioning. */}
            <div aria-hidden className={styles.textAreaSpacer}>
              {/* Keep a non-empty value so that the div doesn't collapse */}
              {value || "-"}
            </div>
            {inputElement}
          </Box>
        </div>
      ) : (
        inputElement
      )}
      {helperText && !errorMessage ? (
        <FormHelperText text={helperText} />
      ) : null}
      {hasErrorMessage && <FormErrorMessage id={id} text={errorMessage} />}
    </span>
  );
});
TextAreaWithForwardRef.displayName = "TextArea";
export default TextAreaWithForwardRef;