// @flow strict
import { type Node } from 'react';
import { Button, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Button
        accessibilityLabel="Visit Pinterest"
        iconEnd="visit"
        size="lg"
        text="Visit Pinterest"
        role="link"
        rel="nofollow"
        target="blank"
        href="https://pinterest.com"
      />
    </Flex>
  );
}
