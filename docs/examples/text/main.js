// @flow strict
import { type Node } from 'react';
import { Badge, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="start" direction="column" gap={{ column: 4, row: 0 }}>
        <Text size="500">This simple description uses the Text component.</Text>
        <Badge text="Badge also uses it" />
      </Flex>
    </Flex>
  );
}
