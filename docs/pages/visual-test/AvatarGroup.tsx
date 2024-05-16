import {ReactNode} from 'react';
import { AvatarGroup, Box } from 'gestalt';

export default function Snapshot() {
  return (
    <Box padding={1}>
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
        size="md"
      />
    </Box>
  );
}
