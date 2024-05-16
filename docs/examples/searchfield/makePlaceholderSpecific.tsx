import { Box, Flex, SearchField } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex.Item flex="grow">
        <SearchField
          accessibilityClearButtonLabel="Clear search field"
          accessibilityLabel="Search by audience name or ID"
          id="bestPracticesDo2"
          onChange={() => {}}
          placeholder="Search by audience name or ID"
        />
      </Flex.Item>
    </Box>
  );
}
