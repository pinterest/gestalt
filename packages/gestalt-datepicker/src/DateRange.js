// @flow strict-local
import { type Node } from 'react';
import { Box, Flex, Divider } from 'gestalt';
// import styles from './DateRange.css';
import DateField from './DateField.js';
import InternalDatePicker from './DatePicker/InternalDatePicker.js';

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
  radioGroup: Node,
  startDateValue: Date,
  endDateValue: Date,
  onStartDateChange: ({| value: Date |}) => void,
  onEndDateChange: ({| value: Date |}) => void,
|};

/**
 * [DateRange] https://gestalt.pinterest.systems/web/daterange component should be used for ... on the page.
 * ![DateRange light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange.spec.mjs-snapshots/DateRange-chromium-darwin.png)
 * ![DateRange dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange-dark.spec.mjs-snapshots/DateRange-dark-chromium-darwin.png)
 */
function DateRange({
  radioGroup,
  startDateValue,
  endDateValue,
  onStartDateChange,
  onEndDateChange,
}: Props): Node {
  const now = new Date();
  let next: Date;
  if (now.getMonth() === 11) {
    next = new Date(now.getFullYear() + 1, 0, 1);
  } else {
    next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }

  return (
    <Flex>
      <Box minHeight={300} minWidth={300} color="errorBase" marginEnd={2}>
        {radioGroup}
      </Box>
      <Box height="100%" marginEnd={2}>
        <Divider />
      </Box>

      <Flex alignItems="start" height="100%" justifyContent="center" width="100%" gap={2}>
        <Flex direction="column" gap={2}>
          <DateField
            id="datefield-start"
            onChange={({ value }) => {
              if (value?.getTime()) onStartDateChange({ value });
            }}
            value={startDateValue}
            onClearInput={() => {}}
          />
          <InternalDatePicker
            inline
            rangeStartDate={startDateValue}
            rangeEndDate={endDateValue}
            id="datepicker-start"
            onChange={({ value }) => {
              onStartDateChange({ value });
            }}
            rangeSelector="start"
            value={startDateValue}
          />
        </Flex>
        <Flex direction="column" gap={2}>
          <DateField
            id="datefield-end"
            onChange={({ value }) => {
              if (value?.getTime()) onEndDateChange({ value });
            }}
            value={endDateValue}
            onClearInput={() => {}}
          />
          <InternalDatePicker
            inline
            minDate={startDateValue}
            rangeStartDate={startDateValue}
            rangeEndDate={endDateValue}
            id="datepicker-end"
            onChange={({ value }) => {
              onEndDateChange({ value });
            }}
            rangeSelector="end"
            value={endDateValue}
            openToDate={endDateValue ?? next}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default DateRange;
