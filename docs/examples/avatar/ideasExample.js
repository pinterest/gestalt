// @flow strict
import { type Node } from 'react';
import { Avatar, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" width="100%" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 2, row: 0 }} alignItems="center">
        <Avatar size="xl" src="https://i.ibb.co/jVR29XV/stock5.jpg" name="Artwork" />
        <Text weight="bold">Explore Typographic Art</Text>
      </Flex>
    </Flex>
  );
}
