import { forwardRef, ReactElement, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import {
  Box,
  Icon,
  Label,
  Text,
  useDangerouslyInGestaltExperiment,
  useDefaultLabel,
} from 'gestalt';
import DateInput from './DateInput';
import { Props } from '../DatePicker';
import styles from '../DatePicker.css';

const InternalDatePickerWithForwardRef = forwardRef<HTMLInputElement, Props>(
  function InternalDatePicker(
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
      readOnly,
      selectLists,
      value: controlledValue,
    }: Props,
    ref,
  ): ReactElement {
    const innerRef = useRef<null | HTMLInputElement>(null);

    // @ts-expect-error - TS2322 - Type 'HTMLDivElement | HTMLInputElement | null' is not assignable to type 'HTMLInputElement'.
    useImperativeHandle(ref, () => innerRef.current);

    const { nextMonth, previousMonth } = useDefaultLabel('DatePicker');

    const isInVRExperiment = useDangerouslyInGestaltExperiment({
      webExperimentName: 'web_gestalt_visualRefresh',
      mwebExperimentName: 'web_gestalt_visualRefresh',
    });
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

    return (
      <div className="_gestalt">
        {label && !isInVRExperiment && (
          <Label htmlFor={id}>
            <Box marginBottom={2}>
              <Text size="100">{label}</Text>
            </Box>
          </Label>
        )}
        {/* @ts-expect-error - TS2769 - No overload matches this call. | TS2786 - 'ReactDatePicker' cannot be used as a JSX component. */}
        <ReactDatePicker
          calendarClassName={styles['react-datepicker']}
          customInput={
            <DateInput
              ref={innerRef}
              errorMessage={errorMessage}
              helperText={helperText}
              id={id}
              label={label}
              name={name}
              readOnly={readOnly}
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
            <Icon accessibilityLabel={nextMonth} color="default" icon="arrow-forward" size={16} />
          }
          onChange={(value: Date, event: React.ChangeEvent<HTMLInputElement>) => {
            if (controlledValue === undefined) setUncontrolledValue(value);
            onChange({ event, value });
            if (event.type === 'click') {
              nextRef?.current?.focus();
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              nextRef?.current?.focus();
            }
          }}
          onMonthChange={(newMonth: Date) => setMonth(newMonth.getMonth())}
          placeholderText={placeholder ?? format?.toUpperCase()}
          popperClassName={styles['react-datepicker-popper']}
          popperPlacement={popperPlacement[idealDirection]}
          previousMonthButtonLabel={
            <Icon accessibilityLabel={previousMonth} color="default" icon="arrow-back" size={16} />
          }
          readOnly={readOnly}
          selected={controlledValue ?? uncontrolledValue}
          selectsEnd={rangeSelector === 'end'}
          selectsStart={rangeSelector === 'start'}
          showMonthDropdown={selectLists?.includes('month')}
          showPopperArrow={false}
          showYearDropdown={selectLists?.includes('year')}
          startDate={rangeStartDate ?? undefined}
        />
      </div>
    );
  },
);

InternalDatePickerWithForwardRef.displayName = 'InternalDatePicker';

export default InternalDatePickerWithForwardRef;
