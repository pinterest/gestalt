// @flow strict
import { type Node } from 'react';
import { Flex, Icon, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Flex gap={2} justifyContent="center" width="100%">
        <Text inline>
          {' '}
          Visit{' '}
          <Text inline>
            <Link href="https://www.w3.org/WAI/standards-guidelines/" display="inline">
              WCAG accessibility resources
            </Link>
          </Text>
        </Text>
        <Icon icon="link" accessibilityLabel="" color="default" />
      </Flex>
    </Flex>
  );
}
