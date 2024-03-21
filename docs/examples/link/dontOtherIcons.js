// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Icon, Link, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Flex gap={2} justifyContent="center" width="100%">
        <Text inline>
          {' '}
          Visit{' '}
          <Text inline>
            <Link display="inline" href="https://www.w3.org/WAI/standards-guidelines/">
              WCAG accessibility resources
            </Link>
          </Text>
        </Text>
        <Icon accessibilityLabel="" color="default" icon="link" />
      </Flex>
    </Flex>
  );
}
