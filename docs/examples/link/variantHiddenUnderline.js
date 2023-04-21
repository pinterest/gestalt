// @flow strict
import { type Node } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" width="100%" gap={2} alignItems="center" justifyContent="center">
      <Text weight="bold">
        <Link href="https://www.pinterest.com" display="inline" underline="none">
          I&lsquo;m a link with no underline
        </Link>
      </Text>
    </Flex>
  );
}
