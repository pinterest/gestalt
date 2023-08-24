// @flow strict
import { type Node } from 'react';
import { Box, Flex, Module, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 2, row: 0 }} maxWidth={800} flex="grow">
        <Module id="ModuleExample - default - 1">
          <Text size="200">This is example content.</Text>
        </Module>

        <Module id="ModuleExample - default - 2" title="Title">
          <Text size="200">This is example content.</Text>
        </Module>
      </Flex>
    </Box>
  );
}
