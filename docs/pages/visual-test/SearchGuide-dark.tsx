import { Box, ColorSchemeProvider, DesignTokensProvider, SearchGuide } from 'gestalt';

export default function Screenshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock" padding={1}>
          <SearchGuide accessibilityLabel="Messages" text="Messages" />
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
