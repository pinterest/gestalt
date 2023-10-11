// @flow strict
import { type Node } from 'react';
import { Box, Flex, TapArea, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box color="warningBase" height={250} padding={3} maxWidth={500}>
        <Flex direction="column" gap={{ column: 6, row: 0 }}>
          <Flex.Item>
            <Text color="inverse" inline>
              Other content
            </Text>
            <Box borderStyle="sm" margin={3} column={6}>
              <TapArea>
                <Box height="100%" color="secondary">
                  <Text align="center">Default behavior (block)</Text>
                </Box>
              </TapArea>
            </Box>
          </Flex.Item>

          <Flex.Item>
            <Text color="inverse" inline>
              Other content
            </Text>
            <Box borderStyle="sm" display="inlineBlock" margin={3} column={6}>
              <TapArea>
                <Box height="100%" color="secondary">
                  <Text align="center">Inline behavior</Text>
                </Box>
              </TapArea>
            </Box>
          </Flex.Item>
        </Flex>
      </Box>
    </Box>
  );
}
