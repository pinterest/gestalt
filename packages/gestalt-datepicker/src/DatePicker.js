// @flow strict-local
import React, { forwardRef, useEffect, useState, type ElementRef } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import classnames from 'classnames';
import { Icon, Box, Label, Text } from 'gestalt';
import PropTypes from 'prop-types';
import DatePickerTextField from './DatePickerTextField.js';
import styles from './DatePicker.css';
import { LocaleDataPropTypes, type LocaleData } from './LocaleDataTypes.js';

type Props = {|
  disabled?: boolean,
  errorMessage?: string,
  excludeDates?: Array<Date>,
  forwardedRef?: ElementRef<*>,
  helperText?: string,
  id: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  includeDates?: Array<Date>,
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

function DatePicker(props: Props) {
  const {
    disabled,
    errorMessage,
    excludeDates,
    forwardedRef,
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
  } = props;

  // We keep month in state to trigger a re-render when month changes since height will vary by where days fall
  // in the month and we need to keep the flyout pointed at the input correctly
  const [selected, setSelected] = useState<?Date>(dateValue);
  const [, setMonth] = useState<?number>();
  const [dateFormat, setDateFormat] = useState<?string>();
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
      setDateFormat(
        localeData.formatLong && localeData.formatLong.date({ width: 'short' })
      );
    }
  }, [localeData]);

  const popperPlacement = {
    up: 'top',
    right: 'right',
    down: 'bottom',
    left: 'left',
  };

  const updateNextRef = submitted => {
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
        dateFormat={dateFormat}
        dayClassName={() => classnames(styles['react-datepicker__days'])}
        disabled={disabled}
        endDate={rangeEndDate}
        excludeDates={excludeDates}
        highlightDates={initRangeHighlight ? [initRangeHighlight] : []}
        id={id}
        includeDates={includeDates}
        locale={updatedLocale}
        maxDate={rangeSelector === 'end' ? maxDate : rangeEndDate || maxDate}
        minDate={
          rangeSelector === 'start' ? minDate : rangeStartDate || minDate
        }
        nextMonthButtonLabel={
          <Icon
            accessibilityLabel=""
            color="darkGray"
            icon="arrow-forward"
            size={16}
          />
        }
        onChange={(
          value: Date,
          event: SyntheticInputEvent<HTMLInputElement>
        ) => {
          setSelected(value);
          onChange({ event, value });
          updateNextRef(event.type === 'click');
        }}
        onKeyDown={event => updateNextRef(event.key === 'Enter')}
        onMonthChange={(newMonth: Date) => setMonth(newMonth.getMonth())}
        placeholderText={placeholder || dateFormat || 'mm/dd/yyyy'}
        popperClassName={classnames(
          styles['react-datepicker-popper'],
          styles[`react-datepicker-popper-${popperPlacement[idealDirection]}`]
        )}
        popperPlacement={popperPlacement[idealDirection]}
        previousMonthButtonLabel={
          <Icon
            accessibilityLabel=""
            color="darkGray"
            icon="arrow-back"
            size={16}
          />
        }
        ref={ref => {
          if (!forwardedRef || !ref) {
            return null;
          }
          if (Object.prototype.hasOwnProperty.call(forwardedRef, 'current')) {
            forwardedRef.current = ref.input;
          } else {
            forwardedRef(ref.input);
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
}

function datePickerForwardRef(props, ref) {
  return <DatePicker {...props} forwardedRef={ref} />;
}

datePickerForwardRef.displayName = 'DatePickerForwardRef';

export default (forwardRef<Props, HTMLInputElement>(
  datePickerForwardRef
): React$AbstractComponent<Props, HTMLInputElement>);

DatePicker.propTypes = {
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  excludeDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
  includeDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  label: PropTypes.string,
  localeData: LocaleDataPropTypes,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rangeEndDate: PropTypes.instanceOf(Date),
  rangeSelector: PropTypes.oneOf(['start', 'end']),
  rangeStartDate: PropTypes.instanceOf(Date),
  value: PropTypes.instanceOf(Date),
};
