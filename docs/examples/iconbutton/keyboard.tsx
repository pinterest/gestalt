import {ReactNode} from 'react';
import { Avatar, Flex, IconButton, Link, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <Avatar name="James Jones" size="md" src="https://i.ibb.co/2Fc00R3/james.jpg" />
      <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
        <Text inline weight="bold">
          <Link
            accessibilityLabel="Open the settings page"
            display="inlineBlock"
            href="https://www.pinterest.com/settings/"
            target="blank"
            underline="none"
          >
            James Jones
          </Link>
        </Text>
        <IconButton
          accessibilityLabel="Open the settings page"
          icon="edit"
          onClick={() => {}}
          size="xs"
          tabIndex={-1}
          tooltip={{ text: 'Edit name' }}
        />
      </Flex>
    </Flex>
  );
}
