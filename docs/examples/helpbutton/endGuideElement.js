// @flow strict
import { type Node } from 'react';
import { HelpButton, Text, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" justifyContent="center" alignItems="center" gap={1}>
      <Text>This is a Gestalt</Text>
      <HelpButton
        text="Is Pinterest`s design system"
        accessibilityPopoverLabel="Gestalt meaning description"
      />
    </Flex>
  );
}
