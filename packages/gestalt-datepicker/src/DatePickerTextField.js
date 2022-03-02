// @flow strict
import { forwardRef, type ElementRef } from 'react';
import { Box, Icon, Label, TextField } from 'gestalt';
import classnames from 'classnames';
import styles from './DatePicker.css';

// InjectedProps are props that Datepicker adds on to DatePickerTextField.
// Datepicker takes this props and then funnels them to DatePickerTextField.
// See https://github.com/Hacker0x01/react-datepicker/blob/769d960d35d18f06bdee1b62a53d739ef4f0c39a/src/index.jsx#L844
type InjectedProps = {|
  disabled?: boolean,
  id: string,
  onBlur?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  onChange?: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  onClick?: () => void,
  onFocus?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  onKeyDown?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  placeholder?: string,
  value?: string,
|};

type Props = {|
  id: string,
  // $FlowFixMe[unclear-type]
  forwardedRef?: ElementRef<*>,
  ...InjectedProps,
|};

function DatePickerTextField(props: Props) {
  const {
    disabled,
    forwardedRef,
    id,
    onChange,
    onClick,
    onBlur,
    onFocus,
    onKeyDown,
    placeholder,
    value,
  } = props;

  return (
    <Label htmlFor={id}>
      <Box alignItems="center" column={12} display="flex" flex="grow" position="relative">
        <Box column={12} flex="grow">
          <TextField
            autoComplete="off"
            disabled={disabled}
            id={id}
            onBlur={(data) => onBlur && onBlur(data.event)}
            onFocus={(data) => {
              if (onFocus) {
                onFocus(data.event);
              }
              if (onClick) {
                onClick();
              }
            }}
            onChange={(data) => onChange && onChange(data.event)}
            onKeyDown={(data) => onKeyDown && onKeyDown(data.event)}
            placeholder={placeholder}
            ref={(input) => forwardedRef && forwardedRef(input || null)}
            size="lg"
            value={value}
          />
        </Box>
        <div className={classnames(styles.calendarIcon)}>
          <Box position="relative" marginEnd={4}>
            <Icon accessibilityLabel="" color="darkGray" icon="calendar" />
          </Box>
        </div>
      </Box>
    </Label>
  );
}

function textFieldForwardRef(props, ref) {
  return <DatePickerTextField {...props} forwardedRef={ref} />;
}

textFieldForwardRef.displayName = 'DatePickerTextFieldForwardRef';

export default (forwardRef<Props, HTMLInputElement>(textFieldForwardRef): React$AbstractComponent<
  Props,
  HTMLInputElement,
>);
