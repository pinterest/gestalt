// @flow strict
import { type Node as ReactNode } from 'react';
import { AvatarGroup, Box, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
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
