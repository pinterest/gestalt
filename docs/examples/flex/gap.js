// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={6}>
        <Flex direction="column" gap={2}>
          <Text>Equal vertical/horizontal spacing</Text>
          <Box borderStyle="sm" padding={2} rounding={3} width={150}>
            <Flex alignItems="center" gap={4} wrap>
              {[1, 2, 3, 4, 5, 6].map((x) => (
                <Box key={`equalGap ${x}`} color="selected" width={50}>
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
                <Box key={`diffGap${x}`} color="selected" width={50}>
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
