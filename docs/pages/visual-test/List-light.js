// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider, List } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" padding={1}>
        <List label="This application will be able to" type="unordered">
          <List.Item text="Access your follows and followers" />
          <List.Item text="Create new Pins for you" />
          <List.Item text="Follow things for you" />
        </List>
      </Box>
    </ColorSchemeProvider>
  );
}
