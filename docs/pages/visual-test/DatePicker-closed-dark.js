// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" padding={1} width={400}>
        <DatePicker id="example-visual-testing" label="Select a date" onChange={() => {}} />
      </Box>
    </ColorSchemeProvider>
  );
}
