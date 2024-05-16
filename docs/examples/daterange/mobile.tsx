import { ReactNode, useState } from 'react';
import { DeviceTypeProvider, Flex } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Example() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <DeviceTypeProvider deviceType="mobile">
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
    </DeviceTypeProvider>
  );
}
