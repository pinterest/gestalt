// @flow strict
import { type Node } from 'react';
import { Box, Flex, Module, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Flex.Item flex="grow" maxWidth="80%">
        <Box maxWidth={800}>
          <Module badge={{ text: 'Beta' }} id="Badge example - Module" title="Module title">
            <Text size="200">This is example content.</Text>
          </Module>
        </Box>
      </Flex.Item>
    </Flex>
  );
}
