// @flow strict
import { type Node } from 'react';
import { AvatarGroup, Box, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex
      gap={{ row: 4, column: 0 }}
      wrap
      height="100%"
      alignContent="center"
      justifyContent="center"
    >
      <Box width={300} height={125}>
        <AvatarGroup
          size="fit"
          accessibilityLabel="Collaborators: Keerthi, Alberto, Shanice."
          collaborators={[
            {
              name: 'Keerthi',
              src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
            },
            {
              name: 'Alberto',
              src: 'https://i.ibb.co/NsK2w5y/Alberto.jpg',
            },
            {
              name: 'Shanice',
              src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
            },
          ]}
        />
      </Box>
    </Flex>
  );
}
