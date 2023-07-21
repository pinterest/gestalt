// @flow strict
import { type Node, useMemo, useState } from 'react';
import { Flex, RadioGroup } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Example(): Node {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [period, setPeriod] = useState<'1' | '2' | '4' | 'custom' | null>(null);

  const radioGroup = useMemo(
    () => (
      <RadioGroup legend="Date range" id="past radiogroup example">
        <RadioGroup.RadioButton
          checked={period === '1'}
          id="1"
          label="Past week"
          name="1"
          onChange={() => {
            setEndDate(new Date());
            const now = new Date();
            now.setDate(now.getDate() - 1 * 7);
            setStartDate(now);
            setPeriod('1');
          }}
          value="1"
        />
        <RadioGroup.RadioButton
          checked={period === '2'}
          id="2"
          label="Past 2 weeks"
          name="2"
          onChange={() => {
            setEndDate(new Date());
            const now = new Date();
            now.setDate(now.getDate() - 2 * 7);
            setStartDate(now);
            setPeriod('2');
          }}
          value="2"
        />
        <RadioGroup.RadioButton
          checked={period === '4'}
          id="4"
          label="Past 4 weeks"
          name="4"
          onChange={() => {
            setEndDate(new Date());
            const now = new Date();
            now.setDate(now.getDate() - 4 * 7);
            setStartDate(now);
            setPeriod('4');
          }}
          value="4"
        />
        <RadioGroup.RadioButton
          checked={period === 'custom'}
          id="custom"
          label="Custom"
          name="custom"
          onChange={() => setPeriod('custom')}
          value="custom"
        />
      </RadioGroup>
    ),
    [period],
  );

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <DateRange
        radioGroup={radioGroup}
        endDateValue={endDate}
        onStartDateChange={({ value }) => {
          setPeriod('custom');
          setStartDate(value);
        }}
        onEndDateChange={({ value }) => {
          setPeriod('custom');
          setEndDate(value);
        }}
        onEndDateError={() => {}}
        onStartDateError={() => {}}
        startDateValue={startDate}
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    </Flex>
  );
}
