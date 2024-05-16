import { Avatar, Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box maxWidth={900} width="100%">
      <Flex>
        <Box width={40}>
          <Avatar name="Julia" />
        </Box>
        <Box column={2}>
          <Avatar name="Julia" />
        </Box>
        <Box column={4}>
          <Avatar name="Keerthi" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
        </Box>
      </Flex>
    </Box>
  );
}
