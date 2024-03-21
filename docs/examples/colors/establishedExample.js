// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Status } from 'gestalt';

export default function EstablishedExample(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Status title="Campaign complete" type="ok" />
    </Flex>
  );
}
