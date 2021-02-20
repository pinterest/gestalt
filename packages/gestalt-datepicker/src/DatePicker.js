// @flow strict-local
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
  type ElementRef,
  type Element,
} from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import classnames from 'classnames';
import { Icon, Box, Label, Text } from 'gestalt';
import PropTypes from 'prop-types';
import DatePickerTextField from './DatePickerTextField.js';
import styles from './DatePicker.css';
import dateFormat from './dateFormat.js';
import { LocaleDataPropTypes, type LocaleData } from './LocaleDataTypes.js';

type Timezone = 'utc' | 'local';
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
  timezone?: Timezone,
  value?: Date,
|};

export const getDisplayDate = (date: Date, timezone: Timezone): Date => {
  if (timezone === 'utc') {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  }

  return date;
};

export const getUpdatedDate = (date: Date, timezone: Timezone): Date => {
  if (timezone === 'utc') {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  }

  return date;
};

const DatePickerWithForwardRef: React$AbstractComponent<Props, HTMLDivElement> = forwardRef<
  Props,
  HTMLDivElement,
>(function DatePicker(props, ref): Element<'div'> {
  const {
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
    timezone = 'local',
    value: dateValue,
  } = props;

  const innerRef = useRef(null);
  useImperativeHandle(ref, () => innerRef.current);

  // We keep month in state to trigger a re-render when month changes since height will vary by where days fall
  // in the month and we need to keep the flyout pointed at the input correctly
  const [selected, setSelected] = useState<?Date>(
    dateValue ? getDisplayDate(dateValue, timezone) : null,
  );
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

  const max = rangeSelector === 'end' ? maxDate : rangeEndDate || maxDate;
  const min = rangeSelector === 'start' ? minDate : rangeStartDate || minDate;

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
        endDate={rangeEndDate && getDisplayDate(rangeEndDate, timezone)}
        excludeDates={excludeDates && excludeDates.map((date) => getDisplayDate(date, timezone))}
        highlightDates={initRangeHighlight ? [getDisplayDate(initRangeHighlight, timezone)] : []}
        id={id}
        includeDates={includeDates && includeDates.map((date) => getDisplayDate(date, timezone))}
        locale={updatedLocale}
        maxDate={max && getDisplayDate(max, timezone)}
        minDate={min && getDisplayDate(min, timezone)}
        nextMonthButtonLabel={
          <Icon accessibilityLabel="" color="darkGray" icon="arrow-forward" size={16} />
        }
        onChange={(value: Date, event: SyntheticInputEvent<HTMLInputElement>) => {
          setSelected(value);
          onChange({ event, value: getUpdatedDate(value, timezone) });
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
          if (Object.prototype.hasOwnProperty.call(innerRef, 'current')) {
            innerRef.current = refElement.input;
          }
          return null;
        }}
        selected={selected}
        selectsEnd={rangeSelector === 'end'}
        selectsStart={rangeSelector === 'start'}
        showPopperArrow={false}
        startDate={rangeStartDate && getDisplayDate(rangeStartDate, timezone)}
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

// $FlowFixMe[prop-missing] flow 0.135.0 upgrade
DatePickerWithForwardRef.propTypes = {
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
  nextRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.node,
    }),
  ]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rangeEndDate: PropTypes.instanceOf(Date),
  rangeSelector: PropTypes.oneOf(['start', 'end']),
  rangeStartDate: PropTypes.instanceOf(Date),
  timezone: PropTypes.oneOf(['local', 'utc']),
  value: PropTypes.instanceOf(Date),
};

DatePickerWithForwardRef.displayName = 'DatePicker';

export default DatePickerWithForwardRef;
