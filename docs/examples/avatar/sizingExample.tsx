import { Avatar, Flex } from 'gestalt';

export default function Example() {
  const name = 'Fatima';
  const src = 'https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg';

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%" wrap>
      <Avatar name={name} size="xs" src={src} />
      <Avatar name={name} size="sm" src={src} />
      <Avatar name={name} size="md" src={src} />
      <Avatar name={name} size="lg" src={src} />
      <Avatar name={name} size="xl" src={src} />
    </Flex>
  );
}
