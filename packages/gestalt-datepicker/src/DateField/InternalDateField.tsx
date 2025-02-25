// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/display-name */
import { forwardRef, ReactNode, type Ref, useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { unstable_useDateField as useDateField } from '@mui/x-date-pickers/DateField';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
// eslint-disable-next-line import/no-namespace
import * as locales from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import classnames from 'classnames';
import { Locale } from 'date-fns/locale';
import { Box, Flex, Pog, Status, TapArea, Text } from 'gestalt';
import styles from '../DateField.css';

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

const ENTER: number = 13;
const SPACE: number = 32;
const TAB: number = 9;

const getTranslationsFromMUIJS: (arg1?: Locale | null | undefined) =>
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
      split.push((split[0] ?? '').toUpperCase());
    }
    const code = split.join('');

    // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'typeof import("/node_modules/@mui/x-date-pickers/locales/index")'.
    if (locales[code] !== undefined) {
      // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'typeof import("/node_modules/@mui/x-date-pickers/locales/index")'.
      return locales[code].components.MuiLocalizationProvider.defaultProps.localeText;
    }
  }
  return undefined;
};

const getLocalTranslations: (arg1?: Locale | null | undefined) =>
  | {
      fieldYearPlaceholder: (params: { digitAmount: number }) => string;
      fieldMonthPlaceholder: (params: { contentType: string }) => string;
      fieldDayPlaceholder: () => string;
    }
  | null
  | undefined = (localeData) => {
  // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly af: readonly ["J", "MM", "DD"]; readonly bg: readonly ["Г", "MM", "ДД"]; readonly 'cs-CZ': readonly ["R", "MM", "DD"]; readonly 'da-DK': readonly ["Å", "MM", "DD"]; readonly es: readonly ["A", "MM", "DD"]; readonly 'fi-FI': readonly ["V", "KK", "PP"]; ... 11 more ...; readonly 'uk-UA': readonly [...]; }'.
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
  localeData?: Locale | null | undefined;
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
  size?: 'md' | 'lg';
  value: Date | null;
};

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  inputRef?: React.Ref<any>;
  InputProps?: {
    ref?: React.Ref<any>;
    endAdornment?: React.ReactNode;
    startAdornment?: React.ReactNode;
  };
  error?: boolean;
  focused?: boolean;
  sx?: any;
  enableAccessibleFieldDOMStructure: boolean;
  ownerState?: {
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
}

type TextFieldComponent = ((
  props: TextFieldProps & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

const TextField = forwardRef(
  (
    {
      readOnly,
      ownerState,
      focused,
      disabled,
      id,
      inputRef,
      InputProps: { ref: containerRef } = {},
      ...other
    }: TextFieldProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const handleRef = useForkRef(containerRef, ref);

    const [iconFocused, setIconFocused] = useState(false);

    const styledClasses = classnames(
      styles.textField,
      styles.formElementBase,
      styles.typographyTruncate,
      styles.actionButton,
      ownerState?.size === 'lg' ? styles.layoutLarge : styles.layoutMedium,
      disabled ? styles.formElementDisabled : styles.formElementEnabled,
      ownerState?.errorMessage && !focused ? styles.formElementErrored : styles.formElementNormal,
    );
    console.log(other);

    return (
      <Box ref={handleRef} alignItems="center" display="flex" height="auto" id={id}>
        <input
          {...other}
          ref={inputRef}
          className={styledClasses}
          disabled={disabled}
          inputMode="numeric"
        />
        {!disabled && !readOnly && ownerState?.onClearInput ? (
          <div className={classnames(styles.actionButtonWrapper)}>
            <Box alignItems="center" display="flex" height="100%" marginEnd={2} rounding="circle">
              <TapArea
                accessibilityLabel="Clear date"
                onBlur={() => setIconFocused(false)}
                onFocus={() => setIconFocused(true)}
                onKeyDown={({ event }) => {
                  if ([ENTER, SPACE].includes(event.keyCode)) ownerState?.onClearInput();
                  if (event.keyCode !== TAB) event.preventDefault();
                }}
                onMouseEnter={() => setIconFocused(true)}
                onMouseLeave={() => setIconFocused(false)}
                onTap={() => ownerState.onClearInput()}
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
) as TextFieldComponent;

const MUITextField = forwardRef((props: any, ref: Ref<HTMLDivElement>) => {
  const fieldResponse = useDateField({
    ...props,
    enableAccessibleFieldDOMStructure: false,
  });

  return <TextField ref={ref} {...fieldResponse} />;
});

const MUIDateField = forwardRef((props: any, ref: Ref<HTMLDivElement>) => (
  <MUIDatePicker ref={ref} {...props} slots={{ ...props.slots, field: MUITextField }} />
));

function InternalDateField({ localeData, ...props }: InternalDateFieldProps) {
  let translations = getTranslationsFromMUIJS(localeData);

  if (!translations) {
    translations = getLocalTranslations(localeData);
  }

  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider
        adapterLocale={localeData}
        dateAdapter={AdapterDateFns}
        // @ts-expect-error - TS2322 - Type '{ fieldYearPlaceholder: (params: { digitAmount: number; }) => string; fieldMonthPlaceholder: (params: { contentType: string; }) => string; fieldDayPlaceholder: () => string; } | null | undefined' is not assignable to type 'Partial<PickersLocaleText<Date>> | undefined'.
        localeText={translations}
      >
        <Box>
          {props.label ? (
            <label
              className={classnames(styles.label, {
                [styles.visuallyHidden]: props.labelDisplay === 'hidden',
              })}
              htmlFor={props.id}
            >
              <div className={styles.formLabel}>
                <Text size="100">{props.label}</Text>
              </div>
            </label>
          ) : null}
          <MUIDateField {...props} />
          {props.helperText && !props.errorMessage ? (
            <Box id={`${props.id}-helperText`} marginTop={2}>
              <Flex gap={4}>
                <Flex.Item flex="grow">
                  {props.helperText ? (
                    <Text color="subtle" size="100">
                      {props.helperText}
                    </Text>
                  ) : null}
                </Flex.Item>
              </Flex>
            </Box>
          ) : null}
          {props.errorMessage ? (
            <Box marginTop={2}>
              <Text color="error" size="100">
                <span className={styles.formErrorMessage} id={`${id}-error`}>
                  <Box role="alert">
                    <Flex gap={2}>
                      <Status type="problem" />
                      {props.errorMessage}
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
