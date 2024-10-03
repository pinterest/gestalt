import { useState } from 'react';
import { Box, ColorSchemeProvider } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Snapshot() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [compStartDate, setCompStartDate] = useState<Date | null>(null);
  const [compEndDate, setCompEndDate] = useState<Date | null>(null);

  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" padding={2} width={675}>
        <DateRange
          dateValue={{ startDate, endDate }}
          onCancel={() => {}}
          onDateChange={(newStartDate, newEndDate) => {
            setStartDate(newStartDate.value);
            setEndDate(newEndDate.value);
          }}
          onDateError={{ startDate: () => {}, endDate: () => {} }}
          onSecondaryDateChange={(newStartDate, newEndDate) => {
            setCompStartDate(newStartDate.value);
            setCompEndDate(newEndDate.value);
          }}
          onSubmit={() => {}}
          secondaryDateValue={{ startDate: compStartDate, endDate: compEndDate }}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
