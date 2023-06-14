// @flow strict
import { type Node } from 'react';
import { Avatar, Box, Flex, Mask, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" width="100%" alignItems="center" justifyContent="center">
      <Box position="relative">
        <Mask wash>
          <Avatar size="xl" src="https://i.ibb.co/jVR29XV/stock5.jpg" name="Artwork" />
        </Mask>
        <Box position="absolute" top left>
          <Text weight="bold">Explore Typographic Art</Text>
        </Box>
      </Box>
    </Flex>
  );
}
