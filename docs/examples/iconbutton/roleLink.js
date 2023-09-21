// @flow strict
import { type Node } from 'react';
import { Flex, IconButtonLink } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
      <IconButtonLink
        accessibilityLabel="This IconButton is an example of IconButton acting as a link"
        icon="visit"
        target="blank"
        href="https://www.pinterest.com"
        tooltip={{ text: 'Link example' }}
      />
    </Flex>
  );
}
