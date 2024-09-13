// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/display-name */
import { forwardRef, ReactNode, useState } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
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
import styles from '../DateField.css';
import ErrorMessage from '../subcomponents/ErrorMessage';
import HelperText from '../subcomponents/HelperText';

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
  // InputProps: {
  //   ref: {
  //     current: HTMLElement | null | undefined;
  //   };
  // };
  // focused: boolean;
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
      label?: string;
      labelDisplay?: 'visible' | 'hidden';
    };
  };
};

const CustomTextField = forwardRef(
  // @ts-expect-error - TS2345 - Argument of type '({ disabled, InputProps: { ref: containerRef }, focused, placeholder, value, readOnly, onClick, onPaste, onChange, onKeyDown, onMouseUp, ownerState, }: CustomTextFieldProps, inputRef: { current: null | HTMLInputElement; } | ((arg1: null | HTMLInputElement) => unknown)) => JSX.Element' is not assignable to parameter of type 'ForwardRefRenderFunction<HTMLInputElement, CustomTextFieldProps>'.
  (
    {
      disabled,
      // InputProps: { ref: containerRef } = { ref: { current: undefined } },
      // focused,
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

    const isLabelVisible = ownerState?.passthroughProps?.labelDisplay === 'visible';
    const hasErrorMessage = Boolean(ownerState?.passthroughProps?.errorMessage);

    const isMD = ownerState?.passthroughProps?.size === 'md';
    const isLG = ownerState?.passthroughProps?.size === 'lg';

    return (
      <div className={classnames(stylesTextfield.inputParent)}>
        {ownerState?.passthroughProps?.label && (
          <label
            className={classnames(stylesTextfield.label, {
              // md
              [stylesTextfield.md_label]: isMD,
              [stylesTextfield.md_labelPos]: isMD,
              // lg
              [stylesTextfield.lg_label]: isLG,
              [stylesTextfield.lg_labelPos]: isLG,

              [stylesTextfield.visuallyHidden]: !isLabelVisible,
            })}
            htmlFor={ownerState?.passthroughProps?.id}
          >
            <TextUI color={disabled ? 'disabled' : 'default'} lineClamp={1} size="xs">
              {ownerState?.passthroughProps?.label}
            </TextUI>
          </label>
        )}
        <input
          ref={inputRef}
          autoComplete={ownerState?.passthroughProps?.autoComplete ?? 'off'}
          className={classnames(
            stylesTextfield.input,
            stylesTextfield.md,
            stylesTextfield.mdDefault,
            {
              [stylesTextfield.enabled]: !disabled,
              [stylesTextfield.enabledText]: !disabled,
              [stylesTextfield.enabledBorder]: !disabled && !hasErrorMessage,
              [stylesTextfield.errorBorder]: !disabled && hasErrorMessage,
              [stylesTextfield.disabled]: disabled,
              [stylesTextfield.disabledText]: disabled,
              [stylesTextfield.disabledBorder]: disabled,
              // md
              [stylesTextfield.md_input]: isMD,
              [stylesTextfield.md_inputHorizontalPadding]: isMD,
              [stylesTextfield.md_visibleLabel]:
                isMD && ownerState?.passthroughProps?.label && isLabelVisible,
              [stylesTextfield.md_noLabel]:
                isMD &&
                (!ownerState?.passthroughProps?.label ||
                  (ownerState?.passthroughProps?.label && !isLabelVisible)),
              [stylesTextfield.md_actionButton]: isMD && ownerState?.passthroughProps?.onClearInput,
              // lg
              [stylesTextfield.lg_input]: isLG,
              [stylesTextfield.lg_inputHorizontalPadding]: isLG,
              [stylesTextfield.lg_visibleLabel]:
                isLG && ownerState?.passthroughProps?.label && isLabelVisible,
              [stylesTextfield.lg_noLabel]:
                isLG &&
                (!ownerState?.passthroughProps?.label ||
                  (ownerState?.passthroughProps?.label && !isLabelVisible)),
              [stylesTextfield.lg_actionButton]: isLG && ownerState?.passthroughProps?.onClearInput,
            },
          )}
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
      </div>
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
    // @ts-expect-error - TS2739 - Type '{ onKeyDown: KeyboardEventHandler<Element>; onMouseUp: MouseEventHandler<Element>; onPaste: ClipboardEventHandler<HTMLInputElement>; ... 11 more ...; autoComplete: "off"; }' is missing the following properties from type 'CustomTextFieldProps': disabled, InputProps, focused, ownerState
    <CustomTextField
      {...useDateField({
        props: textFieldProps,
        // @ts-expect-error - TS2322 - Type '{ ref: { current: HTMLElement | null | undefined; }; }' is not assignable to type 'Ref<HTMLInputElement> | undefined'.
        inputRef: externalInputRef,
      })}
    />
  );
}

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
        // @ts-expect-error - TS2322 - Type '{ fieldYearPlaceholder: (params: { digitAmount: number; }) => string; fieldMonthPlaceholder: (params: { contentType: string; }) => string; fieldDayPlaceholder: () => string; } | null | undefined' is not assignable to type 'Partial<PickersLocaleText<Date>> | undefined'.
        localeText={translations}
      >
        <div>
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
              // @ts-expect-error - TS2322 - Type 'string | null' is not assignable to type 'string'.
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
                label,
                labelDisplay,
              }}
              readOnly={readOnly}
              // @ts-expect-error - TS2322 - Type '({ inputRef: externalInputRef, ...textFieldProps }: CustomDateFieldProps) => Element' is not assignable to type 'ComponentType<BaseSingleInputFieldProps<Date | null, Date | null, FieldSection, any>> | undefined'.
              slots={{ field: CustomDateField }}
              value={value}
              // @ts-expect-error - TS2322 - Type 'null' is not assignable to type 'Partial<PickerViewRendererLookup<Date | null, DateView, DateViewRendererProps<Date | null, DateView>, {}>> | undefined'.
              viewRenderers={null}
            />
          </Box>
          {helperText && !hasErrorMessage ? (
            <HelperText disabled={disabled} id={`${id}-helperText`} size="lg" text={helperText} />
          ) : null}
          {!disabled && hasErrorMessage ? (
            <ErrorMessage id={`${id}-error`} size="lg" text={errorMessage} />
          ) : null}
        </div>
      </LocalizationProvider>
    </StyledEngineProvider>
  );
}

InternalDateField.displayName = 'InternalDateField';

export default InternalDateField;
