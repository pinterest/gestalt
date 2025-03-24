import { Avatar, Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box maxWidth={900} width="100%">
      <Flex>
        <Box width={40}>
          <Avatar name="Keerthi" />
        </Box>
        <Box column={2}>
          <Avatar name="Keethi" />
        </Box>
        <Box column={4}>
          <Avatar name="Keerthi" src="https://i.pinimg.com/originals/bf/bc/27/bfbc27685d81eb9a8f65c201ea661f0e.jpg" />
        </Box>
      </Flex>
    </Box>
  );
}
