// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 4, row: 0 }} direction="column">
        <Heading size="100">Heading size 100</Heading>
        <span lang="ja">
          <Heading size="100">こんにちは</Heading>
        </span>

        <span>
          <Heading size="200">Heading size 200</Heading>
        </span>
        <span lang="ja">
          <Heading size="200">こんにちは</Heading>
        </span>

        <Heading size="300">Heading size 300</Heading>
        <span lang="ja">
          <Heading size="300">こんにちは</Heading>
        </span>

        <Heading size="400">Heading size 400</Heading>
        <span lang="ja">
          <Heading size="400">こんにちは</Heading>
        </span>

        <Heading size="500">Heading size 500</Heading>
        <span lang="ja">
          <Heading size="500">こんにちは</Heading>
        </span>

        <Heading size="600">Heading size 600</Heading>
        <span lang="ja">
          <Heading size="600">こんにちは</Heading>
        </span>
      </Flex>
    </Box>
  );
}
