// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%">
      <Box paddingY={2}>
        <Box color="infoBase" height={50} marginBottom={1} padding={2}>
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
          marginTop={1}
          padding={2}
        >
          <Text color="light" weight="bold">
            This uses dangerouslySetInlineStyle to add a calculated paddingBottom
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
