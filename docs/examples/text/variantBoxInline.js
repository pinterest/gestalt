// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="start" direction="column" gap={{ column: 4, row: 0 }}>
        <Text>Some content in a default block element. (default)</Text>
        <Box>
          <Text inline>Inline text with the inline prop.</Text>{' '}
          <Text inline>More inline text.</Text>
        </Box>
      </Flex>
    </Flex>
  );
}
