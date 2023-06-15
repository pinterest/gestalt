// @flow strict
import { type Node } from 'react';
import { Box, SearchField } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box width={300}>
        <SearchField
          accessibilityLabel="Search your Pins"
          accessibilityClearButtonLabel="Clear search field"
          id="bestPracticesDont3"
          onChange={() => {}}
          value="Swiss architecure from the 195…"
        />
      </Box>
    </Box>
  );
}
