// @flow strict-local
import { type Node } from 'react';
import { Box, Button, Flex, Text, useDefaultLabel } from 'gestalt';
// import styles from './DateRange.css';
import InternalDateField from './DateField/InternalDateField.js';
import borderStyles from './DateRange.css';
import InternalDatePicker from './DateRange/InternalDatePicker.js';

type LocaleData = {|
  code?: string,
  formatDistance?: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  formatRelative?: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  localize?: {|
    ordinalNumber: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    era: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    quarter: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    month: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    day: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    dayPeriod: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  |},
  formatLong?: {|
    date: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    time: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    dateTime: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  |},
  match?: {|
    ordinalNumber: (...args: $ReadOnlyArray<string>) => { ... },
    era: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    quarter: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    month: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    day: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    dayPeriod: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  |},
  options?: {|
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  |},
|};

type Props = {|
  /**
   * Customize your error message for the cases the user enters invalid end dates. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  endDateErrorMessage?: string | null,
  /**
   * DateRange is a controlled component. `startDateValue` sets the value of the start date.  See the [controlled component example](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  endDateValue: Date | null,
  /**
   * DateRange accepts imported locales from the open source date utility library date-fns. See the [locales example](https://gestalt.pinterest.systems/web/datefield#localeData) to learn more.
   */
  localeData?: LocaleData,
  /**
   * Maximal selectable date. Disables any date values after the provided date. See the [disable future and past variant](https://gestalt.pinterest.systems/web/datefield#Disable-future-and-past) to learn more.
   */
  maxDate?: Date,
  /**
   * Minimal selectable date. Disables any date values before the provided date.  See the [disable future and past variant](https://gestalt.pinterest.systems/web/datefield#Disable-future-and-past) to learn more.
   */
  minDate?: Date,
  /**
   * Callback triggered when the user clicks the Cancel button to not persist the selected dates. It should close DateRange. See the [controlled component example](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  onCancel: () => void,
  /**
   * DateField is a controlled component. `onEndDateChange` is the  callback triggered when the end date value changes. Should be used to modify the controlled value. See the [controlled component example](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  onEndDateChange: ({| value: Date | null |}) => void,
  /**
   * Callback triggered when the end date value entered is invalid. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onEndDateError: ({|
    errorMessage: string,
    value: Date | null,
  |}) => void,
  /**
   * DateField is a controlled component. `onStartDateChange` is the  callback triggered when the start date value changes. Should be used to modify the controlled value. See the [controlled component example](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  onStartDateChange: ({| value: Date | null |}) => void,
  /**
   * Callback triggered when the start date value entered is invalid. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onStartDateError: ({|
    errorMessage: string,
    value: Date | null,
  |}) => void,
  /**
   * Callback triggered when the user clicks the Apply button to persist the selected dates. It should persist the dates selected and close the DateRange. See the [controlled component example](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  onSubmit: () => void,
  /**
   * An optional RadioGroup to provide preestablished date range options. See the [with RadioGroup variant](https://gestalt.pinterest.systems/web/daterange#With-RadioGroup) to learn more.
   */
  radioGroup?: Node,
  /**
   * DateRange is a controlled component. `startDateValue` sets the value of the start date.  See the [controlled component example](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  startDateValue: Date | null,
  /**
   * Customize your error message for the cases the user enters invalid start dates. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  startDateErrorMessage?: string | null,
|};

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
  onEndDateChange,
  onEndDateError,
  onStartDateChange,
  onStartDateError,
  onSubmit,
  radioGroup,
  startDateValue,
  startDateErrorMessage,
}: Props): Node {
  if (!startDateValue && endDateValue) {
    onEndDateChange({ value: null });
  }

  const { applyText, cancelText } = useDefaultLabel('DateRange');

  return (
    <Box rounding={4} color="default" borderStyle="shadow" minHeight={425} display="inlineBlock">
      <Flex>
        {radioGroup ? (
          <div className={borderStyles.borderRight}>
            <Box paddingY={4} paddingX={6} width={216}>
              {radioGroup}
            </Box>
          </div>
        ) : null}
        <Box>
          <Flex alignItems="start" justifyContent="center" direction="column">
            <div className={borderStyles.dateFieldSection}>
              <Flex gap={3}>
                <Box width={280}>
                  <InternalDateField
                    autoComplete="off"
                    mobileEnterKeyHint="enter"
                    id="datefield-start"
                    localeData={localeData}
                    onChange={({ value }) => {
                      if (value?.getTime() || value === null) onStartDateChange({ value });
                    }}
                    onError={onStartDateError}
                    value={startDateValue}
                    minDate={minDate}
                    maxDate={maxDate}
                    errorMessage={startDateErrorMessage}
                  />
                </Box>
                <Box dangerouslySetInlineStyle={{ __style: { marginTop: '15px' } }}>
                  <Text>—</Text>
                </Box>
                <Box width={280}>
                  <InternalDateField
                    autoComplete="off"
                    mobileEnterKeyHint="enter"
                    id="datefield-end"
                    localeData={localeData}
                    onChange={({ value }) => {
                      if (value?.getTime() || value === null) onEndDateChange({ value });
                    }}
                    value={endDateValue}
                    minDate={startDateValue}
                    onError={({ errorMessage, value }) => {
                      onEndDateError({ errorMessage, value });
                      if (errorMessage === 'minDate') {
                        onEndDateChange({ value: null });
                      }
                    }}
                    maxDate={maxDate}
                    errorMessage={endDateErrorMessage}
                  />
                </Box>
              </Flex>
            </div>
            <Box width={629}>
              <InternalDatePicker
                localeData={localeData}
                rangeStartDate={startDateValue}
                rangeEndDate={endDateValue}
                id="datepicker-start"
                onChange={({ startDate, endDate }) => {
                  onStartDateChange({ value: startDate });
                  onEndDateChange({ value: endDate });
                }}
                minDate={minDate}
                maxDate={maxDate}
              />
            </Box>
            <Flex.Item alignSelf="end">
              <Flex gap={2}>
                <Box marginBottom={4} marginEnd={4}>
                  <Button color="transparent" text={cancelText} onClick={() => onCancel()} />
                </Box>
                <Box marginBottom={4} marginEnd={4}>
                  <Button
                    text={applyText}
                    disabled={
                      !!endDateErrorMessage ||
                      !!startDateErrorMessage ||
                      !endDateValue ||
                      !startDateValue
                    }
                    onClick={() => onSubmit()}
                  />
                </Box>
              </Flex>
            </Flex.Item>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default DateRange;
