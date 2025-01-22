import { Children, ReactElement, useEffect, useId, useState } from 'react';
import classnames from 'classnames';
import { Locale } from 'date-fns/locale';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  TapArea,
  Text,
  useDefaultLabel,
  useDeviceType,
  useGlobalEventsHandler,
} from 'gestalt';
import InternalDateField from './DateField/InternalDateField';
import borderStyles from './DateRange.css';
import InternalDatePicker from './DateRange/InternalDatePicker';

const MOBILE_DATEFIELD_WIDTH = 171;
const DATEFIELD_WIDTH = 280;

type Props = {
  /**
   * DateRange accepts imported locales from the open source date utility library date-fns. See the [locales variant](https://gestalt.pinterest.systems/web/datefield#localeData) to learn more.
   */
  localeData?: Locale;
  /**
   * Maximal selectable date. Disables any date values after the provided date. See the [disable future and past variant](https://gestalt.pinterest.systems/web/datefield#Disable-past-and-future-dates) to learn more.
   */
  maxDate?: Date;
  /**
   * Minimal selectable date. Disables any date values before the provided date.  See the [disable future and past variant](https://gestalt.pinterest.systems/web/datefield#Disable-past-and-future-dates) to learn more.
   */
  minDate?: Date;
  /**
   * Callback triggered when the user clicks the Cancel button to not persist the selected dates. It should be used to close DateRange. See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  onCancel?: () => void;
  /**
   * Callback triggered when the start date or end date input loses focus. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onDateBlur?: {
    startDate: (args: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
    endDate: (args: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  };
  /**
   * Callback triggered when the start date or end date secondary input loses focus. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onSecondaryDateBlur?: {
    startDate: (args: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
    endDate: (args: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  };
  /**
   * DateField is a controlled component. `onDateChange` is the  callback triggered when the start date value changes. Should be used to modify the controlled value. See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  onDateChange: (startDate: { value: Date | null }, endDate: { value: Date | null }) => void;
  /**
   * DateField is a controlled component. `onSecondaryDateChange` is the callback triggered when the start date value changes. Should be used to modify the controlled value. See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  onSecondaryDateChange?: (
    startDate: { value: Date | null },
    endDate: { value: Date | null },
  ) => void;
  /**
   * Callback triggered when the start date or end date values entered are invalid. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onDateError?: {
    startDate: (args: { errorMessage: string; value: Date | null }) => void;
    endDate: (args: { errorMessage: string; value: Date | null }) => void;
  };
  /**
   * Callback triggered when the secondary start date or secondary end date values entered are invalid. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onSecondaryDateError?: {
    startDate: (args: { errorMessage: string; value: Date | null }) => void;
    endDate: (args: { errorMessage: string; value: Date | null }) => void;
  };
  /**
   * Callback triggered when the user focus on the start date or end date input DateFields. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onDateFocus?: {
    startDate: (args: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
    endDate: (args: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  };
  /**
   * Callback triggered when the user focus on the start date or end date secondary input DateFields. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onSecondaryDateFocus?: {
    startDate: (args: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
    endDate: (args: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  };
  /**
   * Callback triggered when the user clicks the Apply button to persist the selected dates. It should be used to persist the dates selected and close the DateRange. See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  onSubmit?: () => void;
  /**
   * An optional RadioGroup to provide preestablished date range options. See the [with RadioGroup variant](https://gestalt.pinterest.systems/web/daterange#With-RadioGroup) to learn more.
   */
  radioGroup?: ReactElement;
  /**
   * DateRange is a controlled component. `dateValue` sets the value of the start date and end date.  See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  dateValue: { startDate: Date | null; endDate: Date | null };
  /**
   * DateRange is a controlled component. `secondaryDateValue` sets the value of the start date and end date.  See the [secondary date range variant](https://gestalt.pinterest.systems/web/daterange#Secondary-date-range) to learn more.
   */
  secondaryDateValue?: { startDate: Date | null; endDate: Date | null };
  /**
   * Customize your error message for the cases the user enters invalid dates. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  dateErrorMessage?: { startDate: string | null; endDate: string | null };
  /**
   * Customize your error message for the cases the user enters invalid dates. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  secondaryDateErrorMessage?: { startDate: string | null; endDate: string | null };
  /**
   * Prevents the user from changing the date values from the date fields (not from interacting with the fields).    */
  readOnly?: boolean;
};

enum DateRangeType {
  Primary,
  Secondary,
}

type DateInputProps = {
  key: DateRangeType;
  dateValues: Props['dateValue'];
  onDateChangeEvent: Props['onDateChange'];
  errorMessages?: Props['dateErrorMessage'];
  onDateBlurEvent?: Props['onDateBlur'];
  onDateErrorEvent?: Props['onDateError'];
  onDateFocusEvent?: Props['onDateFocus'];
};

