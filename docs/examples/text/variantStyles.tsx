import { Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="start" gap={6}>
        <Flex alignItems="start" direction="column" gap={2}>
          <Text inline size="100">
            Size 100
          </Text>
          <Text inline size="200">
            Size 200
          </Text>
          <Text inline size="300">
            Size 300
          </Text>
          <Text inline size="400">
            Size 400
          </Text>
          <Text inline size="500">
            Size 500
          </Text>
          <Text inline size="600">
            Size 600
          </Text>
        </Flex>
        <Flex alignItems="start" direction="column" gap={2}>
          <Text inline size="100" weight="bold">
            Size 100
          </Text>
          <Text inline size="200" weight="bold">
            Size 200
          </Text>
          <Text inline size="300" weight="bold">
            Size 300
          </Text>
          <Text inline size="400" weight="bold">
            Size 400
          </Text>
          <Text inline size="500" weight="bold">
            Size 500
          </Text>
          <Text inline size="600" weight="bold">
            Size 600
          </Text>{' '}
        </Flex>
        <Text italic>Italic</Text>
        <Text underline>Underline</Text>
      </Flex>
    </Flex>
  );
}
