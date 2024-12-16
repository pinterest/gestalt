import { useState } from 'react';
import { Box, ColorSchemeProvider } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Snapshot() {
  const [startDate, setStartDate] = useState<Date | null>(new Date('December 16, 2024 03:24:00'));
  const [endDate, setEndDate] = useState<Date | null>(new Date('December 20, 2024 03:24:00'));
  const [compStartDate, setCompStartDate] = useState<Date | null>(
    new Date('December 9, 2024 03:24:00'),
  );
  const [compEndDate, setCompEndDate] = useState<Date | null>(
    new Date('December 13, 2024 03:24:00'),
  );

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
