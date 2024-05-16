import { ReactNode } from 'react';
import { AvatarGroup, Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex
      alignContent="center"
      gap={{ row: 4, column: 0 }}
      height="100%"
      justifyContent="center"
      wrap
    >
      <Box height={125} width={300}>
        <AvatarGroup
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
          size="fit"
        />
      </Box>
    </Flex>
  );
}
