// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Box color="dark" padding={1}>
          <Heading color="inverse" size="500">
            Inverse
          </Heading>
        </Box>

        <Heading size="500">Default</Heading>

        <Heading color="subtle" size="500">
          Subtle
        </Heading>

        <Heading color="success" size="500">
          Success
        </Heading>

        <Heading color="error" size="500">
          Error
        </Heading>

        <Heading color="warning" size="500">
          Warning
        </Heading>

        <Heading color="shopping" size="500">
          Shopping
        </Heading>

        <Box color="primary" padding={1}>
          <Heading color="light" size="500">
            Light
          </Heading>
        </Box>

        <Box color="infoWeak" padding={1}>
          <Heading color="dark" size="500">
            Dark
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
}
