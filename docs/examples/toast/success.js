// @flow strict
import { type Node } from 'react';
import { Flex, Toast } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
      <Toast type="success" text="Password updated" />
    </Flex>
  );
}
