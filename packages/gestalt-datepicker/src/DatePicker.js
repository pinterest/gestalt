// @flow strict-local
import {
  type AbstractComponent,
  type Element,
  forwardRef,
  type Node,
  useImperativeHandle,
  useRef,
} from 'react';
import InternalDatePicker from './DatePicker/InternalDatePicker.js';

// LocaleData type from https://github.com/date-fns/date-fns/blob/81ab18785146405ca2ae28710cdfbb13a294ec50/src/locale/af/index.js.flow
// NOTE: DO NOT USE PER-LINE FLOW SUPPRESSIONS HERE
// They will get picked up by the docgen and bork the type displayed on the docs
// flowlint unclear-type:off
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

export type Props = {|
  /**
   *  When disabled, DatePicker looks inactive and cannot be interacted with. See the [disabled example](https://gestalt.pinterest.systems/web/datepicker#States) to learn more.
   */
  disabled?: boolean,
  /**
   * Provide feedback when an error on selection occurs. See the [error message example](https://gestalt.pinterest.systems/web/datepicker#States) to learn more.
   */
  errorMessage?: string,
  /**
   * Array of disabled dates. Datepicker can be interacted with except for the dates passed which look inactive and cannot be selected. See the [disable selected dates example](https://gestalt.pinterest.systems/web/datepicker#Disabled-dates) to learn more.
   */
  excludeDates?: $ReadOnlyArray<Date>,
  /**
   * More information about how to complete the DatePicker field. See the [helper text example](https://gestalt.pinterest.systems/web/datepicker#Helper-text) to learn more.
   */
  helperText?: string,
  /**
   * A unique identifier for the input.
   */
  id: string,
  /**
   * Preferred direction for the calendar popover to open. See the [ideal direction example](https://gestalt.pinterest.systems/web/datepicker#idealDirection) to learn more.
   */
  idealDirection?: 'up' | 'right' | 'down' | 'left',

  /**
   * Array of enabled dates. Datepicker can be interacted with only on the dates passed, all other dates look inactive and cannot be selected. See the [disable selected dates example](https://gestalt.pinterest.systems/web/datepicker#Disabled-dates) to learn more.
   */
  includeDates?: $ReadOnlyArray<Date>,
  /**
   * Provide a label to identify the DatePicker field.
   */
  label?: string,
  /**
   * DatePicker accepts imported locales from the open source date utility library date-fns. See the [locales example](https://gestalt.pinterest.systems/web/datepicker#localeData) to learn more.
   */
  localeData?: LocaleData,
  /**
   * Disable dates outside a max date. See the [disable future and past example](https://gestalt.pinterest.systems/web/datepicker#Disabled-dates) to learn more.
   */
  maxDate?: Date,
  /**
   * Disable dates outside a min date.  See the [disable future and past example](https://gestalt.pinterest.systems/web/datepicker#Disabled-dates) to learn more.
   */
  minDate?: Date,
  /**
   * A unique name for the input.
   */
  name?: string,
  /**
   * Required for date range selection. Pass the complimentary range date picker ref object to DatePicker to autofocus on the unselected date range field. See the [date range picker example](https://gestalt.pinterest.systems/web/datepicker#Date-range) to learn more.
   */
  nextRef?: {| current: null | HTMLInputElement |},
  /**
   * Callback triggered when the user selects a date.
   */
  onChange: ({|
    event: SyntheticInputEvent<HTMLInputElement>,
    value: Date | null,
  |}) => void,
  /**
   * Placeholder text shown if the user has not yet input a value. The default placeholder value shows the date format for each locale, e.g. MM/DD/YYYY.
   */
  placeholder?: string,
  /**
   * Required for date range selection. End date on a date range selection. See the [date range example](https://gestalt.pinterest.systems/web/datepicker#Date-range) to learn more.
   */
  rangeEndDate?: Date | null,
  /**
   * Required for date range selection. Defines the datepicker start/end role in a date range selection.See the [date range picker example](https://gestalt.pinterest.systems/web/datepicker#Date-range) to learn more.
   */
  rangeSelector?: 'start' | 'end',
  /**
   * Required for date range selection. Start date on a date range selection. See the [date range picker example](https://gestalt.pinterest.systems/web/datepicker#Date-range) to learn more.
   */
  rangeStartDate?: Date | null,
  /**
   * Required for date range selection. Pass a ref object to DatePicker to autofocus on the unselected date range field. See the [date range picker example](https://gestalt.pinterest.systems/web/datepicker#Date-range) to learn more.
   */
  ref?: Element<'input'>, // eslint-disable-line react/no-unused-prop-types
  /**
   * Show a select list for quick selection of year and/or month. See the [selectLists variant](https://gestalt.pinterest.systems/web/datepicker#Select-list) to learn more.
   */
  selectLists?: $ReadOnlyArray<'month' | 'year'>,
  /**
   * DatePicker can be a controlled component. `value` sets the current value of the input. See the [controlled component date example](https://gestalt.pinterest.systems/web/datepicker#Controlled-component) to learn more.
   */
  value?: Date | null,
|};

/**
 * [DatePicker](https://gestalt.pinterest.systems/web/datepicker) is used when the user has to select a date or date range.
 * DatePicker is distributed in its own package and must be installed separately.
 *
 * ![DatePicker closed light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DatePicker-closed.spec.mjs-snapshots/DatePicker-closed-chromium-darwin.png)
 * ![DatePicker closed dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DatePicker-closed-dark.spec.mjs-snapshots/DatePicker-closed-dark-chromium-darwin.png)
 */
const DatePickerWithForwardRef: AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function DatePicker(
  {
    disabled,
    errorMessage,
    excludeDates,
    helperText,
    id,
    idealDirection = 'down',
    includeDates,
    label,
    localeData,
    maxDate,
    minDate,
    name,
    nextRef,
    onChange,
    placeholder,
    rangeEndDate,
    rangeSelector,
    rangeStartDate,
    selectLists,
    value,
  }: Props,
  ref,
): Node {
  const innerInputRef = useRef<null | HTMLInputElement>(null);
  useImperativeHandle(ref, () => innerInputRef.current);

  return (
    <InternalDatePicker
      disabled={disabled}
      errorMessage={errorMessage}
      excludeDates={excludeDates}
      helperText={helperText}
      id={id}
      idealDirection={idealDirection}
      includeDates={includeDates}
      label={label}
      localeData={localeData}
      maxDate={maxDate}
      minDate={minDate}
      name={name}
      nextRef={nextRef}
      onChange={onChange}
      placeholder={placeholder}
      rangeEndDate={rangeEndDate}
      rangeSelector={rangeSelector}
      rangeStartDate={rangeStartDate}
      selectLists={selectLists}
      value={value}
      ref={innerInputRef}
    />
  );
});

DatePickerWithForwardRef.displayName = 'DatePicker';

export default DatePickerWithForwardRef;
