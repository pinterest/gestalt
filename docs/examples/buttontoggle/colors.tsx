import { ButtonToggle, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={6} height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={2}>
        <ButtonToggle color="secondaryStrong" selected={false} size="lg" text="Save" />
        <Text size="200" weight="bold">
          color=&quot;secondaryStrong&quot;
        </Text>
      </Flex>
      <Flex direction="column" gap={2}>
        <ButtonToggle color="primary" selected={false} size="lg" text="Follow" />
        <Text size="200" weight="bold">
          color=&quot;primary&quot;
        </Text>
      </Flex>
    </Flex>
  );
}
