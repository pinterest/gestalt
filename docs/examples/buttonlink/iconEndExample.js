// @flow strict
import { type Node } from 'react';
import { ButtonLink, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonLink
        accessibilityLabel=""
        iconEnd="visit"
        size="lg"
        text="Visit Pinterest"
        href="https://www.pinterest.com/"
      />
    </Flex>
  );
}
