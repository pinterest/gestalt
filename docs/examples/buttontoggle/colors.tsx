import { Box, ButtonToggle, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Box padding={4}>
      <Flex gap={6} height="100%" width="100%" wrap>
        {['red', 'transparent'].map((color) => (
          <Flex key={color} direction="column" gap={2}>
            <ButtonToggle
              color={color as 'red' | 'transparent'}
              selected={false}
              size="lg"
              text="Save"
            />
            <Text size="200" weight="bold">
              color=&quot;{color}&quot;
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}
