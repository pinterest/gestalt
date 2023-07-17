// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" padding={2} width={675}>
        <DateRange
          startDateValue={new Date('December 16, 1995 03:24:00')}
          endDateValue={new Date('December 17, 1995 03:24:00')}
          onStartDateChange={() => {}}
          onEndDateChange={() => {}}
          onStartDateError={() => {}}
          onEndDateError={() => {}}
          onSubmit={() => {}}
          onCancel={() => {}}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
