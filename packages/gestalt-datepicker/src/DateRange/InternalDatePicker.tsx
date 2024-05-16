import { forwardRef, ReactElement, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { Icon, useDeviceType } from 'gestalt';
import { Props } from '../DatePicker';
import styles from '../DatePicker.css';

type ModifiedProps = Props & {
  onChange: (arg1: { startDate: Date; endDate: Date }) => void;
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
    const [initRangeHighlight, setInitRangeHighlight] = useState<Date | null | undefined>();

    useEffect(() => {
      setInitRangeHighlight(rangeStartDate || rangeEndDate);
    }, [rangeStartDate, rangeEndDate]);

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
            endDate={rangeEndDate ?? undefined}
            excludeDates={excludeDates && [...excludeDates]}
            highlightDates={initRangeHighlight ? [initRangeHighlight] : []}
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
            selected={rangeStartDate ?? undefined}
            selectsRange
            startDate={rangeStartDate ?? undefined}
          />
        </div>
      </div>
    );
  },
);

InternalDatePickerWithForwardRef.displayName = 'InternalDatePicker';

export default InternalDatePickerWithForwardRef;
