// @flow strict
import { type Node } from 'react';
import { Box, Divider, Flex, Heading, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex width="80%">
        <Box paddingX={4}>
          <Heading accessibilityLevel="none" size="400">
            Our mission
          </Heading>
        </Box>
        <Divider />
        <Box paddingX={4}>
          <Text size="200">
            Pinterest&apos;s mission is to bring everyone the inspiration to create a life they
            love.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
