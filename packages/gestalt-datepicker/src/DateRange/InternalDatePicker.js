// @flow strict-local
import {
  type AbstractComponent,
  type Element,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { Icon, useDeviceType } from 'gestalt';
import styles from '../DatePicker.css';
import { type Props } from '../DatePicker.js';

type ModifiedProps = {|
  ...Props,
  onChange: ({| startDate: Date, endDate: Date |}) => void,
|};

const InternalDatePickerWithForwardRef: AbstractComponent<ModifiedProps, HTMLInputElement> =
  forwardRef<ModifiedProps, HTMLInputElement>(function InternalDatePicker(
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
  ): Element<'div'> {
    const innerInputRef = useRef<null | HTMLInputElement>(null);
    const deviceType = useDeviceType();
    const isMobile = deviceType === 'mobile';

    useImperativeHandle(ref, () => innerInputRef.current);

    // We keep month in state to trigger a re-render when month changes since height will vary by where days fall
    // in the month and we need to keep the popover pointed at the input correctly
    const [, setMonth] = useState<?number>();
    const [format, setFormat] = useState<?string>();
    const [updatedLocale, setUpdatedLocale] = useState<?string>();
    const [initRangeHighlight, setInitRangeHighlight] = useState<?Date>();

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
          <ReactDatePicker
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
              onChange({ startDate, endDate });
            }}
            onMonthChange={(newMonth: Date) => setMonth(newMonth.getMonth())}
            previousMonthButtonLabel={
              <Icon accessibilityLabel="" color="default" icon="arrow-back" size={16} />
            }
            ref={(refElement) => {
              if (!innerInputRef || !refElement) {
                return null;
              }

              innerInputRef.current = refElement.input;

              return null;
            }}
            selected={rangeStartDate ?? undefined}
            selectsRange
            startDate={rangeStartDate ?? undefined}
          />
        </div>
      </div>
    );
  });

InternalDatePickerWithForwardRef.displayName = 'InternalDatePicker';

export default InternalDatePickerWithForwardRef;
