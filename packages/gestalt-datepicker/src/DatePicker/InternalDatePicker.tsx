import {
  ComponentProps,
  forwardRef,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { limitShift, shift } from '@floating-ui/react';
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

type InternalProps = Props & {
  inline?: ComponentProps<typeof ReactDatePicker>['inline'];
  inputOnly?: boolean;
  onFocus?: () => void;
  onSelect?: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MyNoContainer({ className, children }: { className: string; children: ReactElement }) {
  return <div />;
}

const InternalDatePickerWithForwardRef = forwardRef<HTMLInputElement, InternalProps>(
  function InternalDatePicker(
    {
      disabled,
      inline = false,
      inputOnly = false,
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
      onFocus,
      onSelect,
      placeholder,
      rangeEndDate,
      rangeSelector,
      rangeStartDate,
      readOnly,
      selectLists,
      size,
      value: controlledValue,
    }: InternalProps,
    ref,
  ): ReactElement {
    const innerRef = useRef<null | HTMLInputElement>(null);

    // @ts-expect-error - TS2322 - Type 'HTMLDivElement | HTMLInputElement | null' is not assignable to type 'HTMLInputElement'.
    useImperativeHandle(ref, () => innerRef.current);

    const { nextMonth, previousMonth } = useDefaultLabel('DatePicker');

    const isInVRExperiment = useDangerouslyInGestaltExperiment({
      webExperimentName: 'web_gestalt_visualrefresh',
      mwebExperimentName: 'web_gestalt_visualrefresh',
    });
    // This state is only used if the component is uncontrolled or value === undefined. If uncontrolled, DatePicker manages the selected Date value internally
    const [uncontrolledValue, setUncontrolledValue] = useState<Date | null | undefined>(null);
    // We keep month in state to trigger a re-render when month changes since height will vary by where days fall
    // in the month and we need to keep the popover pointed at the input correctly
    const [, setMonth] = useState<number | null | undefined>();
    const [format, setFormat] = useState<string | undefined>();
    const [updatedLocale, setUpdatedLocale] =
      useState<ComponentProps<typeof ReactDatePicker>['locale']>();
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
        {label && !isInVRExperiment && !inline && (
          <Label htmlFor={id}>
            <Box marginBottom={2}>
              <Text size="100">{label}</Text>
            </Box>
          </Label>
        )}
        <ReactDatePicker
          calendarClassName={
            inline ? styles['react-datepicker-inline'] : styles['react-datepicker']
          }
          calendarContainer={inputOnly ? MyNoContainer : undefined}
          customInput={
            <DateInput
              ref={innerRef}
              errorMessage={errorMessage}
              helperText={helperText}
              id={id}
              label={label}
              name={name}
              onPassthroughFocus={inputOnly ? onFocus : undefined}
              readOnly={readOnly}
              size={size}
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
          inline={inline}
          locale={updatedLocale}
          maxDate={rangeSelector === 'end' ? maxDate : rangeEndDate || maxDate}
          minDate={rangeSelector === 'start' ? minDate : rangeStartDate || minDate}
          nextMonthButtonLabel={
            <Icon accessibilityLabel={nextMonth} color="default" icon="arrow-forward" size={16} />
          }
          onChange={(
            value: Date | null,
            event:
              | React.MouseEvent<HTMLElement, MouseEvent>
              | React.KeyboardEvent<HTMLElement>
              | undefined,
          ) => {
            if (controlledValue === undefined) setUncontrolledValue(value);
            onChange({ event, value });
            if (event?.type === 'click') {
              nextRef?.current?.focus();
              onSelect?.();
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
          popperModifiers={[
            shift({
              padding: 8,
              limiter: limitShift({
                offset: 5,
              }),
            }),
          ]}
          popperPlacement={popperPlacement[idealDirection] ?? idealDirection}
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
