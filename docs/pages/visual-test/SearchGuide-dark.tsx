import { Box, ColorSchemeProvider, SearchGuide } from 'gestalt';

export default function Screenshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <SearchGuide accessibilityLabel="Messages" text="Messages" />
      </Box>
    </ColorSchemeProvider>
  );
}
