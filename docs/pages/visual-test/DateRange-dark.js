// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider } from 'gestalt';
import { DateRange } from 'gestalt-datepicker';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" padding={1} width={600}>
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
