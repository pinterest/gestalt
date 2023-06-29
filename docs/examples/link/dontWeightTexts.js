// @flow strict
import { type Node } from 'react';
import { Flex, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 4, row: 0 }} direction="column" width="90%">
        <Text weight="bold"> Need help? </Text>
        <Text inline>
          {' '}
          Find tips and best practices on the
          <Text weight="bold" inline>
            <Link href="https://business.pinterest.com/" display="inline" underline="hover">
              {' '}
              Pinterest Business Site{' '}
            </Link>
          </Text>
        </Text>
        <Text inline>
          {' '}
          Troubleshoot issues with the
          <Text weight="bold" inline>
            <Link href="https://help.pinterest.com" display="inline" underline="hover">
              {' '}
              Pinterest Help Center{' '}
            </Link>
          </Text>
        </Text>
      </Flex>
    </Flex>
  );
}
