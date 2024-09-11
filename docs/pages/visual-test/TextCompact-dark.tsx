import { Box, ColorSchemeProvider, TextCompact } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock">
        <Box padding={1}>
          <TextCompact>TextCompact weight default</TextCompact>
        </Box>
        <Box padding={1}>
          <TextCompact weight="emphasis">TextCompact weight emphasis</TextCompact>
        </Box>
      </Box>
    </ColorSchemeProvider>
  );
}
