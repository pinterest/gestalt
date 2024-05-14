import { Avatar, Box, Flex, Mask, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box position="relative">
        <Mask wash>
          <Avatar name="Artwork" size="xl" src="https://i.ibb.co/jVR29XV/stock5.jpg" />
        </Mask>
        <Box left position="absolute" top>
          <Text weight="bold">Explore Typographic Art</Text>
        </Box>
      </Box>
    </Flex>
  );
}
