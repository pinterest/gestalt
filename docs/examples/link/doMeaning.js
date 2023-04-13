// @flow strict
import { type Node } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Text>
        Visit{' '}
        <Text inline>
          <Link display="inline" href="https://pinterest.com">
            Pinterest.com
          </Link>
        </Text>{' '}
        for more information.
      </Text>
    </Flex>
  );
}
