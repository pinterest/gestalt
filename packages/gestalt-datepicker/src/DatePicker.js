// @flow strict-local
import { forwardRef, useEffect, useImperativeHandle, useState, useRef, type Element } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import classnames from 'classnames';
import { Icon, Box, Label, Text } from 'gestalt';
import DatePickerTextField from './DatePickerTextField.js';
import styles from './DatePicker.css';
import dateFormat from './dateFormat.js';

// LocaleData type from https://github.com/date-fns/date-fns/blob/81ab18785146405ca2ae28710cdfbb13a294ec50/src/locale/af/index.js.flow
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

type Props = {|
  /**
   *  When disabled, DatePicker looks inactive and cannot be interacted with. See the [disabled example](https://gestalt.pinterest.systems/datepicker#disabled) to learn more.
   */
  disabled?: boolean,
  /**
   * Provide feedback when an error on selection occurs. See the [error message example](https://gestalt.pinterest.systems/datepicker#errorMessage) to learn more.
   */
  errorMessage?: string,
  /**
   * Array of disabled dates. Datepicker can be interacted with except for the dates passed which look inactive and cannot be selected. See the [disabled dates example](https://gestalt.pinterest.systems/datepicker#exclude) to learn more.
   */
  excludeDates?: $ReadOnlyArray<Date>,
  /**
   * More information about how to complete the DatePicker field. See the [helper text example](https://gestalt.pinterest.systems/datepicker#helperText) to learn more.
   */
  helperText?: string,
  /**
   *
   */
  id: string,
  /**
   * Preferred direction for the calendar popover to open. See the [ideal direction example](https://gestalt.pinterest.systems/datepicker#idealDirection) to learn more.
   */
  idealDirection?: 'up' | 'right' | 'down' | 'left',

  /**
   * Array of enabled dates. Datepicker can be interacted with only on the dates passed, all other dates look inactive and cannot be selected. See the [disabled dates example](https://gestalt.pinterest.systems/datepicker#include) to learn more.
   */
  includeDates?: $ReadOnlyArray<Date>,
  /**
   * Provide a label to identify the DatePicker field.
   */
  label?: string,
  /**
   * DatePicker accepts imported locales from the open source date utility library date-fns. See the [locales example](https://gestalt.pinterest.systems/datepicker#localeData) to learn more.
   */
  localeData?: LocaleData,
  /**
   * Disable dates outside a max date. See the [delimited selection period example](https://gestalt.pinterest.systems/datepicker#maxMinDates) to learn more.
   */
  maxDate?: Date,
  /**
   * Disable dates outside a min date. See the [delimited selection period example](https://gestalt.pinterest.systems/datepicker#maxMinDates) to learn more.
   */
  minDate?: Date,
  /**
   * Required for date range selection. Pass the complimentary range date picker ref object to DatePicker to autofocus on the unselected date range field. See the [date range picker example](https://gestalt.pinterest.systems/datepicker#rangePicker) to learn more.
   */
  nextRef?: {| current: ?HTMLInputElement |},
  /**
   * Callback triggered when the user selects a date.
   */
  onChange: ({|
    event: SyntheticInputEvent<HTMLInputElement>,
    value: Date,
  |}) => void,
  /**
   * Placeholder text shown if the user has not yet input a value. The default placeholder value shows the date format for each locale, e.g. MM/DD/YYYY.
   */
  placeholder?: string,
  /**
   * Required for date range selection. End date on a date range selection. See the [date range picker example](https://gestalt.pinterest.systems/datepicker#rangePicker) to learn more.
   */
  rangeEndDate?: Date,
  /**
   * Required for date range selection. Defines the datepicker start/end role in a date range selection.See the [date range picker example](https://gestalt.pinterest.systems/datepicker#rangePicker) to learn more.
   */
  rangeSelector?: 'start' | 'end',
  /**
   * Required for date range selection. Start date on a date range selection. See the [date range picker example](https://gestalt.pinterest.systems/datepicker#rangePicker) to learn more.
   */
  rangeStartDate?: Date,
  /**
   * Required for date range selection. Pass a ref object to DatePicker to autofocus on the unselected date range field. See the [date range picker example](https://gestalt.pinterest.systems/datepicker#rangePicker) to learn more.
   */
  ref?: Element<'input'>, // eslint-disable-line react/no-unused-prop-types
  /**
   * Pre-selected date value. See the [preselected date example](https://gestalt.pinterest.systems/datepicker#preselectedValue) to learn more.
   */
  value?: Date,
|};

/**
 * Use [Datepicker](https://gestalt.pinterest.systems/datepicker) when the user has to select a date or date range.
 */
