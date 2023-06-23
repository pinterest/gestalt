// @flow strict-local
import { type Node } from 'react';
import { Box, Button, Flex, Text } from 'gestalt';
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
   * Prop description.
   */
  localeData?: LocaleData,
  radioGroup?: Node,
  endDateValue: Date | null,
  endDateErrorMessage?: string | null,
  onStartDateChange: ({| value: Date | null |}) => void,
  onStartDateError: ({|
    errorMessage: string,
    value: Date | null,
  |}) => void,
  onEndDateChange: ({| value: Date | null |}) => void,
  onEndDateError: ({|
    errorMessage: string,
    value: Date | null,
  |}) => void,
  maxDate?: Date,
  minDate?: Date,
  startDateValue: Date | null,
  startDateErrorMessage?: string | null,
|};

/**
 * [DateRange] https://gestalt.pinterest.systems/web/daterange component should be used for ... on the page.
 * ![DateRange light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange.spec.mjs-snapshots/DateRange-chromium-darwin.png)
 * ![DateRange dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange-dark.spec.mjs-snapshots/DateRange-dark-chromium-darwin.png)
 */
function DateRange({
  radioGroup,
  endDateValue,
  endDateErrorMessage,
  onStartDateChange,
  onStartDateError,
  onEndDateChange,
  onEndDateError,
  maxDate,
  minDate,
  startDateValue,
  startDateErrorMessage,
}: Props): Node {
  if (!startDateValue && endDateValue) {
    onEndDateChange({ value: null });
  }

  return (
    <Box rounding={4} color="default" borderStyle="shadow" overflow="scroll" minHeight={425}>
      <Flex width="100%">
        {radioGroup ? (
          <div className={borderStyles.borderRight}>
            <Box paddingY={4} paddingX={6} width={216}>
              {radioGroup}
            </Box>
          </div>
        ) : null}
        <Box width="100%">
          <Flex alignItems="start" justifyContent="center" width="100%" direction="column">
            <div className={borderStyles.dateFieldSection}>
              <Flex gap={3}>
                <Box width={280}>
                  <InternalDateField
                    id="datefield-start"
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
                    id="datefield-end"
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
              <Box marginBottom={4} marginEnd={4}>
                <Button
                  text="Apply"
                  disabled={
                    !!endDateErrorMessage ||
                    !!startDateErrorMessage ||
                    !endDateValue ||
                    !startDateValue
                  }
                />
              </Box>
            </Flex.Item>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default DateRange;
