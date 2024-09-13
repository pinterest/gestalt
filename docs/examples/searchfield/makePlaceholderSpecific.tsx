import { Box, SearchField } from 'gestalt';

export default function Example() {
  return (
    <Box height="100%" padding={4} width="100%">
      <SearchField
        accessibilityClearButtonLabel="Clear search field"
        accessibilityLabel="Search by audience name or ID"
        id="bestPracticesDo2"
        onChange={() => {}}
        placeholder="Search by audience name or ID"
      />
    </Box>
  );
}
