// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" padding={1}>
        <DateField
          id="mainExample"
          label="Date of birth"
          helperText="Enter your date of birth"
          onError={() => {}}
          onChange={() => {}}
          value={null}
          onClearInput={() => {}}
          name="test"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
