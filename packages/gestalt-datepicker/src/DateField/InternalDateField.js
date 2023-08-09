// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/display-name */
// @flow strict-local
import { forwardRef, type Node, useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { unstable_useDateField as useDateField } from '@mui/x-date-pickers/DateField';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
// eslint-disable-next-line import/no-namespace
import * as locales from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import classnames from 'classnames';
import { Box, Flex, Pog, Status, TapArea, Text } from 'gestalt';
import styles from '../DateField.css';

const ENTER: number = 13;
const SPACE: number = 32;
const TAB: number = 9;

// We need this map to provide full locale coverage because @mui/x-date-pickers/locales doesn't have all supported locales
const TRANSLATIONS_MAP = {
  af: ['J', 'MM', 'DD'],
  bg: ['Г', 'MM', 'ДД'],
  'cs-CZ': ['R', 'MM', 'DD'],
  'da-DK': ['Å', 'MM', 'DD'],
  es: ['A', 'MM', 'DD'],
  'fi-FI': ['V', 'KK', 'PP'],
  hr: ['G', 'MM', 'DD'],
  it: ['A', 'MM', 'DD'],
  ja: ['0', '00', '00'],
  'ms-MY': ['T', 'BB', 'HH'],
  'nb-NO': ['Å', 'MM', 'DD'],
  nl: ['J', 'MM', 'DD'],
  'pl-PL': ['R', 'MM', 'DD'],
  'pt-PT': ['A', 'MM', 'DD'],
  'sk-SK': ['R', 'MM', 'DD'],
  'sv-SE': ['Å', 'MM', 'DD'],
  'th-TH': ['ป', 'ดด', 'วว'],
  'uk-UA': ['P', 'MM', 'ДД'],
};

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
        {!disabled && !readOnly && ownerState?.passthroughProps?.onClearInput ? (
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
                onTap={() => ownerState.passthroughProps.onClearInput()}
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

const getTranslationsFromMUIJS: (?LocaleData) => ?{|
  fieldYearPlaceholder: (params: {| digitAmount: number |}) => string,
  fieldMonthPlaceholder: (params: {| contentType: string |}) => string,
  fieldDayPlaceholder: () => string,
|} = (localeData) => {
  // converts date-fns localeData.code (e.g. es-EN) from to the format expected by the MUI Locale (esEN)
  // https://mui.com/x/react-date-pickers/localization/
  if (localeData && localeData.code) {
    // turns en-US to enUS
    const split = localeData.code.split('-');
    if (split.length === 1) {
      // turns 'es' into 'enES'
      split.push(split[0].toUpperCase());
    }
    const code = split.join('');

    if (locales[code] !== undefined) {
      return locales[code].components.MuiLocalizationProvider.defaultProps.localeText;
    }
  }
  return undefined;
};

const getLocalTranslations: (?LocaleData) => ?{|
  fieldYearPlaceholder: (params: {| digitAmount: number |}) => string,
  fieldMonthPlaceholder: (params: {| contentType: string |}) => string,
  fieldDayPlaceholder: () => string,
|} = (localeData) => {
  const MAPPED_TRANSLATION = localeData?.code && TRANSLATIONS_MAP[localeData.code];

  if (MAPPED_TRANSLATION) {
    return {
      fieldYearPlaceholder: (params) => MAPPED_TRANSLATION[0].repeat(params.digitAmount),
      fieldMonthPlaceholder: (params) =>
        params.contentType === 'letter' ? 'MMMM' : MAPPED_TRANSLATION[1],
      fieldDayPlaceholder: () => MAPPED_TRANSLATION[2],
    };
  }
  return undefined;
};

type InternalDateFieldProps = {|
  autoComplete?: 'bday' | 'off',
  disabled?: boolean,
  disableRange?: 'disableFuture' | 'disablePast',
  errorMessage?: Node,
  helperText?: string,
  id: string,
  label?: string,
  labelDisplay?: 'visible' | 'hidden',
  localeData?: ?LocaleData,
  maxDate?: Date | null,
  minDate?: Date | null,
  mobileEnterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send',
  name?: string,
  onBlur?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onChange: ({| value: Date | null |}) => void,
  onClearInput?: () => void,
  onError?: ({|
    errorMessage: string,
    value: Date | null,
  |}) => void,
  onFocus?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  readOnly?: boolean,
  ref?: Element<'input'>, // eslint-disable-line react/no-unused-prop-types
  value: Date | null,
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
  let translations = getTranslationsFromMUIJS(localeData);

  if (!translations) {
    translations = getLocalTranslations(localeData);
  }

  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={localeData}
        localeText={translations}
      >
        <Box>
          {label ? (
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
          ) : null}
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
