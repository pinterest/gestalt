import { AvatarGroup, Box } from 'gestalt';

export default function Snapshot() {
  return (
    <Box padding={1}>
      <AvatarGroup
        accessibilityLabel="Collaborators: Keerthi, Alberto, Shanice."
        collaborators={[
          {
            name: 'Keerthi',
            src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
          },
          {
            name: 'Alberto',
            src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
          },
          {
            name: 'Shanice',
            src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
          },
        ]}
        size="md"
      />
    </Box>
  );
}
