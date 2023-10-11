// @flow strict
import { type Node } from 'react';
import { ButtonGroup, ButtonLink, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonLink text="Visit" size="lg" color="red" href="pinterest.com" />
        <ButtonLink text="Save" size="lg" color="red" href="pinterest.com" />
      </ButtonGroup>
    </Flex>
  );
}
