// @flow strict
import { type Node } from 'react';
import { Avatar, Box, Flex, Toast } from 'gestalt';

export default function Example(): Node {
  return (
    <Box paddingY={4} width="100%" height="100%">
      <Flex alignItems="end" justifyContent="center" width="100%" height="100%">
        <Toast
          thumbnail={{
            avatar: <Avatar src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" name="Keerthi" />,
          }}
          text="2-factor authentication added for Sabina Romero"
        />
      </Flex>
    </Box>
  );
}
