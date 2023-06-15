// @flow strict
import { type AbstractComponent, type Element, forwardRef, type Node, useState } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import focusStyles from './Focus.css';
import formElement from './shared/FormElement.css';
import FormErrorMessage from './shared/FormErrorMessage.js';
import FormHelperText from './shared/FormHelperText.js';
import FormLabel from './shared/FormLabel.js';
import Tag from './Tag.js';
import styles from './TextArea.css';

const ROW_HEIGHT = 24;
const INPUT_PADDING_WITH_TAGS = 20;

type Props = {|
  /**
   * Indicate if the input is currently disabled. See the [disabled example](https://gestalt.pinterest.systems/web/textarea#Disabled) for more details.
   */
  disabled?: boolean,
  /**
   * For most use cases, pass a string with a helpful error message (be sure to localize!). In certain instances it can be useful to make some text clickable; to support this, you may instead pass a React.Node to wrap text in Link or TapArea. See the [error message example](https://gestalt.pinterest.systems/web/textarea#Error-message) for more details.
   */
  errorMessage?: Node,
  /**
   * This field is deprecated and will be removed soon. Please do not use.
   */
  hasError?: boolean,
  /**
   * More information about how to complete the form field. See the [helper text example](https://gestalt.pinterest.systems/web/textarea#Helper-text) for more details.
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
   * Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually. See the [label visibility variant](https://gestalt.pinterest.systems/web/textarea#Label-visibility) for more info.
   */
  labelDisplay?: 'visible' | 'hidden',
  /**
   * The maximum number of characters allowed in TextArea. `maxLength` must be an integer value 0 or higher. See the [maximum length variant](https://gestalt.pinterest.systems/web/textarea#Maximum-length) for more details.
   */
  maxLength?: {|
    characterCount: number,
    errorAccessibilityLabel: string,
  |},
  /**
   * A unique name for the input.
   */
  name?: string,
  /**
   * Callback triggered when the user blurs the input.!
   */
  onBlur?: ({|
    event: SyntheticFocusEvent<HTMLTextAreaElement>,
    value: string,
  |}) => void,
  /**
   * Callback triggered when the value of the input changes.
   */
  onChange: ({|
    event: SyntheticInputEvent<HTMLTextAreaElement>,
    value: string,
  |}) => void,
  /**
   * Callback triggered when the user focuses the input.
   */
  onFocus?: ({|
    event: SyntheticFocusEvent<HTMLTextAreaElement>,
    value: string,
  |}) => void,
  /**
   * Callback triggered when the user presses any key while the input is focused.
   */
  onKeyDown?: ({|
    event: SyntheticKeyboardEvent<HTMLTextAreaElement>,
    value: string,
  |}) => void,
  /**
   * Placeholder text shown the the user has not yet input a value.
   */
  placeholder?: string,
  /**
   * Indicate if the input is currently readOnly. See the [readOnly example](https://gestalt.pinterest.systems/web/textarea#Read-only) for more details.
   */
  readOnly?: boolean,
  /**
   * Ref that is forwarded to the underlying input element. See the [ref example](https://gestalt.pinterest.systems/web/textarea#With-a-ref) for more details.
   */
  ref?: Element<'input'>, // eslint-disable-line react/no-unused-prop-types
  /**
   * Number of text rows to display. Note that tags take up more space, and will show fewer rows than specified.
   */
  rows?: number,
  /**
   * List of tags to display in the component. See the [tags example](https://gestalt.pinterest.systems/web/textarea#With-tags) for more details.
   */
  tags?: $ReadOnlyArray<Element<typeof Tag>>,
  /**
   * The current value of the input.
   */
  value?: string,
|};

/**
 * [TextArea](https://gestalt.pinterest.systems/web/textarea) allows for multi-line input.
 *
 * ![TextArea light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TextArea.spec.mjs-snapshots/TextArea-chromium-darwin.png)
 * ![TextArea dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TextArea-dark.spec.mjs-snapshots/TextArea-dark-chromium-darwin.png)
 *
 */
