// @flow strict
import { type Node, useState } from 'react';
import { Flex, Label, Switch, Text } from 'gestalt';

export default function Example(): Node {
  const [switched, setSwitched] = useState(false);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Flex alignItems="center" gap={2}>
        <Label htmlFor="introExample">
          <Text>Airplane mode</Text>
        </Label>

        <Switch
          id="introExample"
          onChange={() => setSwitched((currVal) => !currVal)}
          switched={switched}
        />
      </Flex>
    </Flex>
  );
}
