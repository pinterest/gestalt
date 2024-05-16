import {ReactNode} from 'react';
import { Box, ColorSchemeProvider, SearchField } from 'gestalt';

export default function Screenshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
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
    </ColorSchemeProvider>
  );
}
