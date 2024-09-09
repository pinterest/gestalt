import { Flex, TextUI } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="start" direction="column" gap={2}>
        <TextUI>Default</TextUI>
        <TextUI italic>Italic</TextUI>
      </Flex>
    </Flex>
  );
}
