import { Avatar, Flex, Text } from 'gestalt';

export default function Example() {
  const name = 'Ayesha Rashad';
  const src = 'https://i.pinimg.com/originals/c5/5c/ac/c55caca43a7c16766215ec165b649c1c.jpg';

  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={{ column: 2, row: 0 }}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Avatar name={name} size="xl" src={src} />
      <Text weight="bold">{name}</Text>
    </Flex>
  );
}
