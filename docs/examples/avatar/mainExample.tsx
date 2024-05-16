import {ReactNode} from 'react';
import { Avatar, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex
      alignContent="center"
      gap={{ row: 4, column: 0 }}
      height="100%"
      justifyContent="center"
      wrap
    >
      <Avatar name="Keerthi" size="xs" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
      <Avatar name="Keerthi" size="sm" />
      <Avatar name="Keerthi" size="md" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" verified />
      <Avatar name="Ayesha" size="lg" />
      <Avatar name="Keerthi" size="xl" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
    </Flex>
  );
}
