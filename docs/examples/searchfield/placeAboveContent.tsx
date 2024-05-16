import { ReactNode } from 'react';
import { Box, SearchField } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <SearchField
        accessibilityClearButtonLabel="Clear search field"
        accessibilityLabel="Search your Pins"
        id="bestPracticesDo1"
        onChange={() => {}}
        placeholder="Search your Pins"
      />
    </Box>
  );
}
