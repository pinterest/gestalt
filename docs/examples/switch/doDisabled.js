// @flow strict
import { type Node, useState } from 'react';
import { Flex, Label, Switch, Text } from 'gestalt';

export default function Example(): Node {
  const [switched, setSwitched] = useState(false);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Flex gap={2} alignItems="center">
        <Switch
          disabled
          id="showsecretboards"
          onChange={() => setSwitched((currVal) => !currVal)}
          switched={switched}
        />

        <Label htmlFor="showsecretboards">
          <Flex direction="column" gap={1}>
            <Text>Show secret boards</Text>
            <Text size="100" color="subtle">
              You don&apos;t have any secret boards
            </Text>
          </Flex>
        </Label>
      </Flex>
    </Flex>
  );
}
