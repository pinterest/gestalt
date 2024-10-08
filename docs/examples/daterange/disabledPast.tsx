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
        dateErrorMessage={{ startDate: startErrorMessage, endDate: null }}
        dateValue={{ startDate, endDate }}
        minDate={new Date()}
        onCancel={() => {}}
        onDateChange={(newStartDate, newEndDate) => {
          setStartDate(newStartDate.value);
          setEndDate(newEndDate.value);
        }}
        onDateError={{
          startDate: ({ errorMessage }) =>
            setStartErrorMessage(errorMessage ? 'Please, enter a valid date' : null),
          endDate: () => {},
        }}
        onSubmit={() => {}}
      />
    </Flex>
  );
}
