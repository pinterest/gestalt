// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, SearchField } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex.Item flex="grow">
        <SearchField
          accessibilityClearButtonLabel="Clear search field"
          accessibilityLabel="Search your Pins"
          id="bestPracticesDont2"
          onChange={() => {}}
          placeholder="Click the submit button to search"
        />
      </Flex.Item>
    </Box>
  );
}
