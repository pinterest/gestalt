import { forwardRef, ReactElement, ReactNode, useState } from 'react';
import classnames from 'classnames';
import Box from './Box';
import focusStyles from './Focus.css';
import formElement from './sharedSubcomponents/FormElement.css';
import FormErrorMessage from './sharedSubcomponents/FormErrorMessage';
import FormHelperText from './sharedSubcomponents/FormHelperText';
import FormLabel from './sharedSubcomponents/FormLabel';
import TagArea from './TagArea/TagArea';
import styles from './TextArea.css';
import VRTextArea from './TextArea/VRTextArea';
import useInExperiment from './useInExperiment';

const ROW_HEIGHT = 24;
const INPUT_PADDING_WITH_TAGS = 20;

type Props = {
  /**
   * Indicate if the input is currently disabled. See the [disabled example](https://gestalt.pinterest.systems/web/textarea#Disabled) for more details.
   */
  disabled?: boolean;
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * For most use cases, pass a string with a helpful error message (be sure to localize!). In certain instances it can be useful to make some text clickable; to support this, you may instead pass a React.Node to wrap text in Link or TapArea. See the [error message example](https://gestalt.pinterest.systems/web/textarea#Error-message) for more details.
   */
  errorMessage?: ReactNode;
  /**
   * This field is deprecated and will be removed soon. Please do not use.
   */
  hasError?: boolean;
  /**
   * More information about how to complete the form field. See the [helper text example](https://gestalt.pinterest.systems/web/textarea#Helper-text) for more details.
   */
  helperText?: string;
  /**
   * A unique identifier for the input.
   */
  id: string;
  /**
   * The label for the input. Be sure to localize the text.
   */
  label?: string;
  /**
   * Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually. See the [label visibility variant](https://gestalt.pinterest.systems/web/textarea#Label-visibility) for more info.
   */
  labelDisplay?: 'visible' | 'hidden';
  /**
   * The maximum number of characters allowed in TextArea. `maxLength` must be an integer value 0 or higher. See the [maximum length variant](https://gestalt.pinterest.systems/web/textarea#Maximum-length) for more details.
   */
  maxLength?: {
    characterCount: number;
    errorAccessibilityLabel: string;
  };
  /**
   * A unique name for the input.
   */
  name?: string;
  /**
   * Callback triggered when the user blurs the input.!
   */
  onBlur?: (arg1: { event: React.FocusEvent<HTMLTextAreaElement>; value: string }) => void;
  /**
   * Callback triggered when the value of the input changes.
   */
  onChange: (arg1: { event: React.ChangeEvent<HTMLTextAreaElement>; value: string }) => void;
  /**
   * Callback triggered when the user focuses the input.
   */
  onFocus?: (arg1: { event: React.FocusEvent<HTMLTextAreaElement>; value: string }) => void;
  /**
   * Callback triggered when the user presses any key while the input is focused.
   */
  onKeyDown?: (arg1: { event: React.KeyboardEvent<HTMLTextAreaElement>; value: string }) => void;
  /**
   * Placeholder text shown the the user has not yet input a value.
   */
  placeholder?: string;
  /**
   * Indicate if the input is currently readOnly. See the [readOnly example](https://gestalt.pinterest.systems/web/textarea#Read-only) for more details.
   */
  readOnly?: boolean;
  /**
   * Ref that is forwarded to the underlying input element. See the [ref example](https://gestalt.pinterest.systems/web/textarea#With-a-ref) for more details.
   */
  ref?: ReactElement; // eslint-disable-line react/no-unused-prop-types,
  /**
   * Number of text rows to display. Note that tags take up more space, and will show fewer rows than specified.
   */
  rows?: number;
  /**
   * List of tags to display in the component. See the [tags example](https://gestalt.pinterest.systems/web/textarea#With-tags) for more details.
   */
  tags?: ReadonlyArray<ReactElement>;
  /**
   * The current value of the input.
   */
  value?: string;
};

/**
 * [TextArea](https://gestalt.pinterest.systems/web/textarea) allows for multi-line input.
 *
 * ![TextArea light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TextArea.spec.ts-snapshots/TextArea-chromium-darwin.png)
 * ![TextArea dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TextArea-dark.spec.ts-snapshots/TextArea-dark-chromium-darwin.png)
 *
 */

const TextAreaWithForwardRef = forwardRef<HTMLTextAreaElement, Props>(function TextArea(
  {
    dataTestId,
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
    rows,
    tags,
    value,
  }: Props,
  ref,
) {
  const [focused, setFocused] = useState(false);
  const [currentLength, setCurrentLength] = useState(value?.length ?? 0);

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  const defaultRows = isInVRExperiment ? 2 : 3;

  const overridenRows = rows ?? defaultRows;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLength(event.currentTarget.value?.length ?? 0);
    onChange({ event, value: event.currentTarget.value });
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(false);
    if (onBlur) {
      onBlur({ event, value: event.currentTarget.value });
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(true);
    if (onFocus) {
      onFocus({ event, value: event.currentTarget.value });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (onKeyDown) {
      onKeyDown({ event, value: event.currentTarget.value });
    }
  };

  const hasErrorMessage = Boolean(errorMessage);

  const classes = classnames(
    styles.textArea,
    formElement.base,
    formElement.lg,
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
      ref={ref}
      aria-describedby={focused ? ariaDescribedby : undefined}
      aria-invalid={hasErrorMessage || hasError ? 'true' : 'false'}
      className={tags ? styles.unstyledTextArea : classes}
      data-test-id={dataTestId}
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
      rows={tags ? undefined : overridenRows}
      value={value}
    />
  );

  const tagsWrapperStyle = {
    minHeight: overridenRows * ROW_HEIGHT + INPUT_PADDING_WITH_TAGS,
    maxHeight: overridenRows * ROW_HEIGHT + INPUT_PADDING_WITH_TAGS,
  } as const;

  if (isInVRExperiment && !tags)
    return (
      <VRTextArea
        ref={ref}
        dataTestId={dataTestId}
        disabled={disabled}
        errorMessage={errorMessage}
        hasError={hasError}
        helperText={helperText}
        id={id}
        label={label}
        labelDisplay={labelDisplay}
        maxLength={maxLength}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={overridenRows}
        value={value}
      />
    );

  if (isInVRExperiment && tags)
    return (
      <TagArea
        ref={ref}
        dataTestId={dataTestId}
        disabled={disabled}
        errorMessage={errorMessage}
        hasError={hasError}
        helperText={helperText}
        id={id}
        label={label}
        labelDisplay={labelDisplay}
        maxLength={maxLength}
        name={name}
        // @ts-expect-error - TS2322
        onBlur={onBlur}
        // @ts-expect-error - TS2322
        onChange={onChange}
        // @ts-expect-error - TS2322
        onFocus={onFocus}
        // @ts-expect-error - TS2322
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={overridenRows}
        size="md"
        tags={tags}
        value={value}
      />
    );

  return (
    <span>
      {label && <FormLabel id={id} label={label} labelDisplay={labelDisplay} size="lg" />}
      {tags ? (
        <div className={classes} style={tagsWrapperStyle}>
          {tags.map((tag, tagIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={tagIndex} marginBottom={1} marginEnd={1}>
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
          currentLength={currentLength}
          id={`${id}-helperText`}
          maxLength={maxLength}
          text={helperText}
        />
      ) : null}
      {hasErrorMessage && <FormErrorMessage id={`${id}-error`} text={errorMessage} />}
    </span>
  );
});

TextAreaWithForwardRef.displayName = 'TextArea';

export default TextAreaWithForwardRef;
