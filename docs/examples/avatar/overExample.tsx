import { Avatar, Box, Flex, Mask, Text } from 'gestalt';

export default function Example() {
  const src = 'https://i.pinimg.com/564x/8e/fb/f7/8efbf75008c34394104ef9568c038d2d.jpg';

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box position="relative">
        <Mask wash>
          <Avatar name="Artwork" size="xl" src={src} />
        </Mask>
        <Box left position="absolute" top>
          <Text weight="bold">Explore Typographic Art</Text>
        </Box>
      </Box>
    </Flex>
  );
}
