// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/display-name */
import { forwardRef, ReactNode, Ref, useState } from 'react';
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
import { Box, Pog, TapArea, TextUI } from 'gestalt';
import stylesTextfield from './VRInternalDateField.css';
import ErrorMessage from '../subcomponents/ErrorMessage';
import HelperText from '../subcomponents/HelperText';

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

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode;
  inputRef?: React.Ref<any>;
  InputProps?: { ref?: React.Ref<any> };
  error?: boolean;
  focused?: boolean;
  sx?: any;
  placeholder?: string;
  ownerState?: {
    readOnly?: boolean;
    label: string;
    labelDisplay: string;
    autoComplete: 'bday' | 'off';
    id: string;
    errorMessage: boolean;
    mobileEnterKeyHint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    name: string;
    onBlur: (arg1: {
      event: React.FocusEvent<HTMLInputElement>;
      value: string | number | readonly string[] | undefined;
    }) => void;
    onClearInput: () => void;
    onFocus: (arg1: {
      event: React.FocusEvent<HTMLInputElement>;
      value: string | number | readonly string[] | undefined;
    }) => void;
    size: 'md' | 'lg';
    disabled?: boolean;
  };
}

const TextField = forwardRef(
  (
    { ownerState, inputRef, InputProps: { ref: containerRef } = {}, ...props }: TextFieldProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const handleRef = useForkRef(containerRef, ref);

    const [iconFocused, setIconFocused] = useState(false);

    const isLabelVisible = ownerState?.labelDisplay === 'visible';
    const hasErrorMessage = Boolean(ownerState?.errorMessage);

    const isMD = ownerState?.size === 'md';
    const isLG = ownerState?.size === 'lg';

    const { disabled, readOnly, value } = props;

    const updatedProps = Object.fromEntries(
      Object.entries(props).filter(
        ([key]) =>
          ![
            'slotProps',
            'onClear',
            'error',
            'clearable',
            'enableAccessibleFieldDOMStructure',
          ].includes(key),
      ),
    );

    return (
      <div ref={handleRef} className={classnames(stylesTextfield.inputParent)}>
        {ownerState?.label && (
          <label
            className={classnames(stylesTextfield.label, {
              [stylesTextfield.visuallyHidden]: !isLabelVisible,
              // md
              [stylesTextfield.md_labelTopPosition]: isMD,
              [stylesTextfield.md_labelPosition]: isMD,
              // lg
              [stylesTextfield.lg_labelTopPosition]: isLG,
              [stylesTextfield.lg_labelPosition]: isLG,
            })}
            htmlFor={ownerState?.id}
          >
            <TextUI color={disabled ? 'disabled' : 'default'} lineClamp={1} size="xs">
              {ownerState?.label}
            </TextUI>
          </label>
        )}
        <input
          ref={inputRef}
          {...updatedProps}
          className={classnames(stylesTextfield.input, {
            [stylesTextfield.enabled]: !disabled,
            [stylesTextfield.enabledText]: !disabled,
            [stylesTextfield.enabledBorder]: !disabled && !hasErrorMessage,
            [stylesTextfield.errorBorder]: !disabled && hasErrorMessage,
            [stylesTextfield.disabled]: disabled,
            [stylesTextfield.disabledText]: disabled,
            [stylesTextfield.disabledBorder]: disabled,
            // md
            [stylesTextfield.md_input]: isMD,
            [stylesTextfield.md_inputEndButtonEndPadding]: isMD,
            [stylesTextfield.md_inputLabelPadding]: isMD && ownerState?.label && isLabelVisible,
            [stylesTextfield.md_inputNoLabelPadding]:
              isMD && (!ownerState?.label || (ownerState?.label && !isLabelVisible)),
            [stylesTextfield.md_inputStartPadding]: isMD,
            // lg
            [stylesTextfield.lg_input]: isLG,
            [stylesTextfield.lg_inputEndButtonEndPadding]: isLG,
            [stylesTextfield.lg_inputLabelPadding]: isLG && ownerState?.label && isLabelVisible,
            [stylesTextfield.lg_inputNoLabelPadding]:
              isLG && (!ownerState?.label || (ownerState?.label && !isLabelVisible)),
            [stylesTextfield.lg_inputStartPadding]: isLG,
          })}
          enterKeyHint={ownerState?.mobileEnterKeyHint}
          id={ownerState?.id}
          inputMode="numeric"
          onBlur={(event) => ownerState?.onBlur?.({ event, value })}
          onFocus={(event) => ownerState?.onFocus?.({ event, value })}
        />

        {!disabled && !readOnly && ownerState?.onClearInput ? (
          <div
            className={classnames(stylesTextfield.endIconContainer, {
              [stylesTextfield.md_endIconContainer]: isMD,
              [stylesTextfield.lg_endIconContainer]: isLG,
            })}
          >
            <TapArea
              accessibilityLabel="Clear date"
              fullHeight={false}
              fullWidth={false}
              onBlur={() => setIconFocused(false)}
              onFocus={() => setIconFocused(true)}
              onKeyDown={({ event }) => {
                if ([ENTER, SPACE].includes(event.keyCode)) ownerState?.onClearInput();
                if (event.keyCode !== TAB) event.preventDefault();
              }}
              onMouseEnter={() => setIconFocused(true)}
              onMouseLeave={() => setIconFocused(false)}
              onTap={() => ownerState?.onClearInput()}
              rounding={2}
              tapStyle="none"
            >
              <Pog
                accessibilityLabel=""
                bgColor={iconFocused ? 'lightGray' : 'transparent'}
                icon="cancel"
                iconColor="darkGray"
                size="xs"
              />
            </TapArea>
          </div>
        ) : null}
      </div>
    );
  },
);

