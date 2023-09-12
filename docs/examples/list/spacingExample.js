// @flow strict
import { type Node } from 'react';
import { Box, List, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <List label={<Text weight="bold">Regular spacing</Text>} type="unordered" spacing="regular">
        <List.Item text="List item text" />
        <List.Item text="List item text">
          <List.Item text="List item text">
            <List.Item text="List item text" />
            <List.Item text="List item text" />
            <List.Item text="List item text" />
          </List.Item>
          <List.Item text="List item text" />
          <List.Item text="List item text" />
        </List.Item>
        <List.Item text="List item text" />
      </List>
    </Box>
  );
}
