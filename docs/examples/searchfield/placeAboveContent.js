// @flow strict
import { type Node } from 'react';
import { Box, SearchField } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <SearchField
        accessibilityLabel="Search your Pins"
        accessibilityClearButtonLabel="Clear search field"
        id="bestPracticesDo1"
        onChange={() => {}}
        placeholder="Search your Pins"
      />
    </Box>
  );
}
