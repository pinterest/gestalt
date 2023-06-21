// @flow strict-local
import { type Node } from 'react';
import { Box, Button, Divider, Flex, Text } from 'gestalt';
// import styles from './DateRange.css';
import InternalDateField from './DateField/InternalDateField.js';
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
    <Box
      rounding={4}
      padding={2}
      color="default"
      borderStyle="shadow"
      overflow="scroll"
      width={888}
      minHeight={425}
    >
      <Flex width="100%">
        <Box minHeight={300} minWidth={300} color="errorWeak">
          {radioGroup}
        </Box>
        <Divider />
        <Box padding={2} width="100%">
          <Flex
            alignItems="start"
            height="100%"
            justifyContent="center"
            width="100%"
            gap={2}
            direction="column"
          >
            <Flex gap={3} alignItems="start">
              <Box
                dangerouslySetInlineStyle={{ __style: { paddingInlineStart: '8px' } }}
                width={300}
              >
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
              <Box dangerouslySetInlineStyle={{ __style: { marginTop: '20px' } }}>
                <Text>—</Text>
              </Box>
              <Box dangerouslySetInlineStyle={{ __style: { paddingInlineEnd: '8px' } }} width={300}>
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
            <Flex.Item minWidth="100%">
              <Box width="100%" padding={2}>
                <Divider />
              </Box>
            </Flex.Item>

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

            <Flex.Item alignSelf="end">
              <Button
                text="Apply"
                disabled={
                  !!endDateErrorMessage ||
                  !!startDateErrorMessage ||
                  !endDateValue ||
                  !startDateValue
                }
              />
            </Flex.Item>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default DateRange;
