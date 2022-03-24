// @flow strict
import { type Node } from 'react';
import { Box, Flex, Label, Text, Switch } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box padding={1}>
      <Flex gap={2}>
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
