// @flow strict
import { type Node } from 'react';
import { Flex, Switch, Box, ColorSchemeProvider } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock" padding={1}>
        <Flex gap={4}>
          <Switch onChange={() => {}} id="1" switched />
          <Switch onChange={() => {}} id="1" />
          <Switch onChange={() => {}} id="1" switched disabled />
          <Switch onChange={() => {}} id="1" disabled />
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
