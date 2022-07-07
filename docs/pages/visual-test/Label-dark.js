// @flow strict
import { type Node } from 'react';
import { Box, Flex, Label, Text, Switch, ColorSchemeProvider } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <Flex gap={2}>
          <Box paddingY={1}>
            <Label htmlFor="switchExample">
              <Text>Darkmode</Text>
            </Label>
          </Box>
          <Switch onChange={() => {}} id="switchExample" />
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
