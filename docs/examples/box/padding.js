// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" width="100%" alignItems="center" justifyContent="center">
      <Box>
        <Box marginTop={4} color="errorBase" width="100%" height={100}>
          <Box color="infoBase" height={100} marginTop={2}>
            <Box color="selected" height={100} marginTop={3}>
              <Text color="light" weight="bold">
                These margins are all collapsed
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Box marginTop={4} paddingY={1} color="errorBase" width="100%" height={100}>
          <Box color="infoBase" height={100} paddingY={2}>
            <Box color="selected" height={100} padding={2}>
              <Text color="light" weight="bold">
                These margins are not collapsed because they use padding
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
