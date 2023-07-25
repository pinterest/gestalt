// @flow strict
import { type Node } from 'react';
import { ButtonLink, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonLink
        accessibilityLabel="Visit Pinterest"
        iconEnd="visit"
        size="lg"
        text="Visit Pinterest"
        rel="nofollow"
        target="blank"
        href="#"
      />
    </Flex>
  );
}
