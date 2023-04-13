// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/display-name */
// @flow strict-local
import { forwardRef, useState, type Node } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { unstable_useDateField as useDateField } from '@mui/x-date-pickers/DateField';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import classnames from 'classnames';
import de from 'date-fns/locale/de';
import { Box, Text, Flex, Status } from 'gestalt';
import styles from './DateField.css';

/**
 * [DateField](https://gestalt.pinterest.systems/web/DateField)
 *
 * ![DateField closed light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateField-closed.spec.mjs-snapshots/DateField-closed-chromium-darwin.png)
 * ![DateField closed dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateField-closed-dark.spec.mjs-snapshots/DateField-closed-dark-chromium-darwin.png)
 */
const CustomTextField = forwardRef(
  (
    {
      disabled,
      id,
      InputProps: { ref: containerRef } = {},
      focused,
      placeholder,
      autoComplete,
      className,
      value,
      inputMode,
      readOnly,
      onClick,
      onFocus,
      onBlur,
      onPaste,
      onChange,
      onKeyDown,
      onMouseUp,
    },
    inputRef,
  ): Node => (
    <Box
      padding={12}
      display="flex"
      alignItems="center"
      id={id}
      ref={containerRef}
      color="errorBase"
    >
      <input
        disabled={disabled}
        ref={inputRef}
        focused={focused}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={className}
        value={value}
        inputMode={inputMode}
        readOnly={readOnly}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onPaste={onPaste}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onMouseUp={onMouseUp}
      />
    </Box>
  ),
);

function CustomDateField(props): Node {
  const { inputRef: externalInputRef, slots, slotProps, ...textFieldProps } = props;

  const response = useDateField({
    props: textFieldProps,
    inputRef: externalInputRef,
  });

  return <CustomTextField {...response} />;
}

type Props = {|
  label: string,
  labelDisplay?: 'visible' | 'hidden',
  id: string,
  errorMessage?: Node,
  helperText?: string,
|};

function InternalDateField({ label, labelDisplay, id, helperText, errorMessage }: Props): Node {
  const [value, setValue] = useState(null);

  return (
    <Box>
      <label
        className={classnames(styles.label, {
          [styles.visuallyHidden]: labelDisplay === 'hidden',
        })}
        htmlFor={id}
      >
        <div className={styles.formLabel}>
          <Text size="100">{label}</Text>
        </div>
      </label>
      <MUIDatePicker
        onChange={setValue}
        onError={console.log}
        disableFuture
        slots={{ field: CustomDateField }}
        value={value}
      />
      {helperText && !errorMessage ? (
        <Box marginTop={2} id={`${id}-helperText`}>
          <Flex gap={4}>
            <Flex.Item flex="grow">
              {helperText ? (
                <Text color="subtle" size="100">
                  {helperText}
                </Text>
              ) : null}
            </Flex.Item>
          </Flex>
        </Box>
      ) : null}
      {errorMessage ? (
        <Box marginTop={2}>
          <Text color="error" size="100">
            <span className={styles.formErrorMessage} id={`${id}-error`}>
              <Box role="alert">
                <Flex gap={2}>
                  <Status type="problem" />
                  {errorMessage}
                </Flex>
              </Box>
            </span>
          </Text>
        </Box>
      ) : null}
    </Box>
  );
}

function DateField({ label, labelDisplay = 'default', id, helperText, errorMessage }: Props): Node {
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
        <InternalDateField
          label={label}
          labelDisplay={labelDisplay}
          id={id}
          helperText={helperText}
          errorMessage={errorMessage}
        />
      </LocalizationProvider>
    </StyledEngineProvider>
  );
}
DateField.displayName = 'DateField';

export default DateField;
