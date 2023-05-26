// @flow strict-local
import { useState, type Node } from 'react';
import { RadioGroup, Box, Flex } from 'gestalt';
// import styles from './DateRange.css';
import DateField from './DateField.js';
import DatePicker from './DatePicker.js';

type Props = {|
  /**
   * Prop description.
   */
  accessibilityLabel?: string,
|};

/**
 * [DateRange] https://gestalt.pinterest.systems/web/daterange component should be used for ... on the page.
 * ![DateRange light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange.spec.mjs-snapshots/DateRange-chromium-darwin.png)
 * ![DateRange dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange-dark.spec.mjs-snapshots/DateRange-dark-chromium-darwin.png)
 */
function DateRange({ accessibilityLabel }: Props): Node {
  const [dateValue, setDateValue] = useState<?Date>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [range, setRange] = useState<string | null>(null);

  return (
    <Flex>
      <RadioGroup legend="Date DateRange" id="date-range">
        <RadioGroup.RadioButton
          size="sm"
          checked={range === '24hours'}
          id="24hours"
          label="Last 24 hours"
          name="24hours"
          onChange={() => setRange('24hours')}
          value="24hours"
        />
        <RadioGroup.RadioButton
          size="sm"
          checked={range === '7days'}
          id="7days"
          label="Last 7 days"
          name="7days"
          onChange={() => setRange('7days')}
          value="7days"
        />
        <RadioGroup.RadioButton
          size="sm"
          checked={range === '14days'}
          id="14days"
          label="Last 14 days"
          name="14days"
          onChange={() => setRange('14days')}
          value="14days"
        />
        <RadioGroup.RadioButton
          size="sm"
          checked={range === '21days'}
          id="21days"
          label="Last 21 days"
          name="21days"
          onChange={() => setRange('21days')}
          value="21days"
        />
        <RadioGroup.RadioButton
          size="sm"
          checked={range === '30days'}
          id="30days"
          label="Last 30 days"
          name="30days"
          onChange={() => setRange('30days')}
          value="30days"
        />
        <RadioGroup.RadioButton
          size="sm"
          checked={range === '60days'}
          id="60days"
          label="Last 60 days"
          name="60days"
          onChange={() => setRange('60days')}
          value="60days"
        />
        <RadioGroup.RadioButton
          size="sm"
          checked={range === '90days'}
          id="90days"
          label="Last 90 days"
          name="90days"
          onChange={() => setRange('90days')}
          value="90days"
        />
        <RadioGroup.RadioButton
          size="sm"
          checked={range === 'quarter'}
          id="quarter"
          label="Last quarter"
          name="quarter"
          onChange={() => setRange('quarter')}
          value="quarter"
        />
        <RadioGroup.RadioButton
          size="sm"
          checked={range === 'year'}
          id="year"
          label="Last year"
          name="year"
          onChange={() => setRange('year')}
          value="year"
        />
        <RadioGroup.RadioButton
          size="sm"
          checked={range === 'custom'}
          id="custom"
          label="Custom"
          name="custom"
          onChange={() => setRange('custom')}
          value="custom"
        />
      </RadioGroup>

      <Flex
        alignItems="center"
        gap={2}
        height="100%"
        justifyContent="center"
        width="100%"
        direction="column"
      >
        <Flex gap={2}>
          <DateField
            id="datefield-start"
            onError={({ errorMessage }) => setErrorText(errorMessage)}
            errorMessage={errorText || undefined}
            onChange={({ value }) => {
              setDateValue(value);
            }}
            value={dateValue}
            onClearInput={() => setDateValue(null)}
            name="datefield-start"
          />
          <DateField
            id="datefield-end"
            onError={({ errorMessage }) => setErrorText(errorMessage)}
            errorMessage={errorText || undefined}
            onChange={({ value }) => {
              setDateValue(value);
            }}
            value={dateValue}
            onClearInput={() => setDateValue(null)}
            name="datefield-end"
          />
        </Flex>
        <Flex gap={2}>
          <DatePicker id="datePicker-start" onChange={() => {}} />
          <DatePicker id="datePicker-end" onChange={() => {}} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default DateRange;
