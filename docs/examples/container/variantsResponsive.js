// @flow strict
import { type Node } from 'react';
import { Box, Container, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box width="100%" height="100%" color="secondary" paddingX={3} paddingY={6}>
        <Container>
          <Box color="default" padding={3}>
            <Text>Centered content</Text>
          </Box>
        </Container>
      </Box>
    </Flex>
  );
}
