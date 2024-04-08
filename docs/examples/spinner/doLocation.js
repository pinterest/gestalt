// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Heading, Spinner, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box color="secondary" height="90%" padding={5} rounding={4} width="90%">
        <Flex alignItems="start" direction="column" height="100%" justifyContent="start">
          <Flex direction="column" gap={1}>
            <Heading size="500">Performance</Heading>
            <Text size="300">Showing data from the last 30 days</Text>
          </Flex>

          <Flex.Item alignSelf="center" flex="grow">
            <Flex alignItems="center" height="100%">
              <Spinner accessibilityLabel="Example spinner" show />
            </Flex>
          </Flex.Item>
        </Flex>
      </Box>
    </Flex>
  );
}
