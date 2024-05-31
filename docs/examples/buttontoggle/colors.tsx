import { ButtonToggle, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={6} height="100%" justifyContent="center" width="100%">
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
  );
}
