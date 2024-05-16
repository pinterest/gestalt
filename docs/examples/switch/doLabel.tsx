import { ReactNode, useState } from 'react';
import { Flex, Label, Switch, Text } from 'gestalt';

export default function Example() {
  const [switched, setSwitched] = useState(true);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" gap={4}>
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
