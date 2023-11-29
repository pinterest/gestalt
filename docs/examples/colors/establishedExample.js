// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Status } from 'gestalt';

export default function EstablishedExample(): ReactNode {
  return (
    <Flex alignItems="center" justifyContent="center" height="100%">
      <Status type="ok" title="Campaign complete" />
    </Flex>
  );
}
