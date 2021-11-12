// @flow strict-local
import type { ElementRef, Element } from 'react';

import { forwardRef, useEffect, useImperativeHandle, useState, useRef } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import classnames from 'classnames';
import { Icon, Box, Label, Text } from 'gestalt';
import DatePickerTextField from './DatePickerTextField.js';
import styles from './DatePicker.css';
import dateFormat from './dateFormat.js';
import { type LocaleData } from './LocaleDataTypes.js';

type Props = {|
  disabled?: boolean,
  errorMessage?: string,
  excludeDates?: $ReadOnlyArray<Date>,
  helperText?: string,
  id: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  includeDates?: $ReadOnlyArray<Date>,
  label?: string,
  localeData?: LocaleData,
  maxDate?: Date,
  minDate?: Date,
  nextRef?: ElementRef<*>,
  onChange: ({|
    event: SyntheticInputEvent<HTMLInputElement>,
    value: Date,
  |}) => void,
  placeholder?: string,
  rangeEndDate?: Date,
  rangeSelector?: 'start' | 'end',
  rangeStartDate?: Date,
  value?: Date,
|};

/**
 * https://gestalt.pinterest.systems/datepicker
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
        nextRef.current.focus();
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
