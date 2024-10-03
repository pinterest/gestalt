import { useState } from 'react';
import { DeviceTypeProvider, Flex } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Example() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [secondaryStartDate, setSecondaryStartDate] = useState<Date | null>(null);
  const [secondaryEndDate, setSecondaryEndDate] = useState<Date | null>(null);

  return (
    <DeviceTypeProvider deviceType="desktop">
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <DateRange
          dateValue={{ startDate, endDate }}
          onCancel={() => {}}
          onDateChange={(newStartDate, newEndDate) => {
            setStartDate(newStartDate.value);
            setEndDate(newEndDate.value);
          }}
          onDateError={{ startDate: () => {}, endDate: () => {} }}
          onSecondaryDateChange={(newStartDate, newEndDate) => {
            setSecondaryStartDate(newStartDate.value);
            setSecondaryEndDate(newEndDate.value);
          }}
          onSubmit={() => {}}
          secondaryDateValue={{ startDate: secondaryStartDate, endDate: secondaryEndDate }}
        />
      </Flex>
    </DeviceTypeProvider>
  );
}
