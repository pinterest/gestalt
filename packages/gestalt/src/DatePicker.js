// @flow strict-local
import React, { useRef, useState, type ElementRef, type Node } from 'react';
import DatePicker from 'react-datepicker';
import typeof Locales from 'date-fns/locale';
import { Box, Label, Text, Icon } from 'gestalt';
import DatePickerTextField from './DatePickerTextField.js';
import datePickerUpdateLocale from './datePickerUpdateLocale.js';

const ARROW_ICON_SIZE = 16;

type Props = {|
  accessibilityLabelNext: string,
  accessibilityLabelPrevious: string,
  accessibilityLabelIcon: string,
  disabled?: boolean,
  endDate?: Date,
  errorMessage?: Node,
  excludeDates?: Array<Date>,
  helperText?: Node,
  id: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  includeDates?: Array<Date>,
  isRTL?: boolean,
  label?: string,
  locale: string,
  maxDate?: Date,
  minDate?: Date,
  onChange: ({
    event: SyntheticInputEvent<HTMLInputElement>,
    value: Date,
  }) => void,
  placeholder?: string,
  selectsEnd?: boolean,
  selectsStart?: boolean,
  startDate?: Date,
  value: ?Date,
|};

export default function DateField(props: Props) {
  const {
    accessibilityLabelIcon,
    accessibilityLabelNext,
    accessibilityLabelPrevious,
    helperText,
    disabled,
    endDate,
    errorMessage,
    excludeDates,
    id,
    idealDirection = 'down',
    includeDates,
    isRTL = false,
    label,
    locale,
    maxDate,
    minDate,
    onChange,
    placeholder,
    selectsEnd,
    selectsStart,
    startDate,
    value: selected,
  } = props;

  const [dateFormat, setDateFormat] = useState<?string>();
  const [, setMonth] = useState<?number>();

  // $FlowFixMe
  const pickerRef: ElementRef<any> = useRef();

  const handleChange = (
    value: Date,
    event: SyntheticInputEvent<HTMLInputElement>
  ) => onChange({ event, value });

  // Re-render flyout when month changes since height will vary by where days fall
  // in the month and we need to keep the flyout pointed at the input correctly
  const handleMonthChange = (newMonth: Date) => {
    setMonth(newMonth.getMonth());
  };

  const customInput = (
    <DatePickerTextField
      accessibilityLabelIcon={accessibilityLabelIcon}
      icon="calendar"
      id={id}
      isRTL={isRTL}
    />
  );

  const nextMonthButtonLabel = (
    <Icon
      icon={isRTL ? 'arrow-back' : 'arrow-forward'}
      accessibilityLabel={accessibilityLabelNext}
      color="darkGray"
      size={ARROW_ICON_SIZE}
    />
  );

  const previousMonthButtonLabel = (
    <Icon
      icon={isRTL ? 'arrow-forward' : 'arrow-back'}
      accessibilityLabel={accessibilityLabelPrevious}
      color="darkGray"
      size={ARROW_ICON_SIZE}
    />
  );

  const popperPlacement = {
    up: 'top',
    right: 'right',
    down: 'bottom',
    left: 'left',
  };

  const changeDateFormat = (localeData: $Values<Locales> | null) => {
    if (localeData) {
      setDateFormat(
        localeData.formatLong && localeData.formatLong.date({ width: 'short' })
      );
    }
  };

  datePickerUpdateLocale(locale).then(changeDateFormat);

  return (
    <>
      {label && (
        <Label htmlFor={id}>
          <Box marginBottom={2}>
            <Text size="sm">{label}</Text>
          </Box>
        </Label>
      )}
      <DatePicker
        customInput={customInput}
        dateFormat={dateFormat}
        disabled={disabled}
        excludeDates={excludeDates}
        id={id}
        includeDates={includeDates}
        maxDate={selectsEnd ? maxDate : endDate || maxDate}
        minDate={selectsStart ? minDate : startDate || minDate}
        nextMonthButtonLabel={nextMonthButtonLabel}
        locale={locale}
        onChange={handleChange}
        onMonthChange={handleMonthChange}
        placeholderText={placeholder}
        popperClassName={`react-datepicker-popper-${popperPlacement[idealDirection]}`}
        popperPlacement={popperPlacement[idealDirection]}
        previousMonthButtonLabel={previousMonthButtonLabel}
        ref={pickerRef}
        selected={selected}
        selectsEnd={selectsEnd}
        selectsStart={selectsStart}
        showPopperArrow={false}
        startDate={startDate}
        endDate={endDate}
      />
      {(!!errorMessage || !!helperText) && (
        <Box marginTop={2}>
          <Text color={errorMessage ? 'red' : 'gray'} size="sm">
            {errorMessage || helperText}
          </Text>
        </Box>
      )}
    </>
  );
}
