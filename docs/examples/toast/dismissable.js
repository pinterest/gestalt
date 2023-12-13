// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Toast } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex justifyContent="center" alignItems="center" width="100%" height="100%">
      <Toast text="Your Pin was saved" dismissButton={{ onDismiss: () => {} }} />
    </Flex>
  );
}
