// @flow strict
import { type Node as ReactNode } from 'react';
import { Avatar, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={{ column: 2, row: 0 }}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Avatar name="Shanice Byles" size="xl" src="https://i.ibb.co/7tGKGvb/shanice.jpg" />
      <Text weight="bold">Shanice Byles</Text>
    </Flex>
  );
}
