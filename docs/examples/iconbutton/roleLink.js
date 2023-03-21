// @flow strict
import { type Node } from 'react';
import { Flex, IconButton } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
      <IconButton
        accessibilityLabel="This IconButton is an example of IconButton acting as a link"
        icon="visit"
        role="link"
        target="blank"
        href="https://www.pinterest.com"
        tooltip={{ text: 'Link example' }}
      />
    </Flex>
  );
}
