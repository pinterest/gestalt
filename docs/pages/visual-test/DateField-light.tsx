import {ReactNode} from 'react';
import { Box, ColorSchemeProvider } from 'gestalt';
import { DateField } from 'gestalt-datepicker';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" padding={1}>
        <DateField
          helperText="Enter your date of birth"
          id="mainExample"
          label="Date of birth"
          name="test"
          onChange={() => {}}
          onClearInput={() => {}}
          onError={() => {}}
          value={null}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
