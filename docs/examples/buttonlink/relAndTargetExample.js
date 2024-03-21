// @flow strict
import { type Node as ReactNode } from 'react';
import { ButtonLink, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonLink
        accessibilityLabel="Visit Pinterest"
        href="#"
        iconEnd="visit"
        rel="nofollow"
        size="lg"
        target="blank"
        text="Visit Pinterest"
      />
    </Flex>
  );
}
