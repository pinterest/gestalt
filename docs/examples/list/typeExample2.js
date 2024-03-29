// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, List, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <List label={<Text weight="bold">Ordered list</Text>} type="ordered">
        <List.Item text="List item text" />
        <List.Item text="List item text" />
        <List.Item text="List item text" />
        <List.Item text="List item text" />
      </List>
    </Box>
  );
}
