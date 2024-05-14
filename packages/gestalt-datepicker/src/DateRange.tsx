import { Children, useEffect, useId } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  RadioGroup,
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

type LocaleData = {
  code?: string;
  formatDistance?: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
  formatRelative?: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
  localize?: {
    ordinalNumber: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    era: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    quarter: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    month: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    day: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    dayPeriod: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
  };
  formatLong?: {
    date: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    time: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    dateTime: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
  };
  match?: {
    ordinalNumber: (...args: ReadonlyArray<string>) => Record<any, any>;
    era: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    quarter: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    month: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    day: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
    dayPeriod: (...args: ReadonlyArray<Record<any, any>>) => Record<any, any>;
  };
  options?: {
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  };
};

type Props = {
  /**
   * Customize your error message for the cases the user enters invalid end dates. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  endDateErrorMessage?: string | null;
  /**
   * DateRange is a controlled component. `startDateValue` sets the value of the start date.  See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  endDateValue: Date | null;
  /**
   * DateRange accepts imported locales from the open source date utility library date-fns. See the [locales variant](https://gestalt.pinterest.systems/web/datefield#localeData) to learn more.
   */
  localeData?: LocaleData;
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
  onCancel: () => void;
  /**
   * Callback triggered when the end date input loses focus. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onEndDateBlur?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  /**
   * DateField is a controlled component. `onEndDateChange` is the  callback triggered when the end date value changes. Should be used to modify the controlled value. See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  onEndDateChange: (arg1: { value: Date | null }) => void;
  /**
   * Callback triggered when the end date value entered is invalid. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onEndDateError: (arg1: { errorMessage: string; value: Date | null }) => void;
  /**
   * Callback triggered when the user focus on the input of the end date DateField. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onEndDateFocus?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  /**
   * Callback triggered when the end date input loses focus. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onStartDateBlur?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  /**
   * DateField is a controlled component. `onStartDateChange` is the  callback triggered when the start date value changes. Should be used to modify the controlled value. See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  onStartDateChange: (arg1: { value: Date | null }) => void;
  /**
   * Callback triggered when the start date value entered is invalid. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onStartDateError: (arg1: { errorMessage: string; value: Date | null }) => void;
  /**
   * Callback triggered when the user focus on the input of the start date DateField. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onStartDateFocus?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  /**
   * Callback triggered when the user clicks the Apply button to persist the selected dates. It should be used to persist the dates selected and close the DateRange. See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  onSubmit: () => void;
  /**
   * An optional RadioGroup to provide preestablished date range options. See the [with RadioGroup variant](https://gestalt.pinterest.systems/web/daterange#With-RadioGroup) to learn more.
   */
  // @ts-expect-error - TS2315 - Type 'Element' is not generic.
  radioGroup?: Element<typeof RadioGroup>;
  /**
   * DateRange is a controlled component. `startDateValue` sets the value of the start date.  See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  startDateValue: Date | null;
  /**
   * Customize your error message for the cases the user enters invalid start dates. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  startDateErrorMessage?: string | null;
};

/**
 * [DateRange](https://gestalt.pinterest.systems/web/daterange) enables users to preview and select a range of days by picking dates from a calendar or adding a text input.
 * DateRange is distributed in its own package and must be installed separately.
 *
 * ![DateRange light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange.spec.mjs-snapshots/DateRange-chromium-darwin.png)
 * ![DateRange dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange-dark.spec.mjs-snapshots/DateRange-dark-chromium-darwin.png)
 */
function DateRange({
  endDateValue,
  endDateErrorMessage,
  localeData,
  maxDate,
  minDate,
  onCancel,
  onEndDateBlur,
  onEndDateChange,
  onEndDateError,
  onEndDateFocus,
  onStartDateBlur,
  onStartDateChange,
  onStartDateError,
  onStartDateFocus,
  onSubmit,
  radioGroup,
  startDateValue,
  startDateErrorMessage,
}: Props) {
  const componentId = useId();
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  // Consume GlobalEventsHandlerProvider
  const { dateRangeHandlers } = useGlobalEventsHandler() ?? {
    dateRangeHandlers: undefined,
  };

  useEffect(() => {
    if (dateRangeHandlers?.onRender) dateRangeHandlers?.onRender();
  }, [dateRangeHandlers]);

  if (!startDateValue && endDateValue) {
    onEndDateChange({ value: null });
  }

  const { applyText, cancelText } = useDefaultLabel('DateRange');

  return (
    <Box borderStyle="shadow" color="default" display="inlineBlock" minHeight={425} rounding={4}>
      <Flex>
        {radioGroup &&
        // @ts-expect-error - TS2315 - Type 'Element' is not generic.
        Children.only<Element<typeof RadioGroup>>(radioGroup).type.displayName === 'RadioGroup' &&
        !isMobile ? (
          <div className={borderStyles.borderRight}>
            <Box paddingX={6} paddingY={4} width={216}>
              {radioGroup}
            </Box>
          </div>
        ) : null}
        <Box>
          <Flex alignItems="start" direction="column" justifyContent="center">
            <div className={borderStyles.dateFieldSection}>
              <Flex gap={3}>
                <Box width={isMobile ? MOBILE_DATEFIELD_WIDTH : DATEFIELD_WIDTH}>
                  <InternalDateField
                    autoComplete="off"
                    errorMessage={startDateErrorMessage}
                    id={`datefield-start-${componentId}`}
                    localeData={localeData}
                    maxDate={maxDate}
                    minDate={minDate}
                    mobileEnterKeyHint="enter"
                    onBlur={onStartDateBlur}
                    onChange={({ value }) => {
                      if (value?.getTime() || value === null) onStartDateChange({ value });
                    }}
                    onError={onStartDateError}
                    onFocus={onStartDateFocus}
                    value={startDateValue}
                  />
                </Box>
                {/* We are not using Flex here because the error message prevents keeping the dash aligned to the form field */}
                <Box dangerouslySetInlineStyle={{ __style: { marginTop: '15px' } }}>
                  <Text>—</Text>
                </Box>
                <Box width={isMobile ? MOBILE_DATEFIELD_WIDTH : DATEFIELD_WIDTH}>
                  <InternalDateField
                    autoComplete="off"
                    errorMessage={endDateErrorMessage}
                    id={`datefield-end-${componentId}`}
                    localeData={localeData}
                    maxDate={maxDate}
                    minDate={startDateValue}
                    mobileEnterKeyHint="enter"
                    onBlur={onEndDateBlur}
                    onChange={({ value }) => {
                      if (value?.getTime() || value === null) onEndDateChange({ value });
                    }}
                    onError={({ errorMessage, value }) => {
                      onEndDateError({ errorMessage, value });
                    }}
                    onFocus={onEndDateFocus}
                    value={endDateValue}
                  />
                </Box>
              </Flex>
            </div>
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
                  onStartDateChange({ value: startDate });
                  onEndDateChange({ value: endDate });
                }}
                rangeEndDate={endDateValue}
                rangeStartDate={startDateValue}
              />
            </Box>
            <Flex.Item alignSelf={isMobile ? 'center' : 'end'}>
              <Box marginBottom={4} marginEnd={4}>
                <ButtonGroup>
                  <Button color="gray" onClick={() => onCancel()} text={cancelText} />

                  <Button
                    color="red"
                    disabled={
                      !!endDateErrorMessage ||
                      !!startDateErrorMessage ||
                      !endDateValue ||
                      !startDateValue
                    }
                    onClick={() => onSubmit()}
                    text={applyText}
                  />
                </ButtonGroup>
              </Box>
            </Flex.Item>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

DateRange.displayName = 'DateRange';

export default DateRange;
