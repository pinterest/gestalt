// @flow strict
import { type AbstractComponent, type ElementRef, forwardRef } from 'react';
import { Box, Icon, TextField } from 'gestalt';
import styles from '../DatePicker.css';

// InjectedProps are props that Datepicker adds on to DatePickerTextField.
// Datepicker takes this props and then funnels them to DatePickerTextField.
// See https://github.com/Hacker0x01/react-datepicker/blob/769d960d35d18f06bdee1b62a53d739ef4f0c39a/src/index.jsx#L844
type InjectedProps = {
  disabled?: boolean,
  id: string,
  name?: string,
  onBlur?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  onChange?: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  onClick?: () => void,
  onFocus?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  onKeyDown?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  placeholder?: string,
  value?: string,
  errorMessage?: string,
  helperText?: string,
};

type Props = {
  id: string,
  // $FlowFixMe[unclear-type]
  forwardedRef?: ElementRef<any>,
  ...InjectedProps,
};

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
          autoComplete="off"
          disabled={disabled}
          id={id}
          mobileInputMode="none"
          onBlur={(data) => onBlur?.(data.event)}
          onFocus={(data) => {
            onFocus?.(data.event);
            onClick?.();
          }}
          errorMessage={errorMessage}
          helperText={helperText}
          name={name}
          onChange={(data) => onChange?.(data.event)}
          onKeyDown={(data) => onKeyDown?.(data.event)}
          placeholder={placeholder}
          ref={(input) => forwardedRef && forwardedRef(input || null)}
          size="lg"
          value={value}
        />
      </Box>
      <div className={styles.calendarIcon}>
        <Box position="relative" marginEnd={4} display="flex" alignItems="center" minHeight={48}>
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
  ref: ((null | HTMLInputElement) => mixed) | { current: null | HTMLInputElement, ... },
) {
  return <DatePickerTextField {...props} forwardedRef={ref} />;
}

textFieldForwardRef.displayName = 'DatePickerTextFieldForwardRef';

export default (forwardRef<Props, HTMLInputElement>(textFieldForwardRef): AbstractComponent<
  Props,
  HTMLInputElement,
>);
