import { AvatarGroup, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <AvatarGroup
        accessibilityLabel="Collaborators: Fatima, Mami Wata, Ayesha."
        collaborators={[
          {
            name: 'Fatima',
            src: 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg',
          },
          {
            name: 'Mami Wata',
            src: 'https://i.pinimg.com/564x/52/ed/6a/52ed6a9475eeb7e0133fb6d3a8b6aaa4.jpg',
          },
          {
            name: 'Ayesha',
            src: 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg',
          },
        ]}
        size="md"
      />
    </Flex>
  );
}
