// @flow strict
import { type Node } from 'react';
import { Button, Flex, Tooltip } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Tooltip text="You need to fill in a username to create an account">
        <Button text="Create account" disabled size="lg" color="red" />
      </Tooltip>
    </Flex>
  );
}
