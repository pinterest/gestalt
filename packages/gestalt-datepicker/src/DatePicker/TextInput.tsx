import { ElementRef, forwardRef } from 'react';
import { Box, Icon, TextField } from 'gestalt';
import styles from '../DatePicker.css';

// InjectedProps are props that Datepicker adds on to DatePickerTextField.
// Datepicker takes this props and then funnels them to DatePickerTextField.
// See https://github.com/Hacker0x01/react-datepicker/blob/769d960d35d18f06bdee1b62a53d739ef4f0c39a/src/index.jsx#L844
type InjectedProps = {
  disabled?: boolean;
  id: string;
  name?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  errorMessage?: string;
  helperText?: string;
};

type Props = {
  id: string;
  forwardedRef?: ElementRef<any>;
} & InjectedProps;

function DatePickerTextField(props: Props) {
  const {
    disabled,
    forwardedRef,
    id,
    name,
    onChange,
    onClick,
    onBlur,
    onFocus,
    onKeyDown,
    placeholder,
    value,
    errorMessage,
    helperText,
  } = props;

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
          ref={(input) => forwardedRef && forwardedRef(input || null)}
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
          size="lg"
          value={value}
        />
      </Box>
      <div className={styles.calendarIcon}>
        <Box alignItems="center" display="flex" marginEnd={4} minHeight={48} position="relative">
          <div className={disabled ? styles.disabled : undefined}>
            <Icon accessibilityLabel="" color="default" icon="calendar" />
          </div>
        </Box>
      </div>
    </Box>
  );
}

function textFieldForwardRef(
  props: Props,
  ref:
    | ((arg1: null | HTMLInputElement) => unknown)
    | {
        current: null | HTMLInputElement;
      },
) {
  return <DatePickerTextField {...props} forwardedRef={ref} />;
}

textFieldForwardRef.displayName = 'DatePickerTextFieldForwardRef';

export default forwardRef<HTMLInputElement, Props>(textFieldForwardRef);
