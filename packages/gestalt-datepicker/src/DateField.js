// @flow strict-local
import { forwardRef, useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { unstable_useDateField as useDateField } from '@mui/x-date-pickers/DateField';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import de from 'date-fns/locale/de';
import { Box } from 'gestalt';

/**
 * [DateField](https://gestalt.pinterest.systems/web/DateField)
 *
 * ![DateField closed light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateField-closed.spec.mjs-snapshots/DateField-closed-chromium-darwin.png)
 * ![DateField closed dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateField-closed-dark.spec.mjs-snapshots/DateField-closed-dark-chromium-darwin.png)
 */
const CustomTextField = forwardRef((props, inputRef) => {
  const {
    disabled,
    id,
    label,
    InputProps: { ref: containerRef } = {},
    // extracting `error`, 'focused', and `ownerState` as `input` does not support those props
    error,
    focused,
    ownerState,
    placeholder,
    autoComplete,
    className,
    sx,
    autoFocus,
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
  } = props;

  // console.log(props);

  return (
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
        // ownerState={ownerState}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={className}
        autoFocus={autoFocus}
        value={value}
        inputMode={inputMode}
        readOnly={readOnly}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onPaste={onPaste}
        onChange={(event) => {
          console.log(event.target.value);
          onChange(event);
        }}
        onKeyDown={onKeyDown}
        onMouseUp={onMouseUp}
      />
    </Box>
  );
});

function CustomDateField(props) {
  const { inputRef: externalInputRef, slots, slotProps, ...textFieldProps } = props;

  const response = useDateField({
    props: textFieldProps,
    inputRef: externalInputRef,
  });

  return <CustomTextField {...response} />;
}

function InternalDateField(props) {
  return <MUIDatePicker slots={{ field: CustomDateField, ...props.slots }} {...props} />;
}

function DateField() {
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
        <InternalDateField />
      </LocalizationProvider>
    </StyledEngineProvider>
  );
}
DateField.displayName = 'DateField';

export default DateField;
