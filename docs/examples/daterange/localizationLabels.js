// @flow strict
import { type Node, useState } from 'react';
import { DefaultLabelProvider, Flex } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Example(): Node {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        DateRange: {
          cancelText: 'Abbrechen',
          applyText: 'Anwenden',
        },
      }}
    >
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <DateRange
          startDateValue={startDate}
          endDateValue={endDate}
          onStartDateChange={({ value }) => setStartDate(value)}
          onEndDateChange={({ value }) => setEndDate(value)}
          onStartDateError={() => {}}
          onEndDateError={() => {}}
          onSubmit={() => {}}
          onCancel={() => {}}
        />
      </Flex>
    </DefaultLabelProvider>
  );
}
