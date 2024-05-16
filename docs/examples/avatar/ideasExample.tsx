import { ReactNode } from 'react';
import { Avatar, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" direction="column" gap={{ column: 2, row: 0 }}>
        <Avatar name="Artwork" size="xl" src="https://i.ibb.co/jVR29XV/stock5.jpg" />
        <Text weight="bold">Explore Typographic Art</Text>
      </Flex>
    </Flex>
  );
}
