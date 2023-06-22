// @flow strict
import { type Node } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Box color="infoBase" width="50%" padding={4} rounding={3}>
        <Flex direction="column" gap={{ column: 3, row: 0 }} alignItems="center">
          <Text color="inverse" weight="bold" size="600">
            Tips
          </Text>
          <Flex gap={{ row: 1, column: 0 }} alignItems="center">
            <Text color="inverse" size="400" align="center" weight="bold">
              <Link href="https://pinterest.com" display="inline">
                Add a Pinterest widget
              </Link>{' '}
              and get inspired right from your phone&lsquo;s home screen.
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
