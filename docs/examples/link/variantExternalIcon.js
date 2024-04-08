// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Flex gap={{ row: 4, column: 0 }} width={300} wrap>
        <Text inline>
          To receive push notifications instead of texts,{' '}
          <Link
            display="inline"
            externalLinkIcon="default"
            href="https://authy.com/download/"
            rel="nofollow"
            target="blank"
          >
            download the Authy app
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
