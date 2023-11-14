// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Text inline>
        Go to{' '}
        <Link
          href="https://developers.pinterest.com/account-setup/"
          display="inline"
          externalLinkIcon="default"
          target="blank"
        >
          My Apps
        </Link>
        .
      </Text>
    </Flex>
  );
}
