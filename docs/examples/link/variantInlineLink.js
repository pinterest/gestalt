// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Flex direction="row" width="90%" wrap>
        <Text inline>
          Find tips and best practices on the{' '}
          <Link href="https://business.pinterest.com/" display="inline">
            Pinterest Business Site{' '}
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
