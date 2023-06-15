// @flow strict
import { type Node } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center">
        <Text inline>
          To see how you can grow your business, visit{' '}
          <Link
            href="https://business.pinterest.com/advertise"
            display="inlineBlock"
            externalLinkIcon="default"
            target="blank"
          >
            Pinterest Ads
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
