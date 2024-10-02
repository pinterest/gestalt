import { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  Box,
  Icon,
  TapArea,
  TextField,
  useDangerouslyInGestaltExperiment,
  useDefaultLabel,
} from 'gestalt';
import VRDateInput from './VRDateInput';
import styles from '../DatePicker.css';

// InjectedProps are props that Datepicker adds on to DatePickerTextField.
// Datepicker takes this props and then funnels them to DatePickerTextField.
// See https://github.com/Hacker0x01/react-datepicker/blob/769d960d35d18f06bdee1b62a53d739ef4f0c39a/src/index.jsx#L844
type InjectedProps = {
  disabled?: boolean;
  id: string;
  name?: string;
  label?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  value?: string;
  errorMessage?: string;
  helperText?: string;
};

type Props = {
  id: string;
} & InjectedProps;

const DateInputWithForwardRef = forwardRef<HTMLInputElement, Props>(function DateInput(
  {
    disabled,
    id,
    label,
    name,
    onChange,
    onClick,
    onBlur,
    onFocus,
    onKeyDown,
    placeholder,
    readOnly,
    value,
    errorMessage,
    helperText,
  }: Props,
  ref,
) {
  const innerRef = useRef<null | HTMLInputElement>(null);

  // @ts-expect-error - TS2322 - Type 'HTMLDivElement | HTMLInputElement | null' is not assignable to type 'HTMLInputElement'.
  useImperativeHandle(ref, () => innerRef.current);
  const { openCalendar } = useDefaultLabel('DatePicker');

  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  if (isInVRExperiment) {
    return (
      <VRDateInput
        ref={innerRef}
        disabled={disabled}
        errorMessage={errorMessage}
        helperText={helperText}
        id={id}
        label={label}
        name={name}
        onBlur={(data) => onBlur?.(data.event)}
        onChange={(data) => onChange?.(data.event)}
        onFocus={(data) => {
          onFocus?.(data.event);
          onClick?.();
        }}
        onKeyDown={(data) => onKeyDown?.(data.event)}
        placeholder={placeholder}
        readOnly={readOnly}
        value={value}
      />
    );
  }

  return (
    <Box
      alignItems={!helperText && !errorMessage ? 'center' : undefined}
      column={12}
      display="flex"
      flex="grow"
      position="relative"
    >
      <Box column={12} flex="grow">
        <TextField
          ref={innerRef}
          autoComplete="off"
          disabled={disabled}
          errorMessage={errorMessage}
          helperText={helperText}
          id={id}
          mobileInputMode="none"
          name={name}
          onBlur={(data) => onBlur?.(data.event)}
          onChange={(data) => onChange?.(data.event)}
          onFocus={(data) => {
            onFocus?.(data.event);
            onClick?.();
          }}
          onKeyDown={(data) => onKeyDown?.(data.event)}
          placeholder={placeholder}
          readOnly={readOnly}
          size="lg"
          value={value}
        />
      </Box>
      <div className={styles.calendarIcon}>
        <Box alignItems="center" display="flex" marginEnd={5} minHeight={48} position="relative">
          <TapArea
            fullHeight={false}
            fullWidth={false}
            mouseCursor="default"
            onTap={() => {
              innerRef.current?.focus();
            }}
            rounding="circle"
            tabIndex={-1}
          >
            <Icon
              accessibilityLabel={openCalendar}
              color={disabled ? 'disabled' : 'default'}
              icon="calendar"
            />
          </TapArea>
        </Box>
      </div>
    </Box>
  );
});

DateInputWithForwardRef.displayName = 'DatePickerTextField';

export default DateInputWithForwardRef;
