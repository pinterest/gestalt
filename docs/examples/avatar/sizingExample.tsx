import { Avatar, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%" wrap>
      <Avatar name="Keerthi" size="xs" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
      <Avatar name="Keerthi" size="sm" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
      <Avatar name="Keerthi" size="md" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
      <Avatar name="Keerthi" size="lg" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
      <Avatar name="Keerthi" size="xl" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
    </Flex>
  );
}