function getDateInputProps(props: Props): Array<DateInputProps> {
  const dateInputs: Array<DateInputProps> = [];

  const primaryRange = {
    key: DateRangeType.Primary,
    dateValues: props.dateValue,
    onDateChangeEvent: props.onDateChange,
    errorMessages: props.dateErrorMessage,
    onDateBlurEvent: props.onDateBlur,
    onDateErrorEvent: props.onDateError,
    onDateFocusEvent: props.onDateFocus,
  };
  dateInputs.push(primaryRange);

  if (props.secondaryDateValue && props.onSecondaryDateChange) {
    const secondaryRange = {
      key: DateRangeType.Secondary,
      dateValues: props.secondaryDateValue,
      onDateChangeEvent: props.onSecondaryDateChange,
      errorMessages: props.secondaryDateErrorMessage,
      onDateBlurEvent: props.onSecondaryDateBlur,
      onDateErrorEvent: props.onSecondaryDateError,
      onDateFocusEvent: props.onSecondaryDateFocus,
    };
    dateInputs.push(secondaryRange);
  }

  return dateInputs;
}

/**
 * [DateRange](https://gestalt.pinterest.systems/web/daterange) enables users to preview and select a range of days by picking dates from a calendar or adding a text input.
 * DateRange is distributed in its own package and must be installed separately.
 *
 * ![DateRange light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange.spec.ts-snapshots/DateRange-chromium-darwin.png)
 * ![DateRange dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange-dark.spec.ts-snapshots/DateRange-dark-chromium-darwin.png)
 */
