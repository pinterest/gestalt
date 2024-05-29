import { Box, ButtonToggle, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Box padding={4}>
      <Flex gap={6} height="100%" width="100%" wrap>
        <Flex direction="column" gap={2}>
          <ButtonToggle color="red" selected={false} size="lg" text="Save" />
          <Text size="200" weight="bold">
            color=&quot;red&quot;
          </Text>
        </Flex>
        <Flex direction="column" gap={2}>
          <ButtonToggle color="transparent" selected={false} size="lg" text="Follow" />
          <Text size="200" weight="bold">
            color=&quot;transparent&quot;
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}
