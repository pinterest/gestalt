// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box color="secondary" display="inlineBlock" padding={4} width={600}>
      <Flex direction="column" gap={4}>
        <Flex alignItems="center" gap={4} width="100%">
          <Flex.Item>
            <Box color="infoWeak" padding={4}>
              <Text>Flex Item 1</Text>
            </Box>
          </Flex.Item>
          <Flex.Item flex="grow">
            <Box color="infoWeak" padding={4}>
              <Text>Flex Item 2</Text>
            </Box>
          </Flex.Item>
          <Flex.Item>
            <Box color="infoWeak" padding={4}>
              <Text>Flex Item 3</Text>
            </Box>
          </Flex.Item>
        </Flex>
        <Flex alignItems="center" gap={4} width="100%">
          <Flex.Item flex="grow">
            <Box color="infoWeak" padding={4}>
              <Text>Flex Item 4</Text>
            </Box>
          </Flex.Item>
          <Flex.Item>
            <Box color="infoWeak" padding={4}>
              <Text>Flex Item 5</Text>
            </Box>
          </Flex.Item>
          <Flex.Item>
            <Box color="infoWeak" padding={4}>
              <Text>Flex Item 6</Text>
            </Box>
          </Flex.Item>
        </Flex>
      </Flex>
    </Box>
  );
}
