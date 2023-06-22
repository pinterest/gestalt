// @flow strict
import { type Node } from 'react';
import { Avatar, Box, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Box width="100%" maxWidth={900}>
      <Flex>
        <Box width={40}>
          <Avatar name="Julia" />
        </Box>
        <Box column={2}>
          <Avatar name="Julia" />
        </Box>
        <Box column={4}>
          <Avatar name="Keerthi" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
        </Box>
      </Flex>
    </Box>
  );
}
