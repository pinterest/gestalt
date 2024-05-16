import { Box, ColorSchemeProvider } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" padding={2} width={675}>
        <DateRange
          endDateValue={new Date('December 17, 1995 03:24:00')}
          onCancel={() => {}}
          onEndDateChange={() => {}}
          onEndDateError={() => {}}
          onStartDateChange={() => {}}
          onStartDateError={() => {}}
          onSubmit={() => {}}
          startDateValue={new Date('December 16, 1995 03:24:00')}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
