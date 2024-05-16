import { ReactNode } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Box color="infoBase" padding={4} rounding={3} width="50%">
        <Flex alignItems="center" direction="column" gap={{ column: 3, row: 0 }}>
          <Text color="inverse" size="600" weight="bold">
            Tips
          </Text>
          <Flex alignItems="center" gap={{ row: 1, column: 0 }}>
            <Text align="center" color="inverse" size="400" weight="bold">
              <Link display="inline" href="https://pinterest.com">
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
