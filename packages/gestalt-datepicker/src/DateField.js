// @flow strict-local
import { type Node, useEffect } from 'react';
import { useGlobalEventsHandler } from 'gestalt';
import InternalDateField from './DateField/InternalDateField.js';

// LocaleData type from https://github.com/date-fns/date-fns/blob/81ab18785146405ca2ae28710cdfbb13a294ec50/src/locale/af/index.js.flow
// NOTE: DO NOT USE PER-LINE FLOW SUPPRESSIONS HERE
// They will get picked up by the docgen and bork the type displayed on the docs
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

export type Props = {|
  /**
   * Indicate if birthday autocomplete should be available on the input.
   */
  autoComplete?: 'bday' | 'off',
  /**
   * Indicate if the input is disabled. See the [disabled example](https://gestalt.pinterest.systems/web/datefield#States) for more details.
   */
  disabled?: boolean,
  /**
   * Prevent the user from selecting future or past dates. "disableFuture" disables values after the current date and "disablePast" disables values before the current date. This will return an error on `onError`with values "disableFuture" or "disablePast". See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  disableRange?: 'disableFuture' | 'disablePast',
  /**
   * Customize your error message for the cases the user enters invalid dates. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  errorMessage?: string,
  /**
   * More information about how to complete the date field. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  helperText?: string,
  /**
   * A unique identifier for the input. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  id: string,
  /**
   * The label for the input. Be sure to localize the text. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  label?: string,
  /**
   * Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually.
   */
  labelDisplay?: 'visible' | 'hidden',
  /**
   * DatePicker accepts imported locales from the open source date utility library date-fns. See the [locales example](https://gestalt.pinterest.systems/web/datefield#localeData) to learn more.
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
   * Mobile only prop. Optionally specify the action label to present for the enter key on virtual keyboards.
   */
  mobileEnterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send',
  /**
   * A unique name for the input. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
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
   * DateField is a controlled component. `onChange` is the  callback triggered when the value of the input changes. Should be used to modify the controlled value. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  onChange: ({| value: Date | null |}) => void,
  /**
   * Callback triggered when the value entered is invalid. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  onError?: ({|
    errorMessage: string,
    value: Date | null,
  |}) => void,
  /**
   * DateField is a controlled component. `onClearInput` is the callback triggered when the user clicks on the "clear" icon button. Should be used to clear the entered dates in the controlled component. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
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
   * Indicate if the input is readOnly. See the [readOnly example](https://gestalt.pinterest.systems/web/datefield#States) for more details.
   */
  readOnly?: boolean,
  /**
   * DateField is a controlled component. `value` sets the current value of the input.  See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  value: Date | null,
|};

/**
 * [DateField](https://gestalt.pinterest.systems/web/datefield) is used when the user has to select a date. Compared to [DatePicker](https://gestalt.pinterest.systems/web/datepicker), DateField has no supporting calendar to select a date, the user must input date values with a numeric keyboard.

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
  value,
}: Props): Node {
  const { dateFieldHandlers } = useGlobalEventsHandler() || {
    dateFieldHandlers: undefined,
  };

  useEffect(() => {
    if (dateFieldHandlers?.onMount) dateFieldHandlers?.onMount();
  }, [dateFieldHandlers]);

  return (
    <InternalDateField
      autoComplete={autoComplete}
      disabled={disabled}
      disableRange={disableRange}
      errorMessage={errorMessage}
      helperText={helperText}
      id={id}
      label={label}
      labelDisplay={labelDisplay}
      localeData={localeData}
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
      value={value}
    />
  );
}

DateField.displayName = 'DateField';

export default DateField;
