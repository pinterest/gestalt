// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" alignItems="start" gap={{ row: 2, column: 0 }}>
        <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
          <Text inline size="100">
            Size 100
          </Text>
          <span lang="ja">
            <Text inline size="100">
              こんにちは
            </Text>
          </span>
        </Flex>

        <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
          <Text inline size="200">
            Size 200
          </Text>
          <span lang="ja">
            <Text inline size="200">
              こんにちは
            </Text>
          </span>
        </Flex>

        <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
          <Text inline size="300">
            Size 300 (default size)
          </Text>
          <span lang="ja">
            <Text inline size="300">
              こんにちは
            </Text>
          </span>
        </Flex>

        <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
          <Text inline size="400">
            Size 400
          </Text>
          <span lang="ja">
            <Text inline size="400">
              こんにちは
            </Text>
          </span>
        </Flex>

        <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
          <Text inline size="500">
            Size 500
          </Text>
          <span lang="ja">
            <Text inline size="500">
              こんにちは
            </Text>
          </span>
        </Flex>

        <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
          <Text inline size="600">
            Size 600
          </Text>
          <span lang="ja">
            <Text inline size="600">
              こんにちは
            </Text>
          </span>
        </Flex>
      </Flex>
    </Flex>
  );
}
