// @flow strict
import { type Node } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Flex gap={{ row: 4, column: 0 }} wrap width={300}>
        <Text inline>
          To receive push notifications instead of texts,{' '}
          <Link
            href="https://authy.com/download/"
            display="inline"
            externalLinkIcon="default"
            target="blank"
            rel="nofollow"
          >
            download the Authy app
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
