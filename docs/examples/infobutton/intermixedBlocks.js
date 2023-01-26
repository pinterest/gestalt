// @flow strict
import { type Node } from 'react';
import { InfoButton, Text, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" justifyContent="center" alignItems="center" gap={{ row: 1, column: 1 }}>
      <Text>This is a Gestalt</Text>
      <InfoButton
        text="Is Pinterest`s design system"
        accessibilityLabel="Gestalt meaning description"
      />
      <Text>don`t do best practices</Text>
    </Flex>
  );
}