const TextAreaWithForwardRef: AbstractComponent<Props, HTMLTextAreaElement> = forwardRef<
  Props,
  HTMLTextAreaElement,
>(function TextArea(
  {
    disabled = false,
    errorMessage,
    hasError = false,
    helperText,
    id,
    label,
    labelDisplay = 'visible',
    maxLength,
    name,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    placeholder,
    readOnly = false,
    rows = 3,
    tags,
    value,
  }: Props,
  ref,
): Node {
  const [focused, setFocused] = useState(false);
  const [currentLength, setCurrentLength] = useState(value?.length ?? 0);

  const handleChange = (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
    setCurrentLength(event.currentTarget.value?.length ?? 0);
    onChange({ event, value: event.currentTarget.value });
  };

  const handleBlur = (event: SyntheticFocusEvent<HTMLTextAreaElement>) => {
    setFocused(false);
    if (onBlur) {
      onBlur({ event, value: event.currentTarget.value });
    }
  };

  const handleFocus = (event: SyntheticFocusEvent<HTMLTextAreaElement>) => {
    setFocused(true);
    if (onFocus) {
      onFocus({ event, value: event.currentTarget.value });
    }
  };

  const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLTextAreaElement>) => {
    if (onKeyDown) {
      onKeyDown({ event, value: event.currentTarget.value });
    }
  };

  const hasErrorMessage = Boolean(errorMessage);

  const classes = classnames(
    styles.textArea,
    formElement.base,
    disabled ? formElement.disabled : formElement.enabled,
    (hasError || hasErrorMessage) && !focused ? formElement.errored : formElement.normal,
    tags
      ? {
          [focusStyles.accessibilityOutlineFocus]: focused,
          [styles.textAreaWrapper]: true,
        }
      : {},
  );

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
    <textarea
      // checking for "focused" is not required by screenreaders but it prevents a11y integration tests to complain about missing label, as aria-describedby seems to shadow label in tests though it's a W3 accepeted pattern https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html
      aria-describedby={focused ? ariaDescribedby : undefined}
      aria-invalid={hasErrorMessage || hasError ? 'true' : 'false'}
      className={tags ? styles.unstyledTextArea : classes}
      disabled={disabled}
      id={id}
      maxLength={maxLength?.characterCount}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      readOnly={readOnly}
      ref={ref}
      rows={tags ? undefined : rows}
      value={value}
    />
  );

  const tagsWrapperStyle = {
    minHeight: rows * ROW_HEIGHT + INPUT_PADDING_WITH_TAGS,
    maxHeight: rows * ROW_HEIGHT + INPUT_PADDING_WITH_TAGS,
  };

  return (
    <span>
      {label && <FormLabel id={id} label={label} labelDisplay={labelDisplay} />}
      {tags ? (
        <div className={classes} style={tagsWrapperStyle}>
          {tags.map((tag, tagIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={tagIndex} marginEnd={1} marginBottom={1}>
              {tag}
            </Box>
          ))}
          <Box flex="grow" maxWidth="100%" overflow="hidden" position="relative">
            {/* This is an invisible spacer div which mirrors the input's
             * content. We use it to implement the flex wrapping behavior
             * which is not supported by inputs, by having the actual input
             * track it with absolute positioning. */}
            <div aria-hidden className={styles.textAreaSpacer}>
              {/* Keep a non-empty value so that the div doesn't collapse */}
              {value || '-'}
            </div>
            {inputElement}
          </Box>
        </div>
      ) : (
        inputElement
      )}
      {(helperText || maxLength) && !errorMessage ? (
        <FormHelperText
          id={`${id}-helperText`}
          text={helperText}
          maxLength={maxLength}
          currentLength={currentLength}
        />
      ) : null}
      {hasErrorMessage && <FormErrorMessage id={`${id}-error`} text={errorMessage} />}
    </span>
  );
});

TextAreaWithForwardRef.displayName = 'TextArea';

export default TextAreaWithForwardRef;
