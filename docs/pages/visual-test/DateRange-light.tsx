import { Box, ColorSchemeProvider } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" padding={2} width={675}>
        <DateRange
          dateValue={{
            startDate: new Date('December 16, 1995 03:24:00'),
            endDate: new Date('December 17, 1995 03:24:00'),
          }}
          onCancel={() => {}}
          onDateChange={() => {}}
          onDateError={{ startDate: () => {}, endDate: () => {} }}
          onSubmit={() => {}}
        />
      </Box>
    </DesignTokensProvider></ColorSchemeProvider>
  );
}
