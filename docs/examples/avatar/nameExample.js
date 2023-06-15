// @flow strict
import { type Node } from 'react';
import { Avatar, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex
      height="100%"
      width="100%"
      justifyContent="center"
      direction="column"
      gap={{ column: 2, row: 0 }}
      alignItems="center"
    >
      <Avatar size="xl" src="https://i.ibb.co/7tGKGvb/shanice.jpg" name="Shanice Byles" />
      <Text weight="bold">Shanice Byles</Text>
    </Flex>
  );
}
