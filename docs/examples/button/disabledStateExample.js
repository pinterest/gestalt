// @flow strict
import { type Node as ReactNode } from 'react';
import { Button, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Button accessibilityLabel="Submit" disabled text="Submit" size="lg" />{' '}
    </Flex>
  );
}
