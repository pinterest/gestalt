import { Box, ColorSchemeProvider, SearchGuideLink } from 'gestalt';

export default function Screenshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <SearchGuideLink
          accessibilityLabel="Messages"
          href="http://pinterest.com"
          text="Messages"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
