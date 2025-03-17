import { Avatar, Flex, Text } from 'gestalt';

export default function Example() {
  const firstName = 'Sora';
  const fullName = 'Sora Suzuki';
  const src = 'https://i.pinimg.com/originals/ab/c5/4a/abc54abd85df131e90ca6b372368b738.jpg';

  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={{ column: 2, row: 0 }}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Avatar name={firstName} size="xl" src={src} />
      <Text weight="bold">{fullName}</Text>
    </Flex>
  );
}
