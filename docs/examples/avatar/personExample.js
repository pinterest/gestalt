// @flow strict
import { type Node } from 'react';
import { Avatar, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap={{ column: 2, row: 0 }}
    >
      <Avatar size="xl" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />
      <Text weight="bold">Keerthi Singh</Text>
    </Flex>
  );
}
