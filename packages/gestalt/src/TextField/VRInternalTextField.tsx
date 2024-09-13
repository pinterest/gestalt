import {
  forwardRef,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import { autoCompleteType } from './InternalTextField';
import styles from './VRInternalTextField.css';
import boxStyles from '../Box.css';
import FormErrorMessage from '../sharedSubcomponents/FormErrorMessage';
import FormHelperText from '../sharedSubcomponents/FormHelperText';
import { MaxLength } from '../TextField';
import TextUI from '../TextUI';
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
  readOnlyNoIconButton?: boolean;
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
    labelDisplay = 'visible',
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
    readOnlyNoIconButton,
    size = 'md',
    step,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tags,
    type = 'text',
    value,
  }: Props,
  ref,
) {
  const innerRef = useRef<null | HTMLInputElement>(null);
  const labelRef = useRef<null | HTMLDivElement>(null);

  // @ts-expect-error - TS2322 - Type 'HTMLDivElement | HTMLInputElement | null' is not assignable to type 'HTMLInputElement'.
  useImperativeHandle(ref, () => innerRef.current);

  const hasErrorMessage = Boolean(errorMessage);

  const isLabelVisible = labelDisplay === 'visible';

  const isSM = size === 'sm';
  const isMD = size === 'md';
  const isLG = size === 'lg';

  // ==== STATE ====
  const [focused, setFocused] = useState(false);
  const [currentLength, setCurrentLength] = useState(value?.length ?? 0);
  const [ellipsisActive, setEllipsisActive] = useState(false);

  // ==== A11Y ====

  let ariaDescribedby;

  if (hasErrorMessage) {
    ariaDescribedby = `${id}-error`;
  }

  if (helperText || maxLength) {
    ariaDescribedby = `${id}-helperText`;
  }

  const isEllipsisActive = (element: HTMLElement) =>
    element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth;

  const checkEllipsisActive = useCallback(() => {
    if (labelRef.current && !ellipsisActive && isEllipsisActive(labelRef?.current)) {
      setEllipsisActive(true);
    } else if (labelRef.current && ellipsisActive && !isEllipsisActive(labelRef?.current)) {
      setEllipsisActive(false);
    }
  }, [ellipsisActive]);

  useEffect(() => {
    if (!label) return () => {};

    checkEllipsisActive();

    if (typeof window !== 'undefined') window.addEventListener('resize', checkEllipsisActive);

    return () => {
      if (typeof window !== 'undefined') window?.removeEventListener('resize', checkEllipsisActive);
    };
  }, [label, checkEllipsisActive]);

  return (
    <div>
      <div className={classnames(styles.inputParent)}>
        {label && (
          <label
            className={classnames(styles.label, {
              // sm
              [styles.sm_label]: isSM,
              [styles.sm_labelPos]: isSM,
              // md
              [styles.md_label]: isMD,
              [styles.md_labelPos]: isMD,
              // lg
              [styles.lg_label]: isLG,
              [styles.lg_labelPos]: isLG,

              [boxStyles.visuallyHidden]: !isLabelVisible,
            })}
            htmlFor={id}
          >
            <TextUI
              ref={labelRef}
              color={disabled ? 'disabled' : 'default'}
              lineClamp={1}
              size="xs"
              title={ellipsisActive ? label : ''}
            >
              {label}
            </TextUI>
          </label>
        )}
        <input
          ref={innerRef}
          aria-activedescendant={accessibilityActiveDescendant}
          aria-controls={accessibilityControls}
          aria-describedby={focused ? ariaDescribedby : undefined}
          aria-invalid={hasErrorMessage || hasError ? 'true' : 'false'}
          autoComplete={autoComplete}
          className={classnames(styles.input, typographyStyle.truncate, typographyStyle.lineClamp, {
            [styles.enabled]: !disabled,
            [styles.enabledText]: !disabled,
            [styles.enabledBorder]: !disabled && !hasErrorMessage,
            [styles.errorBorder]: !disabled && hasErrorMessage,
            [styles.disabled]: disabled,
            [styles.disabledText]: disabled,
            [styles.disabledBorder]: disabled,
            // sm
            [styles.sm_input]: isSM,
            [styles.sm_inputHorizontalPadding]: isSM,
            [styles.sm_visibleLabel]: isSM && label && isLabelVisible,
            [styles.sm_noLabel]: isSM && (!label || (label && !isLabelVisible)),
            [styles.sm_actionButton]: isSM && iconButton,
            // md
            [styles.md_input]: isMD,
            [styles.md_inputHorizontalPadding]: isMD,
            [styles.md_visibleLabel]: isMD && label && isLabelVisible,
            [styles.md_noLabel]: isMD && (!label || (label && !isLabelVisible)),
            [styles.md_actionButton]: isMD && iconButton,
            // lg
            [styles.lg_input]: isLG,
            [styles.lg_inputHorizontalPadding]: isLG,
            [styles.lg_visibleLabel]: isLG && label && isLabelVisible,
            [styles.lg_noLabel]: isLG && (!label || (label && !isLabelVisible)),
            [styles.lg_actionButton]: isLG && iconButton,
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

        {!disabled && !readOnlyNoIconButton && iconButton}
      </div>

      {(helperText || maxLength) && !hasErrorMessage ? (
        <FormHelperText
          currentLength={currentLength}
          disabled={disabled}
          id={`${id}-helperText`}
          maxLength={maxLength}
          size={size}
          text={helperText}
        />
      ) : null}

      {!disabled && hasErrorMessage ? (
        <FormErrorMessage id={`${id}-error`} size={size} text={errorMessage} />
      ) : null}
    </div>
  );
});

InternalTextFieldWithForwardRef.displayName = 'InternalTextField';

export default InternalTextFieldWithForwardRef;
