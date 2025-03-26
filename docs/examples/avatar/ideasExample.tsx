import { Avatar, Flex, Text } from 'gestalt';

export default function Example() {
  const src = 'https://i.pinimg.com/564x/b9/f0/56/b9f0561e2d7927fa427f2306a41bce11.jpg';

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" direction="column" gap={{ column: 2, row: 0 }}>
        <Avatar name="Artwork" size="xl" src={src} />
        <Text weight="bold">Explore Typographic Art</Text>
      </Flex>
    </Flex>
  );
}
