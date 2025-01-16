import { useState } from 'react';
import { Flex } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Example() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <DateRange
        dateValue={{ startDate, endDate }}
        onCancel={() => {}}
        onDateChange={(newStartDate, newEndDate) => {
          setStartDate(newStartDate.value);
          setEndDate(newEndDate.value);
        }}
        onDateError={{ startDate: () => {}, endDate: () => {} }}
        onSubmit={() => {}}
        readOnly
      />
    </Flex>
  );
}
