// @flow strict
import { type Node } from 'react';
import { Flex, Status } from 'gestalt';

export default function EstablishedExample(): Node {
  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Status type="ok" title="Campaign complete" />
    </Flex>
  );
}
