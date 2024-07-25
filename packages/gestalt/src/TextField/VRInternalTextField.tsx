import { forwardRef, ReactElement, ReactNode, useImperativeHandle, useRef, useState } from 'react';
import classnames from 'classnames';
import { autoCompleteType } from './InternalTextField';
import styles from './VRInternalTextField.css';
import boxStyles from '../Box.css';
import FormErrorMessage from '../sharedSubcomponents/FormErrorMessage';
import FormHelperText from '../sharedSubcomponents/FormHelperText';
import { MaxLength } from '../TextField';
import typographyStyle from '../Typography.css';

type SizeType = 'sm' | 'md' | 'lg';

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
  onClick?: (arg1: { event: React.MouseEvent<HTMLInputElement>; value: string }) => void;
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
  const innerRef = useRef<null | HTMLInputElement>(null);
  // @ts-expect-error - TS2322 - Type 'HTMLDivElement | HTMLInputElement | null' is not assignable to type 'HTMLInputElement'.
  useImperativeHandle(ref, () => innerRef.current);

  const hasErrorMessage = Boolean(errorMessage);

  const isLabelVisible = labelDisplay === 'visible';

  // ==== STATE ====
  const [focused, setFocused] = useState(false);
  const [currentLength, setCurrentLength] = useState(value?.length ?? 0);

  // ==== A11Y ====

  let ariaDescribedby;

  if (hasErrorMessage) {
    ariaDescribedby = `${id}-error`;
  }

  if (helperText || maxLength) {
    ariaDescribedby = `${id}-helperText`;
  }

  return (
    <div>
      {label && (
        <div className={classnames(styles.parentLabel)}>
          <label
            className={classnames(styles.label, {
              [styles.enabledText]: !disabled,
              [styles.disabledText]: disabled,
              // sm
              [styles.sm_label]: size === 'sm',
              [styles.sm_labelPos]: size === 'sm',
              // md
              [styles.md_label]: size === 'md',
              [styles.md_labelPos]: size === 'md',
              // lg
              [styles.lg_label]: size === 'lg',
              [styles.lg_labelPos]: size === 'lg',

              [boxStyles.visuallyHidden]: !isLabelVisible,
            })}
            htmlFor={id}
          >
            {label}
          </label>
        </div>
      )}
      <input
        ref={innerRef}
        aria-activedescendant={accessibilityActiveDescendant}
        aria-controls={accessibilityControls}
        aria-describedby={focused ? ariaDescribedby : undefined}
        aria-invalid={hasErrorMessage || hasError ? 'true' : 'false'}
        autoComplete={autoComplete}
        className={classnames(styles.input, typographyStyle.truncate, {
          [styles.enabled]: !disabled,
          [styles.disabled]: disabled,
          [styles.enabledText]: !disabled,
          [styles.disabledText]: disabled,
          // sm
          [styles.sm_input]: size === 'sm',
          [styles.sm_inputHorizontalPadding]: size === 'sm',
          [styles.sm_visibleLabel]: size === 'sm' && label && isLabelVisible,
          [styles.sm_noLabel]: size === 'sm' && (!label || (label && !isLabelVisible)),
          // md
          [styles.md_input]: size === 'md',
          [styles.md_inputHorizontalPadding]: size === 'md',
          [styles.md_visibleLabel]: size === 'md' && label && isLabelVisible,
          [styles.md_noLabel]: size === 'md' && (!label || (label && !isLabelVisible)),
          // lg
          [styles.lg_input]: size === 'lg',
          [styles.lg_inputHorizontalPadding]: size === 'lg',
          [styles.lg_visibleLabel]: size === 'lg' && label && isLabelVisible,
          [styles.lg_noLabel]: size === 'lg' && (!label || (label && !isLabelVisible)),
        })}
        data-test-id={dataTestId}
        disabled={disabled}
        enterKeyHint={mobileEnterKeyHint}
        id={id}
        inputMode={mobileInputMode}
        max={type === 'number' ? max : undefined}
        maxLength={maxLength?.characterCount}
        min={type === 'number' ? min : undefined}
        name={name}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.({ event, value: event.currentTarget.value });
        }}
        onChange={(event) => {
          setCurrentLength(event.currentTarget.value?.length ?? 0);
          onChange({ event, value: event.currentTarget.value });
        }}
        onClick={(event) => onClick?.({ event, value: event.currentTarget.value })}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.({ event, value: event.currentTarget.value });
        }}
        onKeyDown={(event) => onKeyDown?.({ event, value: event.currentTarget.value })}
        pattern={type === 'number' ? '\\d*' : undefined}
        placeholder={placeholder}
        readOnly={readOnly}
        spellCheck={['email', 'password'].includes(type) ? false : undefined}
        step={type === 'number' ? step : undefined}
        type={type}
        value={value}
      />
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
    </div>
  );
});

InternalTextFieldWithForwardRef.displayName = 'InternalTextField';

export default InternalTextFieldWithForwardRef;
