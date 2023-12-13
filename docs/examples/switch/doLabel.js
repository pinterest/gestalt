// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Flex, Label, Switch, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [switched, setSwitched] = useState(true);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Flex gap={4} alignItems="center">
        <Label htmlFor="makesecret">
          <Text weight="bold">Make this board secret</Text>
        </Label>

        <Switch
          id="makesecret"
          onChange={() => setSwitched((currVal) => !currVal)}
          switched={switched}
        />
      </Flex>
    </Flex>
  );
}
