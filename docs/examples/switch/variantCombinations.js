// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Label, Switch, Text } from 'gestalt';

export default function SwitchExample(): ReactNode {
  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Flex alignItems="center" gap={8}>
        <Flex direction="column" gap={2}>
          <Label htmlFor="base">
            <Text>Base state</Text>
          </Label>
          <Switch onChange={() => {}} id="base" switched={false} />
        </Flex>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Label htmlFor="switched">
            <Text>Switched</Text>
          </Label>
          <Switch onChange={() => {}} id="switched" switched />
        </Flex>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Label htmlFor="disabled">
            <Text>Disabled, not switched</Text>
          </Label>
          <Switch onChange={() => {}} id="disabled" switched={false} disabled />
        </Flex>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Label htmlFor="disabledAndSwitched">
            <Text>Disabled and switched</Text>
          </Label>
          <Switch onChange={() => {}} id="disabledAndSwitched" switched disabled />
        </Flex>
      </Flex>
    </Flex>
  );
}
