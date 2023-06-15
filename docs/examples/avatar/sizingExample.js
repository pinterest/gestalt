// @flow strict
import { type Node } from 'react';
import { Avatar, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex gap={4} wrap height="100%" width="100%" alignItems="center" justifyContent="center">
      <Avatar size="xs" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />
      <Avatar size="sm" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />
      <Avatar size="md" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />
      <Avatar size="lg" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />
      <Avatar size="xl" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />
    </Flex>
  );
}
