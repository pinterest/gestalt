// @flow strict
import { type Node } from 'react';
import { Box, Flex, TagData } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
      <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
        <Flex gap={2} wrap>
          <TagData text="Impressions" baseColor="white" />
          <TagData text="CPM" baseColor="white" />
          <TagData text="Spend" baseColor="white" />
        </Flex>
      </Box>
    </Flex>
  );
}
