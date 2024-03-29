// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, IconButton } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <IconButton
        accessibilityLabel="Share"
        icon="share"
        size="lg"
        tooltip={{ text: 'Send pin to others' }}
      />
    </Flex>
  );
}
