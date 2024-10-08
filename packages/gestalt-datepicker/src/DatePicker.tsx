import {
  forwardRef,
  Fragment,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Locale } from 'date-fns/locale';
import {
  Button,
  Flex,
  Layer,
  SheetMobile,
  useDefaultLabel,
  useDeviceType,
  useGlobalEventsHandler,
} from 'gestalt';
import InternalDatePicker from './DatePicker/InternalDatePicker';

interface Indexable {
  index(): number;
}

export type Props = {
  /**
   *  When disabled, DatePicker looks inactive and cannot be interacted with. See the [disabled example](https://gestalt.pinterest.systems/web/datepicker#States) to learn more.
   */
  disabled?: boolean;
  /**
   * Provide feedback when an error on selection occurs. See the [error message example](https://gestalt.pinterest.systems/web/datepicker#States) to learn more.
   */
  errorMessage?: string;
  /**
   * Array of disabled dates. Datepicker can be interacted with except for the dates passed which look inactive and cannot be selected. See the [disable selected dates example](https://gestalt.pinterest.systems/web/datepicker#Disabled-dates) to learn more.
   */
  excludeDates?: ReadonlyArray<Date>;
  /**
   * More information about how to complete the DatePicker field. See the [helper text example](https://gestalt.pinterest.systems/web/datepicker#Helper-text) to learn more.
   */
  helperText?: string;
  /**
   * A unique identifier for the input.
   */
  id: string;
  /**
   * Preferred direction for the calendar popover to open. See the [ideal direction example](https://gestalt.pinterest.systems/web/datepicker#idealDirection) to learn more.
   */
  idealDirection?: 'up' | 'right' | 'down' | 'left';
  /**
   * Array of enabled dates. Datepicker can be interacted with only on the dates passed, all other dates look inactive and cannot be selected. See the [disable selected dates example](https://gestalt.pinterest.systems/web/datepicker#Disabled-dates) to learn more.
   */
  includeDates?: ReadonlyArray<Date>;
  /**
   * Provide a label to identify the DatePicker field.
   */
  label?: string;
  /**
   * DatePicker accepts imported locales from the open source date utility library date-fns. See the [locales example](https://gestalt.pinterest.systems/web/datepicker#localeData) to learn more.
   */
  localeData?: Locale;
  /**
   * Disable dates outside a max date. See the [disable future and past example](https://gestalt.pinterest.systems/web/datepicker#Disabled-dates) to learn more.
   */
  maxDate?: Date;
  /**
   * Disable dates outside a min date.  See the [disable future and past example](https://gestalt.pinterest.systems/web/datepicker#Disabled-dates) to learn more.
   */
  minDate?: Date;
  /**
   * A unique name for the input.
   */
  name?: string;
  /**
   * Required for date range selection. Pass the complimentary range date picker ref object to DatePicker to autofocus on the unselected date range field. See the [date range picker example](https://gestalt.pinterest.systems/web/datepicker#Date-range) to learn more.
   */
  nextRef?: {
    current: null | HTMLInputElement;
  };
  /**
   * Callback triggered when the user selects a date.
   */
  onChange: (arg1: { event: React.ChangeEvent<HTMLInputElement>; value: Date | null }) => void;
  /**
   * Placeholder text shown if the user has not yet input a value. The default placeholder value shows the date format for each locale, e.g. MM/DD/YYYY.
   */
  placeholder?: string;
  /**
   * An object representing the zIndex value of the SheetMobile where DatePicker is built upon on mobile. Learn more about [zIndex classes](https://gestalt.pinterest.systems/web/zindex_classes)
   */
  mobileZIndex?: Indexable;
  /**
   * Required for date range selection. End date on a date range selection. See the [date range example](https://gestalt.pinterest.systems/web/datepicker#Date-range) to learn more.
   */
  rangeEndDate?: Date | null;
  /**
   * Required for date range selection. Defines the datepicker start/end role in a date range selection.See the [date range picker example](https://gestalt.pinterest.systems/web/datepicker#Date-range) to learn more.
   */
  rangeSelector?: 'start' | 'end';
  /**
   * Required for date range selection. Start date on a date range selection. See the [date range picker example](https://gestalt.pinterest.systems/web/datepicker#Date-range) to learn more.
   */
  rangeStartDate?: Date | null;
  /**
   * Indicate if the input is readOnly. See the [readOnly example](https://gestalt.pinterest.systems/web/textfield#Read-only) for more details.
   */
  readOnly?: boolean;
  /**
   * Required for date range selection. Pass a ref object to DatePicker to autofocus on the unselected date range field. See the [date range picker example](https://gestalt.pinterest.systems/web/datepicker#Date-range) to learn more.
   */
  ref?: ReactElement;
  /**
   * Show a select list for quick selection of year and/or month. See the [selectLists variant](https://gestalt.pinterest.systems/web/datepicker#Select-list) to learn more.
   */
  selectLists?: ReadonlyArray<'month' | 'year'>;
  /**
   * DatePicker can be a controlled component. `value` sets the current value of the input. See the [controlled component date example](https://gestalt.pinterest.systems/web/datepicker#Controlled-component) to learn more.
   */
  value?: Date | null;
};

