// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Flex, Label, Switch, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [switched, setSwitched] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" gap={2}>
        <Switch
          id="setboard"
          onChange={() => setSwitched((currVal) => !currVal)}
          switched={switched}
        />

        <Label htmlFor="setboard">
          <Text>Set board to...</Text>
        </Label>
      </Flex>
    </Flex>
  );
}
