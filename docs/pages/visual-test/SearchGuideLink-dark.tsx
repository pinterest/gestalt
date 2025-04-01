import { Box, ColorSchemeProvider, DesignTokensProvider, SearchGuideLink } from 'gestalt';

export default function Screenshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock" padding={1}>
          <SearchGuideLink
            accessibilityLabel="Messages"
            href="http://pinterest.com"
            text="Messages"
          />
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
