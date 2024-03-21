// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Label, Switch, Text } from 'gestalt';

export default function SwitchExample(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="center" gap={8}>
        <Flex direction="column" gap={2}>
          <Label htmlFor="base">
            <Text>Base state</Text>
          </Label>
          <Switch id="base" onChange={() => {}} switched={false} />
        </Flex>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Label htmlFor="switched">
            <Text>Switched</Text>
          </Label>
          <Switch id="switched" onChange={() => {}} switched />
        </Flex>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Label htmlFor="disabled">
            <Text>Disabled, not switched</Text>
          </Label>
          <Switch disabled id="disabled" onChange={() => {}} switched={false} />
        </Flex>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Label htmlFor="disabledAndSwitched">
            <Text>Disabled and switched</Text>
          </Label>
          <Switch disabled id="disabledAndSwitched" onChange={() => {}} switched />
        </Flex>
      </Flex>
    </Flex>
  );
}
