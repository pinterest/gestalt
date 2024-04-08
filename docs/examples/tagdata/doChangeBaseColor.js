// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, TagData } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box
        alignItems="center"
        color="secondary"
        display="flex"
        height="100%"
        justifyContent="center"
        width="100%"
      >
        <Flex gap={2} wrap>
          <TagData baseColor="secondary" text="Impressions" />
          <TagData baseColor="secondary" text="CPM" />
          <TagData baseColor="secondary" text="Spend" />
        </Flex>
      </Box>
    </Flex>
  );
}
