// @flow strict
import React, { forwardRef, type ElementRef } from 'react';
import { Box, Icon, Label, TextField } from 'gestalt';
import PropTypes from 'prop-types';
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

DatePickerTextField.propTypes = {
  disabled: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      current: PropTypes.any,
    }),
  ]),
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
