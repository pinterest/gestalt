// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
      <Flex gap={6} direction="column">
        <Flex direction="column" gap={2}>
          <Text>Equal vertical/horizontal spacing</Text>
          <Box borderStyle="sm" padding={2} rounding={3} width={150}>
            <Flex alignItems="center" gap={4} wrap>
              {[1, 2, 3, 4, 5, 6].map((x) => (
                <Box key={`equalGap ${x}`} width={50} color="selected">
                  <Text color="light">Item {x}</Text>
                </Box>
              ))}
            </Flex>
          </Box>
        </Flex>
        <Flex direction="column" gap={2}>
          <Text>Different vertical/horizontal spacing</Text>
          <Box borderStyle="sm" padding={2} rounding={3} width={150}>
            <Flex alignItems="center" gap={{ row: 2, column: 8 }} wrap>
              {[1, 2, 3, 4, 5, 6].map((x) => (
                <Box width={50} color="selected" key={`diffGap${x}`}>
                  <Text color="light">Item {x}</Text>
                </Box>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
