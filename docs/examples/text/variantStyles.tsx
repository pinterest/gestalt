import { Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="start" direction="column" gap={2}>
        <Text weight="bold">Bold</Text>
        <Text italic>Italic</Text>
        <Text underline>Underline</Text>
      </Flex>
    </Flex>
  );
}
