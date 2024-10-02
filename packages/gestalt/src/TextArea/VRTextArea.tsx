import {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import styles from './VRTextArea.css';
import boxStyles from '../Box.css';
import FormErrorMessage from '../sharedSubcomponents/FormErrorMessage';
import FormHelperText from '../sharedSubcomponents/FormHelperText';
import { MaxLength } from '../TextField';
import TextUI from '../TextUI';
import useInteractiveStates from '../utils/useInteractiveStates';

type Props = {
  // REQUIRED
  id: string;
  onChange: (arg1: { event: React.ChangeEvent<HTMLTextAreaElement>; value: string }) => void;
  // OPTIONAL
  dataTestId?: string;
  disabled?: boolean;
  errorMessage?: ReactNode;
  hasError?: boolean;
  helperText?: string;
  label?: string;
  labelDisplay?: 'visible' | 'hidden';
  maxLength?: MaxLength | null | undefined;
  name?: string;
  onBlur?: (arg1: { event: React.FocusEvent<HTMLTextAreaElement>; value: string }) => void;
  onClick?: (arg1: { event: React.MouseEvent<HTMLTextAreaElement>; value: string }) => void;
  onFocus?: (arg1: { event: React.FocusEvent<HTMLTextAreaElement>; value: string }) => void;
  onKeyDown?: (arg1: { event: React.KeyboardEvent<HTMLTextAreaElement>; value: string }) => void;
  placeholder?: string;
  readOnly?: boolean;
  rows?: number;
  value?: string;
};

const TextAreaWithForwardRef = forwardRef<HTMLTextAreaElement, Props>(function TextArea(
  {
    dataTestId,
    disabled = false,
    errorMessage,
    hasError = false,
    helperText,
    id,
    label,
    labelDisplay,
    maxLength,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    placeholder,
    readOnly,
    rows = 3,
    value,
  }: Props,
  ref,
) {
  const innerRef = useRef<null | HTMLTextAreaElement>(null);
  const labelRef = useRef<null | HTMLDivElement>(null);

  const {
    handleOnBlur,
    handleOnFocus,
    handleOnMouseEnter,
    handleOnMouseLeave,
    isHovered,
    isFocused,
  } = useInteractiveStates();

  // @ts-expect-error - TS2322 - Type 'HTMLDivElement | HTMLTextAreaElement | null' is not assignable to type 'HTMLTextAreaElement'.
  useImperativeHandle(ref, () => innerRef.current);

  const hasErrorMessage = Boolean(errorMessage);

  const isLabelVisible = labelDisplay === 'visible';

  // ==== STATE ====
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
      <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
        <div
          className={classnames(
            styles.inputParent,
            styles.md_input,
            styles.md_inputHorizontalPadding,
            {
              [styles.disabled]: disabled,
              [styles.disabledText]: disabled,
              [styles.enabled]: !disabled,
              [styles.enabledText]: !disabled,
              [styles.borderFocus]: !disabled && isFocused && !hasErrorMessage,
              [styles.errorBorderFocus]: !disabled && isFocused && hasErrorMessage,
              [styles.enabledBorder]: !disabled && !isFocused && !hasErrorMessage && !isHovered,
              [styles.enabledBorderHover]: !disabled && !isFocused && !hasErrorMessage && isHovered,
              [styles.errorBorder]: !disabled && !isFocused && hasErrorMessage,
              [styles.errorBorderHover]: !disabled && !isFocused && hasErrorMessage && isHovered,
              // md
              [styles.md_visibleLabel]: label && isLabelVisible,
              [styles.md_noLabel]: !label || (label && !isLabelVisible),
            },
          )}
        >
          {label && (
            <label
              className={classnames(styles.label, styles.md_label, styles.md_labelPos, {
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
          <textarea
            ref={innerRef}
            aria-describedby={isFocused ? ariaDescribedby : undefined}
            aria-invalid={hasErrorMessage || hasError ? 'true' : 'false'}
            className={classnames(styles.input)}
            data-test-id={dataTestId}
            disabled={disabled}
            id={id}
            maxLength={maxLength?.characterCount}
            name={name}
            onBlur={(event) => {
              handleOnBlur();
              onBlur?.({ event, value: event.currentTarget.value });
            }}
            onChange={(event) => {
              setCurrentLength(event.currentTarget.value?.length ?? 0);
              onChange({ event, value: event.currentTarget.value });
            }}
            onClick={(event) => onClick?.({ event, value: event.currentTarget.value })}
            onFocus={(event) => {
              handleOnFocus();
              onFocus?.({ event, value: event.currentTarget.value });
            }}
            onKeyDown={(event) => onKeyDown?.({ event, value: event.currentTarget.value })}
            placeholder={placeholder}
            readOnly={readOnly}
            rows={rows}
            value={value}
          />
        </div>
      </div>
      {(helperText || maxLength) && !hasErrorMessage ? (
        <FormHelperText
          currentLength={currentLength}
          disabled={disabled}
          id={`${id}-helperText`}
          maxLength={maxLength}
          size="md"
          text={helperText}
        />
      ) : null}

      {!disabled && hasErrorMessage ? (
        <FormErrorMessage id={`${id}-error`} size="md" text={errorMessage} />
      ) : null}
    </div>
  );
});

TextAreaWithForwardRef.displayName = 'TextArea';

export default TextAreaWithForwardRef;
