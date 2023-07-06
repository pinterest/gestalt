// @flow strict
import { type Node, useId, useState } from 'react';
import { Flex, Label, Switch, Text } from 'gestalt';

export default function Example(): Node {
  const [switched, setSwitched] = useState(false);
  const switchId = useId();

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={2}>
        <Label htmlFor={switchId}>
          <Text>This is a Label</Text>
        </Label>

        <Switch onChange={() => setSwitched(!switched)} id={switchId} switched={switched} />
      </Flex>
    </Flex>
  );
}
