// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Flex } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Example(): ReactNode {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <DateRange
        endDateValue={endDate}
        onCancel={() => {}}
        onEndDateChange={({ value }) => setEndDate(value)}
        onEndDateError={() => {}}
        onStartDateChange={({ value }) => setStartDate(value)}
        onStartDateError={() => {}}
        onSubmit={() => {}}
        startDateValue={startDate}
      />
    </Flex>
  );
}
