// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Flex, Label, Switch, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [switched, setSwitched] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
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
