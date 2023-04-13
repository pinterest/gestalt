// @flow strict-local
import { type Node } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InternalDateField from './InternalDateField.js';

// LocaleData type from https://github.com/date-fns/date-fns/blob/81ab18785146405ca2ae28710cdfbb13a294ec50/src/locale/af/index.js.flow
// flowlint unclear-type:off
// NOTE: DO NOT USE PER-LINE FLOW SUPPRESSIONS HERE
// They will get picked up by the docgen and bork the type displayed on the docs
type LocaleData = {|
  code?: string,
  formatDistance?: (...args: $ReadOnlyArray<any>) => any,
  formatRelative?: (...args: $ReadOnlyArray<any>) => any,
  localize?: {|
    ordinalNumber: (...args: $ReadOnlyArray<any>) => any,
    era: (...args: $ReadOnlyArray<any>) => any,
    quarter: (...args: $ReadOnlyArray<any>) => any,
    month: (...args: $ReadOnlyArray<any>) => any,
    day: (...args: $ReadOnlyArray<any>) => any,
    dayPeriod: (...args: $ReadOnlyArray<any>) => any,
  |},
  formatLong?: {|
    date: (...args: $ReadOnlyArray<any>) => any,
    time: (...args: $ReadOnlyArray<any>) => any,
    dateTime: (...args: $ReadOnlyArray<any>) => any,
  |},
  match?: {|
    ordinalNumber: (...args: $ReadOnlyArray<string>) => any,
    era: (...args: $ReadOnlyArray<any>) => any,
    quarter: (...args: $ReadOnlyArray<any>) => any,
    month: (...args: $ReadOnlyArray<any>) => any,
    day: (...args: $ReadOnlyArray<any>) => any,
    dayPeriod: (...args: $ReadOnlyArray<any>) => any,
  |},
  options?: {|
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  |},
|};
// flowlint unclear-type:error

type Props = {|
  /**
   * Indicate if birthday autocomplete should be available on the input.
   */
  autoComplete?: 'bday' | 'off',
  /**
   * Indicate if the input is disabled. See the [disabled example](https://gestalt.pinterest.systems/web/textfield#Disabled) for more details.
   */
  disabled?: boolean,
  /**
   * Prevent the user from selecting future or past dates. "disableFuture" disables values after the current date and "disablePast" disables values before the current date. This will return an error on `onError`with values "disableFuture" or "disablePast". See the [disableRange](https://gestalt.pinterest.systems/web/textfield#Disabled) for more details.
   */
  disableRange?: 'disableFuture' | 'disablePast',
  /**
   * Customize your error message for the cases the user enters invalid dates.
   */
  errorMessage?: string,
  /**
   * More information about how to complete the date field.
   */
  helperText?: string,
  /**
   * A unique identifier for the input.
   */
  id: string,
  /**
   * The label for the input. Be sure to localize the text.
   */
  label?: string,
  /**
   * Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually. See the [label visibility variant](https://gestalt.pinterest.systems#Label-visibility) for more info.
   */
  labelDisplay?: 'visible' | 'hidden',
  /**
   * DatePicker accepts imported locales from the open source date utility library date-fns. See the [locales example](https://gestalt.pinterest.systems/web/datepicker#localeData) to learn more.
   */
  localeData?: LocaleData,
  /**
   * Maximal selectable date. Disables any date values after the provided date.
   */
  maxDate?: Date,
  /**
   * Minimal selectable date. Disables any date values before the provided date.
   */
  minDate?: Date,
  /**
   * Mobile only prop. Optionally specify the action label to present for the enter key on virtual keyboards. See the [enterKeyHint variant](https://gestalt.pinterest.systems/web/textfield#EnterKeyHint) for more info.
   */
  mobileEnterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send',
  /**
   * A unique name for the input.
   */
  name?: string,
  /**
   * Callback triggered when the user blurs the input.
   */
  onBlur?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  /**
   * DateField is a controlled component. `onChange` is the  callback triggered when the value of the input changes. Should be used to modify the controlled value.
   */
  onChange: (value: Date) => void,
  /**
   * Callback triggered when the value entered is invalid. See the [onError example](https://gestalt.pinterest.systems/web/datepicker#localeData) to learn more.
   */
  onError?: ({|
    errorMessage: string,
    value: ?Date,
  |}) => void,
  /**
   * DateField is a controlled component. `onClearInput` is the callback triggered when the user clicks on the "clear" icon button. Should be used to clear the entered dates in the controlled component.
   */
  onClearInput: () => void,
  /**
   * Callback triggered when the user focuses the input.
   */
  onFocus?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  /**
   * Indicate if the input is readOnly. See the [readOnly example](https://gestalt.pinterest.systems/web/textfield#Read-only) for more details.
   */
  readOnly?: boolean,
  /**
   * DateField is provided in sizes: "md" (40px) and "lg" (48px).
   */
  size?: 'md' | 'lg',
  /**
   * DateField is a controlled component. `value` sets the current value of the input.
   */
  value: ?Date,
|};

/**
 * [DateField](https://gestalt.pinterest.systems/web/datefield) is used when the user has to select a date. Compared to [DatePicker](https://gestalt.pinterest.systems/web/datepicker), DateField has no supporting calendaronly to select a data, the user must input date values with a numeric keyboard.

 * DateField is distributed within the "gestalt-datepicker" package and must be installed separately.
 *
 * ![DateField light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateField.spec.mjs-snapshots/DateField-chromium-darwin.png)
 * ![DateField dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateField-dark.spec.mjs-snapshots/DateField-dark-chromium-darwin.png)
 */
function DateField({
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
  size = 'md',
  value,
}: Props): Node {
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={localeData}>
        <InternalDateField
          autoComplete={autoComplete}
          disabled={disabled}
          disableRange={disableRange}
          errorMessage={errorMessage}
          helperText={helperText}
          id={id}
          label={label}
          labelDisplay={labelDisplay}
          maxDate={maxDate}
          minDate={minDate}
          mobileEnterKeyHint={mobileEnterKeyHint}
          name={name}
          onBlur={onBlur}
          onClearInput={onClearInput}
          onChange={onChange}
          onError={onError}
          onFocus={onFocus}
          readOnly={readOnly}
          size={size}
          value={value}
        />
      </LocalizationProvider>
    </StyledEngineProvider>
  );
}

DateField.displayName = 'DateField';

export default DateField;
