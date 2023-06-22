// @flow strict
import { type Node } from 'react';
import { Box, Flex, SearchField } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex.Item flex="grow">
        <SearchField
          accessibilityLabel="Search your Pins"
          accessibilityClearButtonLabel="Clear search field"
          id="bestPracticesDont2"
          onChange={() => {}}
          placeholder="Click the submit button to search"
        />
      </Flex.Item>
    </Box>
  );
}