// MUITextField injects hook props into a regular custom TextField component
const MUITextField = forwardRef((props: any, ref: Ref<HTMLDivElement>) => {
  const fieldResponse = useDateField({ ...props });

  return <TextField ref={ref} {...fieldResponse} />;
});

// MUIDateField uses MUITextField in the field slot to override the build in input

// we need props: any so the component works, DatePickerProps break the component

const MUIDateField = forwardRef((props: any, ref: Ref<HTMLDivElement>) => (
  <MUIDatePicker ref={ref} {...props} slots={{ field: MUITextField }} />
));

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

// InternalDateField adds the providers and the subcomponents to MUIDateField
function InternalDateField({
  localeData,
  helperText,
  disableRange,
  onChange,
  onError,
  ...props
}: InternalDateFieldProps) {
  const { errorMessage, id, value, disabled, size } = props;
  const hasErrorMessage = Boolean(errorMessage);

  let translations = getTranslationsFromMUIJS(localeData);

  if (!translations) {
    translations = getLocalTranslations(localeData);
  }

  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider
        adapterLocale={localeData}
        dateAdapter={AdapterDateFns}
        // @ts-expect-error - TS2322
        localeText={translations}
      >
        <div className={classnames(stylesTextfield.outerWrapper)}>
          <Box alignItems="center" display="flex" position="relative" width="100%">
            {/* MUI DATEFIELD + GESTALT TEXTFIELD */}
            <MUIDateField
              {...props}
              disableFuture={disableRange === 'disableFuture'}
              disablePast={disableRange === 'disablePast'}
              errorMessage={!!errorMessage}
              formatDensity="spacious"
              onChange={(dateValue: any) => onChange?.({ value: dateValue })}
              onError={(error: any) => onError?.({ errorMessage: error, value })}
            />
          </Box>
          {helperText && !hasErrorMessage ? (
            <HelperText disabled={disabled} id={`${id}-helperText`} size={size} text={helperText} />
          ) : null}
          {!disabled && hasErrorMessage ? (
            <ErrorMessage id={`${id}-error`} size={size} text={errorMessage} />
          ) : null}
        </div>
      </LocalizationProvider>
    </StyledEngineProvider>
  );
}

InternalDateField.displayName = 'InternalDateField';

export default InternalDateField;
