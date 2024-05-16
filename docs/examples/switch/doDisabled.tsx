import {ReactNode, useState} from 'react';
import { Flex, Label, Switch, Text } from 'gestalt';

export default function Example() {
  const [switched, setSwitched] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" gap={2}>
        <Switch
          disabled
          id="showsecretboards"
          onChange={() => setSwitched((currVal) => !currVal)}
          switched={switched}
        />

        <Label htmlFor="showsecretboards">
          <Flex direction="column" gap={1}>
            <Text>Show secret boards</Text>
            <Text color="subtle" size="100">
              You don&apos;t have any secret boards
            </Text>
          </Flex>
        </Label>
      </Flex>
    </Flex>
  );
}
