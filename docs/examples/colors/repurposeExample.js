// @flow strict
import { type Node as ReactNode } from 'react';
import { Badge, Flex, Label, Switch, Text } from 'gestalt';

export default function RepurposeExample(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Flex
        direction="column"
        gap={{
          row: 0,
          column: 2,
        }}
      >
        <Flex
          gap={{
            row: 2,
            column: 0,
          }}
        >
          <Label htmlFor="dont-01">
            <Text weight="bold"> Search privacy</Text>
          </Label>
          <Badge text="New" type="error" />
        </Flex>
        <Text color="subtle">Hide your profile from search engines</Text>
      </Flex>
      <Switch id="dont-01" onChange={() => {}} />
    </Flex>
  );
}
