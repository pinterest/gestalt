// @flow strict
import { type Node } from 'react';
import { Box, Flex, TagData } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="secondary"
      >
        <Flex gap={2} wrap>
          <TagData text="Impressions" baseColor="secondary" />
          <TagData text="CPM" baseColor="secondary" />
          <TagData text="Spend" baseColor="secondary" />
        </Flex>
      </Box>
    </Flex>
  );
}