/**
 * [DatePicker](https://gestalt.pinterest.systems/datepicker) is used when the user has to select a date or date range.
 *
 * ![DatePicker closed light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/DatePicker-closed%20%230.png)
 * ![DatePicker open light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/DatePicker-open%20%230.png)
 * ![DatePicker closed dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/DatePicker-closed-dark%20%230.png)
 * ![DatePicker open dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/DatePicker-open-dark%20%230.png)
 */
const DatePickerWithForwardRef: React$AbstractComponent<Props, HTMLDivElement> = forwardRef<
  Props,
  HTMLDivElement,
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
    nextRef,
    onChange,
    placeholder,
    rangeEndDate,
    rangeSelector,
    rangeStartDate,
    value: dateValue,
  }: Props,
  ref,
): Element<'div'> {
  const innerRef = useRef(null);
  useImperativeHandle(ref, () => innerRef.current);

  // We keep month in state to trigger a re-render when month changes since height will vary by where days fall
  // in the month and we need to keep the popover pointed at the input correctly
  const [selected, setSelected] = useState<?Date>(dateValue);
  const [, setMonth] = useState<?number>();
  const [format, setFormat] = useState<?string>();
  const [updatedLocale, setUpdatedLocale] = useState<?string>();
  const [initRangeHighlight, setInitRangeHighlight] = useState<?Date>();

  useEffect(() => {
    if (rangeSelector) {
      setInitRangeHighlight(rangeStartDate || rangeEndDate);
    }
  }, [rangeStartDate, rangeEndDate, rangeSelector]);

  useEffect(() => {
    if (localeData && localeData.code) {
      registerLocale(localeData.code, localeData);
      setUpdatedLocale(localeData.code);
      setFormat(dateFormat[localeData.code || 'en-US']);
    }
  }, [localeData]);

  const popperPlacement = {
    up: 'top',
    right: 'right',
    down: 'bottom',
    left: 'left',
  };

  const updateNextRef = (submitted) => {
    if (
      (rangeSelector === 'start' && !rangeEndDate) ||
      (rangeSelector === 'end' && !rangeStartDate)
    ) {
      if (nextRef && submitted) {
        nextRef.current?.focus();
      }
    }
  };

  return (
    <div className="_gestalt">
      {label && (
        <Label htmlFor={id}>
          <Box marginBottom={2}>
            <Text size="sm">{label}</Text>
          </Box>
        </Label>
      )}
      <ReactDatePicker
        calendarClassName={classnames(styles['react-datepicker'])}
        customInput={<DatePickerTextField id={id} />}
        dateFormat={format}
        dayClassName={() => classnames(styles['react-datepicker__days'])}
        disabled={disabled}
        endDate={rangeEndDate}
        excludeDates={excludeDates && [...excludeDates]}
        highlightDates={initRangeHighlight ? [initRangeHighlight] : []}
        id={id}
        includeDates={includeDates && [...includeDates]}
        locale={updatedLocale}
        maxDate={rangeSelector === 'end' ? maxDate : rangeEndDate || maxDate}
        minDate={rangeSelector === 'start' ? minDate : rangeStartDate || minDate}
        nextMonthButtonLabel={
          <Icon accessibilityLabel="" color="darkGray" icon="arrow-forward" size={16} />
        }
        onChange={(value: Date, event: SyntheticInputEvent<HTMLInputElement>) => {
          setSelected(value);
          onChange({ event, value });
          updateNextRef(event.type === 'click');
        }}
        onKeyDown={(event) => updateNextRef(event.key === 'Enter')}
        onMonthChange={(newMonth: Date) => setMonth(newMonth.getMonth())}
        placeholderText={placeholder || format?.toUpperCase() || 'MM/DD/YYYY'}
        popperClassName={classnames(
          styles['react-datepicker-popper'],
          styles[`react-datepicker-popper-${popperPlacement[idealDirection]}`],
        )}
        popperPlacement={popperPlacement[idealDirection]}
        previousMonthButtonLabel={
          <Icon accessibilityLabel="" color="darkGray" icon="arrow-back" size={16} />
        }
        ref={(refElement) => {
          if (!innerRef || !refElement) {
            return null;
          }
          // $FlowFixMe[method-unbinding]
          if (Object.prototype.hasOwnProperty.call(innerRef, 'current')) {
            innerRef.current = refElement.input;
          }
          return null;
        }}
        selected={selected}
        selectsEnd={rangeSelector === 'end'}
        selectsStart={rangeSelector === 'start'}
        showPopperArrow={false}
        startDate={rangeStartDate}
      />
      {(!!errorMessage || !!helperText) && (
        <Box marginTop={2}>
          <Text color={errorMessage ? 'red' : 'gray'} size="sm">
            {errorMessage || helperText}
          </Text>
        </Box>
      )}
    </div>
  );
});

DatePickerWithForwardRef.displayName = 'DatePicker';

export default DatePickerWithForwardRef;
