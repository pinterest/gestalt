// @flow strict
import { type Node } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Text inline>
        Find tips and best practices on the{' '}
        <Link href="https://business.pinterest.com/" display="inline">
          Pinterest Business Site
        </Link>
      </Text>
    </Flex>
  );
}
