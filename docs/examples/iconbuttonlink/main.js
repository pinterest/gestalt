// @flow strict
import { type Node } from 'react';
import { Flex, IconButtonLink } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" alignItems="center" justifyContent="center">
      <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
        <IconButtonLink
          accessibilityLabel="This IconButton is an example of IconButton acting as a link"
          icon="visit"
          target="blank"
          href="#"
          tooltip={{ text: 'Visit Pinterest' }}
          onClick={({ event }) => event.preventDefault()}
        />
      </Flex>
    </Flex>
  );
}
