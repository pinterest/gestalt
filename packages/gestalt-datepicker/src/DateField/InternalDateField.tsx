// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/display-name */
import { forwardRef, ReactNode, useState } from 'react';
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
} as const;

type CustomTextFieldProps = {
  disabled: boolean;
  InputProps: {
    ref: {
      current: HTMLElement | null | undefined;
    };
  };
  focused: boolean;
  placeholder: string;
  value: string;
  readOnly: boolean;
  onClick: () => void;
  onPaste: () => void;
  onChange: () => void;
  onKeyDown: () => void;
  onMouseUp: () => void;
  ownerState: {
    passthroughProps: {
      autoComplete: 'bday' | 'off';
      id: string;
      errorMessage: boolean;
      enterKeyHint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
      name: string;
      onBlur: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
      onClearInput: () => void;
      onFocus: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
      size: 'md' | 'lg';
    };
  };
};

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
    inputRef:
      | ((arg1: null | HTMLInputElement) => unknown)
      | {
          current: null | HTMLInputElement;
        },
  ) => {
    const [iconFocused, setIconFocused] = useState(false);

    const styledClasses = classnames(
      styles.textField,
      styles.formElementBase,
      styles.typographyTruncate,
      styles.actionButton,
      ownerState?.passthroughProps?.size === 'lg' ? styles.layoutLarge : styles.layoutMedium,
      disabled ? styles.formElementDisabled : styles.formElementEnabled,
      ownerState?.passthroughProps?.errorMessage && !focused
        ? styles.formElementErrored
        : styles.formElementNormal,
    );

    return (
      <Box ref={containerRef} display="flex" flex="grow" position="relative" rounding={4}>
        <input
          ref={inputRef}
          autoComplete={ownerState?.passthroughProps?.autoComplete ?? 'off'}
          className={styledClasses}
          disabled={disabled}
          enterKeyHint={ownerState?.passthroughProps?.enterKeyHint}
          id={ownerState?.passthroughProps?.id}
          inputMode="numeric"
          onBlur={(event) => ownerState?.passthroughProps?.onBlur?.({ event, value })}
          onChange={onChange}
          onClick={onClick}
          onFocus={(event) => ownerState?.passthroughProps?.onFocus?.({ event, value })}
          onKeyDown={onKeyDown}
          onMouseUp={onMouseUp}
          onPaste={onPaste}
          placeholder={placeholder}
          readOnly={readOnly}
          value={value}
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
  inputRef: {
    ref: {
      current: HTMLElement | null | undefined;
    };
  };
  slots: string;
  slotProps: string;
};

function CustomDateField({ inputRef: externalInputRef, ...textFieldProps }: CustomDateFieldProps) {
  return (
    <CustomTextField
      {...useDateField({
        props: textFieldProps,
        inputRef: externalInputRef,
      })}
    />
  );
}

type LocaleData = {
  code?: string;
  formatDistance?: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
  formatRelative?: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
  localize?: {
    ordinalNumber: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    era: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    quarter: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    month: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    day: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    dayPeriod: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
  };
  formatLong?: {
    date: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    time: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    dateTime: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
  };
  match?: {
    ordinalNumber: (...args: ReadonlyArray<string>) => Record<any, any>;
    era: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    quarter: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    month: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    day: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    dayPeriod: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
  };
  options?: {
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  };
};

const getTranslationsFromMUIJS: (arg1?: LocaleData | null | undefined) =>
  | {
      fieldYearPlaceholder: (params: { digitAmount: number }) => string;
      fieldMonthPlaceholder: (params: { contentType: string }) => string;
      fieldDayPlaceholder: () => string;
    }
  | null
  | undefined = (localeData) => {
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

const getLocalTranslations: (arg1?: LocaleData | null | undefined) =>
  | {
      fieldYearPlaceholder: (params: { digitAmount: number }) => string;
      fieldMonthPlaceholder: (params: { contentType: string }) => string;
      fieldDayPlaceholder: () => string;
    }
  | null
  | undefined = (localeData) => {
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

type InternalDateFieldProps = {
  autoComplete?: 'bday' | 'off';
  disabled?: boolean;
  disableRange?: 'disableFuture' | 'disablePast';
  errorMessage?: ReactNode;
  helperText?: string;
  id: string;
  label?: string;
  labelDisplay?: 'visible' | 'hidden';
  localeData?: LocaleData | null | undefined;
  maxDate?: Date | null;
  minDate?: Date | null;
  mobileEnterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  name?: string;
  onBlur?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  onChange: (arg1: { value: Date | null }) => void;
  onClearInput?: () => void;
  onError?: (arg1: { errorMessage: string; value: Date | null }) => void;
  onFocus?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  readOnly?: boolean;
  ref?: Element<'input'>; // eslint-disable-line react/no-unused-prop-types,
  size?: 'md' | 'lg';
  value: Date | null;
};

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
  size,
  value,
}: InternalDateFieldProps) {
  let translations = getTranslationsFromMUIJS(localeData);

  if (!translations) {
    translations = getLocalTranslations(localeData);
  }

  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider
        adapterLocale={localeData}
        dateAdapter={AdapterDateFns}
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
          <Box alignItems="center" display="flex" position="relative">
            <MUIDatePicker
              disabled={disabled}
              disableFuture={disableRange === 'disableFuture'}
              disablePast={disableRange === 'disablePast'}
              errorMessage={!!errorMessage}
              formatDensity="spacious"
              maxDate={maxDate}
              minDate={minDate}
              onChange={(dateValue) => onChange({ value: dateValue })}
              onError={(error) => onError?.({ errorMessage: error, value })}
              passthroughProps={{
                autoComplete,
                id,
                errorMessage: !!errorMessage,
                enterKeyHint: mobileEnterKeyHint,
                name,
                onBlur,
                onFocus,
                onClearInput,
                size,
              }}
              readOnly={readOnly}
              slots={{ field: CustomDateField }}
              value={value}
              viewRenderers={null}
            />
          </Box>
          {helperText && !errorMessage ? (
            <Box id={`${id}-helperText`} marginTop={2}>
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
