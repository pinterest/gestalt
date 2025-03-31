import { Box, ColorSchemeProvider, DesignTokensProvider,SearchField } from 'gestalt';

export default function Screenshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <DesignTokensProvider>
        <Box color="default" display="inlineBlock" padding={1}>
          <SearchField
            accessibilityClearButtonLabel="Clear search field"
            accessibilityLabel=""
            id="searchMessagesLabelExample"
            label="Search Messages"
            onChange={() => {}}
            placeholder="Search by name"
          />
        </Box>
      </DesignTokensProvider>
    </ColorSchemeProvider>
  );
}
