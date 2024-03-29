// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
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
