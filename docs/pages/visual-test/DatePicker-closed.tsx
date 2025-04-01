import { Box, ColorSchemeProvider, DesignTokensProvider } from 'gestalt';
import { DatePicker } from 'gestalt-datepicker';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="light">
      <DesignTokensProvider>
        <Box color="default" padding={1} width={400}>
          <DatePicker id="example-visual-testing" label="Select a date" onChange={() => {}} />
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
