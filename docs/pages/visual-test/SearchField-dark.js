// @flow strict
import { type Node } from 'react';
import { SearchField, Box, ColorSchemeProvider } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <SearchField
          accessibilityLabel=""
          accessibilityClearButtonLabel="Clear search field"
          label="Search Messages"
          id="searchMessagesLabelExample"
          onChange={() => {}}
          placeholder="Search by name"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
