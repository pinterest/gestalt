import { Flex, TextUI } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="start" direction="column" gap={{ row: 2, column: 0 }}>
        <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
          <TextUI inline size="xs">
            Size 100
          </TextUI>
          <span lang="ja">
            <TextUI inline size="xs">
              こんにちは
            </TextUI>
          </span>
        </Flex>

        <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
          <TextUI inline size="sm">
            Size 200
          </TextUI>
          <span lang="ja">
            <TextUI inline size="sm">
              こんにちは
            </TextUI>
          </span>
        </Flex>

        <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
          <TextUI inline size="md">
            Size 300 (default size)
          </TextUI>
          <span lang="ja">
            <TextUI inline size="md">
              こんにちは
            </TextUI>
          </span>
        </Flex>

        <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
          <TextUI inline size="lg">
            Size 400
          </TextUI>
          <span lang="ja">
            <TextUI inline size="lg">
              こんにちは
            </TextUI>
          </span>
        </Flex>
      </Flex>
    </Flex>
  );
}
