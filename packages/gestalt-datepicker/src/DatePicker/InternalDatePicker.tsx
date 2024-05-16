import {ReactElement, forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { Box, Icon, Label, Text } from 'gestalt';
import DatePickerTextField from './TextInput';
import { Props } from '../DatePicker';
import styles from '../DatePicker.css';

const InternalDatePickerWithForwardRef = forwardRef<HTMLInputElement, Props>(function InternalDatePicker(
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
    value: controlledValue,
  }: Props,
  ref,
): Element<"div"> {
  const innerInputRef = useRef<null | HTMLInputElement>(null);
  useImperativeHandle(ref, () => innerInputRef.current);

  // This state is only used if the component is uncontrolled or value === undefined. If uncontrolled, DatePicker manages the selected Date value internally
  const [uncontrolledValue, setUncontrolledValue] = useState<Date | null | undefined>(null);
  // We keep month in state to trigger a re-render when month changes since height will vary by where days fall
  // in the month and we need to keep the popover pointed at the input correctly
  const [, setMonth] = useState<number | null | undefined>();
  const [format, setFormat] = useState<string | null | undefined>();
  const [updatedLocale, setUpdatedLocale] = useState<string | null | undefined>();
  const [initRangeHighlight, setInitRangeHighlight] = useState<Date | null | undefined>();

  useEffect(() => {
    if (rangeSelector) {
      setInitRangeHighlight(rangeStartDate || rangeEndDate);
    }
  }, [rangeStartDate, rangeEndDate, rangeSelector]);

  useEffect(() => {
    if (localeData && localeData.code) {
      registerLocale(localeData.code, localeData);
      setUpdatedLocale(localeData.code);
      setFormat(
        localeData?.formatLong
          ?.date({ width: 'short' })
          .replace(/(y{1,4})/, 'yyyy')
          .replace(/(d{1,2})/, 'dd')
          .replace(/(M{1,2})/, 'MM') ?? 'MM/dd/yyyy',
      );
    }
  }, [localeData]);

  const popperPlacement = {
    up: 'top',
    right: 'right',
    down: 'bottom',
    left: 'left',
  } as const;

  const updateNextRef = (submitted: boolean) => {
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
    (<div className="_gestalt">
      {label && (
        <Label htmlFor={id}>
          <Box marginBottom={2}>
            <Text size="100">{label}</Text>
          </Box>
        </Label>
      )}
      <ReactDatePicker
        ref={(refElement) => {
          if (!innerInputRef || !refElement) {
            return null;
          }

          innerInputRef.current = refElement.input;

          return null;
        }}
        calendarClassName={styles['react-datepicker']}
        customInput={
          <DatePickerTextField
            errorMessage={errorMessage}
            helperText={helperText}
            id={id}
            name={name}
          />
        }
        dateFormat={format}
        dayClassName={() => styles['react-datepicker__days']}
        disabled={disabled}
        dropdownMode="select"
        endDate={rangeEndDate ?? undefined}
        excludeDates={excludeDates && [...excludeDates]}
        highlightDates={initRangeHighlight ? [initRangeHighlight] : []}
        id={id}
        includeDates={includeDates && [...includeDates]}
        locale={updatedLocale}
        maxDate={rangeSelector === 'end' ? maxDate : rangeEndDate || maxDate}
        minDate={rangeSelector === 'start' ? minDate : rangeStartDate || minDate}
        nextMonthButtonLabel={
          <Icon accessibilityLabel="" color="default" icon="arrow-forward" size={16} />
        }
        onChange={(value: Date, event: React.ChangeEvent<HTMLInputElement>) => {
          if (controlledValue === undefined) setUncontrolledValue(value);
          onChange({ event, value });
          updateNextRef(event.type === 'click');
        }}
        onKeyDown={(event) => updateNextRef(event.key === 'Enter')}
        onMonthChange={(newMonth: Date) => setMonth(newMonth.getMonth())}
        placeholderText={placeholder ?? format?.toUpperCase()}
        popperClassName={styles['react-datepicker-popper']}
        popperPlacement={popperPlacement[idealDirection]}
        previousMonthButtonLabel={
          <Icon accessibilityLabel="" color="default" icon="arrow-back" size={16} />
        }
        selected={controlledValue ?? uncontrolledValue}
        selectsEnd={rangeSelector === 'end'}
        selectsStart={rangeSelector === 'start'}
        showMonthDropdown={selectLists?.includes('month')}
        showPopperArrow={false}
        showYearDropdown={selectLists?.includes('year')}
        startDate={rangeStartDate ?? undefined}
      />
    </div>)
  );
});

InternalDatePickerWithForwardRef.displayName = 'InternalDatePicker';

export default InternalDatePickerWithForwardRef;
