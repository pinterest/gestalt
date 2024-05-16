import { Box, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Text size="500" weight="bold">
          Start a conversation
        </Text>
        <Text size="200">
          Great content should highlight you and your ideas. Put your original spin on something and
          don’t be afraid to let your own perspective shine. For example: Fashion inspiration to
          freshen up a wardrobe.
        </Text>
      </Flex>
    </Box>
  );
}
