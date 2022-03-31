// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider } from 'gestalt';
import GestaltDatePicker from 'gestalt-datepicker';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="white" padding={1} width={400} height={400}>
        <GestaltDatePicker id="example-visual-testing" label="Select a date" onChange={() => {}} />
      </Box>
    </ColorSchemeProvider>
  );
}
