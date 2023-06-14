// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" alignItems="center">
      <Box paddingY={2}>
        <Box color="infoBase" height={50} padding={2} marginBottom={1}>
          <Text color="light" weight="bold">
            This uses a proper, Gestalt colored Box
          </Text>
        </Box>
        <div style={{ backgroundColor: '#6e0f3c', color: 'white' }}>
          This could be using Box, but isn&apos;t.
        </div>
        <Box
          color="warningBase"
          dangerouslySetInlineStyle={{
            __style: {
              paddingBottom: `${50 + 25}px`,
            },
          }}
          height={50}
          padding={2}
          marginTop={1}
        >
          <Text color="light" weight="bold">
            This uses dangerouslySetInlineStyle to add a calculated paddingBottom
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
