// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, TapAreaLink, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={6} wrap maxWidth={500} height={250}>
        <Box borderStyle="sm" margin={3} width="100%" height="100%">
          <TapAreaLink
            href="www.pinterest.com"
            onTap={({ event }) => event.stopPropagation()}
            fullHeight
          >
            <Box height="100%" color="secondary">
              <Text align="center">Full parent height</Text>
            </Box>
          </TapAreaLink>
        </Box>
        <Box borderStyle="sm" margin={3} width="100%" height="100%">
          <TapAreaLink href="www.pinterest.com" onTap={({ event }) => event.stopPropagation()}>
            <Box height="100%" color="secondary">
              <Text align="center">Child height only</Text>
            </Box>
          </TapAreaLink>
        </Box>
      </Flex>
    </Box>
  );
}
