// @flow strict
import { type Node } from 'react';
import { Pog, Text, Flex, Box } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <Box color="white" display="inlineBlock" padding={1}>
      <Flex direction="column" gap={4}>
        <Flex gap={4}>
          <Flex direction="column" gap={1}>
            <Text>Default</Text>
            <Pog icon="heart" iconColor="red" />
          </Flex>
          <Flex direction="column" gap={1}>
            <Text>Hovered</Text>
            <Pog icon="heart" iconColor="red" hovered />
          </Flex>
          <Flex direction="column" gap={1}>
            <Text>Focused</Text>
            <Pog icon="heart" iconColor="red" focused />
          </Flex>
          <Flex direction="column" gap={1}>
            <Text>Active</Text>
            <Pog icon="heart" iconColor="red" active />
          </Flex>
          <Flex direction="column" gap={1}>
            <Text>Selected</Text>
            <Pog icon="heart" iconColor="red" selected />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
