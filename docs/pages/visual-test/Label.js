// @flow strict
import { type Node } from 'react';
import { Box, Flex, Label, Switch, Text } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box padding={1}>
      <Flex
        gap={{
          row: 2,
          column: 0,
        }}
      >
        <Box paddingY={1}>
          <Label htmlFor="switchExample">
            <Text>Darkmode</Text>
          </Label>
        </Box>
        <Switch onChange={() => {}} id="switchExample" />
      </Flex>
    </Box>
  );
}
