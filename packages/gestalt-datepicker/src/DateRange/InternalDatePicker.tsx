import { forwardRef, ReactElement, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { Icon, useDeviceType } from 'gestalt';
import { Props } from '../DatePicker';
import styles from '../DatePicker.css';
import { DateRangeType } from '../DateRange';

type ModifiedProps = Props & {
  onChange: (arg1: { startDate: Date; endDate: Date }) => void;
  selectedRange: DateRangeType;
  secondaryRangeStartDate?: Date | null;
  secondaryRangeEndDate?: Date | null;
};

const InternalDatePickerWithForwardRef = forwardRef<HTMLInputElement, ModifiedProps>(
  function InternalDatePicker(
    {
      excludeDates,
      id,
      includeDates,
      localeData,
      maxDate,
      minDate,
      onChange,
      rangeEndDate,
      rangeStartDate,
      secondaryRangeStartDate,
      secondaryRangeEndDate,
      selectedRange,
    }: ModifiedProps,
    ref,
  ): ReactElement {
    const innerInputRef = useRef<null | HTMLInputElement>(null);
    const deviceType = useDeviceType();
    const isMobile = deviceType === 'mobile';

    // @ts-expect-error - TS2322 - Type 'HTMLInputElement | null' is not assignable to type 'HTMLInputElement'.
    useImperativeHandle(ref, () => innerInputRef.current);

    // We keep month in state to trigger a re-render when month changes since height will vary by where days fall
    // in the month and we need to keep the popover pointed at the input correctly
    const [, setMonth] = useState<number | null | undefined>();
    const [format, setFormat] = useState<string | null | undefined>();
    const [updatedLocale, setUpdatedLocale] = useState<string | null | undefined>();

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

    function getDatesArray(startDate: Date, endDate: Date) {
      // Ensure the input dates are valid Date objects
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Check if the start date is after the end date
      if (start > end) {
        return [];
      }

      const dates = [];
      const currentDate = start;

      // Loop through all dates from start to end
      while (currentDate <= end) {
        // Push the current date to the array
        dates.push(new Date(currentDate));
        // Increment the current date by one day
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dates;
    }

    function generateHighliths(
      startDate: Date | null | undefined,
      endDate: Date | null | undefined,
    ) {
      const datesArray = startDate && endDate ? getDatesArray(startDate, endDate) : [];
      return [
        {
          'react-datepicker__day--in-range-secondary': datesArray,
        },
      ];
    }

    return (
      <div className="_gestalt">
        <div className={isMobile ? undefined : '_gestalt_daterange'}>
          {/* @ts-expect-error - TS2769 - No overload matches this call. | TS2786 - 'ReactDatePicker' cannot be used as a JSX component. */}
          <ReactDatePicker
            ref={(refElement) => {
              if (!innerInputRef || !refElement) {
                return null;
              }

              // @ts-expect-error - TS2339 - Property 'input' does not exist on type 'ReactDatePicker<true, undefined>'.
              innerInputRef.current = refElement.input;

              return null;
            }}
            calendarClassName={styles['react-datepicker-inline']}
            dateFormat={format}
            dayClassName={() => styles['react-datepicker__days']}
            endDate={
              selectedRange === DateRangeType.Primary
                ? rangeEndDate ?? undefined
                : secondaryRangeEndDate ?? undefined
            }
            excludeDates={excludeDates && [...excludeDates]}
            highlightDates={
              selectedRange === DateRangeType.Primary
                ? generateHighliths(secondaryRangeStartDate, secondaryRangeEndDate)
                : generateHighliths(rangeStartDate, rangeEndDate)
            }
            id={id}
            includeDates={includeDates && [...includeDates]}
            inline
            locale={updatedLocale}
            maxDate={maxDate}
            minDate={minDate}
            monthsShown={isMobile ? 1 : 2}
            nextMonthButtonLabel={
              <Icon accessibilityLabel="" color="default" icon="arrow-forward" size={16} />
            }
            onChange={(value) => {
              const [startDate, endDate] = value;
              // @ts-expect-error - TS2769 - No overload matches this call.
              onChange({ startDate, endDate });
            }}
            onMonthChange={(newMonth: Date) => setMonth(newMonth.getMonth())}
            previousMonthButtonLabel={
              <Icon accessibilityLabel="" color="default" icon="arrow-back" size={16} />
            }
            selected={
              selectedRange === DateRangeType.Primary
                ? rangeStartDate ?? undefined
                : secondaryRangeStartDate ?? undefined
            }
            selectsRange
            startDate={
              selectedRange === DateRangeType.Primary
                ? rangeStartDate ?? undefined
                : secondaryRangeStartDate ?? undefined
            }
          />
        </div>
      </div>
    );
  },
);

InternalDatePickerWithForwardRef.displayName = 'InternalDatePicker';

export default InternalDatePickerWithForwardRef;
