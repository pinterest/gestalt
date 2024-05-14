import { Box, SearchField } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box width={300}>
        <SearchField
          accessibilityClearButtonLabel="Clear search field"
          accessibilityLabel="Search your Pins"
          id="bestPracticesDo3"
          onChange={() => {}}
          value="Homecoming dresses"
        />
      </Box>
    </Box>
  );
}
