// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/display-name */
// @flow strict-local
import { forwardRef, type Node, useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { unstable_useDateField as useDateField } from '@mui/x-date-pickers/DateField';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import classnames from 'classnames';
import { Box, Flex, Pog, Status, TapArea, Text } from 'gestalt';
import styles from '../DateField.css';

const ENTER: number = 13;
const SPACE: number = 32;
const TAB: number = 9;

type CustomTextFieldProps = {|
  disabled: boolean,
  InputProps: {| ref: {| current: ?HTMLElement |} |},
  focused: boolean,
  placeholder: string,
  value: string,
  readOnly: boolean,
  onClick: () => void,
  onPaste: () => void,
  onChange: () => void,
  onKeyDown: () => void,
  onMouseUp: () => void,
  ownerState: {|
    passthroughProps: {|
      autoComplete: 'bday' | 'off',
      id: string,
      errorMessage: boolean,
      enterKeyHint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send',
      name: string,
      onBlur: ({|
        event: SyntheticFocusEvent<HTMLInputElement>,
        value: string,
      |}) => void,
      onClearInput: () => void,
      onFocus: ({|
        event: SyntheticFocusEvent<HTMLInputElement>,
        value: string,
      |}) => void,
    |},
  |},
|};

const CustomTextField = forwardRef(
  (
    {
      disabled,
      InputProps: { ref: containerRef } = { ref: { current: undefined } },
      focused,
      placeholder,
      value,
      readOnly,
      onClick,
      onPaste,
      onChange,
      onKeyDown,
      onMouseUp,
      ownerState,
    }: CustomTextFieldProps,
    inputRef: ((null | HTMLInputElement) => mixed) | { current: null | HTMLInputElement, ... },
  ): Node => {
    const [iconFocused, setIconFocused] = useState(false);

    const styledClasses = classnames(
      styles.textField,
      styles.formElementBase,
      styles.typographyTruncate,
      styles.actionButton,
      styles.layoutLarge,
      disabled ? styles.formElementDisabled : styles.formElementEnabled,
      ownerState?.passthroughProps?.errorMessage && !focused
        ? styles.formElementErrored
        : styles.formElementNormal,
    );

    return (
      <Box ref={containerRef} rounding={4} position="relative" display="flex" flex="grow">
        <input
          autoComplete={ownerState?.passthroughProps?.autoComplete ?? 'off'}
          id={ownerState?.passthroughProps?.id}
          className={styledClasses}
          disabled={disabled}
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          enterKeyHint={ownerState?.passthroughProps?.enterKeyHint}
          inputMode="numeric"
          readOnly={readOnly}
          onClick={onClick}
          onFocus={(event) => ownerState?.passthroughProps?.onFocus?.({ event, value })}
          onBlur={(event) => ownerState?.passthroughProps?.onBlur?.({ event, value })}
          onPaste={onPaste}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onMouseUp={onMouseUp}
        />
        {!disabled && !readOnly ? (
          <div className={classnames(styles.actionButtonWrapper)}>
            <Box alignItems="center" display="flex" height="100%" marginEnd={2} rounding="circle">
              <TapArea
                accessibilityLabel="Clear date"
                onBlur={() => setIconFocused(false)}
                onFocus={() => setIconFocused(true)}
                onKeyDown={({ event }) => {
                  if ([ENTER, SPACE].includes(event.keyCode))
                    ownerState?.passthroughProps?.onClearInput();
                  if (event.keyCode !== TAB) event.preventDefault();
                }}
                onMouseEnter={() => setIconFocused(true)}
                onMouseLeave={() => setIconFocused(false)}
                onTap={() => ownerState?.passthroughProps?.onClearInput()}
                rounding="circle"
                tapStyle="compress"
              >
                <Pog
                  accessibilityLabel=""
                  bgColor={iconFocused ? 'lightGray' : 'transparent'}
                  icon="cancel"
                  iconColor="darkGray"
                  size="xs"
                />
              </TapArea>
            </Box>
          </div>
        ) : null}
      </Box>
    );
  },
);

type CustomDateFieldProps = {
  inputRef: {| ref: {| current: ?HTMLElement |} |},
  slots: string,
  slotProps: string,
  ...
};

function CustomDateField({
  inputRef: externalInputRef,
  slots,
  slotProps,
  ...textFieldProps
}: CustomDateFieldProps): Node {
  return (
    <CustomTextField
      {...useDateField({
        props: textFieldProps,
        inputRef: externalInputRef,
      })}
    />
  );
}

type LocaleData = {|
  code?: string,
  formatDistance?: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  formatRelative?: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  localize?: {|
    ordinalNumber: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    era: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    quarter: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    month: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    day: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    dayPeriod: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  |},
  formatLong?: {|
    date: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    time: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    dateTime: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  |},
  match?: {|
    ordinalNumber: (...args: $ReadOnlyArray<string>) => { ... },
    era: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    quarter: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    month: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    day: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    dayPeriod: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  |},
  options?: {|
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  |},
|};

type InternalDateFieldProps = {|
  autoComplete?: 'bday' | 'off',
  disabled?: boolean,
  disableRange?: 'disableFuture' | 'disablePast',
  errorMessage?: Node,
  helperText?: string,
  id: string,
  label?: string,
  labelDisplay?: 'visible' | 'hidden',
  localeData: ?LocaleData,
  maxDate?: Date,
  minDate?: Date,
  mobileEnterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send',
  name?: string,
  onBlur?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onChange: ({| value: ?Date |}) => void,
  onClearInput: () => void,
  onError?: ({|
    errorMessage: string,
    value: ?Date,
  |}) => void,
  onFocus?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  readOnly?: boolean,
  ref?: Element<'input'>, // eslint-disable-line react/no-unused-prop-types
  value: ?Date,
|};

function InternalDateField({
  autoComplete,
  disabled = false,
  disableRange,
  errorMessage,
  helperText,
  id,
  label,
  labelDisplay = 'visible',
  localeData,
  maxDate,
  minDate,
  mobileEnterKeyHint,
  name,
  onBlur,
  onChange,
  onClearInput,
  onError,
  onFocus,
  readOnly = false,
  value,
}: InternalDateFieldProps): Node {
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeData}>
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
          <Box position="relative" display="flex" alignItems="center">
            <MUIDatePicker
              onChange={(dateValue) => onChange({ value: dateValue })}
              disabled={disabled}
              formatDensity="spacious"
              readOnly={readOnly}
              onError={(error) => onError?.({ errorMessage: error, value })}
              errorMessage={!!errorMessage}
              maxDate={maxDate}
              minDate={minDate}
              disableFuture={disableRange === 'disableFuture'}
              disablePast={disableRange === 'disablePast'}
              slots={{ field: CustomDateField }}
              value={value}
              passthroughProps={{
                autoComplete,
                id,
                errorMessage: !!errorMessage,
                enterKeyHint: mobileEnterKeyHint,
                name,
                onBlur,
                onFocus,
                onClearInput,
              }}
              viewRenderers={null}
            />
          </Box>
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
      </LocalizationProvider>
    </StyledEngineProvider>
  );
}

InternalDateField.displayName = 'InternalDateField';

export default InternalDateField;
