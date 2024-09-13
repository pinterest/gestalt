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
import { Box, Icon, TapArea, useDefaultLabel } from 'gestalt';
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
    value,
  }: Props,
  ref,
) {
  const innerRef = useRef<null | HTMLInputElement>(null);
  const labelRef = useRef<null | HTMLLabelElement>(null);

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

  return (
    <div>
      <div className={classnames(styles.inputParent)}>
        {label && (
          <label
            ref={labelRef}
            className={classnames(
              styles.label,
              styles.truncate,
              styles.lg_label,
              styles.lg_labelPos,
              {
                [styles.enabledText]: !disabled,
                [styles.disabledText]: disabled,
                [styles.visuallyHidden]: !isLabelVisible,
              },
            )}
            htmlFor={id}
            title={ellipsisActive ? label : ''}
          >
            {label}
          </label>
        )}
        <input
          ref={innerRef}
          aria-controls={accessibilityControls}
          aria-describedby={focused ? ariaDescribedby : undefined}
          aria-invalid={hasErrorMessage ? 'true' : 'false'}
          autoComplete="off"
          className={classnames(
            styles.input,
            styles.lg_input,
            styles.lg_inputHorizontalPadding,
            styles.lg_actionButton,
            {
              [styles.enabled]: !disabled,
              [styles.enabledText]: !disabled,
              [styles.enabledBorder]: !disabled && !hasErrorMessage,
              [styles.errorBorder]: !disabled && hasErrorMessage,
              [styles.disabled]: disabled,
              [styles.disabledText]: disabled,
              [styles.disabledBorder]: disabled,
              [styles.lg_visibleLabel]: label && isLabelVisible,
              [styles.lg_noLabel]: !label || (label && !isLabelVisible),
            },
          )}
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
          <div className={classnames(styles.vr_lg_actionButtonContainer)}>
            <Box
              alignItems="end"
              aria-hidden
              display="flex"
              height="100%"
              marginEnd={2}
              rounding="circle"
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
            </Box>
          </div>
        )}
      </div>
      {helperText && !hasErrorMessage ? (
        <HelperText disabled={disabled} id={`${id}-helperText`} size="lg" text={helperText} />
      ) : null}
      {!disabled && hasErrorMessage ? (
        <ErrorMessage id={`${id}-error`} size="lg" text={errorMessage} />
      ) : null}
    </div>
  );
});

InternalTextFieldWithForwardRef.displayName = 'InternalTextField';

export default InternalTextFieldWithForwardRef;
