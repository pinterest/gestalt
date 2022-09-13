// @flow strict
import { type Node } from 'react';
import { Flex, Box } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex
      gap={{ row: 4, column: 0 }}
      wrap
      height="100%"
      alignContent="center"
      justifyContent="center"
    >
      <Box
        width="25%"
        minHeight={25}
        maxHeight={100}
        overflow="hidden"
        padding={2}
        borderStyle="sm"
        color="warningBase"
      />
      <Box
        width="25%"
        minHeight={25}
        maxHeight={100}
        overflow="hidden"
        padding={2}
        borderStyle="sm"
        color="warningBase"
      />

      <Box
        width="25%"
        minHeight={25}
        maxHeight={100}
        overflow="hidden"
        padding={2}
        borderStyle="sm"
        color="warningBase"
      />
      <Box
        width="25%"
        minHeight={25}
        maxHeight={100}
        overflow="hidden"
        padding={2}
        borderStyle="sm"
        color="warningBase"
      />
    </Flex>
  );
}
