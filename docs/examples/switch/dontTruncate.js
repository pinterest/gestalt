// @flow strict
import { type Node, useState } from 'react';
import { Flex, Label, Switch, Text } from 'gestalt';

export default function Example(): Node {
  const [switched, setSwitched] = useState(false);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Flex gap={2} alignItems="center">
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
