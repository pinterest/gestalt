// @flow strict
import { type Node } from 'react';
import { Button, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Button accessibilityLabel="Following" text="Following" selected size="lg" />
    </Flex>
  );
}
