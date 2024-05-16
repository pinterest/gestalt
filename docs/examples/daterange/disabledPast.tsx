import { useState } from 'react';
import { Flex } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Example() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startErrorMessage, setStartErrorMessage] = useState<string | null>(null);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <DateRange
        endDateValue={endDate}
        minDate={new Date()}
        onCancel={() => {}}
        onEndDateChange={({ value }) => setEndDate(value)}
        onEndDateError={() => {}}
        onStartDateChange={({ value }) => setStartDate(value)}
        onStartDateError={({ errorMessage }) =>
          setStartErrorMessage(errorMessage ? 'Please, enter a valid date' : null)
        }
        onSubmit={() => {}}
        startDateErrorMessage={startErrorMessage}
        startDateValue={startDate}
      />
    </Flex>
  );
}
