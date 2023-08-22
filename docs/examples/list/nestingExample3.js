// @flow strict
import { type Node } from 'react';
import { Box, List, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <List spacing="condensed" label={<Text weight="bold">Mixed nested</Text>} type="ordered">
        <List.Item text="List item text" />
        <List.Item text="List item text">
          <List type="unordered">
            <List.Item text="List item text" />
            <List.Item text="List item text">
              <List.Item text="List item text" />
              <List.Item text="List item text">
                <List type="ordered">
                  <List.Item text="List item text" />
                  <List.Item text="List item text" />
                </List>
              </List.Item>
            </List.Item>
            <List.Item text="List item text" />
          </List>
        </List.Item>
        <List.Item text="List item text" />
      </List>
    </Box>
  );
}
