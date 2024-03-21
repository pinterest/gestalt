// @flow strict
import { type Node as ReactNode } from 'react';
import { ButtonGroup, ButtonLink, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <ButtonLink color="red" href="pinterest.com" size="lg" text="Visit" />
        <ButtonLink color="red" href="pinterest.com" size="lg" text="Save" />
      </ButtonGroup>
    </Flex>
  );
}
