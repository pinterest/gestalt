import { Box, ColorSchemeProvider, DesignTokensProvider, Heading } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock">
          <Box padding={1}>
            <Heading size="100">Heading size 100</Heading>
          </Box>
          <Box padding={1}>
            <Heading size="200">Heading size 200</Heading>
          </Box>
          <Box padding={1}>
            <Heading size="300">Heading size 300</Heading>
          </Box>
          <Box padding={1}>
            <Heading size="400">Heading size 400</Heading>
          </Box>
          <Box padding={1}>
            <Heading size="600">Heading size 500</Heading>
          </Box>
          <Box padding={1}>
            <Heading size="700">Heading size 600</Heading>
          </Box>
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
