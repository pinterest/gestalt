// @flow strict
import { type Node } from 'react';
import { Box, Flex, SearchField } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex.Item flex="grow">
        <SearchField
          accessibilityLabel="Search by audience name or ID"
          accessibilityClearButtonLabel="Clear search field"
          id="bestPracticesDo2"
          onChange={() => {}}
          placeholder="Search by audience name or ID"
        />
      </Flex.Item>
    </Box>
  );
}
