// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Flex direction="column" gap={{ column: 3, row: 0 }} width="70%">
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
          .
        </Text>
      </Flex>
    </Flex>
  );
}