function DateRange({
  localeData,
  maxDate,
  minDate,
  onCancel,
  onDateChange,
  onDateError,
  onDateFocus,
  onDateBlur,
  onSubmit,
  radioGroup,
  dateValue,
  dateErrorMessage,
  secondaryDateValue,
  secondaryDateErrorMessage,
  onSecondaryDateBlur,
  onSecondaryDateChange,
  onSecondaryDateError,
  onSecondaryDateFocus,
  readOnly,
}: Props) {
  const componentId = useId();
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const [selectedRange, setSelectedRange] = useState<DateRangeType>(DateRangeType.Primary);

  // Consume GlobalEventsHandlerProvider
  const { dateRangeHandlers } = useGlobalEventsHandler() ?? {
    dateRangeHandlers: undefined,
  };

  useEffect(() => {
    if (dateRangeHandlers?.onRender) dateRangeHandlers?.onRender();
  }, [dateRangeHandlers]);

  useEffect(() => {
    if (secondaryDateValue === undefined) {
      setSelectedRange(DateRangeType.Primary);
    }
  }, [secondaryDateValue]);

  if (!dateValue.startDate && dateValue.endDate) {
    onDateChange({ value: null }, { value: null });
  }
  if (
    secondaryDateValue &&
    onSecondaryDateChange &&
    !secondaryDateValue.startDate &&
    secondaryDateValue.endDate
  ) {
    onSecondaryDateChange({ value: null }, { value: null });
  }

  const { applyText, cancelText } = useDefaultLabel('DateRange');

  const dateInputs = getDateInputProps({
    onCancel,
    onDateChange,
    onDateError,
    onDateFocus,
    onDateBlur,
    onSubmit,
    dateValue,
    dateErrorMessage,
    secondaryDateValue,
    secondaryDateErrorMessage,
    onSecondaryDateBlur,
    onSecondaryDateChange,
    onSecondaryDateError,
    onSecondaryDateFocus,
  });

  return (
    <Box borderStyle="shadow" color="default" display="inlineBlock" minHeight={425} rounding={4}>
      <Flex>
        {radioGroup &&
        // @ts-expect-error - TS2339
        Children.only<ReactElement>(radioGroup).type.displayName === 'RadioGroup' &&
        !isMobile ? (
          <div className={borderStyles.borderRight}>
            <Box minWidth={216} paddingX={6} paddingY={4}>
              {radioGroup}
            </Box>
          </div>
        ) : null}
        <Box>
          <Flex alignItems="stretch" direction="column">
            {dateInputs.map(
              ({
                key,
                dateValues,
                errorMessages,
                onDateChangeEvent,
                onDateBlurEvent,
                onDateErrorEvent,
                onDateFocusEvent,
              }) => {
                const { startDate, endDate } = dateValues;
                const isInputSelected = selectedRange === key;
                const shouldHighlight = secondaryDateValue && isInputSelected;
                const multipleRanges = dateInputs.length > 1;

                return (
                  <div
                    key={key}
                    className={classnames(borderStyles.dateFieldSection, {
                      [borderStyles.dateFieldSectionActive]: shouldHighlight,
                      [borderStyles.dateFieldSectionTopLeftBorder]: !radioGroup,
                    })}
                  >
                    <div
                      className={classnames({
                        [borderStyles.dateFieldSectionLeftBorder]: shouldHighlight,
                      })}
                    />
                    <TapArea disabled={!multipleRanges} onTap={() => setSelectedRange(key)}>
                      <Flex gap={3}>
                        <Box width={isMobile ? MOBILE_DATEFIELD_WIDTH : DATEFIELD_WIDTH}>
                          <InternalDateField
                            autoComplete="off"
                            errorMessage={errorMessages?.startDate}
                            id={`datefield-start-${key}-${componentId}`}
                            localeData={localeData}
                            maxDate={maxDate}
                            minDate={minDate}
                            mobileEnterKeyHint="enter"
                            onBlur={onDateBlurEvent?.startDate}
                            onChange={({ value }) => {
                              if (isInputSelected && (value?.getTime() || value === null)) {
                                onDateChangeEvent({ value }, { value: endDate });
                              }
                            }}
                            onError={onDateErrorEvent?.startDate}
                            onFocus={onDateFocusEvent?.endDate}
                            readOnly={readOnly}
                            value={startDate}
                          />
                        </Box>
                        {/* We are not using Flex here because the error message prevents keeping the dash aligned to the form field */}
                        <Box dangerouslySetInlineStyle={{ __style: { marginTop: '15px' } }}>
                          <Text>—</Text>
                        </Box>
                        <Box width={isMobile ? MOBILE_DATEFIELD_WIDTH : DATEFIELD_WIDTH}>
                          <InternalDateField
                            autoComplete="off"
                            errorMessage={errorMessages?.endDate}
                            id={`datefield-end-${key}-${componentId}`}
                            localeData={localeData}
                            maxDate={maxDate}
                            minDate={startDate}
                            mobileEnterKeyHint="enter"
                            onBlur={onDateBlurEvent?.endDate}
                            onChange={({ value }) => {
                              if (isInputSelected && (value?.getTime() || value === null)) {
                                onDateChangeEvent({ value: startDate }, { value });
                              }
                            }}
                            onError={onDateErrorEvent?.endDate}
                            onFocus={onDateFocusEvent?.endDate}
                            readOnly={readOnly}
                            value={endDate}
                          />
                        </Box>
                      </Flex>
                    </TapArea>
                  </div>
                );
              },
            )}
            <Box
              display={isMobile ? 'flex' : undefined}
              justifyContent={isMobile ? 'center' : undefined}
              width={isMobile ? '100%' : 629}
            >
              <InternalDatePicker
                id={`datepicker-${componentId}`}
                localeData={localeData}
                maxDate={maxDate}
                minDate={minDate}
                // @ts-expect-error - TS2339 - Property 'startDate' does not exist on type '{ event: ChangeEvent<HTMLInputElement>; value: Date | null; } | { startDate: Date; endDate: Date; }'. | TS2339 - Property 'endDate' does not exist on type '{ event: ChangeEvent<HTMLInputElement>; value: Date | null; } | { startDate: Date; endDate: Date; }'.
                onChange={({ startDate, endDate }) => {
                  if (selectedRange === DateRangeType.Primary) {
                    onDateChange({ value: startDate }, { value: endDate });
                  }
                  if (selectedRange === DateRangeType.Secondary && onSecondaryDateChange) {
                    onSecondaryDateChange({ value: startDate }, { value: endDate });
                  }
                }}
                rangeEndDate={dateValue.endDate}
                rangeStartDate={dateValue.startDate}
                secondaryRangeEndDate={secondaryDateValue?.endDate}
                secondaryRangeStartDate={secondaryDateValue?.startDate}
                selectedRange={selectedRange}
              />
            </Box>
            {onSubmit && onCancel ? (
              <Flex.Item alignSelf={isMobile ? 'center' : 'end'}>
                <Box marginBottom={4} marginEnd={4}>
                  <ButtonGroup>
                    <Button color="gray" onClick={() => onCancel()} text={cancelText} />

                    <Button
                      color="red"
                      disabled={
                        !!dateErrorMessage?.startDate ||
                        !!dateErrorMessage?.endDate ||
                        !dateValue.startDate ||
                        !dateValue.endDate
                      }
                      onClick={() => onSubmit()}
                      text={applyText}
                    />
                  </ButtonGroup>
                </Box>
              </Flex.Item>
            ) : null}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

DateRange.displayName = 'DateRange';

export default DateRange;
