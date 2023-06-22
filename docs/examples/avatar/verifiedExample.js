// @flow strict
import { type Node } from 'react';
import { Avatar, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" width="100%" alignItems="center" justifyContent="center">
      <Avatar
        name="Shanice"
        accessibilityLabel="Shanice, Verified account"
        size="lg"
        src="https://i.ibb.co/7tGKGvb/shanice.jpg"
        verified
      />
    </Flex>
  );
}
