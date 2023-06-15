// @flow strict
import { type Node } from 'react';
import { Avatar, Flex, Toast } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
      <Toast
        text="Switched to Mara Ibrahim"
        thumbnail={{
          avatar: <Avatar src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />,
        }}
      />
    </Flex>
  );
}
