// @flow strict
import { type Node, useState } from 'react';
import { Flex } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Example(): Node {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [endErrorMessage, setEndErrorMessage] = useState<string | null>(null);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <DateRange
        maxDate={new Date()}
        endDateValue={endDate}
        endDateErrorMessage={endErrorMessage}
        onStartDateChange={({ value }) => setStartDate(value)}
        onEndDateChange={({ value }) => setEndDate(value)}
        onStartDateError={() => {}}
        onEndDateError={({ errorMessage }) =>
          setEndErrorMessage(errorMessage ? 'Please, enter a valid date' : null)
        }
        startDateValue={startDate}
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    </Flex>
  );
}
