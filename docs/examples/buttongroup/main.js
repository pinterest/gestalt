// @flow strict
import { type Node as ReactNode } from 'react';
import { Button, ButtonGroup, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <ButtonGroup>
        <Button text="Cancel" />
        <Button color="red" text="Send" />
      </ButtonGroup>
    </Flex>
  );
}
