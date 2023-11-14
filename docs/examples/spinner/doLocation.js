// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Heading, Spinner, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box color="secondary" rounding={4} height="90%" width="90%" padding={5}>
        <Flex direction="column" alignItems="start" justifyContent="start" height="100%">
          <Flex direction="column" gap={1}>
            <Heading size="500">Performance</Heading>
            <Text size="300">Showing data from the last 30 days</Text>
          </Flex>

          <Flex.Item alignSelf="center" flex="grow">
            <Flex height="100%" alignItems="center">
              <Spinner show accessibilityLabel="Example spinner" />
            </Flex>
          </Flex.Item>
        </Flex>
      </Box>
    </Flex>
  );
}
