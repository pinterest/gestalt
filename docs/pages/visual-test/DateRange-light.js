// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" padding={2} width={675}>
        <DateRange
          startDateValue={null}
          endDateValue={null}
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
