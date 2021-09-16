// @flow strict
import type { Node } from 'react';
import { AvatarGroup, Box, ColorSchemeProvider } from 'gestalt';

export default function AvatarGroupSpec(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock" padding={1}>
        <AvatarGroup
          size="md"
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
    </ColorSchemeProvider>
  );
}
