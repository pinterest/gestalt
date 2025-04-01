import { Box, ColorSchemeProvider, DesignTokensProvider, TextUI } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock">
          <Box padding={1}>
            <TextUI size="xs">TextUI size xs</TextUI>
          </Box>
          <Box padding={1}>
            <TextUI size="sm">TextUI size sm</TextUI>
          </Box>
          <Box padding={1}>
            <TextUI size="md">TextUI size md</TextUI>
          </Box>
          <Box padding={1}>
            <TextUI size="lg">TextUI size lg</TextUI>
          </Box>
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
