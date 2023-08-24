// @flow strict
import { type Node } from 'react';
import { Box, List } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <List label="This application will be able to" type="unordered">
        <List.Item text="Access your follows and followers" />
        <List.Item text="Create new Pins for you" />
        <List.Item text="Follow things for you" />
      </List>
    </Box>
  );
}