/**
 * [DatePicker](https://gestalt.pinterest.systems/web/datepicker) is used when the user has to select a date or date range.
 * DatePicker is distributed in its own package and must be installed separately.
 *
 * ![DatePicker closed light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DatePicker-closed.spec.ts-snapshots/DatePicker-closed-chromium-darwin.png)
 * ![DatePicker closed dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DatePicker-closed-dark.spec.ts-snapshots/DatePicker-closed-dark-chromium-darwin.png)
 */

const DatePickerWithForwardRef = forwardRef<HTMLInputElement, Props>(function DatePicker(
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
    mobileZIndex,
    name,
    nextRef,
    onChange,
    placeholder,
    rangeEndDate,
    rangeSelector,
    rangeStartDate,
    readOnly,
    selectLists,
    value,
  }: Props,
  ref,
) {
  const innerInputRef = useRef<null | HTMLInputElement>(null);
  // @ts-expect-error - TS2322 - Type 'HTMLInputElement | null' is not assignable to type 'HTMLInputElement'.
  useImperativeHandle(ref, () => innerInputRef.current);

  // Consume GlobalEventsHandlerProvider
  const { datePickerHandlers } = useGlobalEventsHandler() ?? {
    datePickerHandlers: undefined,
  };

  const { accessibilityDismissButtonLabel, dismissButton } = useDefaultLabel('DatePicker');

  const [showMobileCalendar, setShowMobileCalendar] = useState<boolean>(false);

  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  useEffect(() => {
    if (datePickerHandlers?.onRender) datePickerHandlers?.onRender();
  }, [datePickerHandlers]);

  if (isMobile) {
    return (
      <Fragment>
        <InternalDatePicker
          ref={innerInputRef}
          errorMessage={errorMessage}
          excludeDates={excludeDates}
          id={id}
          idealDirection={idealDirection}
          includeDates={includeDates}
          inputOnly
          localeData={localeData}
          maxDate={maxDate}
          minDate={minDate}
          nextRef={nextRef}
          onChange={onChange}
          onFocus={() => setShowMobileCalendar(true)}
          rangeEndDate={rangeEndDate}
          rangeSelector={rangeSelector}
          rangeStartDate={rangeStartDate}
          selectLists={selectLists}
          value={value}
        />
        {showMobileCalendar ? (
          <Layer zIndex={mobileZIndex}>
            <SheetMobile
              footer={
                <SheetMobile.DismissingElement>
                  {({ onDismissStart }) => (
                    <Flex
                      alignItems="center"
                      direction="column"
                      gap={4}
                      justifyContent="center"
                      width="100%"
                    >
                      <Button
                        accessibilityLabel={accessibilityDismissButtonLabel}
                        color="gray"
                        onClick={() => onDismissStart()}
                        size="lg"
                        text={dismissButton}
                      />
                    </Flex>
                  )}
                </SheetMobile.DismissingElement>
              }
              heading=""
              onDismiss={() => setShowMobileCalendar(false)}
              padding="none"
              showDismissButton={false}
              size="auto"
            >
              <SheetMobile.DismissingElement>
                {({ onDismissStart }) => (
                  <Flex
                    alignItems="center"
                    direction="column"
                    gap={4}
                    justifyContent="center"
                    width="100%"
                  >
                    <InternalDatePicker
                      errorMessage={errorMessage}
                      excludeDates={excludeDates}
                      id={id}
                      idealDirection={idealDirection}
                      includeDates={includeDates}
                      inline
                      localeData={localeData}
                      maxDate={maxDate}
                      minDate={minDate}
                      nextRef={nextRef}
                      onChange={onChange}
                      onSelect={() => onDismissStart()}
                      rangeEndDate={rangeEndDate}
                      rangeSelector={rangeSelector}
                      rangeStartDate={rangeStartDate}
                      selectLists={selectLists}
                      value={value}
                    />
                  </Flex>
                )}
              </SheetMobile.DismissingElement>
            </SheetMobile>
          </Layer>
        ) : null}
      </Fragment>
    );
  }

  return (
    <InternalDatePicker
      ref={innerInputRef}
      disabled={disabled}
      errorMessage={errorMessage}
      excludeDates={excludeDates}
      helperText={helperText}
      id={id}
      idealDirection={idealDirection}
      includeDates={includeDates}
      label={label}
      localeData={localeData}
      maxDate={maxDate}
      minDate={minDate}
      name={name}
      nextRef={nextRef}
      onChange={onChange}
      placeholder={placeholder}
      rangeEndDate={rangeEndDate}
      rangeSelector={rangeSelector}
      rangeStartDate={rangeStartDate}
      readOnly={readOnly}
      selectLists={selectLists}
      value={value}
    />
  );
});

DatePickerWithForwardRef.displayName = 'DatePicker';

export default DatePickerWithForwardRef;
