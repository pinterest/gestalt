import { Badge, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={4}>
        <Text size="300">
          Ads & Campaigns <Badge text="New" />
        </Text>
        <Text size="600">
          Ads & Campaigns <Badge position="top" text="Beta" />
        </Text>
      </Flex>
    </Flex>
  );
}
