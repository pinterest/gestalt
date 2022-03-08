// @flow strict
import { type Node } from 'react';
import { Label, Text, Flex, Switch, Box, ColorSchemeProvider } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock" padding={1}>
        <Flex direction="column" gap={4}>
          <Flex gap={4}>
            <Flex direction="column" gap={1}>
              <Label htmlFor="2">
                <Text>Not switched</Text>
              </Label>
              <Switch onChange={() => {}} id="2" />
            </Flex>
            <Flex direction="column" gap={1}>
              <Label htmlFor="4">
                <Text>Not switched, disabled</Text>
              </Label>
              <Switch onChange={() => {}} id="4" disabled />
            </Flex>
          </Flex>
          <Flex gap={4}>
            <Flex direction="column" gap={1}>
              <Label htmlFor="1">
                <Text>Switched</Text>
              </Label>
              <Switch onChange={() => {}} id="1" switched />
            </Flex>
            <Flex direction="column" gap={1}>
              <Label htmlFor="3">
                <Text>Switched, disabled</Text>
              </Label>
              <Switch onChange={() => {}} id="3" switched disabled />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
