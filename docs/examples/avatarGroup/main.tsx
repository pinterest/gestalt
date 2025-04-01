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
              name: 'Fatima',
              src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
            },
            {
              name: 'Sora',
              src: 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg',
            },
            {
              name: 'Ayesha',
              src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
            },
          ]}
          size="fit"
        />
      </Box>
    </Flex>
  );
}
