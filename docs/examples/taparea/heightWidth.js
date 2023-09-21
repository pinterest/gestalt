// @flow strict
import { type Node } from 'react';
import { Box, Flex, TapArea, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={6} wrap maxWidth={500} height={250}>
        <Box borderStyle="sm" margin={3} width="100%" height="100%">
          <TapArea fullHeight>
            <Box height="100%" color="secondary">
              <Text align="center">Full parent height</Text>
            </Box>
          </TapArea>
        </Box>
        <Box borderStyle="sm" margin={3} width="100%" height="100%">
          <TapArea>
            <Box height="100%" color="secondary">
              <Text align="center">Child height only</Text>
            </Box>
          </TapArea>
        </Box>
      </Flex>
    </Box>
  );
}
