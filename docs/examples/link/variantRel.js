// @flow strict
import { type Node } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 4, row: 0 }} width={300}>
        <Text inline size="100">
          Visit{' '}
          <Link
            href="https://authy.com/download/"
            display="inline"
            externalLinkIcon={{ size: '100', color: 'dark' }}
            target="blank"
            rel="nofollow"
          >
            MyBusiness.com
          </Link>{' '}
          for shipping details
        </Text>
        <Text inline size="400" color="success">
          <Link
            href="https://authy.com/download/"
            display="inline"
            externalLinkIcon={{ size: '400', color: 'success' }}
            target="blank"
            rel="nofollow"
          >
            MyBusiness.com
          </Link>{' '}
          was successfully claimed
        </Text>
      </Flex>
    </Flex>
  );
}
