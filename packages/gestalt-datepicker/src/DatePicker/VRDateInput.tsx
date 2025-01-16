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
import { Icon, TapArea, TextUI, useDefaultLabel } from 'gestalt';
import styles from './VRDateInput.css';
import ErrorMessage from '../subcomponents/ErrorMessage';
import HelperText from '../subcomponents/HelperText';

type Props = {
  id: string;
  onChange: (arg1: { event: React.ChangeEvent<HTMLInputElement>; value: string }) => void;
  accessibilityControls?: string;
  dataTestId?: string;
  disabled?: boolean;
  errorMessage?: ReactNode;
  helperText?: string;
  label?: string;
  labelDisplay?: 'visible' | 'hidden';
  name?: string;
  onBlur?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  onClick?: (arg1: { event: React.MouseEvent<HTMLInputElement>; value: string }) => void;
  onFocus?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  onKeyDown?: (arg1: { event: React.KeyboardEvent<HTMLInputElement>; value: string }) => void;
  placeholder?: string;
  readOnly?: boolean;
  value?: string;
  size?: 'md' | 'lg';
};

const InternalTextFieldWithForwardRef = forwardRef<HTMLInputElement, Props>(function TextField(
  {
    accessibilityControls,
    dataTestId,
    disabled = false,
    errorMessage,
    helperText,
    id,
    label,
    labelDisplay = 'visible',
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    placeholder,
    readOnly,
    size = 'lg',
    value,
  }: Props,
  ref,
) {
  const innerRef = useRef<null | HTMLInputElement>(null);
  const labelRef = useRef<null | HTMLDivElement>(null);

  // @ts-expect-error - TS2322 - Type 'HTMLDivElement | HTMLInputElement | null' is not assignable to type 'HTMLInputElement'.
  useImperativeHandle(ref, () => innerRef.current);

  const { openCalendar } = useDefaultLabel('DatePicker');

  const hasErrorMessage = Boolean(errorMessage);

  const isLabelVisible = labelDisplay === 'visible';

  // ==== STATE ====
  const [focused, setFocused] = useState(false);
  const [ellipsisActive, setEllipsisActive] = useState(false);

  // ==== A11Y ====

  let ariaDescribedby;

  if (hasErrorMessage) {
    ariaDescribedby = `${id}-error`;
  }

  if (helperText) {
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

  const isMD = size === 'md';
  const isLG = size === 'lg';

  return (
    <div>
      <div className={classnames(styles.inputParent)}>
        {label && (
          <label
            className={classnames(styles.label, {
              [styles.visuallyHidden]: !isLabelVisible,
              // md
              [styles.md_labelTopPosition]: isMD,
              [styles.md_labelPosition]: isMD,
              // lg
              [styles.lg_labelTopPosition]: isLG,
              [styles.lg_labelPosition]: isLG,
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
          aria-controls={accessibilityControls}
          aria-describedby={focused ? ariaDescribedby : undefined}
          aria-invalid={hasErrorMessage ? 'true' : 'false'}
          autoComplete="off"
          className={classnames(styles.input, {
            [styles.enabled]: !disabled,
            [styles.enabledText]: !disabled,
            [styles.enabledBorder]: !disabled && !hasErrorMessage,
            [styles.errorBorder]: !disabled && hasErrorMessage,
            [styles.disabled]: disabled,
            [styles.disabledText]: disabled,
            [styles.disabledBorder]: disabled,
            // md
            [styles.md_input]: isMD,
            [styles.md_inputPadding]: isMD,
            [styles.md_inputStartPadding]: isMD,
            [styles.md_inputEndButtonEndPadding]: isMD,
            [styles.md_inputLabelPadding]: isMD && label && isLabelVisible,
            [styles.md_inputNoLabelPadding]: isMD && (!label || (label && !isLabelVisible)),
            // lg
            [styles.lg_input]: isLG,
            [styles.lg_inputPadding]: isLG,
            [styles.lg_inputStartPadding]: isLG,
            [styles.lg_inputEndButtonEndPadding]: isLG,
            [styles.lg_inputLabelPadding]: isLG && label && isLabelVisible,
            [styles.lg_inputNoLabelPadding]: isLG && (!label || (label && !isLabelVisible)),
          })}
          data-test-id={dataTestId}
          disabled={disabled}
          id={id}
          inputMode="none"
          name={name}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.({ event, value: event.currentTarget.value });
          }}
          onChange={(event) => {
            onChange({ event, value: event.currentTarget.value });
          }}
          onClick={(event) => onClick?.({ event, value: event.currentTarget.value })}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.({ event, value: event.currentTarget.value });
          }}
          onKeyDown={(event) => onKeyDown?.({ event, value: event.currentTarget.value })}
          placeholder={placeholder}
          readOnly={readOnly}
          value={value}
        />

        {!disabled && (
          <div
            aria-hidden
            className={classnames(styles.endIconContainer, {
              [styles.md_endIconContainer]: isMD,
              [styles.lg_endIconContainer]: isLG,
            })}
          >
            <TapArea
              fullHeight={false}
              fullWidth={false}
              mouseCursor="default"
              onTap={() => {
                innerRef.current?.focus();
              }}
              rounding="circle"
              tabIndex={-1}
              tapStyle="none"
            >
              <Icon
                accessibilityLabel={openCalendar}
                color={disabled ? 'disabled' : 'default'}
                icon="calendar"
              />
            </TapArea>
          </div>
        )}
      </div>
      {helperText && !hasErrorMessage ? (
        <HelperText disabled={disabled} id={`${id}-helperText`} size={size} text={helperText} />
      ) : null}
      {!disabled && hasErrorMessage ? (
        <ErrorMessage id={`${id}-error`} size={size} text={errorMessage} />
      ) : null}
    </div>
  );
});

InternalTextFieldWithForwardRef.displayName = 'InternalTextField';

export default InternalTextFieldWithForwardRef;
