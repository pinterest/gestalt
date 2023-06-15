// @flow strict
import { type Node } from 'react';
import { Avatar, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex
      gap={{ row: 4, column: 0 }}
      wrap
      height="100%"
      alignContent="center"
      justifyContent="center"
    >
      <Avatar size="xs" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />
      <Avatar size="sm" name="Keerthi" />
      <Avatar size="md" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" verified />
      <Avatar size="lg" name="Ayesha" />
      <Avatar size="xl" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />
    </Flex>
  );
}
