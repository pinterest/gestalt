// @flow strict
import { type Node } from 'react';
import { Avatar, Flex, IconButton, Link, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center" gap={2}>
      <Avatar name="James Jones" src="https://i.ibb.co/2Fc00R3/james.jpg" size="md" />
      <Flex gap={{ row: 2, column: 0 }} alignItems="center">
        <Text inline weight="bold">
          <Link
            accessibilityLabel="Open the settings page"
            target="blank"
            display="inlineBlock"
            underline="none"
            href="https://www.pinterest.com/settings/"
          >
            James Jones
          </Link>
        </Text>
        <IconButton
          accessibilityLabel="Open the settings page"
          icon="edit"
          size="xs"
          tabIndex={-1}
          onClick={() => {}}
          tooltip={{ text: 'Edit name' }}
        />
      </Flex>
    </Flex>
  );
}
