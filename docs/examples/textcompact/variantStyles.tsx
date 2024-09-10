import { Flex, TextCompact } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="start" direction="column" gap={2}>
        <TextCompact weight="default">Default</TextCompact>
        <TextCompact weight="emphasis">Emphasis</TextCompact>
        <TextCompact italic>Italic</TextCompact>
      </Flex>
    </Flex>
  );
}
