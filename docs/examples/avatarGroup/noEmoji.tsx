import { AvatarGroup, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <AvatarGroup
        accessibilityLabel="Collaborators: Fatima, Sora, Ayesha."
        collaborators={[
          {
            color: 10,
            name: 'Sora',
          },
          {
            color: 4,
            name: '🙏🏾',
          },
          {
            name: 'Fatima',
            src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
          },
        ]}
        size="md"
      />
    </Flex>
  );
}
